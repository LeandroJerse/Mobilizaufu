import { prisma } from '@/lib/prisma'
import { Reserva } from '@/types'
import QRCode from 'qrcode'

export class ReservaModel {
  static async create(data: {
    usuarioId: string
    bicicletaId: string
    estacaoId: string
  }): Promise<Reserva> {
    // Gerar código QR único
    const codigoQR = await QRCode.toDataURL(`${data.usuarioId}-${data.bicicletaId}-${Date.now()}`)
    
    return prisma.reserva.create({
      data: {
        ...data,
        codigoQR,
        status: 'ATIVA',
      },
      include: {
        usuario: true,
        bicicleta: {
          include: {
            estacao: true,
          },
        },
        estacaoDevolucao: true,
      },
    })
  }

  static async findById(id: string): Promise<Reserva | null> {
    return prisma.reserva.findUnique({
      where: { id },
      include: {
        usuario: true,
        bicicleta: {
          include: {
            estacao: true,
          },
        },
        estacaoDevolucao: true,
      },
    })
  }

  static async findByUsuario(usuarioId: string): Promise<Reserva[]> {
    return prisma.reserva.findMany({
      where: { usuarioId },
      include: {
        usuario: true,
        bicicleta: {
          include: {
            estacao: true,
          },
        },
        estacaoDevolucao: true,
      },
      orderBy: { createdAt: 'desc' },
    })
  }

  static async findByBicicleta(bicicletaId: string): Promise<Reserva[]> {
    return prisma.reserva.findMany({
      where: { bicicletaId },
      include: {
        usuario: true,
        bicicleta: {
          include: {
            estacao: true,
          },
        },
        estacaoDevolucao: true,
      },
      orderBy: { createdAt: 'desc' },
    })
  }

  static async findAtivas(usuarioId?: string): Promise<Reserva[]> {
    return prisma.reserva.findMany({
      where: {
        status: 'ATIVA',
        ...(usuarioId && { usuarioId }),
      },
      include: {
        usuario: true,
        bicicleta: {
          include: {
            estacao: true,
          },
        },
        estacaoDevolucao: true,
      },
      orderBy: { createdAt: 'desc' },
    })
  }

  static async update(id: string, data: Partial<Reserva>): Promise<Reserva> {
    return prisma.reserva.update({
      where: { id },
      data,
      include: {
        usuario: true,
        bicicleta: {
          include: {
            estacao: true,
          },
        },
        estacaoDevolucao: true,
      },
    })
  }

  static async finalizarReserva(id: string, estacaoDevolucaoId: string): Promise<Reserva> {
    return this.update(id, {
      status: 'CONCLUIDA',
      dataHoraDevolucao: new Date(),
      estacaoDevolucaoId,
    })
  }

  static async cancelarReserva(id: string): Promise<Reserva> {
    return this.update(id, {
      status: 'CANCELADA',
    })
  }

  static async expirarReservas(): Promise<void> {
    const quinzeMinutosAtras = new Date(Date.now() - 15 * 60 * 1000)
    
    await prisma.reserva.updateMany({
      where: {
        status: 'ATIVA',
        dataHoraReserva: {
          lt: quinzeMinutosAtras,
        },
      },
      data: {
        status: 'EXPIRADA',
      },
    })
  }

  static async list(): Promise<Reserva[]> {
    return prisma.reserva.findMany({
      include: {
        usuario: true,
        bicicleta: {
          include: {
            estacao: true,
          },
        },
        estacaoDevolucao: true,
      },
      orderBy: { createdAt: 'desc' },
    })
  }
}
