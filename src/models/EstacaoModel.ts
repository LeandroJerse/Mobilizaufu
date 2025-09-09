import { prisma } from '@/lib/prisma'
import { Estacao } from '@/types'

export class EstacaoModel {
  static async create(data: {
    nome: string
    localizacaoLat: number
    localizacaoLng: number
    capacidadeTotal: number
  }): Promise<Estacao> {
    return prisma.estacao.create({
      data,
    })
  }

  static async findById(id: string): Promise<Estacao | null> {
    return prisma.estacao.findUnique({
      where: { id },
    })
  }

  static async list(): Promise<Estacao[]> {
    return prisma.estacao.findMany({
      orderBy: { nome: 'asc' },
    })
  }

  static async update(id: string, data: Partial<Estacao>): Promise<Estacao> {
    return prisma.estacao.update({
      where: { id },
      data,
    })
  }

  static async delete(id: string): Promise<void> {
    await prisma.estacao.delete({
      where: { id },
    })
  }

  static async getEstacoesComBicicletas(): Promise<(Estacao & { bicicletas: any[] })[]> {
    return prisma.estacao.findMany({
      include: {
        bicicletas: {
          where: {
            status: 'DISPONIVEL',
          },
        },
      },
      orderBy: { nome: 'asc' },
    })
  }
}
