# Overview

O Weather App é uma aplicação web que permite ao usuário buscar uma cidade, consultar o clima atual e visualizar a previsão dos próximos 5 dias. O produto foi concebido para entregar uma experiência rápida, clara e confiável, com foco principal em uso mobile e em leitura imediata de informações meteorológicas.

A aplicação utilizará a API Open-Meteo como fonte de dados, sem autenticação e sem persistência no servidor. O idioma da interface será em português do Brasil, o padrão de temperatura será Celsius e o usuário poderá alternar para Fahrenheit por ação explícita.

O objetivo do produto é permitir que o usuário responda rapidamente a perguntas como “qual é o clima agora?” e “qual será a previsão para os próximos dias?”, sem exigir cadastro, navegação complexa ou conhecimento técnico.

## Escopo e contrato de dados

- O fluxo principal é: submeter cidade, selecionar uma localidade quando houver múltiplas correspondências e consultar clima atual e previsão. A busca só é enviada após Enter ou acionamento de Buscar, não a cada tecla.
- O geocoding usa a Open-Meteo Geocoding API com `count=5`. Antes do envio, a consulta deve ser removida de espaços nas extremidades, normalizada em Unicode NFC e codificada como parâmetro de URL. Após remover espaços, consultas com menos de dois pontos de código Unicode são rejeitadas localmente; a ordem dos resultados da API é preservada.
- Cada resultado de geocoding deve fornecer nome não vazio e coordenadas numéricas finitas dentro dos limites latitude `[-90, 90]` e longitude `[-180, 180]`. Descartar resultados inválidos; se a resposta não vazia não contiver nenhum resultado válido, apresentar erro de resposta inválida, não estado vazio. Exibir também `admin1` e país quando disponíveis. Clima só pode ser solicitado após a seleção automática de resultado único ou escolha explícita entre múltiplos resultados.
- O clima usa a Open-Meteo Forecast API, consultada por latitude e longitude, nunca pelo texto digitado. Solicitar `current=temperature_2m,weather_code`, `daily=temperature_2m_min,temperature_2m_max,weather_code`, `forecast_days=5`, `timezone=auto` e `temperature_unit=celsius`.
- A resposta de previsão deve incluir `timezone` válido como identificador IANA, `current.time` ISO 8601 e `daily.time` como array de datas ISO. Temperaturas devem ser números finitos; códigos meteorológicos devem ser inteiros. Arrays diários são associados pela mesma posição em `daily.time`; arrays com comprimentos diferentes são tratados como dados parciais.
- `current.time` e `daily.time` são horários/datas locais da localidade. Os campos de cada resposta devem ser validados antes de serem apresentados. Sem `timezone` válido ou `daily.time` utilizável, somente a seção de previsão falha; sem `current.time`, exibir os dados atuais válidos sem o horário de observação.
- O produto não deve fazer polling nem retentativas automáticas. Uma nova chamada ocorre por nova busca, seleção de resultado ou acionamento explícito de tentar novamente.

### Descrições de condição meteorológica

O campo Open-Meteo `weather_code` deve ser convertido para uma descrição em português do Brasil. Usar os grupos WMO abaixo; código fora da tabela deve resultar em “Condição indisponível”.

| Códigos | Descrição |
| --- | --- |
| 0 | Céu limpo |
| 1 | Predominantemente limpo |
| 2 | Parcialmente nublado |
| 3 | Encoberto |
| 45, 48 | Neblina |
| 51, 53, 55 | Garoa |
| 56, 57 | Garoa congelante |
| 61, 63, 65 | Chuva |
| 66, 67 | Chuva congelante |
| 71, 73, 75, 77 | Neve |
| 80, 81, 82 | Pancadas de chuva |
| 85, 86 | Pancadas de neve |
| 95, 96, 99 | Trovoada |

## Functional Requirements

