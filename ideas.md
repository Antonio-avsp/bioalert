# BIOALERT - Brainstorm de Design

## Contexto
Plataforma de monitoramento urbano e alertas climáticos em tempo real para enchentes e alagamentos em Recife. O design Figma mostra uma splash screen mobile-first com logo verde (folha + alerta), fonte ABeeZee, fundo branco limpo. A plataforma precisa transmitir urgência, confiança e acessibilidade.

---

<response>
<text>
## Ideia 1: "Emergency Cartography" - Design Cartográfico de Emergência

**Design Movement:** Neo-Cartographic UI inspirado em sistemas de comando de emergência militares e mapas meteorológicos profissionais.

**Core Principles:**
1. Hierarquia por urgência - elementos mais críticos são visualmente dominantes
2. Legibilidade extrema - informação deve ser compreendida em 2 segundos
3. Densidade informacional controlada - muitos dados, zero ruído visual
4. Confiança institucional - visual que transmite autoridade e credibilidade

**Color Philosophy:** Verde institucional (#1B7A3D) como cor primária de segurança, com sistema de risco em 5 níveis (verde → amarelo → laranja → vermelho → roxo). Fundo escuro (slate-900) para contraste máximo com dados sobrepostos. O verde conecta com a identidade do logo Bioalert e simboliza proteção ambiental.

**Layout Paradigm:** Dashboard de comando com mapa full-bleed como elemento central. Painéis laterais retráteis com dados em tempo real. Cards flutuantes sobre o mapa com informações contextuais. Bottom sheet mobile para navegação.

**Signature Elements:**
- Indicadores pulsantes de risco no mapa (como radares meteorológicos)
- Barras de progresso de nível de água com gradiente de cores
- Cards com borda lateral colorida indicando severidade

**Interaction Philosophy:** Toque para revelar, deslize para navegar. Gestos naturais que funcionam sob stress. Botão SOS sempre visível e acessível com um toque.

**Animation:** Pulsos suaves em áreas de risco, transições de 200ms para painéis, ondulação sutil em indicadores de água. Animações de entrada staggered em 50ms para listas de alertas.

**Typography System:** ABeeZee para títulos (conexão com a marca), Inter para corpo de texto e dados. Pesos bold para alertas, regular para informações contextuais. Tamanhos generosos para leitura rápida.
</text>
<probability>0.08</probability>
</response>

<response>
<text>
## Ideia 2: "Tropical Tech" - Tecnologia Tropical Humanitária

**Design Movement:** Organic Tech - fusão de formas orgânicas tropicais com interface tecnológica moderna, inspirado em apps de clima premium como Weather.app e Dark Sky.

**Core Principles:**
1. Calma na tempestade - design que acalma mesmo em situações de emergência
2. Conexão com a natureza - formas que lembram água, folhas, ondas
3. Gradientes atmosféricos - cores que refletem o estado do céu
4. Humanismo digital - tecnologia a serviço das pessoas

**Color Philosophy:** Gradientes que mudam com o estado climático - azul sereno para dias calmos, tons de cinza-azulado para chuva, âmbar para alerta. Verde esmeralda (#2D8B2D) do logo como âncora de identidade. Backgrounds com gradientes suaves que simulam céu/atmosfera.

**Layout Paradigm:** Scroll vertical fluido com seções full-width que se transformam como camadas atmosféricas. Hero com mapa interativo, seguido por cards empilhados com informações. Navegação bottom-tab para mobile com ícones orgânicos.

**Signature Elements:**
- Ondulações CSS animadas representando níveis de água
- Ícones com cantos arredondados e estilo orgânico
- Glassmorphism sutil em cards sobrepostos ao mapa

**Interaction Philosophy:** Fluidez aquática - elementos respondem como água ao toque. Pull-to-refresh com animação de gota. Transições suaves entre estados.

**Animation:** Ondas CSS infinitas no fundo, fade-in com blur para cards, micro-animações em ícones de clima. Parallax sutil no scroll.

**Typography System:** ABeeZee para marca e headlines, Nunito Sans para corpo. Hierarquia clara com 4 níveis. Letras arredondadas que combinam com a estética orgânica.
</text>
<probability>0.06</probability>
</response>

<response>
<text>
## Ideia 3: "Urban Command Center" - Centro de Comando Urbano

**Design Movement:** Brutalist Data Visualization - inspirado em painéis de controle de tráfego aéreo e centros de operações urbanas, com toque de design escandinavo para clareza.

**Core Principles:**
1. Dados em primeiro lugar - cada pixel serve a uma informação
2. Contraste absoluto - preto e branco com acentos de cor estratégicos
3. Grid rígido - estrutura que organiza caos informacional
4. Ação imediata - cada elemento leva a uma decisão

**Color Philosophy:** Fundo branco puro com cards em cinza claro. Verde (#1B7A3D) exclusivamente para estados positivos/seguros. Vermelho para emergência. Amarelo para atenção. Sem gradientes - cores chapadas e decisivas.

**Layout Paradigm:** Grid assimétrico de 12 colunas com módulos de tamanhos variados. Sidebar fixa com navegação. Área central dividida entre mapa e feed de alertas. Widgets modulares reposicionáveis.

**Signature Elements:**
- Números grandes e bold para dados críticos (nível de água, mm de chuva)
- Linhas divisórias finas e precisas
- Status dots pulsantes com cores de semáforo

**Interaction Philosophy:** Click-to-action direto. Sem modais desnecessários. Informação progressiva - resumo → detalhe → ação.

**Animation:** Mínima e funcional - apenas transições de estado (200ms ease-out). Números que contam para cima/baixo. Barras de progresso que preenchem suavemente.

**Typography System:** ABeeZee para branding, JetBrains Mono para dados numéricos, Inter para texto corrido. Contraste extremo entre tamanhos (72px para métricas, 14px para labels).
</text>
<probability>0.07</probability>
</response>

---

## Decisão: Ideia 1 - "Emergency Cartography"

Escolho a abordagem "Emergency Cartography" por ser a mais adequada para um hackathon focado em impacto social e inovação. O visual de centro de comando transmite seriedade e competência técnica, enquanto o sistema de cores por risco é intuitivo e universalmente compreensível. A combinação de mapa central com painéis de dados cria uma experiência imersiva que impressiona jurados e demonstra viabilidade técnica real.
