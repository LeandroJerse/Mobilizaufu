import { NextRequest, NextResponse } from 'next/server'
import { BicicletaController } from '@/controllers/BicicletaController'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const estacaoId = searchParams.get('estacaoId')
    
    // Simular Request e Response do Express para usar o controller
    const mockReq = {
      query: { estacaoId }
    } as any
    const mockRes = {
      json: (data: any) => NextResponse.json(data)
    } as any

    return await BicicletaController.listBicicletas(mockReq, mockRes)
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Erro interno do servidor'
    }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    
    // Simular Request e Response do Express para usar o controller
    const mockReq = {
      body,
    } as any
    const mockRes = {
      status: (code: number) => ({
        json: (data: any) => NextResponse.json(data, { status: code })
      }),
      json: (data: any) => NextResponse.json(data)
    } as any

    return await BicicletaController.createBicicleta(mockReq, mockRes)
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Erro interno do servidor'
    }, { status: 500 })
  }
}