### FR-01 — Buscar e selecionar localidade
- O sistema deve permitir que o usuário insira o nome de uma cidade e execute a busca.
- A busca aceita cidades e localidades retornadas pelo geocoding; não oferece busca dedicada por pontos de interesse.
- Resultados múltiplos devem permitir seleção por teclado e toque. Um único resultado é selecionado automaticamente.
- Critérios de aceitação:
  - Given uma consulta com pelo menos dois pontos de código Unicode, when o usuário pressionar Enter ou acionar Buscar, then o sistema deve iniciar o geocoding e exibir o estado de carregamento.
  - Given mais de uma localidade retornada, when os resultados forem exibidos, then devem aparecer no máximo cinco opções, na ordem da API, identificadas por nome, região e país quando disponíveis; nenhuma chamada meteorológica deve ocorrer antes da seleção.
  - Given o geocoding retornar exatamente uma localidade, when a resposta for recebida, then o sistema deve selecioná-la e carregar o clima e a previsão.
  - Given o geocoding retornar uma lista vazia, when a resposta for recebida com sucesso, then o sistema deve exibir “Nenhuma cidade encontrada” e não solicitar dados meteorológicos.

### FR-02 — Exibir clima atual
- O sistema deve exibir o clima atual da cidade selecionada.
- A tela deve incluir temperatura atual e condição climática, usando os campos de temperatura atual e código de condição meteorológica retornados pela Open-Meteo.
- A localidade selecionada deve ser exibida junto aos dados. Exibir também o horário de observação recebido em `current.time`, formatado no fuso da localidade.
- Critérios de aceitação:
  - Given temperatura e código de condição válidos, when a resposta for processada, then o sistema deve exibir temperatura, unidade ativa, descrição mapeada e horário local da observação.
  - Given que a temperatura esteja ausente ou inválida, when os dados forem processados, then o sistema deve exibir “Clima atual indisponível” no lugar do valor e não mostrar temperatura de uma busca anterior.
  - Given que o código de condição esteja ausente, inválido ou não mapeado, when os dados forem processados, then o sistema deve exibir a temperatura válida e “Condição indisponível” para a descrição.

### FR-03 — Exibir previsão de cinco dias
- O sistema deve mostrar cinco datas consecutivas: a data atual e as quatro seguintes, calculadas no fuso horário da localidade selecionada.
- Cada data deve apresentar temperatura mínima e máxima e uma descrição da condição climática. As temperaturas devem usar a unidade ativa.
- Critérios de aceitação:
  - Given dados diários válidos, when a previsão for processada, then o sistema deve exibir exatamente cinco datas locais consecutivas em ordem cronológica, com dia da semana e data no formato `dd/MM`.
  - Given a resposta conter datas anteriores ou mais de cinco datas, when os dados forem processados, then o sistema deve exibir somente a data local atual e as quatro datas seguintes.
  - Given um campo diário ausente ou inválido, when a previsão for exibida, then a posição daquele dia deve permanecer e somente o campo afetado deve aparecer como indisponível.
  - Given que a chamada da previsão falhe, when a resposta retornar erro ou timeout, then o sistema deve manter a seção de clima atual se ela tiver sido carregada e mostrar erro e opção de nova tentativa na seção de previsão.

### FR-04 — Alternar unidade de temperatura
- O usuário deve poder alternar entre Celsius e Fahrenheit.
- A conversão deve usar os valores Celsius recebidos, sem converter valores já arredondados. Exibir temperaturas arredondadas para o inteiro mais próximo, com empates afastados de zero, e indicar `°C` ou `°F` junto aos valores.
- A conversão de Celsius para Fahrenheit deve usar $F = (C \times 9/5) + 32$; a conversão inversa deve usar $C = (F - 32) \times 5/9$.
- Critérios de aceitação:
  - Given que o usuário abra a aplicação sem uma unidade previamente selecionada, when os dados de temperatura forem exibidos, then a unidade ativa deve ser Celsius (`°C`).
  - Given valores meteorológicos carregados, when o usuário selecionar Fahrenheit, then temperatura atual, mínima e máxima devem ser convertidas a partir dos valores de origem, arredondadas e identificadas com `°F`.
  - Given valores meteorológicos carregados, when o usuário selecionar Celsius, then temperatura atual, mínima e máxima devem ser convertidas a partir dos valores de origem, arredondadas e identificadas com `°C`.
  - Given a unidade for alterada durante uma requisição, when os dados forem recebidos, then todos os valores devem ser exibidos na unidade que estiver ativa naquele momento.

