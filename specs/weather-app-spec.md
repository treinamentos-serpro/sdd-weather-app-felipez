# Overview

O Weather App é uma aplicação web que permite ao usuário buscar uma cidade, consultar o clima atual e visualizar a previsão dos próximos 5 dias. O produto foi concebido para entregar uma experiência rápida, clara e confiável, com foco principal em uso mobile e em leitura imediata de informações meteorológicas.

A aplicação utilizará a API Open-Meteo como fonte de dados, sem autenticação e sem persistência no servidor. O idioma da interface será em português do Brasil, o padrão de temperatura será Celsius e o usuário poderá alternar para Fahrenheit por ação explícita.

O objetivo do produto é permitir que o usuário responda rapidamente a perguntas como “qual é o clima agora?” e “qual será a previsão para os próximos dias?”, sem exigir cadastro, navegação complexa ou conhecimento técnico.

## Functional Requirements

### 1. Search city by name
- O sistema deve permitir que o usuário insira o nome de uma cidade e execute a busca.
- A busca aceita nomes de cidades e localidades retornadas pelo serviço de geocoding; não aceita pontos de interesse como aeroportos ou bairros como categoria de busca dedicada.
- Cada resultado deve identificar a localidade por nome, região administrativa quando disponível e país. Se houver mais de um resultado, o usuário deve escolher um antes de carregar o clima; se houver exatamente um, ele deve ser selecionado automaticamente.
- Critérios de aceitação:
  - Given um nome de cidade válido, when o usuário pressionar Enter ou acionar Buscar, then o sistema deve iniciar o geocoding e exibir o estado de carregamento.
  - Given o geocoding retornar mais de uma localidade, when os resultados forem exibidos, then cada opção deve mostrar nome, região disponível e país e o sistema só deve carregar o clima após a escolha do usuário.
  - Given o geocoding retornar exatamente uma localidade, when a resposta for recebida, then o sistema deve selecioná-la e carregar o clima e a previsão.
  - Given o geocoding retornar uma lista vazia, when a resposta for recebida com sucesso, then o sistema deve exibir “Nenhuma cidade encontrada” e não solicitar dados meteorológicos.

### 2. Display current weather
- O sistema deve exibir o clima atual da cidade selecionada.
- A tela deve incluir temperatura atual e condição climática, usando os campos de temperatura atual e código de condição meteorológica retornados pela Open-Meteo.
- A localidade selecionada deve ser exibida junto aos dados para que o usuário possa confirmar qual cidade está consultando.
- Critérios de aceitação:
  - Given temperatura e código de condição válidos, when a resposta for processada, then o sistema deve exibir a temperatura arredondada para o inteiro mais próximo, a unidade ativa e a descrição da condição em português.
  - Given que a temperatura esteja ausente ou inválida, when os dados forem processados, then o sistema deve exibir “Clima atual indisponível” no lugar do valor e não mostrar temperatura de uma busca anterior.
  - Given que apenas o código de condição esteja ausente ou inválido, when os dados forem processados, then o sistema deve exibir a temperatura válida e “Condição indisponível” para a descrição.

### 3. Display 5-day forecast
- O sistema deve mostrar cinco datas consecutivas: a data atual e as quatro seguintes, calculadas no fuso horário da localidade selecionada.
- Cada data deve apresentar temperatura mínima e máxima e uma descrição da condição climática. As temperaturas devem usar a unidade ativa.
- Critérios de aceitação:
  - Given dados diários válidos, when a previsão for processada, then o sistema deve exibir exatamente cinco posições em ordem cronológica, começando pela data local atual.
  - Given a resposta conter datas anteriores ou mais de cinco datas, when os dados forem processados, then o sistema deve exibir somente a data local atual e as quatro datas seguintes.
  - Given que um dia ou um de seus campos esteja ausente ou inválido, when a previsão for exibida, then a posição daquele dia deve permanecer e identificar como indisponíveis somente os campos ausentes.
  - Given que a chamada da previsão falhe, when a resposta retornar erro ou timeout, then o sistema deve manter a seção de clima atual se ela tiver sido carregada e mostrar erro e opção de nova tentativa na seção de previsão.

