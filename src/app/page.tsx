'use client'

import { Bike, Users, Bus, Leaf, LogIn, UserPlus } from 'lucide-react'

export default function Home() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Bike className="h-8 w-8 text-green-600" />
              <h1 className="ml-2 text-2xl font-bold text-gray-900">MobilizaUFU</h1>
            </div>
            <div className="flex space-x-4">
              <a
                href="/login"
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                <LogIn className="h-4 w-4 mr-2" />
                Entrar
              </a>
              <a
                href="/register"
                className="flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Cadastrar
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            Mobilidade Sustentável
            <span className="block text-green-600">na UFU</span>
          </h2>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Conecte-se com opções de transporte ecológicas. Reserve bicicletas, 
            organize caronas e consulte horários de ônibus em uma única plataforma.
          </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <a
                  href="/register"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 md:py-4 md:text-lg md:px-10"
                >
                  Começar Agora
                </a>
              </div>
            </div>
        </div>

        {/* Features */}
        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="pt-6">
              <div className="flow-root bg-white rounded-lg px-6 pb-8">
                <div className="-mt-6">
                  <div>
                    <span className="inline-flex items-center justify-center p-3 bg-green-500 rounded-md shadow-lg">
                      <Bike className="h-6 w-6 text-white" />
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                    Bicicletas Compartilhadas
                  </h3>
                  <p className="mt-5 text-base text-gray-500">
                    Reserve bicicletas em estações espalhadas pelo campus. 
                    Desbloqueie com QR code e devolva em qualquer estação.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <div className="flow-root bg-white rounded-lg px-6 pb-8">
                <div className="-mt-6">
                  <div>
                    <span className="inline-flex items-center justify-center p-3 bg-blue-500 rounded-md shadow-lg">
                      <Users className="h-6 w-6 text-white" />
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                    Sistema de Caronas
                  </h3>
                  <p className="mt-5 text-base text-gray-500">
                    Ofereça ou solicite caronas para reduzir o uso de veículos 
                    individuais e economizar combustível.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <div className="flow-root bg-white rounded-lg px-6 pb-8">
                <div className="-mt-6">
                  <div>
                    <span className="inline-flex items-center justify-center p-3 bg-yellow-500 rounded-md shadow-lg">
                      <Bus className="h-6 w-6 text-white" />
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                    Horários de Ônibus
                  </h3>
                  <p className="mt-5 text-base text-gray-500">
                    Consulte horários em tempo real do transporte público 
                    que atende o campus da UFU.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Impact Section */}
        <div className="mt-20 bg-white rounded-lg shadow-lg p-8">
          <div className="text-center">
            <Leaf className="mx-auto h-12 w-12 text-green-500" />
            <h3 className="mt-4 text-2xl font-bold text-gray-900">
              Impacto Ambiental
            </h3>
            <p className="mt-2 text-base text-gray-500">
              Acompanhe quanto CO2 você está economizando ao usar transporte sustentável. 
              Cada viagem conta para um campus mais verde!
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Bike className="mx-auto h-8 w-8 text-green-400" />
            <h3 className="mt-4 text-lg font-medium text-white">MobilizaUFU</h3>
            <p className="mt-2 text-base text-gray-400">
              Plataforma de mobilidade sustentável para a Universidade Federal de Uberlândia
            </p>
            <p className="mt-4 text-sm text-gray-500">
              © 2025 MobilizaUFU. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}