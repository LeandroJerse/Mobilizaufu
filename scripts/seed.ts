import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...')

  // Criar usuários de exemplo
  const hashedPassword = await bcrypt.hash('123456', 12)

  const admin = await prisma.usuario.upsert({
    where: { email: 'admin@ufu.br' },
    update: {},
    create: {
      nome: 'Administrador Sistema',
      email: 'admin@ufu.br',
      senha: hashedPassword,
      tipoUsuario: 'ADMINISTRADOR',
      nivelAcesso: 'SUPER',
    },
  })

  const estudante = await prisma.usuario.upsert({
    where: { email: 'ana.clara@ufu.br' },
    update: {},
    create: {
      nome: 'Ana Clara Silva',
      email: 'ana.clara@ufu.br',
      senha: hashedPassword,
      tipoUsuario: 'ESTUDANTE',
      matricula: '123456789',
      periodo: '5º período',
      cursoDepartamento: 'Engenharia de Software',
    },
  })

  const professor = await prisma.usuario.upsert({
    where: { email: 'carlos.mendes@ufu.br' },
    update: {},
    create: {
      nome: 'Prof. Carlos Mendes',
      email: 'carlos.mendes@ufu.br',
      senha: hashedPassword,
      tipoUsuario: 'PROFESSOR_FUNCIONARIO',
      siape: '1234567',
      cargo: 'Professor',
    },
  })

  console.log('✅ Usuários criados')

  // Criar estações
  const estacao1 = await prisma.estacao.upsert({
    where: { id: 'estacao-1' },
    update: {},
    create: {
      id: 'estacao-1',
      nome: 'Estação Central',
      localizacaoLat: -18.9186,
      localizacaoLng: -48.2772,
      capacidadeTotal: 20,
    },
  })

  const estacao2 = await prisma.estacao.upsert({
    where: { id: 'estacao-2' },
    update: {},
    create: {
      id: 'estacao-2',
      nome: 'Estação Biblioteca',
      localizacaoLat: -18.9200,
      localizacaoLng: -48.2750,
      capacidadeTotal: 15,
    },
  })

  const estacao3 = await prisma.estacao.upsert({
    where: { id: 'estacao-3' },
    update: {},
    create: {
      id: 'estacao-3',
      nome: 'Estação Restaurante',
      localizacaoLat: -18.9170,
      localizacaoLng: -48.2790,
      capacidadeTotal: 10,
    },
  })

  console.log('✅ Estações criadas')

  // Criar bicicletas
  const bicicletas = []
  for (let i = 1; i <= 20; i++) {
    const estacaoId = i <= 10 ? 'estacao-1' : i <= 15 ? 'estacao-2' : 'estacao-3'
    const bicicleta = await prisma.bicicleta.upsert({
      where: { numeroSerie: `BIC-${i.toString().padStart(3, '0')}` },
      update: {},
      create: {
        numeroSerie: `BIC-${i.toString().padStart(3, '0')}`,
        status: 'DISPONIVEL',
        estacaoId,
      },
    })
    bicicletas.push(bicicleta)
  }

  console.log('✅ Bicicletas criadas')

  // Criar linhas de ônibus
  const linha1 = await prisma.linhaOnibus.upsert({
    where: { numeroLinha: '101' },
    update: {},
    create: {
      numeroLinha: '101',
      nome: 'Central - Campus',
      operadora: 'TransUberlândia',
    },
  })

  const linha2 = await prisma.linhaOnibus.upsert({
    where: { numeroLinha: '102' },
    update: {},
    create: {
      numeroLinha: '102',
      nome: 'Campus - Centro',
      operadora: 'TransUberlândia',
    },
  })

  console.log('✅ Linhas de ônibus criadas')

  // Criar pontos de parada
  const ponto1 = await prisma.pontoParada.upsert({
    where: { id: 'ponto-1' },
    update: {},
    create: {
      id: 'ponto-1',
      nome: 'Portão Principal UFU',
      localizacaoLat: -18.9186,
      localizacaoLng: -48.2772,
    },
  })

  const ponto2 = await prisma.pontoParada.upsert({
    where: { id: 'ponto-2' },
    update: {},
    create: {
      id: 'ponto-2',
      nome: 'Biblioteca Central',
      localizacaoLat: -18.9200,
      localizacaoLng: -48.2750,
    },
  })

  console.log('✅ Pontos de parada criados')

  // Criar horários de ônibus
  const horarios = []
  const hoje = new Date()
  hoje.setHours(0, 0, 0, 0)

  for (let i = 0; i < 24; i++) {
    const hora = i.toString().padStart(2, '0')
    const horario = await prisma.horarioOnibus.upsert({
      where: { 
        id: `horario-${linha1.id}-${ponto1.id}-${hora}` 
      },
      update: {},
      create: {
        id: `horario-${linha1.id}-${ponto1.id}-${hora}`,
        horarioPrevisto: `${hora}:00`,
        status: 'NO_PRAZO',
        data: hoje,
        linhaId: linha1.id,
        pontoId: ponto1.id,
      },
    })
    horarios.push(horario)
  }

  console.log('✅ Horários de ônibus criados')

  // Criar impacto ambiental de exemplo
  await prisma.impactoAmbiental.upsert({
    where: { id: 'impacto-1' },
    update: {},
    create: {
      id: 'impacto-1',
      tipoTransporte: 'BICICLETA',
      distanciaKm: 5.2,
      co2Economizado: 1.2,
      dataCalculo: new Date(),
      usuarioId: estudante.id,
    },
  })

  console.log('✅ Dados de exemplo criados')
  console.log('🎉 Seed concluído com sucesso!')
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
