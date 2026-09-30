# Weather App — Backlog de Tarefas

Backlog derivado de `plans/weather-app-plan.md` e `specs/weather-app-spec.md`.
As tarefas seguem a ordem: tipos → funções puras → services → hook →
componentes → integração → testes → hardening.

## Entrega 1 — Tipos e decisões

### T-01 — Fechar decisões que bloqueiam os contratos

- **Descrição:** Resolver as Open Questions 1–8 da spec.
- **Critérios de aceite:** Métricas, tipos de localidade, timeout, retry,
  browsers, viewports, acessibilidade, unidade, cache e critérios de sucesso
  estão registrados e aprovados.
- **Dependências:** Nenhuma.
- **Arquivos prováveis:** `specs/weather-app-spec.md`, `plans/weather-app-plan.md`.
- **Tipo:** Infra.

### T-02 — Definir tipos do domínio meteorológico

- **Descrição:** Definir `City`, `CurrentWeather`, `ForecastDay`, `WeatherData` e
  `Unit` com os campos aprovados.
- **Critérios de aceite:** Campos obrigatórios/opcionais, Celsius canônico e
  janela de cinco dias estão representados sem efeitos colaterais.
- **Dependências:** T-01.
- **Arquivos prováveis:** `src/types/weather.ts`.
- **Tipo:** Data.

### T-03 — Definir tipos de API e erro

- **Descrição:** Definir contratos de respostas externas e `AppError`.
- **Critérios de aceite:** HTTP, rede, timeout, validação e resposta parcial
  podem ser distinguidos; o contrato não depende de React.
- **Dependências:** T-01, T-02.
- **Arquivos prováveis:** `src/types/api.ts`, `src/types/errors.ts`.
- **Tipo:** Data.

## Entrega 2 — Funções puras

### T-04 — Implementar conversão de temperatura

- **Descrição:** Criar a função pura Celsius/Fahrenheit com precisão aprovada.
- **Critérios de aceite:** Zero, negativos e decimais são convertidos sem mutar
  dados canônicos e sem request.
- **Dependências:** T-02.
- **Arquivos prováveis:** `src/lib/temperature.ts`.
- **Tipo:** Data.

### T-05 — Implementar regras de datas e previsão

- **Descrição:** Criar funções puras para timezone, hoje + quatro dias e
  validação de cinco períodos.
- **Critérios de aceite:** Ordem e timezone da cidade são respeitados; menos de
  cinco períodos é rejeitado.
- **Dependências:** T-01, T-02.
- **Arquivos prováveis:** `src/lib/dates.ts`, `src/lib/validation.ts`.
- **Tipo:** Data.

### T-06 — Implementar códigos meteorológicos

- **Descrição:** Mapear códigos WMO para rótulos/condições usados pela UI.
- **Critérios de aceite:** Códigos conhecidos têm saída definida e códigos
  desconhecidos têm fallback seguro.
- **Dependências:** T-02.
- **Arquivos prováveis:** `src/lib/weatherCodes.ts`.
- **Tipo:** Data.

## Entrega 3 — Services e acesso a dados

### T-07 — Criar cliente HTTP

- **Descrição:** Encapsular `fetch`, timeout, cancelamento e erros HTTP/rede.
- **Critérios de aceite:** Timeout aprovado é respeitado; erros são convertidos
  em `AppError`; respostas obsoletas podem ser canceladas ou invalidadas.
- **Dependências:** T-01, T-03.
- **Arquivos prováveis:** `src/services/http.ts`.
- **Tipo:** Data.

### T-08 — Criar service de geocoding

- **Descrição:** Integrar a busca Open-Meteo e normalizar resultados para
  `City[]`.
- **Critérios de aceite:** URL/parâmetros estão corretos; input vazio não chama
  rede; lista vazia e falhas são tratadas conforme `AppError`.
- **Dependências:** T-02, T-03, T-07.
- **Arquivos prováveis:** `src/services/openMeteoGeocoding.ts`.
- **Tipo:** Data.

### T-09 — Criar service de forecast