### FR-05 — Estados de carregamento, vazio e erro
- O sistema deve informar ao usuário quando a busca está em andamento, quando não há resultados e quando a requisição falhou.
- Critérios de aceitação:
  - Given uma requisição em andamento, when o usuário a iniciar, then o sistema deve exibir um indicador de carregamento e desabilitar apenas o controle que iniciou aquela operação.
  - Given uma falha de geocoding, when a operação terminar, then o sistema deve exibir “Não foi possível buscar cidades. Tente novamente.”; falha no clima atual deve exibir “Não foi possível carregar o clima atual. Tente novamente.”; falha na previsão deve exibir “Não foi possível carregar a previsão. Tente novamente.”
  - Given uma falha de rede, erro HTTP, resposta inválida ou timeout, when a operação terminar, then o sistema deve encerrar o carregamento, anunciar o erro e disponibilizar nova tentativa manual para a operação afetada.
  - Given uma nova busca, when ela terminar sem resultados, then o sistema deve mostrar “Nenhuma cidade encontrada”; erros técnicos não devem ser apresentados como ausência de resultados.

### FR-06 — Usabilidade responsiva
- A interface deve ser utilizável em dispositivos móveis e adaptar-se a telas menores.
- Critérios de aceitação:
  - Given viewports de 320, 375, 768 e 1280 CSS pixels de largura, when a tela for carregada, then não deve haver rolagem horizontal nem conteúdo cortado.
  - Given qualquer viewport suportada, when o usuário interagir com busca, seleção de cidade, unidade ou nova tentativa, then os controles devem estar visíveis, identificados e operáveis sem zoom manual.
  - Given um controle interativo, when exibido em qualquer viewport, then sua área de toque deve medir pelo menos 44 por 44 CSS pixels.

## User Stories

1. Como Maria, quero consultar o clima atual e os próximos cinco dias de uma cidade para decidir o que vestir e levar.
2. Como Lucas, quero distinguir cidades com nomes iguais e consultar a localidade correta durante uma viagem.
3. Como Ana, quero alternar entre Celsius e Fahrenheit para interpretar temperaturas conforme minha preferência.
4. Como pessoa usuária de celular, quero buscar e consultar o clima sem rolagem horizontal e receber feedback claro quando a consulta falhar.

## Rastreabilidade das User Stories

Os critérios de aceite canônicos estão nos requisitos funcionais e em Edge Cases; as histórias abaixo apontam para esses critérios para evitar duplicação.

- Story 1: FR-01, FR-02 e FR-03.
- Story 2: FR-01.
- Story 3: FR-04.
- Story 4: FR-05 e FR-06.

## Non-Functional Requirements

### 1. Performance
- Após Enter, seleção ou acionamento de nova tentativa, a interface deve apresentar feedback de carregamento em até 100 ms.
- Depois de receber a última resposta necessária com sucesso, a interface deve renderizar os dados daquela operação em até 1 segundo.
- Cada requisição externa deve ser abortada após 10 segundos; o limite é medido por requisição, não pelo fluxo completo.
- Enquanto houver requisição, controles não relacionados a ela devem continuar operáveis.

### 2. Accessibility
- A aplicação deve atender WCAG 2.2 nível AA, incluindo contraste mínimo de 4,5:1 para texto comum e 3:1 para texto grande e componentes gráficos relevantes.
- Busca, resultados, seletor de unidade e novas tentativas devem ser operáveis por teclado, possuir nome acessível e foco visível; a navegação não pode criar armadilha de teclado.
- Carregamento e resultados devem ser anunciados por uma região com papel `status`; erros devem ser anunciados por uma região com papel `alert`.
- A verificação automatizada de acessibilidade não deve encontrar violações críticas ou graves; a validação manual de teclado e leitor de tela continua obrigatória.

### 3. Responsiveness
- A interface deve funcionar em larguras de 320 a 1280 CSS pixels, sem rolagem horizontal ou sobreposição de conteúdo.
- Controles interativos devem ter área de toque mínima de 44 por 44 CSS pixels.
- A validação visual deve cobrir 320, 375, 768 e 1280 CSS pixels de largura, em orientação retrato e paisagem quando aplicável.

### 4. Compatibilidade
- A aplicação deve funcionar nas duas versões estáveis mais recentes de Chrome, Edge, Firefox e Safari, incluindo Safari em iOS e Chrome em Android.
- O layout e o fluxo de busca devem ser testados ao menos em Chromium desktop e em Safari ou Chromium mobile.

