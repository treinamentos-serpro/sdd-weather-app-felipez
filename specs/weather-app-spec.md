# Weather App — Especificação de Produto

## 1. Overview

O Weather App é uma aplicação web responsiva para consulta rápida do clima de
uma cidade e da previsão dos próximos cinco dias. O produto atende pessoas que
precisam consultar as condições meteorológicas antes de sair, viajar ou
planejar atividades, com prioridade para uso em dispositivos móveis e suporte
também em desktop.

O MVP usa a Open-Meteo para geocodificação e previsão, sem chave de API. A
interface será em português do Brasil, terá Celsius como unidade padrão e
permitirá alternar entre Celsius e Fahrenheit. A janela de previsão é hoje mais
os quatro dias seguintes. O objetivo é oferecer uma consulta rápida, legível e
confiável, inclusive em buscas ambíguas, redes lentas e falhas do serviço
externo.

## 2. Functional Requirements

### FR-01. Busca de localidade

O sistema deve permitir informar o nome de uma cidade ou localidade e iniciar a
busca.

### FR-02. Seleção de localidade ambígua

Quando houver mais de um resultado compatível, o sistema deve exibir opções
distinguíveis para que o usuário selecione a localidade correta.

### FR-03. Exibição do clima atual

Após uma localidade válida ser selecionada, o sistema deve exibir o clima atual
da localidade. As métricas obrigatórias permanecem sujeitas às Open Questions.

### FR-04. Previsão de cinco dias

Após uma localidade válida ser selecionada, o sistema deve exibir hoje e os
quatro dias seguintes, totalizando cinco períodos diários.

### FR-05. Conversão de temperatura

O sistema deve permitir alternar a exibição de temperatura entre Celsius e
Fahrenheit, aplicando a unidade de forma consistente na consulta atual.

### FR-06. Estado de carregamento

Durante a busca de localidade ou previsão, o sistema deve informar que a
operação está em andamento e não deve apresentar dados antigos como resultado
da nova consulta.

### FR-07. Entrada inválida e resultado vazio

O sistema deve tratar busca vazia ou inválida e informar quando nenhuma
localidade compatível for encontrada, mantendo a possibilidade de nova busca.

### FR-08. Falhas de API, rede e timeout

O sistema deve apresentar mensagem compreensível, sem dados incompletos, e uma
ação de nova tentativa quando a geocodificação, a previsão ou a rede falhar.

### FR-09. Estado inicial

Antes de uma busca válida, o sistema deve apresentar a ação principal de
consulta sem exibir dados meteorológicos fictícios.

### FR-10. Responsividade funcional

Busca, seleção, clima atual, previsão e alternância de unidade devem permanecer
legíveis e utilizáveis em telas móveis, tablets e desktop.

### FR-11. Acesso sem autenticação

O MVP deve permitir consultas sem cadastro, login ou autenticação.

### FR-12. Idioma e unidade padrão

Textos, rótulos e mensagens devem estar em pt-BR, e a unidade inicial deve ser
Celsius.

## 3. User Stories

### US-01. Consulta rápida

Como Maria, usuária casual em trânsito, quero buscar uma cidade para consultar
rapidamente as condições do tempo antes de sair, para decidir o que vestir ou
levar.

Requisito relacionado: FR-01 — Busca de localidade.

### US-02. Localidade correta

Como Lucas, usuário prático com rotina de viagem, quero distinguir os resultados
de uma cidade ambígua e selecionar o local correto, para consultar a previsão do
meu destino.

Requisito relacionado: FR-02 — Seleção de localidade ambígua.

### US-03. Clima atual

Como Maria, usuária casual em trânsito, quero visualizar o clima atual da cidade
escolhida, para decidir rapidamente o que fazer ou levar.

Requisito relacionado: FR-03 — Exibição do clima atual.

### US-04. Planejamento de curto prazo

Como Ana, usuária orientada a planejamento, quero ver a previsão de cinco dias
da cidade escolhida, para organizar trabalho, atividades externas e a rotina da
família.

Requisito relacionado: FR-04 — Previsão de cinco dias.

### US-05. Preferência de unidade

Como Lucas, usuário prático com rotina de viagem, quero alternar a unidade de
temperatura, para interpretar os valores com facilidade durante minhas viagens.

Requisito relacionado: FR-05 — Conversão de temperatura.

### US-06. Recuperação de falha

