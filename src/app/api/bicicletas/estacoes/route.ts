import { NextResponse } from 'next/server'
import { EstacaoModel } from '@/models/EstacaoModel'
import { ApiResponse } from '@/types'

export async function GET() {
  try {
    const estacoes = await EstacaoModel.getEstacoesComBicicletas()

    return NextResponse.json({
      success: true,
      data: estacoes,
      message: 'Estações listadas com sucesso',
    } as ApiResponse)
  } catch {
    return NextResponse.json({
      success: false,
      error: 'Erro interno do servidor'
    } as ApiResponse, { status: 500 })
  }
}