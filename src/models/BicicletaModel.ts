import { prisma } from '@/lib/prisma'
import { Bicicleta } from '@/types'

export class BicicletaModel {
  static async create(data: {
    numeroSerie: string
    estacaoId: string
    status?: 'DISPONIVEL' | 'EM_USO' | 'MANUTENCAO' | 'INDISPONIVEL'
  }): Promise<Bicicleta> {
    return prisma.bicicleta.create({
      data: {
        ...data,
        status: data.status || 'DISPONIVEL',
      },
      include: {
        estacao: true,
      },
    })
  }

  static async findById(id: string): Promise<Bicicleta | null> {
    return prisma.bicicleta.findUnique({
      where: { id },
      include: {
        estacao: true,
      },
    })
  }

  static async findByNumeroSerie(numeroSerie: string): Promise<Bicicleta | null> {
    return prisma.bicicleta.findUnique({
      where: { numeroSerie },
      include: {
        estacao: true,
      },
    })
  }

  static async findByEstacao(estacaoId: string): Promise<Bicicleta[]> {
    return prisma.bicicleta.findMany({
      where: { estacaoId },
      include: {
        estacao: true,
      },
    })
  }

  static async findDisponiveis(estacaoId?: string): Promise<Bicicleta[]> {
    return prisma.bicicleta.findMany({
      where: {
        status: 'DISPONIVEL',
        ...(estacaoId && { estacaoId }),
      },
      include: {
        estacao: true,
      },
    })
  }

  static async update(id: string, data: Partial<Bicicleta>): Promise<Bicicleta> {
    return prisma.bicicleta.update({
      where: { id },
      data,
      include: {
        estacao: true,
      },
    })
  }

  static async updateStatus(id: string, status: 'DISPONIVEL' | 'EM_USO' | 'MANUTENCAO' | 'INDISPONIVEL'): Promise<Bicicleta> {
    return this.update(id, { status })
  }

  static async delete(id: string): Promise<void> {
    await prisma.bicicleta.delete({
      where: { id },
    })
  }

  static async list(): Promise<Bicicleta[]> {
    return prisma.bicicleta.findMany({
      include: {
        estacao: true,
      },
      orderBy: { createdAt: 'desc' },
    })
  }
}