Como Maria, usuária casual em trânsito, quero receber uma mensagem clara quando
a consulta falhar, para saber como tentar novamente e não confiar em dados
ausentes.

Requisito relacionado: FR-08 — Falhas de API, rede e timeout.

### US-07. Uso em diferentes telas

Como Ana, usuária orientada a planejamento, quero consultar o clima em uma
interface legível no celular e no computador, para planejar minha rotina em casa
ou fora dela.

Requisito relacionado: FR-10 — Responsividade funcional.

## 4. Acceptance Criteria

### AC-01. Busca de localidade (FR-01)

- **Given** que o usuário está no estado inicial e informa uma localidade,
  **When** inicia a busca, **Then** o sistema consulta a geocodificação e
  exibe os resultados encontrados.

### AC-02. Seleção de localidade ambígua (FR-02)

- **Given** que a busca retorna mais de uma localidade compatível, **When** os
  resultados são exibidos, **Then** cada opção apresenta cidade, região e país
  quando esses dados estiverem disponíveis.
- **Given** que existem várias opções de localidade, **When** o usuário
  seleciona uma opção, **Then** a previsão carregada corresponde às coordenadas
  da opção selecionada.

### AC-03. Exibição do clima atual (FR-03)

- **Given** que uma localidade válida foi selecionada e a API meteorológica
  respondeu com sucesso, **When** os dados são processados, **Then** o sistema
  exibe a seção de clima atual dessa localidade.
- **Given** que uma nova localidade está sendo consultada, **When** a resposta
  ainda não chegou, **Then** o sistema não apresenta o clima anterior como
  resultado da nova localidade.

### AC-04. Previsão de cinco dias (FR-04)

- **Given** que existe uma resposta meteorológica válida, **When** a previsão é
  renderizada, **Then** o sistema exibe exatamente cinco períodos diários:
  hoje e os quatro dias seguintes.
- **Given** que os cinco períodos foram renderizados, **When** o usuário os
  consulta, **Then** cada período é identificável por data ou dia da semana.

### AC-05. Conversão de temperatura (FR-05)

- **Given** que não existe outra preferência de unidade, **When** a primeira
  consulta é exibida, **Then** todos os valores de temperatura aparecem em
  Celsius.
- **Given** que uma consulta meteorológica está visível, **When** o usuário
  alterna para Fahrenheit, **Then** todos os valores de temperatura visíveis são
  convertidos e identificados como Fahrenheit.
- **Given** que a unidade atual é Fahrenheit, **When** o usuário alterna para
  Celsius, **Then** os valores retornam a Celsius sem nova busca obrigatória.

### AC-06. Estado de carregamento (FR-06)

- **Given** que uma busca de localidade ou previsão foi iniciada, **When** a
  resposta ainda está pendente, **Then** o sistema exibe um estado de loading.
- **Given** que uma requisição está pendente, **When** o usuário observa o
  resultado, **Then** o estado de loading não é apresentado como conteúdo
  meteorológico final.

### AC-07. Entrada inválida e resultado vazio (FR-07)

- **Given** que o campo de busca está vazio ou contém apenas espaços, **When** o
  usuário tenta enviar a busca, **Then** o sistema exibe uma orientação em
  pt-BR e não chama a API.
- **Given** que a geocodificação não encontra localidades, **When** a resposta
  vazia é processada, **Then** o sistema exibe o estado vazio e mantém uma nova
  busca disponível.

### AC-08. Falhas de API, rede e timeout (FR-08)

- **Given** que ocorre erro HTTP, timeout, perda de conexão ou resposta
  inválida, **When** a falha é detectada, **Then** o sistema exibe uma mensagem
  compreensível em pt-BR e não apresenta dados incompletos como sucesso.
- **Given** que uma consulta falhou, **When** o usuário visualiza a mensagem de
  erro, **Then** existe uma ação disponível para tentar novamente.

### AC-09. Estado inicial (FR-09)

- **Given** que o usuário ainda não realizou uma busca válida, **When** a
  aplicação é carregada, **Then** o sistema exibe o campo de busca e não exibe
  uma previsão fictícia.

### AC-10. Responsividade funcional (FR-10)

- **Given** que a aplicação está aberta em uma viewport móvel, tablet ou
  desktop, **When** o usuário busca, seleciona e consulta uma localidade,
  **Then** não ocorre rolagem horizontal nem sobreposição dos elementos
  essenciais.
