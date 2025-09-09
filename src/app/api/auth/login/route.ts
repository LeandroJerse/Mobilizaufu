import { NextRequest, NextResponse } from 'next/server'
import { AuthController } from '@/controllers/AuthController'

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

    return await AuthController.login(mockReq, mockRes)
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Erro interno do servidor'
    }, { status: 500 })
  }
}