- **Descrição:** Integrar o forecast Open-Meteo e normalizar `WeatherData`.
- **Critérios de aceite:** Coordenadas, `current`, `daily`, timezone e cinco dias
  são enviados; campos obrigatórios ausentes geram `invalid-response`.
- **Dependências:** T-02, T-03, T-05, T-07.
- **Arquivos prováveis:** `src/services/openMeteoForecast.ts`.
- **Tipo:** Data.

## Entrega 4 — Hook e estado

### T-10 — Modelar transições do hook

- **Descrição:** Definir o estado inicial e as transições `idle`, `loading`,
  `success`, `empty` e `error` do `useWeatherSearch`.
- **Critérios de aceite:** Cada transição tem entrada e saída determinísticas;
  query, cidade, weather e erro têm regras claras.
- **Dependências:** T-02, T-03.
- **Arquivos prováveis:** `src/hooks/useWeatherSearch.ts`.
- **Tipo:** Data.

### T-11 — Implementar efeitos assíncronos do hook

- **Descrição:** Conectar o hook aos services, seleção de cidade, retry,
  cancelamento e descarte de respostas obsoletas.
- **Critérios de aceite:** Geocoding ocorre antes do forecast; retry preserva
  contexto; resposta antiga não substitui a mais recente; unidade não dispara
  request.
- **Dependências:** T-07, T-08, T-09, T-10.
- **Arquivos prováveis:** `src/hooks/useWeatherSearch.ts`.
- **Tipo:** Data.

## Entrega 5 — Componentes de apresentação

### T-12 — Criar shell da aplicação

- **Descrição:** Criar `App` e layout base sem lógica de dados.
- **Critérios de aceite:** O shell renderiza área de busca e slots de conteúdo
  sem previsão fictícia; não importa services.
- **Dependências:** T-02.
- **Arquivos prováveis:** `src/App.tsx`, `src/main.tsx`.
- **Tipo:** UI.

### T-13 — Criar componente de status

- **Descrição:** Renderizar idle, loading, erro e vazio com semântica acessível.
- **Critérios de aceite:** Cada estado tem mensagem/role verificável, foco
  adequado e texto em pt-BR.
- **Dependências:** T-03, T-12.
- **Arquivos prováveis:** `src/components/AppStatus.tsx`.
- **Tipo:** UI.

### T-14 — Criar formulário de busca

- **Descrição:** Criar campo, label, submissão e validação local.
- **Critérios de aceite:** Input vazio não chama API; acentos e caracteres
  especiais são aceitos; botão e teclado submetem o formulário.
- **Dependências:** T-12, T-13.
- **Arquivos prováveis:** `src/components/SearchForm.tsx`.
- **Tipo:** UI.

### T-15 — Criar lista de resultados

- **Descrição:** Renderizar `City[]` e seleção explícita de cidade.
- **Critérios de aceite:** Opções exibem identificadores aprovados, são
  selecionáveis por teclado/toque e não chamam services diretamente.
- **Dependências:** T-02, T-12, T-14.
- **Arquivos prováveis:** `src/components/LocationResults.tsx`.
- **Tipo:** UI.

### T-16 — Criar componente de clima atual

- **Descrição:** Renderizar cidade e campos aprovados de `CurrentWeather`.
- **Critérios de aceite:** Exibe apenas dados válidos, trata opcionais ausentes
  e recebe unidade sem fazer request.
- **Dependências:** T-02, T-04, T-06, T-12.
- **Arquivos prováveis:** `src/components/WeatherCurrent.tsx`.
- **Tipo:** UI.

### T-17 — Criar lista de previsão diária

- **Descrição:** Renderizar os cinco `ForecastDay` na ordem correta.
- **Critérios de aceite:** Datas, condições e temperaturas aparecem nos cinco
  itens; o layout não quebra com campos opcionais ausentes.
- **Dependências:** T-02, T-05, T-06, T-12.
- **Arquivos prováveis:** `src/components/ForecastList.tsx`.
- **Tipo:** UI.

### T-18 — Criar controle de unidade

- **Descrição:** Criar controle Celsius/Fahrenheit e projeção de valores.
- **Critérios de aceite:** Celsius inicia selecionado; alternância atualiza os
  componentes sem mutar `WeatherData` nem chamar services.