- **Given** que a aplicação está aberta em qualquer viewport suportada, **When**
  o usuário interage com os controles principais, **Then** eles podem ser
  alcançados por toque e teclado.

### AC-11. Acesso sem autenticação (FR-11)

- **Given** que o usuário acessa o MVP pela primeira vez, **When** inicia uma
  consulta, **Then** consegue fazê-lo sem criar conta, fazer login ou fornecer
  credenciais.

### AC-12. Idioma e unidade padrão (FR-12)

- **Given** que a aplicação está sendo usada no MVP, **When** qualquer texto,
  rótulo ou mensagem é exibido, **Then** seu conteúdo está em pt-BR.
- **Given** que o usuário ainda não alterou a unidade, **When** a primeira
  consulta é exibida, **Then** as temperaturas aparecem em Celsius.

## Traceability Matrix

| User Story | Functional Requirements | Acceptance Criteria | Relevant Non-Functional Requirements |
| --- | --- | --- | --- |
| US-01 — Consulta rápida | FR-01 | AC-01, AC-06, AC-09 | NFR-01 Performance percebida; NFR-02 Responsividade; NFR-03 Acessibilidade |
| US-02 — Localidade correta | FR-02 | AC-02, AC-07 | NFR-02 Responsividade; NFR-03 Acessibilidade; NFR-04 Confiabilidade |
| US-03 — Clima atual | FR-03 | AC-03, AC-05 | NFR-01 Performance percebida; NFR-02 Responsividade; NFR-03 Acessibilidade; NFR-04 Confiabilidade |
| US-04 — Planejamento de curto prazo | FR-04 | AC-04, AC-05 | NFR-01 Performance percebida; NFR-02 Responsividade; NFR-03 Acessibilidade; NFR-04 Confiabilidade |
| US-05 — Preferência de unidade | FR-05 | AC-05, AC-12 | NFR-02 Responsividade; NFR-03 Acessibilidade; NFR-04 Confiabilidade |
| US-06 — Recuperação de falha | FR-08 | AC-08 | NFR-01 Performance percebida; NFR-03 Acessibilidade; NFR-04 Confiabilidade |
| US-07 — Uso em diferentes telas | FR-10 | AC-10 | NFR-02 Responsividade; NFR-03 Acessibilidade |

Cada User Story possui pelo menos um critério de aceite e pelo menos um
requisito não-funcional relacionado. Os IDs devem ser usados como referência na
quebra de tarefas, nos testes automatizados e na revisão de cobertura.

## 5. Non-Functional Requirements

### NFR-01. Performance percebida

O estado inicial deve aparecer imediatamente, e o loading deve ser apresentado
assim que uma busca começar. A espera por serviços externos não deve bloquear a
interação da página.

### NFR-02. Responsividade

A experiência deve ser mobile-first e continuar utilizável em tamanhos de tela
móveis, tablets e desktop, sem perda de conteúdo essencial.

### NFR-03. Acessibilidade

Campos, botões, resultados, mensagens de erro e loading devem ter semântica
adequada. O fluxo principal deve funcionar por teclado, ter foco visível e não
depender apenas de cor para comunicar estado. Contraste e alvos interativos
devem ser adequados para telas pequenas.

### NFR-04. Confiabilidade

Falhas, timeouts, respostas vazias e campos ausentes da Open-Meteo devem ser
tratados sem tela em branco, erro técnico exposto ou informação enganosa.

### NFR-05. Privacidade

O MVP não deve solicitar geolocalização automática, e as consultas devem ser
iniciadas por busca manual. Não deve haver autenticação nem coleta de localização
para o fluxo definido.

### NFR-06. Manutenibilidade

A integração com geocodificação e previsão deve ser separada da apresentação,
com contratos claros e tratamento consistente de sucesso, loading, vazio e erro.

## 6. Edge Cases

### EC-01. Cidade inexistente

Quando o usuário informa uma cidade que não existe ou não pode ser localizada,
o sistema deve tratar o caso como busca sem resultados, não exibir uma previsão
e manter o campo e a ação de nova busca disponíveis.

### EC-02. Input vazio

Quando o usuário envia o campo vazio ou preenchido apenas com espaços, o sistema
deve exibir uma orientação em pt-BR, não chamar a API e manter o foco ou acesso
ao campo para correção.