### 4. Toggle temperature unit
- O usuário deve poder alternar entre Celsius e Fahrenheit.
- A conversão deve usar os valores numéricos de origem, sem converter valores já arredondados. Exibir temperaturas arredondadas para o inteiro mais próximo e indicar `°C` ou `°F` junto aos valores.
- A conversão de Celsius para Fahrenheit deve usar $F = (C \times 9/5) + 32$; a conversão inversa deve usar $C = (F - 32) \times 5/9$.
- Critérios de aceitação:
  - Given que o usuário abra a aplicação sem uma unidade previamente selecionada, when os dados de temperatura forem exibidos, then a unidade ativa deve ser Celsius (`°C`).
  - Given valores meteorológicos carregados, when o usuário selecionar Fahrenheit, then temperatura atual, mínima e máxima devem ser convertidas a partir dos valores de origem, arredondadas e identificadas com `°F`.
  - Given valores meteorológicos carregados, when o usuário selecionar Celsius, then temperatura atual, mínima e máxima devem ser convertidas a partir dos valores de origem, arredondadas e identificadas com `°C`.
  - Given a unidade for alterada durante uma requisição, when os dados forem recebidos, then todos os valores devem ser exibidos na unidade que estiver ativa naquele momento.

### 5. Loading, empty and error states
- O sistema deve informar ao usuário quando a busca está em andamento, quando não há resultados e quando a requisição falhou.
- Critérios de aceitação:
  - Given uma requisição em andamento, when o usuário a iniciar, then o sistema deve exibir um indicador de carregamento e desabilitar apenas o controle que iniciou aquela operação.
  - Given uma falha de rede, erro HTTP, resposta inválida ou timeout, when a operação terminar, then o sistema deve encerrar o carregamento, exibir uma mensagem em português que identifique a operação que falhou e disponibilizar uma ação para tentar novamente.
  - Given uma nova busca, when ela terminar sem resultados, then o sistema deve mostrar “Nenhuma cidade encontrada”; erros técnicos não devem ser apresentados como ausência de resultados.

### 6. Support mobile usage
- A interface deve ser utilizável em dispositivos móveis e adaptar-se a telas menores.
- Critérios de aceitação:
  - Given viewports de 320, 375, 768 e 1280 CSS pixels de largura, when a tela for carregada, then não deve haver rolagem horizontal nem conteúdo cortado.
  - Given qualquer viewport suportada, when o usuário interagir com busca, seleção de cidade, unidade ou nova tentativa, then os controles devem estar visíveis, identificados e operáveis sem zoom manual.
  - Given um controle interativo, when exibido em qualquer viewport, then sua área de toque deve medir pelo menos 44 por 44 CSS pixels.

## User Stories

1. Como Maria, usuária casual em trânsito, quero buscar uma cidade rapidamente para saber se preciso levar guarda-chuva ou uma camada extra antes de sair de casa.
2. Como Lucas, usuário prático com rotina de viagem, quero consultar a previsão dos próximos 5 dias para planejar deslocamentos, compromissos e itens que devo levar.
3. Como Ana, usuária orientada a planejamento, quero visualizar a previsão de 5 dias para organizar melhor trabalho, rotina e atividades externas.
4. Como Maria, usuária casual em trânsito, quero ver o clima atual da cidade selecionada para decidir rapidamente o que vestir no momento.
5. Como Lucas, usuário prático com rotina de viagem, quero alternar entre Celsius e Fahrenheit para comparar temperaturas conforme minha preferência e contexto de viagem.
6. Como Ana, usuária orientada a planejamento, quero receber feedback claro em carregamento, erro e ausência de resultados para confiar na aplicação ao consultar a previsão.
7. Como Maria, usuária casual em trânsito, quero uma interface legível e simples no celular para consultar o clima sem esforço em poucos segundos.
8. Como Lucas, usuário prático com rotina de viagem, quero que a previsão de 5 dias seja fácil de ler em mobile e desktop para tomar decisões rápidas em diferentes contextos de uso.

