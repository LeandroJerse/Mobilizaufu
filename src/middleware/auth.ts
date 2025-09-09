import { Request, Response, NextFunction } from 'express'
import { verifyToken } from '@/utils/auth'
import { ApiResponse } from '@/types'

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1] // Bearer TOKEN

  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Token de acesso necessário',
    } as ApiResponse)
  }

  const decoded = verifyToken(token)
  if (!decoded) {
    return res.status(403).json({
      success: false,
      error: 'Token inválido ou expirado',
    } as ApiResponse)
  }

  ;(req as any).userId = decoded.userId
  next()
}

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  // Esta função seria implementada para verificar se o usuário é administrador
  // Por enquanto, vamos apenas chamar o next()
  next()
}
