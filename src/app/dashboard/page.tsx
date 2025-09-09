'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Bike, 
  Users, 
  Bus, 
  Leaf, 
  MapPin, 
  LogOut, 
  User,
  Clock,
  TrendingUp
} from 'lucide-react'

interface User {
  id: string
  nome: string
  email: string
  tipoUsuario: string
}

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
}

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [estacoes, setEstacoes] = useState<Estacao[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')

    if (!token || !userData) {
      router.push('/login')
      return
    }

    setUser(JSON.parse(userData))
    loadEstacoes()
  }, [router])

  const loadEstacoes = async () => {
    try {
      const response = await fetch('/api/bicicletas/estacoes')
      const data = await response.json()
      
      if (data.success) {
        setEstacoes(data.data)
      }
    } catch (error) {
      console.error('Erro ao carregar estações:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/')
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
              <Bike className="h-8 w-8 text-green-600" />
              <h1 className="ml-2 text-2xl font-bold text-gray-900">MobilizaUFU</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <User className="h-5 w-5 text-gray-400" />
                <span className="ml-2 text-sm text-gray-700">{user?.nome}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sair
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="px-4 py-6 sm:px-0">
          <h2 className="text-2xl font-bold text-gray-900">
            Bem-vindo, {user?.nome}!
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            Escolha uma opção de mobilidade sustentável para começar sua jornada.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Bike className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Bicicletas Disponíveis
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {estacoes.reduce((total, estacao) => total + estacao.bicicletas.length, 0)}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <MapPin className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Estações Ativas
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {estacoes.length}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Caronas Hoje
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">12</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Leaf className="h-6 w-6 text-green-500" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      CO2 Economizado
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">2.4 kg</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Actions */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Bicicletas */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Bike className="h-8 w-8 text-green-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <h3 className="text-lg font-medium text-gray-900">
                    Bicicletas Compartilhadas
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Reserve uma bicicleta e desbloqueie com QR code
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <button
                  onClick={() => router.push('/bicicletas')}
                  className="w-full flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                >
                  Ver Estações
                </button>
              </div>
            </div>
          </div>

          {/* Caronas */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <h3 className="text-lg font-medium text-gray-900">
                    Sistema de Caronas
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Ofereça ou solicite caronas para economizar
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <button
                  onClick={() => router.push('/caronas')}
                  className="w-full flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  Gerenciar Caronas
                </button>
              </div>
            </div>
          </div>

          {/* Ônibus */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Bus className="h-8 w-8 text-yellow-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <h3 className="text-lg font-medium text-gray-900">
                    Horários de Ônibus
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Consulte horários em tempo real
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <button
                  onClick={() => router.push('/onibus')}
                  className="w-full flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700"
                >
                  Ver Horários
                </button>
              </div>
            </div>
          </div>

          {/* Impacto Ambiental */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Leaf className="h-8 w-8 text-green-500" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <h3 className="text-lg font-medium text-gray-900">
                    Meu Impacto
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Acompanhe sua contribuição ambiental
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <button
                  onClick={() => router.push('/impacto')}
                  className="w-full flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-600"
                >
                  Ver Impacto
                </button>
              </div>
            </div>
          </div>

          {/* Minhas Reservas */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Clock className="h-8 w-8 text-purple-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <h3 className="text-lg font-medium text-gray-900">
                    Minhas Reservas
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Gerencie suas reservas ativas
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <button
                  onClick={() => router.push('/reservas')}
                  className="w-full flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
                >
                  Ver Reservas
                </button>
              </div>
            </div>
          </div>

          {/* Admin Panel */}
          {user?.tipoUsuario === 'ADMINISTRADOR' && (
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <TrendingUp className="h-8 w-8 text-red-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <h3 className="text-lg font-medium text-gray-900">
                      Painel Admin
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Gerencie bicicletas e estações
                    </p>
                  </div>
                </div>
                <div className="mt-6">
                  <button
                    onClick={() => router.push('/admin')}
                    className="w-full flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                  >
                    Acessar Admin
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