- **Dependências:** T-02, T-04, T-16, T-17.
- **Arquivos prováveis:** `src/components/TemperatureUnitToggle.tsx`.
- **Tipo:** UI.

## Entrega 6 — Integração

### T-19 — Integrar componentes e hook no App

- **Descrição:** Conectar hook, formulário, resultados, status, clima,
  previsão e unidade no `App`.
- **Critérios de aceite:** O fluxo input → geocoding → seleção → forecast → UI
  funciona; componentes não fazem HTTP diretamente; acesso inicial não exige
  autenticação.
- **Dependências:** T-11, T-12, T-13, T-14, T-15, T-16, T-17, T-18.
- **Arquivos prováveis:** `src/App.tsx`, `src/components/*.tsx`.
- **Tipo:** UI.

## Entrega 7 — Testes

### T-20 — Testar conversão de unidade e funções puras

- **Descrição:** Cobrir a conversão Celsius/Fahrenheit e as demais funções
  puras com Vitest.
- **Critérios de aceite:** A conversão tem casos dedicados para Celsius,
  Fahrenheit, negativos, zero e decimais; também há casos para timezone, cinco
  dias, códigos desconhecidos e campos ausentes.
- **Dependências:** T-04, T-05, T-06.
- **Arquivos prováveis:** `tests/unit/temperature.test.ts`,
  `tests/unit/dates.test.ts`, `tests/unit/validation.test.ts`,
  `tests/unit/weatherCodes.test.ts`.
- **Tipo:** Test.

### T-21 — Testar geocoding com fetch mockado

- **Descrição:** Testar o service de geocoding exclusivamente com `fetch`
  mockado e fixture controlada.
- **Critérios de aceite:** URL/parâmetros, sucesso, lista vazia, input inválido,
  HTTP e rede são cobertos sem chamada externa real.
- **Dependências:** T-08.
- **Arquivos prováveis:** `tests/unit/openMeteoGeocoding.test.ts`,
  `tests/fixtures/geocoding.json`.
- **Tipo:** Test.

### T-22 — Testar forecast com fetch mockado

- **Descrição:** Testar o service de forecast exclusivamente com `fetch`
  mockado e fixture controlada.
- **Critérios de aceite:** Mapeamento válido, cinco dias, timeout, JSON
  inválido, campos ausentes e resposta parcial são cobertos.
- **Dependências:** T-09.
- **Arquivos prováveis:** `tests/unit/openMeteoForecast.test.ts`,
  `tests/fixtures/forecast.json`.
- **Tipo:** Test.

### T-23 — Testar transições do hook

- **Descrição:** Testar o hook com services mockados e promises controladas.
- **Critérios de aceite:** Estados, seleção, retry, concorrência, preservação de
  query e troca de unidade sem request são verificados.
- **Dependências:** T-10, T-11.
- **Arquivos prováveis:** `tests/unit/useWeatherSearch.test.ts`.
- **Tipo:** Test.

### T-24 — Testar componentes nos estados loading, erro e vazio

- **Descrição:** Testar componentes com Testing Library, cobrindo explicitamente
  loading, erro, vazio e sucesso, além do estado inicial.
- **Critérios de aceite:** Loading, erro, vazio, sucesso e idle são cobertos;
  labels, roles, foco, teclado, retry e ausência de dados fictícios são
  verificáveis.
- **Dependências:** T-13, T-14, T-15, T-16, T-17, T-18.
- **Arquivos prováveis:** `tests/unit/components/*.test.tsx`.
- **Tipo:** Test.

### T-25 — Configurar fixtures e interceptação E2E

- **Descrição:** Preparar fixtures e rotas Playwright para sucesso, vazio,
  erro, timeout e resposta parcial.
- **Critérios de aceite:** Chamadas Open-Meteo são interceptáveis e os cenários
  não dependem da disponibilidade externa.
- **Dependências:** T-08, T-09, T-19.
- **Arquivos prováveis:** `tests/fixtures/`, `playwright.config.ts`.
- **Tipo:** Test.

