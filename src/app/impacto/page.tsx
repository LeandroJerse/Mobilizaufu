'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Leaf, 
  ArrowLeft,
  TrendingUp,
  Bike,
  Users,
  Bus,
  Award,
  Calendar
} from 'lucide-react'

interface ImpactoData {
  co2Total: number
  distanciaTotal: number
  viagensBicicleta: number
  viagensCarona: number
  viagensOnibus: number
  ranking: number
  totalUsuarios: number
  historico: {
    data: string
    co2: number
    distancia: number
    tipoTransporte: string
  }[]
}

export default function ImpactoPage() {
  const router = useRouter()
  const [impactoData, setImpactoData] = useState<ImpactoData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [periodo, setPeriodo] = useState('mes')

  useEffect(() => {
    loadImpactoData()
  }, [periodo])

  const loadImpactoData = async () => {
    try {
      // Simular dados de impacto
      const mockData: ImpactoData = {
        co2Total: 2.4,
        distanciaTotal: 15.6,
        viagensBicicleta: 8,
        viagensCarona: 3,
        viagensOnibus: 5,
        ranking: 12,
        totalUsuarios: 150,
        historico: [
          { data: '2025-01-15', co2: 0.3, distancia: 2.1, tipoTransporte: 'BICICLETA' },
          { data: '2025-01-14', co2: 0.2, distancia: 1.5, tipoTransporte: 'CARONA' },
          { data: '2025-01-13', co2: 0.4, distancia: 3.2, tipoTransporte: 'ONIBUS' },
          { data: '2025-01-12', co2: 0.3, distancia: 2.0, tipoTransporte: 'BICICLETA' },
          { data: '2025-01-11', co2: 0.2, distancia: 1.8, tipoTransporte: 'CARONA' },
        ]
      }
      setImpactoData(mockData)
    } catch (error) {
      console.error('Erro ao carregar dados de impacto:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getTipoTransporteIcon = (tipo: string) => {
    switch (tipo) {
      case 'BICICLETA':
        return <Bike className="h-4 w-4 text-green-600" />
      case 'CARONA':
        return <Users className="h-4 w-4 text-blue-600" />
      case 'ONIBUS':
        return <Bus className="h-4 w-4 text-yellow-600" />
      default:
        return <Leaf className="h-4 w-4 text-gray-600" />
    }
  }

  const getTipoTransporteText = (tipo: string) => {
    switch (tipo) {
      case 'BICICLETA':
        return 'Bicicleta'
      case 'CARONA':
        return 'Carona'
      case 'ONIBUS':
        return 'Ônibus'
      default:
        return tipo
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    )
  }

  if (!impactoData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Leaf className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            Erro ao carregar dados
          </h3>
        </div>
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
              <Leaf className="h-8 w-8 text-green-600" />
              <h1 className="ml-2 text-2xl font-bold text-gray-900">Meu Impacto Ambiental</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-gray-400" />
              <select
                value={periodo}
                onChange={(e) => setPeriodo(e.target.value)}
                className="text-sm border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-green-500 focus:border-green-500"
              >
                <option value="semana">Esta semana</option>
                <option value="mes">Este mês</option>
                <option value="ano">Este ano</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Leaf className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      CO2 Economizado
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {impactoData.co2Total} kg
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
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Distância Percorrida
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {impactoData.distanciaTotal} km
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
                  <Award className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Ranking
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      #{impactoData.ranking} de {impactoData.totalUsuarios}
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
                  <Bike className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total de Viagens
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {impactoData.viagensBicicleta + impactoData.viagensCarona + impactoData.viagensOnibus}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Transport Types */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-6">
              <div className="flex items-center">
                <Bike className="h-8 w-8 text-green-600" />
                <div className="ml-5">
                  <h3 className="text-lg font-medium text-gray-900">
                    Bicicletas
                  </h3>
                  <p className="text-sm text-gray-500">
                    {impactoData.viagensBicicleta} viagens
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-blue-600" />
                <div className="ml-5">
                  <h3 className="text-lg font-medium text-gray-900">
                    Caronas
                  </h3>
                  <p className="text-sm text-gray-500">
                    {impactoData.viagensCarona} viagens
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-6">
              <div className="flex items-center">
                <Bus className="h-8 w-8 text-yellow-600" />
                <div className="ml-5">
                  <h3 className="text-lg font-medium text-gray-900">
                    Ônibus
                  </h3>
                  <p className="text-sm text-gray-500">
                    {impactoData.viagensOnibus} viagens
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Histórico */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Histórico de Viagens
            </h3>
            <div className="space-y-3">
              {impactoData.historico.map((item, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-gray-200 last:border-b-0">
                  <div className="flex items-center">
                    {getTipoTransporteIcon(item.tipoTransporte)}
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        {getTipoTransporteText(item.tipoTransporte)}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(item.data).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {item.distancia} km
                    </p>
                    <p className="text-sm text-green-600">
                      {item.co2} kg CO2
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Achievement */}
        <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6">
          <div className="flex items-center">
            <Award className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <h3 className="text-lg font-medium text-green-900">
                Parabéns! 🌱
              </h3>
              <p className="text-sm text-green-700">
                Você já economizou {impactoData.co2Total} kg de CO2 este mês, 
                contribuindo para um campus mais sustentável!
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