### EC-03. Caracteres especiais

Quando o usuário informa acentos, hífen, apóstrofo ou outros caracteres válidos
no nome da localidade, o sistema deve preservar o texto na busca e encaminhá-lo
sem quebrar a interface. Se não houver correspondência, deve exibir o estado
sem resultados; não deve exibir dados de outra localidade como aproximação
silenciosa.

### EC-04. Falha de API

Quando a geocodificação ou a previsão retornar erro, resposta inválida ou
indisponibilidade do serviço, o sistema deve exibir uma mensagem compreensível
em pt-BR, não apresentar dados incompletos como sucesso e oferecer nova
tentativa.

### EC-05. Timeout

Quando uma chamada exceder o timeout definido para o produto, o sistema deve
encerrar o estado de loading, informar que a consulta demorou além do limite e
oferecer uma ação de nova tentativa. A tela não deve ficar indefinidamente em
loading.

### EC-06. Geocoding sem resultados

Quando a geocodificação retornar uma lista vazia, o sistema deve exibir uma
mensagem de que nenhuma localidade foi encontrada, não iniciar uma consulta
meteorológica e permitir que o usuário faça outra busca.

### EC-07. Resposta parcial

Quando a API retornar a localidade ou a previsão sem um campo obrigatório para
renderizar o resultado, o sistema deve tratar a resposta como inválida,
informar que os dados não puderam ser carregados e não misturar dados novos
incompletos com dados antigos. Campos opcionais ausentes devem ser tratados
conforme o contrato de dados definido para o MVP.

### EC-08. Concorrência de buscas

Quando uma nova busca for iniciada antes da conclusão da anterior, o sistema
deve exibir apenas o resultado da consulta mais recente e não substituir esse
resultado por uma resposta antiga que chegue depois.

### EC-09. Datas, temperaturas e acessibilidade

- Datas devem respeitar o fuso horário da localidade consultada.
- Temperaturas negativas, muito altas, decimais ou próximas de zero devem ser
  exibidas sem quebrar o layout ou a conversão de unidade.
- Viewport estreita, zoom, fonte aumentada, teclado e leitor de tela não devem
  impedir o acesso aos estados de resultado, vazio e erro.

## 7. Assumptions

- O público inicial está no Brasil e usa pt-BR.
- Open-Meteo é a fonte aprovada para geocodificação e previsão do MVP.
- Cinco dias significa hoje mais os quatro dias seguintes.
- Celsius é a unidade padrão e Fahrenheit é uma alternativa manual.
- O MVP é online e não promete funcionamento offline.
- Busca manual é suficiente; geolocalização automática não faz parte do MVP.
- Não haverá autenticação, favoritos, histórico persistido ou sincronização entre
  dispositivos.
- A Open-Meteo fornece dados suficientes para o MVP, condicionado à definição
  das métricas pendentes.

## 8. Risks

| Risco | Probabilidade | Impacto | Mitigação |
| --- | --- | --- | --- |
| Indisponibilidade ou mudança da Open-Meteo | Alta | Alto | Isolar a integração, validar respostas e oferecer erro e nova tentativa. |
| Latência em redes móveis | Alta | Alto | Exibir loading imediatamente e evitar chamadas duplicadas. |
| Resultados ambíguos | Média | Médio | Exibir opções com cidade, região e país quando disponíveis. |
| Métricas do clima ainda indefinidas | Alta | Alto | Resolver as Open Questions antes do contrato de dados e da UI. |
| Interface ilegível em telas pequenas | Média | Alto | Adotar mobile-first e testar múltiplas viewports. |
| Falhas de acessibilidade | Média | Alto | Validar semântica, foco, teclado, contraste e leitor de tela. |
| Crescimento de escopo | Alta | Alto | Manter fora do MVP favoritos, histórico, geolocalização e alertas. |
| Dados incompletos interpretados como confiáveis | Média | Alto | Validar campos e apresentar estados de erro explícitos. |
| Baixa adoção | Média | Alto | Validar com as personas e definir métricas antes do lançamento. |

## 9. Out of Scope

