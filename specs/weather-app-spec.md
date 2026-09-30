# Overview

O Weather App é uma aplicação web que permite ao usuário buscar uma cidade, consultar o clima atual e visualizar a previsão dos próximos 5 dias. O produto foi concebido para entregar uma experiência rápida, clara e confiável, com foco principal em uso mobile e em leitura imediata de informações meteorológicas.

A aplicação utilizará a API Open-Meteo como fonte de dados, sem autenticação e sem persistência no servidor. O idioma da interface será em português do Brasil, o padrão de temperatura será Celsius e o usuário poderá alternar para Fahrenheit por ação explícita.

O objetivo do produto é permitir que o usuário responda rapidamente a perguntas como “qual é o clima agora?” e “qual será a previsão para os próximos dias?”, sem exigir cadastro, navegação complexa ou conhecimento técnico.

## Functional Requirements

### 1. Search city by name
- O sistema deve permitir que o usuário insira o nome de uma cidade e execute a busca.
- O sistema deve retornar resultados relevantes ou uma mensagem clara quando a cidade não for encontrada.
- Critérios de aceitação:
  - Dado um nome de cidade válido, quando o usuário submeter a busca, então o sistema deve exibir o resultado correspondente ou a cidade selecionada.
  - Dado um nome de cidade inexistente, quando o usuário submeter a busca, então o sistema deve mostrar uma mensagem clara de “sem resultados”.

### 2. Display current weather
- O sistema deve exibir o clima atual da cidade selecionada.
- A tela deve incluir, no mínimo, a temperatura atual e a condição climática.
- Critérios de aceitação:
  - Dado uma cidade válida, quando os dados forem carregados com sucesso, então o sistema deve mostrar a temperatura atual e a condição do clima.
  - Dado uma resposta incompleta da API, quando campos obrigatórios estiverem ausentes, então o sistema deve exibir um estado alternativo em vez de uma tela quebrada.

### 3. Display 5-day forecast
- O sistema deve mostrar a previsão para os próximos 5 dias, definido como hoje + 4 dias seguintes.
- A previsão deve ser apresentada de forma legível e de fácil leitura em telas pequenas.
- Critérios de aceitação:
  - Dado uma cidade válida, quando os dados de previsão estiverem disponíveis, então o sistema deve exibir 5 entradas diárias de previsão.
  - Dado que a busca de previsão falhar, quando a API não responder, então o sistema deve mostrar uma mensagem de erro amigável.

### 4. Toggle temperature unit
- O usuário deve poder alternar entre Celsius e Fahrenheit.
- A troca de unidade deve refletir imediatamente nos valores exibidos da temperatura.
- Critérios de aceitação:
  - Dado que o sistema esteja em Celsius, quando o usuário selecionar Fahrenheit, então as temperaturas exibidas devem mudar para a unidade selecionada.
  - Dado que o usuário alterar a unidade múltiplas vezes, quando a tela for renderizada novamente, então os valores permanecerão consistentes com a unidade ativa.

### 5. Loading, empty and error states
- O sistema deve informar ao usuário quando a busca está em andamento, quando não há resultados e quando a requisição falhou.
- Critérios de aceitação:
  - Dado que a aplicação está carregando dados, então deve haver um indicador de carregamento visível.
  - Dado que a busca não retornar resultados, então o sistema deve exibir uma mensagem de estado vazio clara.
  - Dado que a requisição falhar, então o sistema deve mostrar uma mensagem de erro compreensível e evitar tela em branco.

### 6. Support mobile usage
- A interface deve ser utilizável em dispositivos móveis e adaptar-se a telas menores.
- Critérios de aceitação:
  - Dado um viewport mobile, quando a aplicação for carregada, então a interface deve permanecer legível e sem overflow horizontal.
  - Dado um usuário em smartphone, quando realizar a busca e consultar a previsão, então as ações primárias devem permanecer acessíveis sem zoom manual.

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

## Acceptance Criteria

### Story 1 — Busca por cidade
- Dado que o usuário insere um nome de cidade válido e submete a busca, quando a requisição for bem-sucedida, então o sistema exibe o clima e a previsão daquela cidade.
- Dado que a cidade não existe, quando o usuário submeter a busca, então o sistema exibe uma mensagem amigável informando que não há resultados.

### Story 2 — Clima atual
- Dado que a cidade selecionada é válida, quando os dados forem carregados, então a tela mostra a temperatura atual e a condição climática.
- Dado que a resposta da API estiver incompleta, quando campos essenciais estiverem ausentes, então o sistema mostra um estado seguro em vez de dados quebrados.

### Story 3 — Previsão de 5 dias
- Dado que a cidade possui previsão disponível, quando a aplicação carregar a previsão, então o sistema exibe 5 entradas diárias para os próximos 5 dias.
- Dado que a API de previsão falhar, quando a requisição for acionada, então o sistema mostra uma mensagem de erro e não deixa a tela em branco.