### T-26 — Testar fluxo E2E principal incluindo viewport mobile

- **Descrição:** Cobrir o fluxo principal de busca, seleção, forecast e
  apresentação em desktop e viewport mobile.
- **Critérios de aceite:** O fluxo integrado passa com fixtures em desktop e
  mobile; estados de erro/vazio, retry e concorrência são cobertos; a troca de
  unidade não gera novo request de forecast.
- **Dependências:** T-19, T-25.
- **Arquivos prováveis:** `tests/e2e/weather-search.spec.ts`.
- **Tipo:** Test.

## Entrega 8 — Hardening

### T-27 — Validar acessibilidade E2E nas viewports aprovadas

- **Descrição:** Complementar o fluxo mobile com validações de acessibilidade,
  teclado e demais viewports aprovadas.
- **Critérios de aceite:** Não há sobreposição/overflow horizontal; foco,
  labels, roles, busca, seleção, previsão, unidade, erro e retry permanecem
  operáveis nas viewports aprovadas.
- **Dependências:** T-19, T-24, T-26, T-01.
- **Arquivos prováveis:** `tests/e2e/weather-search.spec.ts`,
  `playwright.config.ts`, `src/components/*.tsx`.
- **Tipo:** Test.

### T-28 — Executar gate de qualidade

- **Descrição:** Executar o checklist do projeto e corrigir falhas relacionadas
  ao escopo.
- **Critérios de aceite:** `pnpm lint`, `pnpm build` e `pnpm test` passam; a
  matriz de rastreabilidade é revisada.
- **Dependências:** T-20, T-21, T-22, T-23, T-24, T-26, T-27.
- **Arquivos prováveis:** `package.json`, `biome.json`, `vite.config.ts`,
  `playwright.config.ts` e arquivos apontados pelos erros.
- **Tipo:** Infra.

## Matriz de rastreabilidade

| Tarefa | Referências da spec |
| --- | --- |
| T-01 | Open Questions 1–8; Spec Review — requisitos faltantes e ambiguidades |
| T-02 | FR-03, FR-04, FR-05, FR-12; AC-03, AC-04, AC-05, AC-12; NFR-06 |
| T-03 | FR-08; AC-08; NFR-04; EC-04, EC-05, EC-07 |
| T-04 | FR-05; AC-05; NFR-06 |
| T-05 | FR-04; AC-04; NFR-04; EC-07, EC-09 |
| T-06 | FR-03, FR-04; AC-03, AC-04; NFR-03 |
| T-07 | FR-06, FR-08; AC-06, AC-08; NFR-01, NFR-04; EC-04, EC-05 |
| T-08 | FR-01, FR-07; AC-01, AC-07; NFR-01, NFR-03; EC-01, EC-02, EC-03, EC-06 |
| T-09 | FR-03, FR-04, FR-08; AC-03, AC-04, AC-08; NFR-04; EC-04, EC-07 |
| T-10 | FR-06, FR-07, FR-08, FR-09; AC-06, AC-07, AC-08, AC-09; NFR-04 |
| T-11 | FR-01 a FR-08; AC-01 a AC-08; NFR-01, NFR-04; EC-04, EC-05, EC-07, EC-08 |
| T-12 | FR-09; AC-09; NFR-02 |
| T-13 | FR-06, FR-07, FR-08, FR-09; AC-06, AC-07, AC-08, AC-09; NFR-03, NFR-04 |
| T-14 | FR-01, FR-07; AC-01, AC-07; NFR-03; EC-02, EC-03 |
| T-15 | FR-02, FR-07; AC-02, AC-07; NFR-03; EC-01, EC-06 |
| T-16 | FR-03, FR-05, FR-12; AC-03, AC-05, AC-12; NFR-03, NFR-04 |
| T-17 | FR-04, FR-05; AC-04, AC-05; NFR-02, NFR-03; EC-09 |
| T-18 | FR-05, FR-12; AC-05, AC-12; NFR-03 |
| T-19 | FR-01 a FR-12; AC-01 a AC-12; NFR-01, NFR-02, NFR-03, NFR-04; EC-01 a EC-09 |
| T-20 | FR-05; AC-05; NFR-06; EC-09 |
| T-21 | FR-01, FR-02, FR-07, FR-08; AC-01, AC-02, AC-07, AC-08; NFR-04; EC-01, EC-02, EC-04, EC-06 |
| T-22 | FR-03, FR-04, FR-08; AC-03, AC-04, AC-08; NFR-04; EC-04, EC-05, EC-07 |
| T-23 | FR-06, FR-07, FR-08; AC-06, AC-07, AC-08; NFR-04; EC-08 |
| T-24 | FR-06, FR-07, FR-08, FR-09, FR-10, FR-11, FR-12; AC-06 a AC-12; NFR-03 |
| T-25 | FR-08; AC-08; NFR-04; EC-04, EC-05, EC-07 |
| T-26 | FR-01 a FR-08; AC-01 a AC-08; NFR-01, NFR-04; EC-01 a EC-08 |
| T-27 | FR-10; AC-10; NFR-02, NFR-03; EC-09 |
| T-28 | Checklist do projeto; matriz de rastreabilidade; todos os FR/AC/NFR aplicáveis |

