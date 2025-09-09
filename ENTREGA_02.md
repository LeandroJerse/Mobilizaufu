# ENTREGA 02 - PROJETO DE ENGENHARIA DE SOFTWARE
## MOBILIZAUFU - PLATAFORMA DE MOBILIDADE SUSTENTÁVEL

### Grupo
- **Matheus Medrado Ferreira** - 12311BCC054
- **Giovana M Ferreira** - 1221bcc033  
- **Leandro Marques Gontijo Jersé** - 12311BCC044

---

## 1. MODELO DE CLASSES (PROJETO)

### 1.1 Diagrama de Classes

O modelo de classes foi implementado seguindo o padrão MVC (Model-View-Controller) conforme especificado no projeto final. As classes foram organizadas da seguinte forma:

#### **Models (Camada de Dados)**
- `UsuarioModel` - Gerencia operações de usuários
- `BicicletaModel` - Gerencia operações de bicicletas
- `EstacaoModel` - Gerencia operações de estações
- `ReservaModel` - Gerencia operações de reservas
- `CaronaModel` - Gerencia operações de caronas
- `LinhaOnibusModel` - Gerencia operações de linhas de ônibus
- `PontoParadaModel` - Gerencia operações de pontos de parada
- `HorarioOnibusModel` - Gerencia operações de horários
- `ImpactoAmbientalModel` - Gerencia operações de impacto ambiental

#### **Controllers (Camada de Controle)**
- `AuthController` - Controla autenticação e autorização
- `BicicletaController` - Controla operações de bicicletas
- `CaronaController` - Controla operações de caronas
- `OnibusController` - Controla operações de ônibus
- `ImpactoController` - Controla operações de impacto ambiental

#### **Views (Camada de Apresentação)**
- Componentes React organizados por funcionalidade
- Páginas Next.js para cada módulo do sistema

### 1.2 Rastreabilidade de Requisitos

| História de Usuário | Caso de Uso | Classes Implementadas | Métodos |
|---------------------|-------------|----------------------|---------|
| HU01 - Reservar Bicicleta | UC002 | `BicicletaController` | `reservarBicicleta()` |
| | | `ReservaModel` | `create()`, `findById()` |
| HU02 - Consultar Horários | UC003 | `OnibusController` | `listHorarios()` |
| | | `HorarioOnibusModel` | `findByPonto()` |
| HU03 - Oferecer Carona | UC004 | `CaronaController` | `criarCarona()` |
| | | `CaronaModel` | `create()`, `findByUsuario()` |
| HU04 - Gerenciar Bicicletas | UC005 | `BicicletaController` | `createBicicleta()`, `updateBicicleta()` |
| | | `BicicletaModel` | `create()`, `update()`, `delete()` |
| HU05 - Visualizar Impacto | UC006 | `ImpactoController` | `getImpactoUsuario()` |
| | | `ImpactoAmbientalModel` | `findByUsuario()`, `calculateCO2()` |
| HU06 - Buscar Carona | UC004 | `CaronaController` | `buscarCaronas()` |
| | | `CaronaModel` | `findDisponiveis()` |
| HU07 - Devolver Bicicleta | UC002 | `BicicletaController` | `devolverBicicleta()` |
| | | `ReservaModel` | `finalizarReserva()` |

---

## 2. PRODUTO MÍNIMO VIÁVEL (MVP)

### 2.1 Tecnologias Utilizadas

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **Backend**: Node.js, Prisma ORM
- **Banco de Dados**: SQLite (desenvolvimento)
- **Autenticação**: JWT (JSON Web Tokens)
- **Padrão Arquitetural**: MVC

### 2.2 Funcionalidades Implementadas

#### ✅ Sistema de Autenticação
- Login e cadastro de usuários
- Diferentes tipos de usuário (Estudante, Professor/Funcionário, Administrador)
- Validação de credenciais e controle de acesso

#### ✅ Sistema de Bicicletas Compartilhadas
- Visualização de estações e bicicletas disponíveis
- Reserva de bicicletas com geração de QR code
- Sistema de devolução em qualquer estação
- Gerenciamento administrativo de bicicletas

#### ✅ Sistema de Caronas
- Oferecer caronas com origem, destino, horário e vagas
- Buscar caronas disponíveis com filtros
- Interface para gerenciamento de caronas

#### ✅ Consulta de Horários de Ônibus
- Visualização de horários em tempo real
- Status de atrasos e adiantamentos
- Filtros por ponto de parada e linha

#### ✅ Dashboard de Impacto Ambiental
- Métricas de CO2 economizado
- Histórico de viagens por tipo de transporte
- Ranking entre usuários
- Gráficos e estatísticas

#### ✅ Painel Administrativo
- Gerenciamento de bicicletas e estações
- Controle de status e manutenção
- Acesso restrito para administradores

### 2.3 Interface do Usuário

#### Páginas Implementadas:
1. **Home** (`/`) - Landing page com apresentação do projeto
2. **Login** (`/login`) - Autenticação de usuários
3. **Cadastro** (`/register`) - Registro de novos usuários
4. **Dashboard** (`/dashboard`) - Painel principal pós-login
5. **Bicicletas** (`/bicicletas`) - Sistema de reserva de bicicletas
6. **Caronas** (`/caronas`) - Sistema de caronas
7. **Ônibus** (`/onibus`) - Consulta de horários
8. **Impacto** (`/impacto`) - Dashboard de impacto ambiental

