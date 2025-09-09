import { NextRequest, NextResponse } from 'next/server'
import { BicicletaController } from '@/controllers/BicicletaController'

export async function GET(req: NextRequest) {
  try {
    // Simular Request e Response do Express para usar o controller
    const mockReq = {} as any
    const mockRes = {
      json: (data: any) => NextResponse.json(data)
    } as any

    return await BicicletaController.listEstacoes(mockReq, mockRes)
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Erro interno do servidor'
    }, { status: 500 })
  }
}
