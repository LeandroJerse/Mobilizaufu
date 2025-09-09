import { Request, Response } from 'express'
import { BicicletaModel } from '@/models/BicicletaModel'
import { EstacaoModel } from '@/models/EstacaoModel'
import { ReservaModel } from '@/models/ReservaModel'
import { ApiResponse, ReservaRequest } from '@/types'

export class BicicletaController {
  static async listEstacoes(req: Request, res: Response) {
    try {
      const estacoes = await EstacaoModel.getEstacoesComBicicletas()

      res.json({
        success: true,
        data: estacoes,
        message: 'Estações listadas com sucesso',
      } as ApiResponse)
    } catch (error) {
      console.error('Erro ao listar estações:', error)
      res.status(500).json({
        success: false,
        error: 'Erro interno do servidor',
      } as ApiResponse)
    }
  }

  static async listBicicletas(req: Request, res: Response) {
    try {
      const { estacaoId } = req.query
      
      let bicicletas
      if (estacaoId) {
        bicicletas = await BicicletaModel.findByEstacao(estacaoId as string)
      } else {
        bicicletas = await BicicletaModel.findDisponiveis()
      }

      res.json({
        success: true,
        data: bicicletas,
        message: 'Bicicletas listadas com sucesso',
      } as ApiResponse)
    } catch (error) {
      console.error('Erro ao listar bicicletas:', error)
      res.status(500).json({
        success: false,
        error: 'Erro interno do servidor',
      } as ApiResponse)
    }
  }

  static async reservarBicicleta(req: Request, res: Response) {
    try {
      const userId = (req as any).userId
      const { bicicletaId, estacaoId }: ReservaRequest = req.body

      if (!bicicletaId || !estacaoId) {
        return res.status(400).json({
          success: false,
          error: 'ID da bicicleta e estação são obrigatórios',
        } as ApiResponse)
      }

      // Verificar se a bicicleta existe e está disponível
      const bicicleta = await BicicletaModel.findById(bicicletaId)
      if (!bicicleta) {
        return res.status(404).json({
          success: false,
          error: 'Bicicleta não encontrada',
        } as ApiResponse)
      }

      if (bicicleta.status !== 'DISPONIVEL') {
        return res.status(400).json({
          success: false,
          error: 'Bicicleta não está disponível',
        } as ApiResponse)
      }

      // Verificar se o usuário já tem uma reserva ativa
      const reservasAtivas = await ReservaModel.findAtivas(userId)
      if (reservasAtivas.length > 0) {
        return res.status(400).json({
          success: false,
          error: 'Você já possui uma reserva ativa',
        } as ApiResponse)
      }

      // Criar reserva
      const reserva = await ReservaModel.create({
        usuarioId: userId,
        bicicletaId,
        estacaoId,
      })

      // Atualizar status da bicicleta
      await BicicletaModel.updateStatus(bicicletaId, 'EM_USO')

      res.status(201).json({
        success: true,
        data: reserva,
        message: 'Bicicleta reservada com sucesso',
      } as ApiResponse)
    } catch (error) {
      console.error('Erro ao reservar bicicleta:', error)
      res.status(500).json({
        success: false,
        error: 'Erro interno do servidor',
      } as ApiResponse)
    }
  }

  static async devolverBicicleta(req: Request, res: Response) {
    try {
      const userId = (req as any).userId
      const { reservaId, estacaoDevolucaoId } = req.body

      if (!reservaId || !estacaoDevolucaoId) {
        return res.status(400).json({
          success: false,
          error: 'ID da reserva e estação de devolução são obrigatórios',
        } as ApiResponse)
      }

      // Verificar se a reserva existe e pertence ao usuário
      const reserva = await ReservaModel.findById(reservaId)
      if (!reserva) {
        return res.status(404).json({
          success: false,
          error: 'Reserva não encontrada',
        } as ApiResponse)
      }

      if (reserva.usuarioId !== userId) {
        return res.status(403).json({
          success: false,
          error: 'Você não tem permissão para devolver esta bicicleta',
        } as ApiResponse)
      }

      if (reserva.status !== 'ATIVA') {
        return res.status(400).json({
          success: false,
          error: 'Esta reserva não está ativa',
        } as ApiResponse)
      }

      // Verificar se a estação de devolução existe
      const estacao = await EstacaoModel.findById(estacaoDevolucaoId)
      if (!estacao) {
        return res.status(404).json({
          success: false,
          error: 'Estação de devolução não encontrada',
        } as ApiResponse)
      }

      // Finalizar reserva
      const reservaFinalizada = await ReservaModel.finalizarReserva(reservaId, estacaoDevolucaoId)

      // Atualizar status da bicicleta para disponível
      await BicicletaModel.updateStatus(reserva.bicicletaId, 'DISPONIVEL')

      res.json({
        success: true,
        data: reservaFinalizada,
        message: 'Bicicleta devolvida com sucesso',
      } as ApiResponse)
    } catch (error) {
      console.error('Erro ao devolver bicicleta:', error)
      res.status(500).json({
        success: false,
        error: 'Erro interno do servidor',
      } as ApiResponse)
    }
  }

  static async getMinhasReservas(req: Request, res: Response) {
    try {
      const userId = (req as any).userId
      const reservas = await ReservaModel.findByUsuario(userId)

      res.json({
        success: true,
        data: reservas,
        message: 'Reservas listadas com sucesso',
      } as ApiResponse)
    } catch (error) {
      console.error('Erro ao listar reservas:', error)
      res.status(500).json({
        success: false,
        error: 'Erro interno do servidor',
      } as ApiResponse)
    }
  }

  // Métodos administrativos
  static async createBicicleta(req: Request, res: Response) {
    try {
      const { numeroSerie, estacaoId, status } = req.body

      if (!numeroSerie || !estacaoId) {
        return res.status(400).json({
          success: false,
          error: 'Número de série e ID da estação são obrigatórios',
        } as ApiResponse)
      }

      // Verificar se a estação existe
      const estacao = await EstacaoModel.findById(estacaoId)
      if (!estacao) {
        return res.status(404).json({
          success: false,
          error: 'Estação não encontrada',
        } as ApiResponse)
      }

      const bicicleta = await BicicletaModel.create({
        numeroSerie,
        estacaoId,
        status,
      })

      res.status(201).json({
        success: true,
        data: bicicleta,
        message: 'Bicicleta criada com sucesso',
      } as ApiResponse)
    } catch (error) {
      console.error('Erro ao criar bicicleta:', error)
      res.status(500).json({
        success: false,
        error: 'Erro interno do servidor',
      } as ApiResponse)
    }
  }

  static async updateBicicleta(req: Request, res: Response) {
    try {
      const { id } = req.params
      const updateData = req.body

      const bicicleta = await BicicletaModel.update(id, updateData)

      res.json({
        success: true,
        data: bicicleta,
        message: 'Bicicleta atualizada com sucesso',
      } as ApiResponse)
    } catch (error) {
      console.error('Erro ao atualizar bicicleta:', error)
      res.status(500).json({
        success: false,
        error: 'Erro interno do servidor',
      } as ApiResponse)
    }
  }

  static async deleteBicicleta(req: Request, res: Response) {
    try {
      const { id } = req.params

      await BicicletaModel.delete(id)

      res.json({
        success: true,
        message: 'Bicicleta removida com sucesso',
      } as ApiResponse)
    } catch (error) {
      console.error('Erro ao remover bicicleta:', error)
      res.status(500).json({
        success: false,
        error: 'Erro interno do servidor',
      } as ApiResponse)
    }
  }
}
