import { NextRequest, NextResponse } from 'next/server'
import { BicicletaModel } from '@/models/BicicletaModel'
import { ApiResponse } from '@/types'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const estacaoId = searchParams.get('estacaoId')
    
    let bicicletas
    if (estacaoId) {
      bicicletas = await BicicletaModel.findByEstacao(estacaoId)
    } else {
      bicicletas = await BicicletaModel.findDisponiveis()
    }

    return NextResponse.json({
      success: true,
      data: bicicletas,
      message: 'Bicicletas listadas com sucesso',
    } as ApiResponse)
  } catch {
    return NextResponse.json({
      success: false,
      error: 'Erro interno do servidor'
    } as ApiResponse, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const { numeroSerie, estacaoId, status } = await req.json()

    if (!numeroSerie || !estacaoId) {
      return NextResponse.json({
        success: false,
        error: 'Número de série e ID da estação são obrigatórios',
      } as ApiResponse, { status: 400 })
    }

    const bicicleta = await BicicletaModel.create({
      numeroSerie,
      estacaoId,
      status,
    })

    return NextResponse.json({
      success: true,
      data: bicicleta,
      message: 'Bicicleta criada com sucesso',
    } as ApiResponse, { status: 201 })
  } catch {
    return NextResponse.json({
      success: false,
      error: 'Erro interno do servidor'
    } as ApiResponse, { status: 500 })
  }
}