> Cada story acima está conectada aos requisitos funcionais de busca, clima atual, previsão de 5 dias, unidade de temperatura e estados de carregamento/erro.

## Rastreabilidade das User Stories

Os critérios de aceite canônicos estão nos requisitos funcionais e em Edge Cases; as histórias abaixo apontam para esses critérios para evitar duplicação.

- Story 1: requisitos funcionais 1, 2 e 3.
- Story 4: requisito funcional 2.
- Stories 2 e 3: requisito funcional 3.
- Story 5: requisito funcional 4.
- Story 6: requisito funcional 5 e Edge Cases 4 e 5.
- Story 7: requisito funcional 6.
- Story 8: requisitos funcionais 3 e 6.

## Non-Functional Requirements

### 1. Performance
- Ao iniciar uma busca ou nova tentativa, a interface deve apresentar feedback em até 100 ms.
- Após a resposta bem-sucedida da API, a interface deve renderizar os dados em até 1 segundo.
- Requisições individuais à API devem expirar após 10 segundos; a interface deve permanecer interativa durante a espera.

### 2. Accessibility
- A aplicação deve atender WCAG 2.2 nível AA, incluindo contraste mínimo de 4,5:1 para texto comum e 3:1 para texto grande e componentes gráficos relevantes.
- Busca, resultados, seletor de unidade e novas tentativas devem ser operáveis por teclado, ter rótulos acessíveis e foco visível.
- Estados de carregamento, erro e ausência de resultados devem ser anunciados por tecnologia assistiva sem exigir que o usuário procure a mensagem visualmente.

### 3. Responsiveness
- A interface deve funcionar em larguras de 320 a 1280 CSS pixels, sem rolagem horizontal ou sobreposição de conteúdo.
- Controles interativos devem ter área de toque mínima de 44 por 44 CSS pixels.

### 4. Availability and resilience
- A aplicação deve lidar com latência ou falha da API sem travar ou quebrar a experiência do usuário.
- Em caso de indisponibilidade do serviço, o sistema deve mostrar uma mensagem clara e manter a interface estável.

### 5. Localization
- A interface deve estar em português do Brasil.
- Mensagens e descrições das condições meteorológicas devem estar em português do Brasil; códigos meteorológicos da API não devem ser exibidos diretamente.
- Datas devem usar o fuso horário da localidade consultada e o formato `dd/mm`; números decimais devem usar vírgula.

### 6. Security and privacy
- O usuário não precisa autenticar-se para usar o fluxo principal da aplicação.
- O sistema não deve persistir dados de usuário no servidor no escopo do MVP.

## Edge Cases

1. Cidade inexistente ou geocoding sem resultados
- Dado que o geocoding responda com sucesso e sem correspondências, quando o usuário submeter a busca, então o sistema deve exibir “Nenhuma cidade encontrada”, não apresentar os dados da busca anterior como resultado atual e permitir nova busca.

2. Input vazio ou composto apenas por espaços
- Dado que o campo esteja vazio ou contenha apenas espaços em branco, quando o usuário tentar buscar, então o sistema deve impedir qualquer requisição, exibir “Digite o nome de uma cidade” e manter o foco no campo para correção.

3. Caracteres especiais
- Dado que o nome contenha acentos, cedilha, hífen, apóstrofo ou caracteres Unicode válidos, quando o usuário buscar, então o sistema deve preservar e codificar corretamente a consulta.
- Dado que a entrada contenha caracteres de controle, quando o usuário tentar buscar, então o sistema deve rejeitá-la sem enviar a requisição e exibir uma mensagem de validação. Pontuação ou escrita não reconhecida pelo geocoding deve resultar no estado “Nenhuma cidade encontrada”, não em erro de validação.

4. Falha de API ou de conectividade
- Dado que uma requisição falhe por erro HTTP, resposta inválida ou falta de conexão, quando o sistema tentar carregar geocoding ou dados meteorológicos, então deve exibir uma mensagem de erro compreensível, encerrar o estado de carregamento e disponibilizar nova tentativa para a operação que falhou.
- Uma falha técnica não deve ser apresentada como “cidade não encontrada”.
- Se clima atual ou previsão carregar com sucesso enquanto a outra operação falhar, a seção bem-sucedida deve permanecer visível e a seção com falha deve informar o erro e permitir nova tentativa independente.

