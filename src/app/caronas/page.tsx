'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Users, 
  Plus, 
  Search, 
  ArrowLeft,
  MapPin,
  Clock,
  User
} from 'lucide-react'

interface Carona {
  id: string
  origem: string
  destino: string
  dataHora: string
  vagasDisponiveis: number
  observacoes?: string
  status: string
  usuarioOferece: {
    nome: string
    tipoUsuario: string
  }
}

export default function CaronasPage() {
  const router = useRouter()
  const [caronas, setCaronas] = useState<Carona[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    loadCaronas()
  }, [])

  const loadCaronas = async () => {
    try {
      // Simular dados de caronas
      const mockCaronas: Carona[] = [
        {
          id: '1',
          origem: 'Campus UFU',
          destino: 'Centro de Uberlândia',
          dataHora: '2025-01-15T08:00:00Z',
          vagasDisponiveis: 3,
          observacoes: 'Saída em frente à biblioteca',
          status: 'ATIVA',
          usuarioOferece: {
            nome: 'Prof. Carlos Mendes',
            tipoUsuario: 'PROFESSOR_FUNCIONARIO'
          }
        },
        {
          id: '2',
          origem: 'Centro de Uberlândia',
          destino: 'Campus UFU',
          dataHora: '2025-01-15T17:30:00Z',
          vagasDisponiveis: 2,
          observacoes: 'Volta do trabalho',
          status: 'ATIVA',
          usuarioOferece: {
            nome: 'Ana Clara Silva',
            tipoUsuario: 'ESTUDANTE'
          }
        }
      ]
      setCaronas(mockCaronas)
    } catch (error) {
      console.error('Erro ao carregar caronas:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const filteredCaronas = caronas.filter(carona =>
    carona.origem.toLowerCase().includes(searchTerm.toLowerCase()) ||
    carona.destino.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
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
              <Users className="h-8 w-8 text-blue-600" />
              <h1 className="ml-2 text-2xl font-bold text-gray-900">Sistema de Caronas</h1>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Oferecer Carona
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por origem ou destino..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Form to offer carona */}
        {showForm && (
          <div className="mb-6 bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Oferecer Nova Carona
            </h3>
            <form className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Origem
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Ex: Campus UFU"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Destino
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Ex: Centro de Uberlândia"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Data e Hora
                  </label>
                  <input
                    type="datetime-local"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Vagas Disponíveis
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="7"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="3"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Observações (opcional)
                </label>
                <textarea
                  rows={3}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Ex: Saída em frente à biblioteca"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
                >
                  Oferecer Carona
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Caronas List */}
        <div className="space-y-4">
          {filteredCaronas.map((carona) => (
            <div key={carona.id} className="bg-white shadow rounded-lg p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-blue-600 mr-2" />
                    <span className="text-lg font-medium text-gray-900">
                      {carona.origem} → {carona.destino}
                    </span>
                  </div>
                  
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    {formatDateTime(carona.dataHora)}
                  </div>
                  
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <User className="h-4 w-4 mr-1" />
                    Oferecida por {carona.usuarioOferece.nome}
                  </div>
                  
                  {carona.observacoes && (
                    <p className="mt-2 text-sm text-gray-600">
                      {carona.observacoes}
                    </p>
                  )}
                </div>
                
                <div className="ml-4 flex flex-col items-end">
                  <div className="text-sm text-gray-500">
                    {carona.vagasDisponiveis} vaga{carona.vagasDisponiveis !== 1 ? 's' : ''} disponível{carona.vagasDisponiveis !== 1 ? 'is' : ''}
                  </div>
                  <button className="mt-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700">
                    Solicitar Carona
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCaronas.length === 0 && (
          <div className="text-center py-12">
            <Users className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              Nenhuma carona encontrada
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm ? 'Tente ajustar sua busca.' : 'Seja o primeiro a oferecer uma carona!'}
            </p>
          </div>
        )}
      </main>
    </div>
  )
}
