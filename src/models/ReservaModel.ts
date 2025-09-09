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
    
    const reserva = await prisma.reserva.create({
      data: {
        ...data,
        codigoQR,
        status: 'ATIVA',
      },
    })
    
    return {
      ...reserva,
      status: reserva.status as 'ATIVA' | 'CONCLUIDA' | 'CANCELADA' | 'EXPIRADA'
    }
  }

  static async findById(id: string): Promise<Reserva | null> {
    const reserva = await prisma.reserva.findUnique({
      where: { id },
    })
    
    if (!reserva) return null
    
    return {
      ...reserva,
      status: reserva.status as 'ATIVA' | 'CONCLUIDA' | 'CANCELADA' | 'EXPIRADA'
    }
  }

  static async findByUsuario(usuarioId: string): Promise<Reserva[]> {
    const reservas = await prisma.reserva.findMany({
      where: { usuarioId },
      orderBy: { createdAt: 'desc' },
    })
    
    return reservas.map(reserva => ({
      ...reserva,
      status: reserva.status as 'ATIVA' | 'CONCLUIDA' | 'CANCELADA' | 'EXPIRADA'
    }))
  }

  static async findByBicicleta(bicicletaId: string): Promise<Reserva[]> {
    const reservas = await prisma.reserva.findMany({
      where: { bicicletaId },
      orderBy: { createdAt: 'desc' },
    })
    
    return reservas.map(reserva => ({
      ...reserva,
      status: reserva.status as 'ATIVA' | 'CONCLUIDA' | 'CANCELADA' | 'EXPIRADA'
    }))
  }

  static async findAtivas(usuarioId?: string): Promise<Reserva[]> {
    const reservas = await prisma.reserva.findMany({
      where: {
        status: 'ATIVA',
        ...(usuarioId && { usuarioId }),
      },
      orderBy: { createdAt: 'desc' },
    })
    
    return reservas.map(reserva => ({
      ...reserva,
      status: reserva.status as 'ATIVA' | 'CONCLUIDA' | 'CANCELADA' | 'EXPIRADA'
    }))
  }

  static async update(id: string, data: {
    dataHoraRetirada?: Date | null
    dataHoraDevolucao?: Date | null
    codigoQR?: string | null
    status?: 'ATIVA' | 'CONCLUIDA' | 'CANCELADA' | 'EXPIRADA'
    estacaoDevolucaoId?: string | null
  }): Promise<Reserva> {
    const reserva = await prisma.reserva.update({
      where: { id },
      data,
    })
    
    return {
      ...reserva,
      status: reserva.status as 'ATIVA' | 'CONCLUIDA' | 'CANCELADA' | 'EXPIRADA'
    }
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
    const reservas = await prisma.reserva.findMany({
      orderBy: { createdAt: 'desc' },
    })
    
    return reservas.map(reserva => ({
      ...reserva,
      status: reserva.status as 'ATIVA' | 'CONCLUIDA' | 'CANCELADA' | 'EXPIRADA'
    }))
  }
}