### Story 4 — Unidade padrão
- Dado que o usuário abre a aplicação pela primeira vez, quando a tela carregar, então a temperatura padrão exibida será em Celsius.
- Dado que o usuário alterar a unidade, quando a tela atualizar, então todos os valores relevantes também devem mudar para a unidade selecionada.

### Story 5 — Experiência mobile
- Dado um dispositivo mobile, quando o usuário utilizar a aplicação, então o conteúdo deve permanecer legível sem rolagem horizontal.
- Dado um usuário no celular, quando tocar em uma ação primária, então o botão deve ter tamanho adequado para uso por toque.

### Story 6 — Tratamento de erro
- Dado que a rede estiver indisponível ou a API falhar, quando a busca for iniciada, então o usuário recebe uma mensagem de erro clara e o sistema continua funcional.

## Non-Functional Requirements

### 1. Performance
- A aplicação deve responder de forma rápida à busca de cidade e à alternância entre unidades de temperatura.
- A interface deve permanecer responsiva mesmo em dispositivos móveis com conexão limitada.

### 2. Accessibility
- A aplicação deve apresentar contraste adequado, foco visual evidente e rótulos semânticos em controles interativos.
- Os principais elementos devem ser navegáveis por teclado e compreensíveis para tecnologias assistivas.

### 3. Responsiveness
- A interface deve adaptar-se a celulares, tablets e desktops sem quebrar layout ou legibilidade.
- Conteúdo e ações primárias devem permanecer acessíveis em telas pequenas.

### 4. Availability and resilience
- A aplicação deve lidar com latência ou falha da API sem travar ou quebrar a experiência do usuário.
- Em caso de indisponibilidade do serviço, o sistema deve mostrar uma mensagem clara e manter a interface estável.

### 5. Localization
- A interface deve estar em português do Brasil.
- Mensagens de carregamento, erros e textos de apoio devem seguir a linguagem natural do público alvo.

### 6. Security and privacy
- O usuário não precisa autenticar-se para usar o fluxo principal da aplicação.
- O sistema não deve persistir dados de usuário no servidor no escopo do MVP.

## Edge Cases

1. Busca vazia
- O sistema deve impedir envio com campo vazio e mostrar validação adequada ou manter foco no campo.

2. Busca com espaços em branco
- O sistema deve limpar a entrada antes de processar a consulta e rejeitar buscas vazias.

3. Cidade inexistente
- O sistema deve apresentar uma mensagem de “cidade não encontrada” de forma clara.

4. Timeout da API
- O sistema deve manter o estado de carregamento e, se a resposta demorar demais, mostrar erro de timeout.

5. Resposta parcial da API
- Se alguns campos da resposta vierem vazios, o sistema deve mostrar o que for possível e tratar os campos ausentes com segurança.

6. Sem conexão de internet
- O sistema deve informar o usuário sobre a indisponibilidade de dados por falha de conectividade.

7. Entrada inválida
- O sistema deve tratar caracteres inesperados ou buscas malformadas sem quebrar a interface.

8. Troca de unidade durante carregamento
- Se o usuário trocar de unidade enquanto a resposta está sendo carregada, o sistema deve preservar consistência ao renderizar os dados finais.

## Assumptions

1. A aplicação é uma solução web front-end, sem banco de dados e sem persistência de servidor.
2. A fonte de dados será a Open-Meteo, sem necessidade de API key.
3. A previsão de 5 dias significa hoje + 4 dias seguintes.
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
- Cidades com nomes repetidos ou regiões com nomes semelhantes podem gerar resultados confusos.

## Out of Scope

1. Autenticação e cadastro de usuários.
2. Persistência de dados no servidor.
3. Histórico de consultas ou favoritos.
4. Alertas severos ou notificação push.
5. Dados climáticos históricos complexos.
6. Mapas interativos ou radar meteorológico.
7. Suporte multilíngue além do PT-BR.
8. Funcionalidade offline completa, além de tratamento de erro degradado.

## Open Questions

1. A busca deve aceitar apenas cidades ou também regiões, bairros, aeroportos e outros pontos de referência?
2. A geolocalização automática deve ser considerada no MVP ou apenas a busca manual?
3. O usuário espera ver somente temperatura e condição climática, ou também umidade, vento, umidade relativa e sensação térmica?
4. A experiência desktop deve receber o mesmo nível de atenção que o mobile, ou o foco inicial será mobile-first?
5. Há requisitos formais de acessibilidade que devem ser atendidos além do básico?
6. Futuramente será necessário suportar favoritos, histórico de cidades ou comparação entre localidades?

## Decision Log

- Fonte de dados: Open-Meteo (sem API key).
- Definição de previsão: hoje + 4 dias.
- Unidade padrão: Celsius.
- Sem autenticação e sem persistência no servidor no MVP.
- Idioma da UI: pt-BR.