- Cadastro, login, autenticação e perfis.
- Persistência em servidor, sincronização entre dispositivos e backend próprio.
- Geolocalização automática e solicitação de permissão de localização.
- Favoritos, histórico, múltiplas cidades salvas e comparação persistente.
- Alertas, notificações push e avisos de condições severas.
- Radar, mapas, satélite e visualizações avançadas.
- Previsão horária detalhada.
- Índice UV, qualidade do ar, nascer/pôr do sol, umidade, vento e sensação
  térmica, salvo se forem incluídos na decisão das métricas do MVP.
- Funcionamento offline garantido.
- Idiomas além de pt-BR.
- Analytics e métricas de negócio, até que sejam definidas.

## 10. Open Questions

1. Quais métricas compõem exatamente o clima atual: temperatura, condição,
   sensação térmica, umidade, vento ou outras?
2. Quais campos devem aparecer em cada dia além de temperatura e condição?
3. Quais navegadores, versões e tamanhos mínimos serão suportados oficialmente?
4. Qual timeout deve ocorrer antes de apresentar erro ao usuário?
5. A unidade escolhida vale apenas para a consulta, para a sessão ou entre
   sessões?
6. Deve existir cache local de uma consulta recente? Por quanto tempo?
7. Quais métricas validarão o MVP: tempo até a primeira previsão, buscas
   concluídas, recorrência ou satisfação?
8. A busca deve aceitar apenas cidades ou também regiões, aeroportos e outros
   tipos de localidade?
9. Qual política de privacidade deve ser publicada para as consultas manuais?
10. Há uma diferenciação competitiva que altere as prioridades do MVP?

## 11. Spec Review

Esta revisão identifica pontos que devem ser resolvidos antes do plano técnico
e dos testes automatizados. As sugestões abaixo são propostas de correção; não
substituem as decisões ainda registradas em Open Questions.

### 11.1 Requisitos faltantes

- **Contrato de dados meteorológicos:** FR-03 e FR-04 não definem quais campos
  são obrigatórios no clima atual e em cada dia da previsão. **Sugestão:**
  definir uma lista fechada de campos obrigatórios, seus tipos, unidade, regra
  de arredondamento e comportamento para campos opcionais.
- **Regra de localização e datas:** a spec menciona fuso horário apenas em
  Edge Cases, mas não define como determinar “hoje” nem como formatar datas.
  **Sugestão:** usar o fuso retornado para a localidade selecionada e definir o
  formato de data e o início/fim da janela de cinco dias.
- **Política de nova tentativa:** FR-08 exige retry, mas não define se a ação
  repete a mesma requisição, permite quantas tentativas ou preserva a busca.
  **Sugestão:** definir o comportamento do botão de retry, o número de
  tentativas manuais e se haverá backoff automático.
- **Suporte de plataforma:** FR-10 não define navegadores, versões, larguras
  mínimas ou limites de zoom suportados. **Sugestão:** registrar uma matriz
  mínima de browsers e viewports para orientar testes automatizados e visuais.
- **Acessibilidade verificável:** NFR-03 descreve princípios, mas não define
  critérios observáveis para foco, leitor de tela, contraste e anúncios de
  estado. **Sugestão:** associar critérios aos estados de busca, loading, vazio,
  erro e resultado, incluindo papéis e mensagens acessíveis.
- **Métricas de sucesso:** a spec lista métricas possíveis, mas não escolhe
  nenhuma. **Sugestão:** selecionar métricas, fórmula, evento de medição e meta
  para validar o MVP, ou declarar explicitamente que ficam fora desta entrega.

### 11.2 Ambiguidades

- **“Localidade válida”:** não está claro se inclui somente cidades, regiões,
  aeroportos ou países. **Sugestão:** resolver a Open Question 8 e definir os
  tipos aceitos e rejeitados.
- **“Mensagem compreensível”:** o texto e o estado acessível de erro não estão
  definidos. **Sugestão:** especificar mensagens mínimas por causa do erro,
  incluindo o nome da ação de recuperação.
- **“Campo obrigatório”:** EC-07 depende de um campo obrigatório ainda não
  listado. **Sugestão:** vincular a regra ao contrato de dados aprovado e
  diferenciar ausência de campo obrigatório de ausência de campo opcional.
- **“Timeout definido”:** EC-05 pressupõe um limite que a Open Question 4 ainda
  não responde. **Sugestão:** definir o valor ou declarar que vem de uma
  configuração única do produto e usá-la em todos os critérios.
- **“Todos os valores de temperatura”:** AC-05 não esclarece se inclui clima
  atual, previsão e valores mínimo/máximo. **Sugestão:** enumerar os elementos
  afetados e definir precisão e arredondamento da conversão.
