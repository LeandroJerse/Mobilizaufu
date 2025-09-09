import { prisma } from '@/lib/prisma'
import { Bicicleta } from '@/types'

export class BicicletaModel {
  static async create(data: {
    numeroSerie: string
    estacaoId: string
    status?: 'DISPONIVEL' | 'EM_USO' | 'MANUTENCAO' | 'INDISPONIVEL'
  }): Promise<Bicicleta> {
    const bicicleta = await prisma.bicicleta.create({
      data: {
        ...data,
        status: data.status || 'DISPONIVEL',
      },
      include: {
        estacao: true,
      },
    })
    
    return {
      ...bicicleta,
      status: bicicleta.status as 'DISPONIVEL' | 'EM_USO' | 'MANUTENCAO' | 'INDISPONIVEL'
    }
  }

  static async findById(id: string): Promise<Bicicleta | null> {
    const bicicleta = await prisma.bicicleta.findUnique({
      where: { id },
      include: {
        estacao: true,
      },
    })
    
    if (!bicicleta) return null
    
    return {
      ...bicicleta,
      status: bicicleta.status as 'DISPONIVEL' | 'EM_USO' | 'MANUTENCAO' | 'INDISPONIVEL'
    }
  }

  static async findByNumeroSerie(numeroSerie: string): Promise<Bicicleta | null> {
    const bicicleta = await prisma.bicicleta.findUnique({
      where: { numeroSerie },
      include: {
        estacao: true,
      },
    })
    
    if (!bicicleta) return null
    
    return {
      ...bicicleta,
      status: bicicleta.status as 'DISPONIVEL' | 'EM_USO' | 'MANUTENCAO' | 'INDISPONIVEL'
    }
  }

  static async findByEstacao(estacaoId: string): Promise<Bicicleta[]> {
    const bicicletas = await prisma.bicicleta.findMany({
      where: { estacaoId },
      include: {
        estacao: true,
      },
    })
    
    return bicicletas.map(bicicleta => ({
      ...bicicleta,
      status: bicicleta.status as 'DISPONIVEL' | 'EM_USO' | 'MANUTENCAO' | 'INDISPONIVEL'
    }))
  }

  static async findDisponiveis(estacaoId?: string): Promise<Bicicleta[]> {
    const bicicletas = await prisma.bicicleta.findMany({
      where: {
        status: 'DISPONIVEL',
        ...(estacaoId && { estacaoId }),
      },
      include: {
        estacao: true,
      },
    })
    
    return bicicletas.map(bicicleta => ({
      ...bicicleta,
      status: bicicleta.status as 'DISPONIVEL' | 'EM_USO' | 'MANUTENCAO' | 'INDISPONIVEL'
    }))
  }

  static async update(id: string, data: {
    numeroSerie?: string
    status?: 'DISPONIVEL' | 'EM_USO' | 'MANUTENCAO' | 'INDISPONIVEL'
    dataUltimaManutencao?: Date | null
    estacaoId?: string
  }): Promise<Bicicleta> {
    const bicicleta = await prisma.bicicleta.update({
      where: { id },
      data,
      include: {
        estacao: true,
      },
    })
    
    return {
      ...bicicleta,
      status: bicicleta.status as 'DISPONIVEL' | 'EM_USO' | 'MANUTENCAO' | 'INDISPONIVEL'
    }
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
    const bicicletas = await prisma.bicicleta.findMany({
      include: {
        estacao: true,
      },
      orderBy: { createdAt: 'desc' },
    })
    
    return bicicletas.map(bicicleta => ({
      ...bicicleta,
      status: bicicleta.status as 'DISPONIVEL' | 'EM_USO' | 'MANUTENCAO' | 'INDISPONIVEL'
    }))
  }
}