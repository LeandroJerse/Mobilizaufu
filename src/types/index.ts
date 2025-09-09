export interface Usuario {
  id: string;
  nome: string;
  email: string;
  tipoUsuario: 'ESTUDANTE' | 'PROFESSOR_FUNCIONARIO' | 'ADMINISTRADOR';
  telefone?: string;
  cursoDepartamento?: string;
  matricula?: string;
  periodo?: string;
  siape?: string;
  cargo?: string;
  nivelAcesso?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Estacao {
  id: string;
  nome: string;
  localizacaoLat: number;
  localizacaoLng: number;
  capacidadeTotal: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Bicicleta {
  id: string;
  numeroSerie: string;
  status: 'DISPONIVEL' | 'EM_USO' | 'MANUTENCAO' | 'INDISPONIVEL';
  dataUltimaManutencao?: Date;
  estacaoId: string;
  estacao?: Estacao;
  createdAt: Date;
  updatedAt: Date;
}

export interface Reserva {
  id: string;
  dataHoraReserva: Date;
  dataHoraRetirada?: Date;
  dataHoraDevolucao?: Date;
  codigoQR?: string;
  status: 'ATIVA' | 'CONCLUIDA' | 'CANCELADA' | 'EXPIRADA';
  usuarioId: string;
  usuario?: Usuario;
  bicicletaId: string;
  bicicleta?: Bicicleta;
  estacaoDevolucaoId?: string;
  estacaoDevolucao?: Estacao;
  createdAt: Date;
  updatedAt: Date;
}

export interface Carona {
  id: string;
  origem: string;
  destino: string;
  dataHora: Date;
  vagasDisponiveis: number;
  observacoes?: string;
  status: 'ATIVA' | 'CONCLUIDA' | 'CANCELADA';
  usuarioOfereceId: string;
  usuarioOferece?: Usuario;
  createdAt: Date;
  updatedAt: Date;
}

export interface ParticipacaoCarona {
  id: string;
  statusParticipacao: 'PENDENTE' | 'ACEITA' | 'RECUSADA' | 'CANCELADA';
  caronaId: string;
  carona?: Carona;
  usuarioParticipaId: string;
  usuarioParticipa?: Usuario;
  createdAt: Date;
  updatedAt: Date;
}

export interface LinhaOnibus {
  id: string;
  numeroLinha: string;
  nome: string;
  operadora: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PontoParada {
  id: string;
  nome: string;
  localizacaoLat: number;
  localizacaoLng: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface HorarioOnibus {
  id: string;
  horarioPrevisto: string;
  horarioReal?: string;
  status: 'NO_PRAZO' | 'ATRASADO' | 'ADIANTADO' | 'CANCELADO';
  data: Date;
  linhaId: string;
  linha?: LinhaOnibus;
  pontoId: string;
  ponto?: PontoParada;
  createdAt: Date;
  updatedAt: Date;
}

export interface ImpactoAmbiental {
  id: string;
  tipoTransporte: 'BICICLETA' | 'CARONA' | 'ONIBUS';
  distanciaKm: number;
  co2Economizado: number;
  dataCalculo: Date;
  usuarioId: string;
  usuario?: Usuario;
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginRequest {
  email: string;
  senha: string;
}

export interface RegisterRequest {
  nome: string;
  email: string;
  senha: string;
  tipoUsuario: 'ESTUDANTE' | 'PROFESSOR_FUNCIONARIO' | 'ADMINISTRADOR';
  telefone?: string;
  cursoDepartamento?: string;
  matricula?: string;
  periodo?: string;
  siape?: string;
  cargo?: string;
  nivelAcesso?: string;
}

export interface ReservaRequest {
  bicicletaId: string;
  estacaoId: string;
}

export interface CaronaRequest {
  origem: string;
  destino: string;
  dataHora: string;
  vagasDisponiveis: number;
  observacoes?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