- **“Viewport suportada”:** AC-10 usa esse termo sem uma matriz de suporte.
  **Sugestão:** substituir por larguras e browsers definidos no requisito de
  plataforma.

### 11.3 Inconsistências

- **Métricas indefinidas versus critérios de sucesso:** FR-03 e AC-03 exigem
  exibição do clima atual, enquanto a spec admite que suas métricas estão em
  aberto. **Sugestão:** bloquear a aprovação do requisito até definir o conjunto
  mínimo, ou tornar o AC explicitamente dependente de um contrato aprovado.
- **Previsão diária versus escopo de dados:** AC-04 exige campos meteorológicos
  “definidos para o MVP”, mas esses campos não estão definidos; ao mesmo tempo,
  Out of Scope exclui várias métricas “salvo se” forem incluídas. **Sugestão:**
  mover a decisão para uma única tabela de escopo, sem exceção condicional.
- **Timeout pendente versus comportamento obrigatório:** EC-05 determina o
  comportamento após o timeout, mas a duração continua em Open Questions.
  **Sugestão:** manter o cenário como regra, mas adicionar o valor configurável
  ao requisito antes de implementar ou testar tempo-limite.
- **Responsividade e acessibilidade sobrepostas:** FR-10 exige teclado, embora
  a acessibilidade pertença principalmente a NFR-03, sem critérios equivalentes
  de foco e semântica. **Sugestão:** deixar FR-10 restrito ao layout e mover a
  interação por teclado para critérios de NFR-03, evitando responsabilidade
  duplicada.
- **Unidade padrão duplicada:** AC-05 e AC-12 verificam a mesma condição de
  Celsius inicial. **Sugestão:** manter a regra em AC-12 e usar AC-05 apenas
  para conversão, incluindo uma verificação de que não ocorre nova chamada.

### 11.4 Critérios de aceite fracos ou não verificáveis

- **AC-01, “exibe os resultados encontrados”:** não define o estado para lista
  vazia nem a quantidade ou os campos mínimos. **Sugestão:** exigir lista com
  zero ou mais resultados e definir os campos obrigatórios de cada resultado.
- **AC-02, “quando disponíveis”:** torna a presença de cidade, região e país
  dependente da resposta sem regra de fallback. **Sugestão:** definir quais
  campos são obrigatórios e qual identificador alternativo será usado quando um
  campo não existir.
- **AC-03, “exibe a seção de clima atual”:** uma seção vazia satisfaria o texto.
  **Sugestão:** exigir os campos do contrato de clima atual e a localidade
  selecionada visível.
- **AC-04, “identificável por data ou dia da semana”:** permite duas saídas e
  não verifica a ordem dos cinco dias. **Sugestão:** fixar o formato, o fuso e a
  sequência hoje, hoje + 1 até hoje + 4.
- **AC-05, “convertidos”:** não define tolerância numérica nem arredondamento.
  **Sugestão:** definir a fórmula, a precisão exibida e comparar o valor
  convertido com tolerância explícita.
- **AC-06, “exibe um estado de loading”:** não define um sinal observável.
  **Sugestão:** exigir papel ou rótulo acessível de loading e sua remoção após
  sucesso, vazio ou erro.
- **AC-08, “mensagem compreensível”:** não é um resultado determinístico para
  teste. **Sugestão:** definir mensagens ou códigos de estado por erro e exigir
  uma ação identificável de retry.
- **AC-09, “não exibe previsão fictícia”:** não define quais elementos devem
  estar ausentes. **Sugestão:** afirmar que clima atual, previsão e unidade de
  temperatura não aparecem antes de uma resposta válida.
- **AC-10, “sem sobreposição”:** é difícil validar sem thresholds de layout.
  **Sugestão:** definir viewports, ausência de overflow horizontal e um conjunto
  de elementos que deve permanecer visível e operável.
- **AC-11, “consegue fazê-lo”:** não define como verificar a ausência de
  autenticação. **Sugestão:** exigir que a rota inicial mostre busca operável e
  não redirecione para login ou solicite credenciais.
- **AC-12, “em pt-BR”:** não define quais textos entram na verificação.
  **Sugestão:** listar rótulos, mensagens e nomes de dias a validar, incluindo
  mensagens de erro e loading.