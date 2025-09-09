import { NextRequest, NextResponse } from 'next/server'
import { UsuarioModel } from '@/models/UsuarioModel'
import { generateToken } from '@/utils/auth'
import { LoginRequest, ApiResponse } from '@/types'

export async function POST(req: NextRequest) {
  try {
    const { email, senha }: LoginRequest = await req.json()

    if (!email || !senha) {
      return NextResponse.json({
        success: false,
        error: 'Email e senha são obrigatórios',
      } as ApiResponse, { status: 400 })
    }

    const user = await UsuarioModel.authenticate(email, senha)
    
    if (!user) {
      return NextResponse.json({
        success: false,
        error: 'Credenciais inválidas',
      } as ApiResponse, { status: 401 })
    }

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
      message: 'Login realizado com sucesso',
    } as ApiResponse)
  } catch {
    return NextResponse.json({
      success: false,
      error: 'Erro interno do servidor',
    } as ApiResponse, { status: 500 })
  }
}