#### Design System:
- **Cores**: Verde (sustentabilidade), Azul (confiança), Amarelo (transporte público)
- **Componentes**: Reutilizáveis e responsivos
- **Ícones**: Lucide React para consistência visual
- **Layout**: Mobile-first e responsivo

### 2.4 Dados de Exemplo

O sistema foi populado com dados de exemplo incluindo:
- 3 usuários (admin, estudante, professor)
- 3 estações de bicicletas
- 20 bicicletas distribuídas nas estações
- 2 linhas de ônibus com horários
- Dados de impacto ambiental de exemplo

---

## 3. INSTRUÇÕES DE EXECUÇÃO

### 3.1 Pré-requisitos
- Node.js 18+
- npm ou yarn

### 3.2 Instalação e Execução

```bash
# 1. Navegar para o diretório do projeto
cd mobilizaufu

# 2. Instalar dependências
npm install

# 3. Configurar banco de dados
npm run db:push
npm run db:seed

# 4. Executar aplicação
npm run dev

# 5. Acessar no navegador
# http://localhost:3000
```

### 3.3 Usuários de Teste

| Tipo | Email | Senha | Funcionalidades |
|------|-------|-------|-----------------|
| Admin | admin@ufu.br | 123456 | Todas + Painel Admin |
| Estudante | ana.clara@ufu.br | 123456 | Reservas, Caronas, Ônibus, Impacto |
| Professor | carlos.mendes@ufu.br | 123456 | Reservas, Caronas, Ônibus, Impacto |

---

## 4. ARQUITETURA MVC IMPLEMENTADA

### 4.1 Model (Modelo)
- **Responsabilidade**: Acesso e manipulação de dados
- **Localização**: `src/models/`
- **Exemplo**: `UsuarioModel.create()`, `BicicletaModel.findDisponiveis()`

### 4.2 View (Visão)
- **Responsabilidade**: Interface do usuário
- **Localização**: `src/app/` (páginas Next.js)
- **Exemplo**: Componentes React para cada funcionalidade

### 4.3 Controller (Controlador)
- **Responsabilidade**: Lógica de negócio e coordenação
- **Localização**: `src/controllers/`
- **Exemplo**: `AuthController.login()`, `BicicletaController.reservarBicicleta()`

---

## 5. CONFORMIDADE COM A ENTREGA 01

### 5.1 Histórias de Usuário Implementadas
- ✅ HU01 - Reservar Bicicleta
- ✅ HU02 - Consultar Horários de Ônibus
- ✅ HU03 - Oferecer Carona
- ✅ HU04 - Gerenciar Bicicletas
- ✅ HU05 - Visualizar Impacto Ambiental
- ✅ HU06 - Buscar Carona
- ✅ HU07 - Devolver Bicicleta

### 5.2 Casos de Uso Implementados
- ✅ UC001 - Autenticar Usuário
- ✅ UC002 - Reservar Bicicleta
- ✅ UC003 - Consultar Horários de Ônibus
- ✅ UC004 - Oferecer Carona
- ✅ UC005 - Gerenciar Bicicletas
- ✅ UC006 - Visualizar Impacto Ambiental

### 5.3 Modelo Conceitual Implementado
- ✅ Todas as entidades do diagrama ER foram implementadas
- ✅ Relacionamentos entre entidades preservados
- ✅ Atributos e chaves primárias/estrangeiras implementados

---

## 6. LINK DE ACESSO E CÓDIGO FONTE

### 6.1 Código Fonte
- **Repositório**: Projeto local em `/home/leandro/Documentos/UFU/esof/trabalho/mobilizaufu/`
- **Estrutura**: Organizada seguindo padrão MVC
- **Documentação**: README.md completo com instruções

### 6.2 Execução Local
- **URL**: http://localhost:3000
- **Comando**: `npm run dev`
- **Banco**: SQLite com dados de exemplo

### 6.3 Vídeo de Apresentação
- **Status**: A ser gravado demonstrando todas as funcionalidades
- **Conteúdo**: Navegação completa pelo sistema, demonstração de cada funcionalidade
- **Duração**: Aproximadamente 10-15 minutos

---

## 7. CONCLUSÃO

O projeto **MobilizaUFU** foi desenvolvido com sucesso seguindo o padrão MVC e implementando todas as funcionalidades especificadas na Entrega 01. A aplicação web está funcional e pronta para demonstração, com interface intuitiva e responsiva.

### 7.1 Principais Conquistas
- ✅ Implementação completa do padrão MVC
- ✅ Todas as histórias de usuário implementadas
- ✅ Interface moderna e responsiva
- ✅ Sistema de autenticação robusto
- ✅ Banco de dados estruturado e populado
- ✅ Documentação completa

### 7.2 Tecnologias Demonstradas
- Next.js 15 com App Router
- TypeScript para tipagem estática
- Prisma ORM para banco de dados
- Tailwind CSS para estilização
- JWT para autenticação
- Padrão arquitetural MVC

---

**MobilizaUFU** - Promovendo mobilidade sustentável na UFU! 🌱🚴‍♀️🚌
