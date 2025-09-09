import { Request, Response } from 'express'
import { UsuarioModel } from '@/models/UsuarioModel'
import { generateToken } from '@/utils/auth'
import { LoginRequest, RegisterRequest, ApiResponse } from '@/types'

export class AuthController {
  static async login(req: Request, res: Response) {
    try {
      const { email, senha }: LoginRequest = req.body

      if (!email || !senha) {
        return res.status(400).json({
          success: false,
          error: 'Email e senha são obrigatórios',
        } as ApiResponse)
      }

      const user = await UsuarioModel.authenticate(email, senha)
      
      if (!user) {
        return res.status(401).json({
          success: false,
          error: 'Credenciais inválidas',
        } as ApiResponse)
      }

      const token = generateToken(user.id)

      res.json({
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
    } catch (error) {
      console.error('Erro no login:', error)
      res.status(500).json({
        success: false,
        error: 'Erro interno do servidor',
      } as ApiResponse)
    }
  }

  static async register(req: Request, res: Response) {
    try {
      const userData: RegisterRequest = req.body

      // Validar campos obrigatórios
      if (!userData.nome || !userData.email || !userData.senha || !userData.tipoUsuario) {
        return res.status(400).json({
          success: false,
          error: 'Nome, email, senha e tipo de usuário são obrigatórios',
        } as ApiResponse)
      }

      // Verificar se usuário já existe
      const existingUser = await UsuarioModel.findByEmail(userData.email)
      if (existingUser) {
        return res.status(409).json({
          success: false,
          error: 'Usuário já cadastrado com este email',
        } as ApiResponse)
      }

      // Validar campos específicos por tipo de usuário
      if (userData.tipoUsuario === 'ESTUDANTE' && (!userData.matricula || !userData.periodo)) {
        return res.status(400).json({
          success: false,
          error: 'Matrícula e período são obrigatórios para estudantes',
        } as ApiResponse)
      }

      if (userData.tipoUsuario === 'PROFESSOR_FUNCIONARIO' && (!userData.siape || !userData.cargo)) {
        return res.status(400).json({
          success: false,
          error: 'SIAPE e cargo são obrigatórios para professores/funcionários',
        } as ApiResponse)
      }

      if (userData.tipoUsuario === 'ADMINISTRADOR' && !userData.nivelAcesso) {
        return res.status(400).json({
          success: false,
          error: 'Nível de acesso é obrigatório para administradores',
        } as ApiResponse)
      }

      const user = await UsuarioModel.create(userData)
      const token = generateToken(user.id)

      res.status(201).json({
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
      } as ApiResponse)
    } catch (error) {
      console.error('Erro no cadastro:', error)
      res.status(500).json({
        success: false,
        error: 'Erro interno do servidor',
      } as ApiResponse)
    }
  }

  static async getProfile(req: Request, res: Response) {
    try {
      const userId = (req as any).userId

      const user = await UsuarioModel.findById(userId)
      
      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'Usuário não encontrado',
        } as ApiResponse)
      }

      res.json({
        success: true,
        data: {
          id: user.id,
          nome: user.nome,
          email: user.email,
          tipoUsuario: user.tipoUsuario,
          telefone: user.telefone,
          cursoDepartamento: user.cursoDepartamento,
          matricula: user.matricula,
          periodo: user.periodo,
          siape: user.siape,
          cargo: user.cargo,
          nivelAcesso: user.nivelAcesso,
        },
      } as ApiResponse)
    } catch (error) {
      console.error('Erro ao buscar perfil:', error)
      res.status(500).json({
        success: false,
        error: 'Erro interno do servidor',
      } as ApiResponse)
    }
  }
}
