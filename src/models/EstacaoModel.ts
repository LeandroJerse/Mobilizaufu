import { prisma } from '@/lib/prisma'
import { Estacao, Bicicleta } from '@/types'

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

  static async getEstacoesComBicicletas(): Promise<(Estacao & { bicicletas: Bicicleta[] })[]> {
    const estacoes = await prisma.estacao.findMany({
      include: {
        bicicletas: {
          where: {
            status: 'DISPONIVEL',
          },
        },
      },
      orderBy: { nome: 'asc' },
    })
    
    return estacoes.map(estacao => ({
      ...estacao,
      bicicletas: estacao.bicicletas.map(bicicleta => ({
        ...bicicleta,
        status: bicicleta.status as 'DISPONIVEL' | 'EM_USO' | 'MANUTENCAO' | 'INDISPONIVEL'
      }))
    }))
  }
}
