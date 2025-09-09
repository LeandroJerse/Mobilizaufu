'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Bus, 
  Clock, 
  ArrowLeft,
  MapPin,
  AlertCircle,
  CheckCircle
} from 'lucide-react'

interface HorarioOnibus {
  id: string
  horarioPrevisto: string
  horarioReal?: string
  status: string
  linha: {
    numeroLinha: string
    nome: string
    operadora: string
  }
  ponto: {
    nome: string
  }
}

export default function OnibusPage() {
  const router = useRouter()
  const [horarios, setHorarios] = useState<HorarioOnibus[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedPonto, setSelectedPonto] = useState('todos')

  useEffect(() => {
    loadHorarios()
  }, [])

  const loadHorarios = async () => {
    try {
      // Simular dados de horários
      const mockHorarios: HorarioOnibus[] = [
        {
          id: '1',
          horarioPrevisto: '08:00',
          horarioReal: '08:02',
          status: 'ATRASADO',
          linha: {
            numeroLinha: '101',
            nome: 'Central - Campus',
            operadora: 'TransUberlândia'
          },
          ponto: {
            nome: 'Portão Principal UFU'
          }
        },
        {
          id: '2',
          horarioPrevisto: '08:15',
          status: 'NO_PRAZO',
          linha: {
            numeroLinha: '102',
            nome: 'Campus - Centro',
            operadora: 'TransUberlândia'
          },
          ponto: {
            nome: 'Biblioteca Central'
          }
        },
        {
          id: '3',
          horarioPrevisto: '08:30',
          horarioReal: '08:28',
          status: 'ADIANTADO',
          linha: {
            numeroLinha: '101',
            nome: 'Central - Campus',
            operadora: 'TransUberlândia'
          },
          ponto: {
            nome: 'Portão Principal UFU'
          }
        }
      ]
      setHorarios(mockHorarios)
    } catch (error) {
      console.error('Erro ao carregar horários:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'NO_PRAZO':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'ATRASADO':
        return <AlertCircle className="h-4 w-4 text-red-500" />
      case 'ADIANTADO':
        return <Clock className="h-4 w-4 text-yellow-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'NO_PRAZO':
        return 'No prazo'
      case 'ATRASADO':
        return 'Atrasado'
      case 'ADIANTADO':
        return 'Adiantado'
      default:
        return status
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'NO_PRAZO':
        return 'text-green-600 bg-green-100'
      case 'ATRASADO':
        return 'text-red-600 bg-red-100'
      case 'ADIANTADO':
        return 'text-yellow-600 bg-yellow-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const pontos = ['todos', 'Portão Principal UFU', 'Biblioteca Central']
  const filteredHorarios = selectedPonto === 'todos' 
    ? horarios 
    : horarios.filter(h => h.ponto.nome === selectedPonto)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-600"></div>
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
              <Bus className="h-8 w-8 text-yellow-600" />
              <h1 className="ml-2 text-2xl font-bold text-gray-900">Horários de Ônibus</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Filter */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filtrar por ponto de parada
          </label>
          <select
            value={selectedPonto}
            onChange={(e) => setSelectedPonto(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
          >
            {pontos.map((ponto) => (
              <option key={ponto} value={ponto}>
                {ponto === 'todos' ? 'Todos os pontos' : ponto}
              </option>
            ))}
          </select>
        </div>

        {/* Horários List */}
        <div className="space-y-4">
          {filteredHorarios.map((horario) => (
            <div key={horario.id} className="bg-white shadow rounded-lg p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center">
                    <Bus className="h-5 w-5 text-yellow-600 mr-2" />
                    <span className="text-lg font-medium text-gray-900">
                      Linha {horario.linha.numeroLinha} - {horario.linha.nome}
                    </span>
                  </div>
                  
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-1" />
                    {horario.ponto.nome}
                  </div>
                  
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    Previsto: {horario.horarioPrevisto}
                    {horario.horarioReal && (
                      <span className="ml-2">
                        | Real: {horario.horarioReal}
                      </span>
                    )}
                  </div>
                  
                  <div className="mt-2 text-sm text-gray-500">
                    Operadora: {horario.linha.operadora}
                  </div>
                </div>
                
                <div className="ml-4 flex items-center">
                  <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(horario.status)}`}>
                    {getStatusIcon(horario.status)}
                    <span className="ml-1">{getStatusText(horario.status)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredHorarios.length === 0 && (
          <div className="text-center py-12">
            <Bus className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              Nenhum horário encontrado
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Não há horários disponíveis para o ponto selecionado.
            </p>
          </div>
        )}

        {/* Info Box */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-blue-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">
                Informações sobre os horários
              </h3>
              <div className="mt-2 text-sm text-blue-700">
                <ul className="list-disc list-inside space-y-1">
                  <li>Os horários são atualizados em tempo real</li>
                  <li>Status &quot;Atrasado&quot; indica atraso de mais de 2 minutos</li>
                  <li>Status &quot;Adiantado&quot; indica chegada antes do previsto</li>
                  <li>Em caso de cancelamento, o status será atualizado automaticamente</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