Cada critério deve ser verificável por uma asserção, inspeção de estado,
chamada interceptada ou verificação visual automatizada. Termos dependentes de
decisão só se tornam executáveis após T-01 registrar os valores concretos.

## Matriz requisito → tarefas

| Requisito funcional | Tarefas de implementação | Tarefas de validação |
| --- | --- | --- |
| FR-01 — Busca de localidade | T-08, T-14, T-19 | T-21, T-26 |
| FR-02 — Seleção de localidade ambígua | T-08, T-15, T-19 | T-21, T-26 |
| FR-03 — Exibição do clima atual | T-02, T-09, T-16, T-19 | T-22, T-24, T-26 |
| FR-04 — Previsão de cinco dias | T-02, T-05, T-09, T-17, T-19 | T-20, T-22, T-24, T-26 |
| FR-05 — Conversão de temperatura | T-04, T-18, T-19 | T-20, T-24, T-26 |
| FR-06 — Estado de carregamento | T-07, T-10, T-11, T-13, T-19 | T-23, T-24, T-26 |
| FR-07 — Entrada inválida e resultado vazio | T-05, T-08, T-13, T-14, T-15, T-19 | T-21, T-23, T-24, T-26 |
| FR-08 — Falhas de API, rede e timeout | T-03, T-07, T-09, T-11, T-13, T-19 | T-21, T-22, T-23, T-25, T-26 |
| FR-09 — Estado inicial | T-12, T-13, T-19 | T-24, T-26 |
| FR-10 — Responsividade funcional | T-12, T-19 | T-24, T-27 |
| FR-11 — Acesso sem autenticação | T-19 | T-26 |
| FR-12 — Idioma e unidade padrão | T-02, T-13, T-16, T-18, T-19 | T-24, T-26, T-27 |

### Lacunas encontradas

Nenhum requisito funcional está sem tarefa correspondente. Todos os FRs têm ao
menos uma tarefa de implementação e uma tarefa de validação; os requisitos que
dependem de decisões abertas permanecem condicionados à conclusão de T-01.

## Prioridade e tamanho

Prioridade: **P0** é essencial para o MVP e o caminho principal; **P1** é
importante para qualidade, confiabilidade ou cobertura; **P2** pode ser adiado
sem impedir a consulta básica. Tamanho: **P** é uma alteração pequena e local;
**M** envolve uma unidade de comportamento ou integração; **G** envolve vários
fluxos, arquivos ou validações e deve ser acompanhado por subtarefas.

