'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Bike, UserPlus, Eye, EyeOff } from 'lucide-react'

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    tipoUsuario: 'ESTUDANTE',
    telefone: '',
    cursoDepartamento: '',
    matricula: '',
    periodo: '',
    siape: '',
    cargo: '',
    nivelAcesso: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Validações
    if (formData.senha !== formData.confirmarSenha) {
      setError('As senhas não coincidem')
      setIsLoading(false)
      return
    }

    if (formData.tipoUsuario === 'ESTUDANTE' && (!formData.matricula || !formData.periodo)) {
      setError('Matrícula e período são obrigatórios para estudantes')
      setIsLoading(false)
      return
    }

    if (formData.tipoUsuario === 'PROFESSOR_FUNCIONARIO' && (!formData.siape || !formData.cargo)) {
      setError('SIAPE e cargo são obrigatórios para professores/funcionários')
      setIsLoading(false)
      return
    }

    if (formData.tipoUsuario === 'ADMINISTRADOR' && !formData.nivelAcesso) {
      setError('Nível de acesso é obrigatório para administradores')
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        localStorage.setItem('token', data.data.token)
        localStorage.setItem('user', JSON.stringify(data.data.user))
        router.push('/dashboard')
      } else {
        setError(data.error || 'Erro ao criar conta')
      }
    } catch {
      setError('Erro de conexão. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Bike className="h-12 w-12 text-green-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Crie sua conta
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Ou{' '}
          <button
            onClick={() => router.push('/login')}
            className="font-medium text-green-600 hover:text-green-500"
          >
            faça login na sua conta existente
          </button>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
                Nome completo
              </label>
              <div className="mt-1">
                <input
                  id="nome"
                  name="nome"
                  type="text"
                  required
                  value={formData.nome}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  placeholder="Seu nome completo"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email institucional
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  placeholder="seu.email@ufu.br"
                />
              </div>
            </div>

            <div>
              <label htmlFor="tipoUsuario" className="block text-sm font-medium text-gray-700">
                Tipo de usuário
              </label>
              <div className="mt-1">
                <select
                  id="tipoUsuario"
                  name="tipoUsuario"
                  value={formData.tipoUsuario}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                >
                  <option value="ESTUDANTE">Estudante</option>
                  <option value="PROFESSOR_FUNCIONARIO">Professor/Funcionário</option>
                  <option value="ADMINISTRADOR">Administrador</option>
                </select>
              </div>
            </div>

            {formData.tipoUsuario === 'ESTUDANTE' && (
              <>
                <div>
                  <label htmlFor="matricula" className="block text-sm font-medium text-gray-700">
                    Matrícula
                  </label>
                  <div className="mt-1">
                    <input
                      id="matricula"
                      name="matricula"
                      type="text"
                      required
                      value={formData.matricula}
                      onChange={handleChange}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      placeholder="Sua matrícula"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="periodo" className="block text-sm font-medium text-gray-700">
                    Período
                  </label>
                  <div className="mt-1">
                    <input
                      id="periodo"
                      name="periodo"
                      type="text"
                      required
                      value={formData.periodo}
                      onChange={handleChange}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      placeholder="Ex: 5º período"
                    />
                  </div>
                </div>
              </>
            )}

            {formData.tipoUsuario === 'PROFESSOR_FUNCIONARIO' && (
              <>
                <div>
                  <label htmlFor="siape" className="block text-sm font-medium text-gray-700">
                    SIAPE
                  </label>
                  <div className="mt-1">
                    <input
                      id="siape"
                      name="siape"
                      type="text"
                      required
                      value={formData.siape}
                      onChange={handleChange}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      placeholder="Seu SIAPE"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="cargo" className="block text-sm font-medium text-gray-700">
                    Cargo
                  </label>
                  <div className="mt-1">
                    <input
                      id="cargo"
                      name="cargo"
                      type="text"
                      required
                      value={formData.cargo}
                      onChange={handleChange}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      placeholder="Seu cargo"
                    />
                  </div>
                </div>
              </>
            )}

            {formData.tipoUsuario === 'ADMINISTRADOR' && (
              <div>
                <label htmlFor="nivelAcesso" className="block text-sm font-medium text-gray-700">
                  Nível de acesso
                </label>
                <div className="mt-1">
                  <select
                    id="nivelAcesso"
                    name="nivelAcesso"
                    value={formData.nivelAcesso}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  >
                    <option value="">Selecione o nível</option>
                    <option value="BASICO">Básico</option>
                    <option value="AVANCADO">Avançado</option>
                    <option value="SUPER">Super</option>
                  </select>
                </div>
              </div>
            )}

            <div>
              <label htmlFor="senha" className="block text-sm font-medium text-gray-700">
                Senha
              </label>
              <div className="mt-1 relative">
                <input
                  id="senha"
                  name="senha"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.senha}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 pr-10 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  placeholder="Sua senha"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirmarSenha" className="block text-sm font-medium text-gray-700">
                Confirmar senha
              </label>
              <div className="mt-1">
                <input
                  id="confirmarSenha"
                  name="confirmarSenha"
                  type="password"
                  required
                  value={formData.confirmarSenha}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  placeholder="Confirme sua senha"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  <>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Criar Conta
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
