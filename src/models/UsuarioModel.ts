import { prisma } from '@/lib/prisma'
import { Usuario, RegisterRequest } from '@/types'
import { hashPassword, verifyPassword } from '@/utils/auth'

export class UsuarioModel {
  static async create(data: RegisterRequest): Promise<Usuario> {
    const hashedPassword = await hashPassword(data.senha)
    
    return prisma.usuario.create({
      data: {
        ...data,
        senha: hashedPassword,
      },
    })
  }

  static async findByEmail(email: string): Promise<Usuario | null> {
    return prisma.usuario.findUnique({
      where: { email },
    })
  }

  static async findById(id: string): Promise<Usuario | null> {
    return prisma.usuario.findUnique({
      where: { id },
    })
  }

  static async authenticate(email: string, senha: string): Promise<Usuario | null> {
    const user = await this.findByEmail(email)
    if (!user) return null

    const isValid = await verifyPassword(senha, (user as unknown as { senha: string }).senha)
    return isValid ? user : null
  }

  static async update(id: string, data: Partial<Usuario>): Promise<Usuario> {
    return prisma.usuario.update({
      where: { id },
      data,
    })
  }

  static async delete(id: string): Promise<void> {
    await prisma.usuario.delete({
      where: { id },
    })
  }

  static async list(): Promise<Usuario[]> {
    return prisma.usuario.findMany({
      orderBy: { createdAt: 'desc' },
    })
  }
}