| Tarefa | Prioridade | Tamanho | Motivo resumido |
| --- | --- | --- | --- |
| T-01 | P0 | M | Desbloqueia contratos e decisões do MVP. |
| T-02 | P0 | M | Base para todos os dados e componentes. |
| T-03 | P0 | P | Normaliza erros e respostas externas. |
| T-04 | P0 | P | Habilita unidade canônica e conversão local. |
| T-05 | P0 | M | Garante datas e cinco dias válidos. |
| T-06 | P1 | P | Traduz códigos para conteúdo compreensível. |
| T-07 | P0 | M | Centraliza rede, timeout e cancelamento. |
| T-08 | P0 | M | Habilita a busca de cidades. |
| T-09 | P0 | M | Habilita o carregamento meteorológico. |
| T-10 | P0 | M | Define os estados necessários à tela. |
| T-11 | P0 | M | Conecta efeitos e recuperação de falhas. |
| T-12 | P0 | P | Torna a aplicação renderizável. |
| T-13 | P0 | P | Expõe loading, erro e vazio. |
| T-14 | P0 | M | Permite a primeira interação do usuário. |
| T-15 | P0 | M | Permite escolher a cidade correta. |
| T-16 | P0 | M | Exibe o clima atual. |
| T-17 | P0 | M | Exibe a previsão diária. |
| T-18 | P1 | P | Adiciona preferência de unidade sem rede. |
| T-19 | P0 | G | Integra o fluxo completo na tela. |
| T-20 | P0 | M | Protege regras puras e conversão. |
| T-21 | P0 | M | Protege a integração de geocoding. |
| T-22 | P0 | M | Protege a integração de forecast. |
| T-23 | P1 | M | Protege as transições e concorrência do hook. |
| T-24 | P0 | M | Protege estados e acessibilidade dos componentes. |
| T-25 | P0 | P | Prepara dados determinísticos para E2E. |
| T-26 | P0 | G | Valida o fluxo principal integrado. |
| T-27 | P1 | M | Valida acessibilidade e viewports aprovadas. |
| T-28 | P0 | M | Gate obrigatório antes da entrega. |

## Sequência de fatias verticais

As tarefas dentro de uma fatia podem ser executadas em paralelo quando suas
dependências já estiverem concluídas. Cada fatia termina com algo observável ou
com uma proteção executável, evitando esperar toda a arquitetura para obter
feedback.

### Fatia V1 — Busca visível e estados básicos

**Objetivo:** abrir a aplicação, digitar uma cidade e ver loading, resultados,
estado vazio ou erro de busca.

- Base: T-01, T-02, T-03, T-07, T-08, T-10.
- UI: T-12, T-13, T-14, T-15.
- Integração mínima: T-19 usando o caminho de geocoding.
- Validação rápida: T-21 e parte de T-24.

**Entrega observável:** busca manual funcional, seleção de cidade, mensagens em
pt-BR e recuperação de geocoding sem previsão fictícia.

### Fatia V2 — Clima atual real

**Objetivo:** selecionar uma cidade e visualizar temperatura e condição atuais.

- Domínio: T-04 e T-06.
- Dados: T-09 e T-11.
- UI: T-16.
- Integração: completar T-19.
- Validação: T-20, T-22 e cenários de sucesso/erro de T-24.

**Entrega observável:** consulta real da Open-Meteo com clima atual, loading,
timeout, falha de rede e resposta inválida tratados.

### Fatia V3 — Previsão de cinco dias

**Objetivo:** entregar o planejamento de curto prazo previsto para Ana e Lucas.

- Domínio: concluir T-05.
- UI: T-17.
- Integração: completar o caminho de forecast em T-11 e T-19.
- Validação: T-22, T-24 e T-25.

**Entrega observável:** cinco dias na ordem correta, com datas no timezone da
cidade e rejeição de resposta parcial.

### Fatia V4 — Unidade e fluxo E2E

**Objetivo:** permitir Celsius/Fahrenheit e proteger o fluxo principal no
navegador.

- UI: T-18.
- Testes: T-23, T-25 e T-26.
- Validação mobile: incluir a viewport mobile no cenário principal de T-26.

**Entrega observável:** alternância imediata de unidade sem novo request e fluxo
principal reproduzível com fixtures.

### Fatia V5 — Hardening e entrega

**Objetivo:** reduzir regressões antes do release.

- Testes de componentes e acessibilidade: concluir T-24.
- Viewports e teclado: T-27.
- Gate final: T-28.

**Entrega observável:** lint, build, testes unitários e E2E passam; matriz de
rastreabilidade e critérios da spec estão revisados.