5. Timeout
- Dado que uma requisição individual exceda 10 segundos, quando o prazo for atingido, então o sistema deve abortar a requisição, encerrar seu indicador de carregamento e exibir “A consulta demorou demais. Tente novamente.” com ação de nova tentativa.

6. Resposta parcial
- Dado que a resposta meteorológica esteja incompleta, quando houver campos ausentes ou inválidos, então o sistema deve exibir os campos válidos e identificar os indisponíveis, sem inventar valores.
- Se faltar a temperatura atual, o painel deve indicar “Clima atual indisponível”; se faltar apenas a condição, deve exibir a temperatura e “Condição indisponível”. Para a previsão, o sistema deve manter as cinco datas e marcar individualmente os campos ausentes como indisponíveis.

7. Troca de unidade durante carregamento
- Se o usuário trocar de unidade enquanto a resposta estiver sendo carregada, o sistema deve preservar a unidade selecionada e apresentar todos os valores recebidos nessa unidade quando a renderização terminar.

8. Buscas consecutivas
- Dado que o usuário inicie uma nova busca antes de a anterior terminar, quando as respostas chegarem fora de ordem, então somente os resultados da busca mais recente podem atualizar a interface.

## Assumptions

1. A aplicação é uma solução web front-end, sem banco de dados e sem persistência de servidor.
2. A fonte de dados será a Open-Meteo, sem necessidade de API key.
3. A previsão contém cinco datas locais consecutivas, começando pela data atual da localidade consultada.
4. Celsius será a unidade padrão e Fahrenheit será uma opção de conversão do usuário.
5. O produto prioriza uso em mobile, mas deve continuar funcional em telas maiores.
6. O escopo do produto é de consulta informacional rápida, sem recursos avançados de alertas, histórico ou comparação complexa.

## Risks

1. Dependência da API externa
- Se a API de clima tiver latência alta ou indisponibilidade, a experiência do usuário pode ser afetada diretamente.

2. Respostas incompletas da API
- Campos ausentes ou inconsistentes podem resultar em dados incorretos ou interface quebrada.

3. Experiência mobile inadequada
- Falhas de responsividade podem causar baixa adoção, principalmente em celulares.

4. Acessibilidade insuficiente
- Falhas de contraste, foco ou semântica podem dificultar o uso e reduzir o alcance do produto.

5. Ambiguidade na busca por cidade
- Cidades homônimas ainda podem ser confundidas se os dados de região ou país forem insuficientes; a lista de resultados deve mostrar essas informações sempre que a API as fornecer.

## Out of Scope

1. Autenticação e cadastro de usuários.
2. Persistência de dados no servidor.
3. Histórico de consultas ou favoritos.
4. Alertas severos ou notificação push.
5. Dados climáticos históricos complexos.
6. Mapas interativos ou radar meteorológico.
7. Suporte multilíngue além do PT-BR.
8. Funcionalidade offline completa, além de tratamento de erro degradado.
9. Geolocalização automática; no MVP, o usuário seleciona manualmente a localidade.

## Open Questions

1. Em versões futuras, haverá necessidade de favoritos, histórico de consultas ou comparação entre localidades?

## Decision Log

- Fonte de dados: Open-Meteo (sem API key).
- Definição de previsão: cinco datas locais consecutivas, começando pela data atual no fuso da localidade selecionada.
- Seleção de localidade: selecionar automaticamente um único resultado de geocoding; exigir escolha explícita quando houver múltiplos resultados.
- Unidade padrão: Celsius.
- Conversão e apresentação de temperatura: conversão a partir dos valores de origem, arredondamento para o inteiro mais próximo e indicação da unidade.
- Timeout por requisição: 10 segundos.
- Acessibilidade: WCAG 2.2 nível AA.
- Sem autenticação e sem persistência no servidor no MVP.
- Idioma da UI: pt-BR.
