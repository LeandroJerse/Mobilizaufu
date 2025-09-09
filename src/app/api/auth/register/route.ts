import { NextRequest, NextResponse } from 'next/server'
import { UsuarioModel } from '@/models/UsuarioModel'
import { generateToken } from '@/utils/auth'
import { RegisterRequest, ApiResponse } from '@/types'

export async function POST(req: NextRequest) {
  try {
    const userData: RegisterRequest = await req.json()

    // Validar campos obrigatórios
    if (!userData.nome || !userData.email || !userData.senha || !userData.tipoUsuario) {
      return NextResponse.json({
        success: false,
        error: 'Nome, email, senha e tipo de usuário são obrigatórios',
      } as ApiResponse, { status: 400 })
    }

    // Verificar se usuário já existe
    const existingUser = await UsuarioModel.findByEmail(userData.email)
    if (existingUser) {
      return NextResponse.json({
        success: false,
        error: 'Usuário já cadastrado com este email',
      } as ApiResponse, { status: 409 })
    }

    // Validar campos específicos por tipo de usuário
    if (userData.tipoUsuario === 'ESTUDANTE' && (!userData.matricula || !userData.periodo)) {
      return NextResponse.json({
        success: false,
        error: 'Matrícula e período são obrigatórios para estudantes',
      } as ApiResponse, { status: 400 })
    }

    if (userData.tipoUsuario === 'PROFESSOR_FUNCIONARIO' && (!userData.siape || !userData.cargo)) {
      return NextResponse.json({
        success: false,
        error: 'SIAPE e cargo são obrigatórios para professores/funcionários',
      } as ApiResponse, { status: 400 })
    }

    if (userData.tipoUsuario === 'ADMINISTRADOR' && !userData.nivelAcesso) {
      return NextResponse.json({
        success: false,
        error: 'Nível de acesso é obrigatório para administradores',
      } as ApiResponse, { status: 400 })
    }

    const user = await UsuarioModel.create(userData)
    const token = generateToken(user.id)

    return NextResponse.json({
      success: true,
      data: {
        user: {
          id: user.id,
          nome: user.nome,
          email: user.email,
          tipoUsuario: user.tipoUsuario,
        },
        token,
      },
      message: 'Usuário cadastrado com sucesso',
    } as ApiResponse, { status: 201 })
  } catch {
    return NextResponse.json({
      success: false,
      error: 'Erro interno do servidor',
    } as ApiResponse, { status: 500 })
  }
}