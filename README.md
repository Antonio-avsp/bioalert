# BIOALERT — Monitoramento Urbano e Alertas Climáticos

Plataforma inteligente de monitoramento urbano e alertas climáticos em tempo real para enchentes e alagamentos em Recife. Combina sensores IoT, visão computacional, inteligência artificial preditiva e inteligência colaborativa da comunidade para proteger vidas durante eventos climáticos extremos.

> *"A chuva vem, mas a informação chega primeiro."*

Projeto desenvolvido para o **Manus Day 2026 — Hackathon Recife**.

---

## Sobre o Projeto

Recife é uma das capitais mais vulneráveis a enchentes no Brasil. Com 65% do território abaixo do nível do mar, rios cortando a cidade e um sistema de drenagem defasado, cada temporada de chuvas traz destruição, perdas materiais e, tragicamente, vidas perdidas.

O BIOALERT centraliza dados meteorológicos, urbanos e comunitários em uma única plataforma, oferecendo alertas antecipados de até 2 horas e permitindo tomada de decisão rápida tanto para a população quanto para órgãos públicos como a Defesa Civil.

### O que a plataforma resolve

- Falta de informação centralizada entre órgãos públicos
- Alertas tardios que chegam depois da água já ter subido
- Motoristas entrando em vias alagadas sem aviso
- Dificuldade de tomada de decisão sem dados confiáveis
- Comunidades vulneráveis sem acesso à informação
- Recorrência crescente de eventos extremos por mudanças climáticas

---

## Principais Funcionalidades

- **Mapa Colaborativo** — Mapa em tempo real com pontos de alagamento reportados pela comunidade e sensores IoT distribuídos pela cidade.
- **Alertas em Tempo Real** — Sistema com 5 níveis de risco por cores (Seguro, Atenção, Alerta, Perigo, Crítico), enviados via push, WhatsApp e SMS.
- **IA Preditiva** — Análise de histórico de chuvas, dados de sensores e reports para prever áreas críticas com até 2 horas de antecedência.
- **Visão Computacional** — Gateway integrado a câmeras de segurança urbanas para detectar nível de água, guarda-chuvas e comportamento de pedestres.
- **Rotas Seguras** — Cálculo de rotas alternativas evitando áreas alagadas.
- **WhatsApp & SMS** — Comunicação direta com a população, inclusive em áreas sem internet estável.
- **Botão SOS** — Emergência com compartilhamento de localização em tempo real para Defesa Civil e bombeiros.
- **Painel da Defesa Civil** — Dashboard exclusivo para órgãos públicos com visão consolidada de ocorrências, recursos e equipes.
- **Gamificação** — Sistema de pontos e badges para incentivar reports da comunidade.
- **Modo Offline** — Funcionamento parcial sem internet, com mapa em cache e reports salvos localmente.

---

## Design

A plataforma adota o conceito visual **"Emergency Cartography"** (Cartografia de Emergência), inspirado em sistemas de comando de emergência e mapas meteorológicos profissionais.

- **Tema:** escuro (dark), para contraste máximo com dados sobrepostos
- **Cor primária:** verde institucional de segurança, conectado à identidade da marca
- **Sistema de risco:** 5 níveis em escala de cores (verde → amarelo → laranja → vermelho → roxo)
- **Tipografia:** ABeeZee para títulos e marca, Inter para texto e dados, JetBrains Mono para valores numéricos
- **Layout:** dashboard de comando com mapa central e painéis de dados

---

## Stack Tecnológica

### Frontend (este repositório)

- **React 19** + **TypeScript**
- **Vite 7** como build tool
- **Tailwind CSS 4** para estilização
- **shadcn/ui** (Radix UI) para componentes de interface
- **Wouter** para roteamento client-side
- **Framer Motion** para animações
- **Recharts** para gráficos
- **Google Maps JavaScript API** para mapas interativos (via proxy Manus)
- **Lucide React** para ícones
- **Sonner** para notificações (toasts)

### Visão completa do produto

Frontend (React/Next.js), Backend (Node.js, Firebase, PostgreSQL, Redis), APIs (OpenWeatherMap, INMET, WhatsApp, Twilio), IA/ML (TensorFlow.js, YOLO v8, Prophet, Scikit-learn), Mobile/IoT (React Native, PWA, Arduino/ESP32, LoRaWAN) e Infraestrutura (Docker, AWS/GCP, Cloudflare, GitHub Actions).

---

## Estrutura do Projeto

```
client/
  public/       ← Arquivos de configuração pequenos (favicon, robots.txt)
  src/
    pages/      ← Componentes de página (Home, NotFound)
    components/ ← Componentes reutilizáveis e seções da landing page
      ui/       ← Componentes shadcn/ui
    contexts/   ← React contexts (ThemeContext)
    hooks/      ← Hooks customizados
    lib/        ← Funções utilitárias
    App.tsx     ← Rotas e layout de topo
    main.tsx    ← Ponto de entrada do React
    index.css   ← Estilos globais e design tokens
server/         ← Servidor Express para servir os arquivos estáticos
shared/         ← Constantes compartilhadas
```

### Seções da landing page

`HeroSection`, `ProblemSection`, `MapSection`, `DashboardSection`, `FeaturesSection`, `DifferentialsSection`, `TechSection`, `ImpactSection`, `MVPSection` e `Footer`, além de `SplashScreen` e `Navbar`.

---

## Como Executar

Pré-requisitos: Node.js e **pnpm** (`pnpm@10.4.1` ou superior).

```bash
# Instalar dependências
pnpm install

# Rodar em modo de desenvolvimento
pnpm run dev

# Verificar tipos TypeScript
pnpm run check

# Gerar build de produção
pnpm run build

# Rodar a build de produção
pnpm run start

# Formatar o código
pnpm run format
```

O servidor de desenvolvimento sobe na porta **3000** (busca a próxima porta livre se ocupada).

---

## Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `dev` | Inicia o servidor de desenvolvimento Vite |
| `build` | Gera a build de produção do cliente e do servidor |
| `start` | Executa a build de produção |
| `preview` | Pré-visualiza a build de produção |
| `check` | Verificação de tipos com TypeScript (`tsc --noEmit`) |
| `format` | Formata o código com Prettier |
| `test` | Executa os testes com Vitest |

---

## Roadmap

| Fase | Período | Entregas |
|------|---------|----------|
| **MVP** | Hackathon | Mapa colaborativo, alertas básicos, reports de usuários, dashboard visual |
| **v1.0** | 3 meses | App mobile nativo, integração WhatsApp, sensores IoT piloto, IA preditiva v1 |
| **v2.0** | 6 meses | Visão computacional, rotas seguras, gamificação, modo offline |
| **Escala** | 12 meses | Expansão para outras cidades, API pública, parcerias governamentais, open data |

---

## Impacto Esperado

- **60%** de redução estimada de riscos com alertas antecipados
- **30s** do momento de detecção até o alerta na palma da mão
- **500k+** pessoas potencialmente protegidas em áreas de risco
- **94** bairros de Recife monitorados
- **48** equipes integradas (Defesa Civil, Bombeiros, SAMU, voluntários)

---

## Licença

MIT.

---

*BIOALERT — Feito com dedicação para Recife. Manus Day 2026.*