### 5. Availability and resilience
- Falha no geocoding, clima atual ou previsão deve ser isolada à operação/seção afetada; dados já carregados para a mesma localidade permanecem visíveis e identificados.
- Retentativas são iniciadas pelo usuário. Para HTTP 429, não reenviar automaticamente; se `Retry-After` estiver presente, desabilitar a retentativa até o prazo informado e comunicá-lo ao usuário.

### 6. Localization
- A interface deve estar em português do Brasil.
- Mensagens e descrições das condições meteorológicas devem estar em português do Brasil; códigos meteorológicos da API não devem ser exibidos diretamente.
- Datas devem usar o fuso horário da localidade consultada e o formato de dia da semana abreviado e `dd/MM`; números decimais devem usar vírgula.

### 7. Security and privacy
- O usuário não precisa autenticar-se para usar o fluxo principal da aplicação.
- Consultas de cidade e coordenadas selecionadas são enviadas à Open-Meteo por HTTPS; não enviar outros dados pessoais.
- A aplicação não deve persistir consultas, coordenadas ou preferências em servidor, armazenamento local ou cookies no MVP.

## Edge Cases

1. Busca vazia, só com espaços ou menor que dois caracteres: impedir a requisição, exibir “Digite o nome de uma cidade” para entrada vazia ou “Digite pelo menos 2 caracteres” para consulta curta e manter o foco no campo.
2. Caracteres de entrada: preservar acentos, hífens, apóstrofos e Unicode válido; rejeitar caracteres de controle sem enviar a requisição. Consulta sem correspondência é estado vazio, não erro de validação.
3. Geocoding sem resultados: exibir “Nenhuma cidade encontrada”, não disparar chamadas meteorológicas e não rotular dados anteriores como resultado novo.
4. API offline, HTTP 4xx/5xx, JSON inválido ou resposta sem estrutura obrigatória: encerrar o carregamento e exibir a mensagem de erro correspondente à operação. Distinguir falha técnica de geocoding bem-sucedido sem resultados; em 429, não retentar automaticamente e, se houver `Retry-After`, manter a ação de tentar novamente desabilitada até o prazo.
5. Timeout: ao completar 10 segundos por requisição, abortá-la, encerrar o carregamento e exibir “A consulta excedeu o tempo limite. Tente novamente.” com ação manual de nova tentativa. Uma requisição cancelada por busca mais recente não deve exibir mensagem de timeout.
6. Resposta parcial: temperatura atual ausente torna apenas o valor atual indisponível; código de condição ausente/desconhecido torna apenas a descrição indisponível. Previsão incompleta mantém cinco datas e marca individualmente cada campo ausente.
7. Falha de uma das chamadas de clima: manter visível a seção carregada com sucesso e permitir tentar novamente somente a seção com falha.
8. Buscas fora de ordem: somente a resposta da busca mais recente pode atualizar resultados e clima; respostas anteriores devem ser ignoradas ou canceladas.
9. Troca de unidade durante carregamento: aplicar a unidade ativa no momento da renderização, convertendo os valores Celsius de origem sem arredondamento intermediário.
10. Geocoding malformado: descartar resultados sem nome ou com coordenadas inválidas; se todos os resultados forem inválidos, exibir erro de resposta inválida e não iniciar chamadas meteorológicas.

## Dependências e limites operacionais

- A disponibilidade e os dados meteorológicos dependem da Open-Meteo; o produto não promete funcionamento offline nem disponibilidade independente do provedor.
- Não há cache persistente nem atualização automática. Em falhas, os dados carregados para a mesma localidade permanecem identificados na tela e o usuário pode solicitar nova tentativa.
- Se o geocoding não fornecer região ou país, a interface exibe somente os campos disponíveis; a desambiguação não pode inventar esses dados.

## Out of Scope

1. Cadastro, autenticação, favoritos, histórico e persistência de consultas ou preferências.
2. Geolocalização automática, pontos de interesse, bairros e busca por aeroportos.
3. Alertas, notificações push, dados históricos, mapas, radar e comparação de localidades.
4. Funcionamento offline, atualização automática e idiomas diferentes de pt-BR.
