'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Bike, 
  MapPin, 
  ArrowLeft, 
  QrCode,
  CheckCircle
} from 'lucide-react'

interface Estacao {
  id: string
  nome: string
  localizacaoLat: number
  localizacaoLng: number
  capacidadeTotal: number
  bicicletas: Bicicleta[]
}

interface Bicicleta {
  id: string
  numeroSerie: string
  status: string
  estacao: Estacao
}

export default function BicicletasPage() {
  const router = useRouter()
  const [estacoes, setEstacoes] = useState<Estacao[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedEstacao, setSelectedEstacao] = useState<Estacao | null>(null)
  const [isReserving, setIsReserving] = useState(false)

  useEffect(() => {
    loadEstacoes()
  }, [])

  const loadEstacoes = async () => {
    try {
      const response = await fetch('/api/bicicletas/estacoes')
      const data = await response.json()
      
      if (data.success) {
        setEstacoes(data.data)
      }
    } catch {
      console.error('Erro ao carregar estações')
    } finally {
      setIsLoading(false)
    }
  }

  const handleReservarBicicleta = async (bicicletaId: string, estacaoId: string) => {
    setIsReserving(true)
    
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/bicicletas/reservar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          bicicletaId,
          estacaoId,
        }),
      })

      const data = await response.json()
      
      if (data.success) {
        alert('Bicicleta reservada com sucesso!')
        loadEstacoes() // Recarregar dados
      } else {
        alert(data.error || 'Erro ao reservar bicicleta')
      }
    } catch (error) {
      alert('Erro de conexão. Tente novamente.')
    } finally {
      setIsReserving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <button
                onClick={() => router.back()}
                className="mr-4 p-2 text-gray-400 hover:text-gray-600"
              >
                <ArrowLeft className="h-6 w-6" />
              </button>
              <Bike className="h-8 w-8 text-green-600" />
              <h1 className="ml-2 text-2xl font-bold text-gray-900">Bicicletas Compartilhadas</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {selectedEstacao ? (
          // Detalhes da Estação
          <div className="px-4 py-6 sm:px-0">
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    {selectedEstacao.nome}
                  </h3>
                  <button
                    onClick={() => setSelectedEstacao(null)}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    Voltar
                  </button>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm text-gray-600">
                    Capacidade: {selectedEstacao.capacidadeTotal} bicicletas
                  </p>
                  <p className="text-sm text-gray-600">
                    Disponíveis: {selectedEstacao.bicicletas.length} bicicletas
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {selectedEstacao.bicicletas.map((bicicleta) => (
                    <div
                      key={bicicleta.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Bike className="h-5 w-5 text-green-600 mr-2" />
                          <span className="text-sm font-medium text-gray-900">
                            #{bicicleta.numeroSerie}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                          <span className="text-xs text-green-600">Disponível</span>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => handleReservarBicicleta(bicicleta.id, selectedEstacao.id)}
                        disabled={isReserving}
                        className="mt-3 w-full flex items-center justify-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isReserving ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        ) : (
                          <>
                            <QrCode className="h-4 w-4 mr-2" />
                            Reservar
                          </>
                        )}
                      </button>
                    </div>
                  ))}
                </div>

                {selectedEstacao.bicicletas.length === 0 && (
                  <div className="text-center py-8">
                    <Bike className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">
                      Nenhuma bicicleta disponível
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Esta estação não possui bicicletas disponíveis no momento.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          // Lista de Estações
          <div className="px-4 py-6 sm:px-0">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Escolha uma estação
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                Selecione uma estação para ver as bicicletas disponíveis
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {estacoes.map((estacao) => (
                <div
                  key={estacao.id}
                  className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setSelectedEstacao(estacao)}
                >
                  <div className="p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <MapPin className="h-6 w-6 text-green-600" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <h3 className="text-lg font-medium text-gray-900">
                          {estacao.nome}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          {estacao.bicicletas.length} de {estacao.capacidadeTotal} bicicletas disponíveis
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Disponibilidade</span>
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                            <div
                              className="bg-green-600 h-2 rounded-full"
                              style={{
                                width: `${(estacao.bicicletas.length / estacao.capacidadeTotal) * 100}%`
                              }}
                            ></div>
                          </div>
                          <span className="text-gray-900 font-medium">
                            {Math.round((estacao.bicicletas.length / estacao.capacidadeTotal) * 100)}%
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <button className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700">
                        <Bike className="h-4 w-4 mr-2" />
                        Ver Bicicletas
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {estacoes.length === 0 && (
              <div className="text-center py-12">
                <MapPin className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  Nenhuma estação encontrada
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Não há estações de bicicletas cadastradas no momento.
                </p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
