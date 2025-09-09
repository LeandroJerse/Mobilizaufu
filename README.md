# MobilizaUFU - Plataforma de Mobilidade Sustentável

## 📋 Sobre o Projeto

O **MobilizaUFU** é uma plataforma web desenvolvida para promover a mobilidade sustentável no campus da Universidade Federal de Uberlândia (UFU). A aplicação integra compartilhamento de bicicletas, organização de caronas e consulta de horários de transporte público, incentivando estudantes, professores e funcionários a adotarem opções de transporte ecológicas.

## 🎯 Objetivos

- Reduzir a pegada de carbono no campus
- Aliviar o congestionamento de veículos
- Facilitar o acesso a meios de transporte sustentáveis
- Promover a conscientização ambiental

## 🚀 Funcionalidades

### ✅ Implementadas

- **Sistema de Autenticação**
  - Login e cadastro de usuários
  - Diferentes tipos de usuário (Estudante, Professor/Funcionário, Administrador)
  - Validação de credenciais

- **Sistema de Bicicletas Compartilhadas**
  - Visualização de estações e bicicletas disponíveis
  - Reserva de bicicletas com geração de QR code
  - Sistema de devolução em qualquer estação

- **Sistema de Caronas**
  - Oferecer caronas
  - Buscar caronas disponíveis
  - Gerenciamento de vagas e horários

- **Consulta de Horários de Ônibus**
  - Visualização de horários em tempo real
  - Status de atrasos e adiantamentos
  - Filtros por ponto de parada

- **Dashboard de Impacto Ambiental**
  - Métricas de CO2 economizado
  - Histórico de viagens
  - Ranking entre usuários

- **Painel Administrativo**
  - Gerenciamento de bicicletas e estações
  - Controle de status e manutenção

## 🛠️ Tecnologias Utilizadas

### Frontend
- **Next.js 15** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Lucide React** - Ícones

### Backend
- **Node.js** - Runtime JavaScript
- **Prisma** - ORM para banco de dados
- **SQLite** - Banco de dados (desenvolvimento)
- **JWT** - Autenticação
- **bcryptjs** - Criptografia de senhas

### Padrão Arquitetural
- **MVC (Model-View-Controller)**
  - **Models**: Entidades do banco de dados
  - **Views**: Componentes React/Next.js
  - **Controllers**: Lógica de negócio e APIs

## 📁 Estrutura do Projeto

```
mobilizaufu/
├── src/
│   ├── app/                    # Páginas Next.js (App Router)
│   │   ├── api/               # API Routes
│   │   ├── dashboard/         # Dashboard principal
│   │   ├── bicicletas/        # Sistema de bicicletas
│   │   ├── caronas/           # Sistema de caronas
│   │   ├── onibus/            # Horários de ônibus
│   │   └── impacto/           # Dashboard de impacto
│   ├── controllers/           # Controladores (MVC)
│   ├── models/                # Modelos (MVC)
│   ├── middleware/            # Middlewares de autenticação
│   ├── types/                 # Definições TypeScript
│   ├── utils/                 # Utilitários
│   └── lib/                   # Configurações (Prisma)
├── prisma/
│   └── schema.prisma          # Schema do banco de dados
├── scripts/
│   └── seed.ts               # Script de população do banco
└── README.md
```

## 🗄️ Modelo de Dados

### Entidades Principais

- **Usuario**: Usuários do sistema (estudantes, professores, administradores)
- **Estacao**: Estações de bicicletas no campus
- **Bicicleta**: Bicicletas compartilhadas
- **Reserva**: Reservas de bicicletas
- **Carona**: Caronas oferecidas
- **ParticipacaoCarona**: Participações em caronas
- **LinhaOnibus**: Linhas de ônibus
- **PontoParada**: Pontos de parada
- **HorarioOnibus**: Horários de ônibus
- **ImpactoAmbiental**: Dados de impacto ambiental

## 🚀 Como Executar

### Pré-requisitos

- Node.js 18+ 
- npm ou yarn

### Instalação

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd mobilizaufu
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
```bash
cp config.env .env
```

4. **Configure o banco de dados**
```bash
npm run db:push
npm run db:seed
```

5. **Execute o projeto**
```bash
npm run dev
```

6. **Acesse a aplicação**
```
http://localhost:3000
```

### Scripts Disponíveis

- `npm run dev` - Executa em modo desenvolvimento
- `npm run build` - Gera build de produção
- `npm run start` - Executa build de produção
- `npm run db:push` - Sincroniza schema com banco
- `npm run db:seed` - Popula banco com dados de exemplo
- `npm run db:reset` - Reseta e popula banco

## 👥 Usuários de Exemplo

### Administrador
- **Email**: admin@ufu.br
- **Senha**: 123456

### Estudante
- **Email**: ana.clara@ufu.br
- **Senha**: 123456

### Professor
- **Email**: carlos.mendes@ufu.br
- **Senha**: 123456

## 📱 Funcionalidades por Tipo de Usuário

### Estudante
- Reservar bicicletas
- Oferecer/buscar caronas
- Consultar horários de ônibus
- Visualizar impacto ambiental

### Professor/Funcionário
- Reservar bicicletas
- Oferecer/buscar caronas
- Consultar horários de ônibus
- Visualizar impacto ambiental

### Administrador
- Todas as funcionalidades anteriores
- Gerenciar bicicletas e estações
- Painel administrativo

## 🎨 Interface do Usuário

### Páginas Principais

1. **Home** (`/`) - Landing page com apresentação do projeto
2. **Login** (`/login`) - Autenticação de usuários
3. **Cadastro** (`/register`) - Registro de novos usuários
4. **Dashboard** (`/dashboard`) - Painel principal pós-login
5. **Bicicletas** (`/bicicletas`) - Sistema de reserva de bicicletas
6. **Caronas** (`/caronas`) - Sistema de caronas
7. **Ônibus** (`/onibus`) - Consulta de horários
8. **Impacto** (`/impacto`) - Dashboard de impacto ambiental

### Design System

- **Cores**: Verde (sustentabilidade), Azul (confiança), Amarelo (transporte público)
- **Tipografia**: Sistema de fontes do Tailwind CSS
- **Componentes**: Reutilizáveis e responsivos
- **Ícones**: Lucide React para consistência visual

## 🔒 Segurança

- Autenticação JWT
- Senhas criptografadas com bcrypt
- Validação de dados de entrada
- Middleware de autenticação
- Controle de acesso por tipo de usuário

## 📊 Métricas de Impacto

O sistema calcula automaticamente:
- CO2 economizado por viagem
- Distância percorrida
- Número de viagens por tipo de transporte
- Ranking entre usuários

## 🚧 Próximas Funcionalidades

- [ ] Integração com APIs reais de transporte público
- [ ] Notificações push
- [ ] Sistema de gamificação
- [ ] Relatórios administrativos
- [ ] App mobile
- [ ] Integração com pagamentos

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto foi desenvolvido como trabalho acadêmico para a disciplina de Engenharia de Software da UFU.

## 👨‍💻 Desenvolvedores

- **Matheus Medrado Ferreira** - 12311BCC054
- **Giovana M Ferreira** - 1221bcc033  
- **Leandro Marques Gontijo Jersé** - 12311BCC044

## 📞 Contato

Para dúvidas ou sugestões, entre em contato através do email: ufumobiliza@gmail.com

---

**MobilizaUFU** - Promovendo mobilidade sustentável na UFU! 🌱🚴‍♀️🚌