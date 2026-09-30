# Discovery

## Contexto

A empresa solicitou o desenvolvimento de uma aplicação de previsão do tempo com foco em experiência prática, rapidez de consulta e usabilidade em dispositivos móveis. O produto deve permitir que usuários consultem informações climáticas de cidades, acompanhem o estado do tempo atual e visualizem uma previsão de 5 dias, com suporte à conversão de unidade de temperatura entre Celsius e Fahrenheit.

O contexto de negócio indica uma necessidade de acessibilidade e simplicidade: a solução deve ser intuitiva, responder rapidamente às buscas e funcionar de forma consistente em diferentes tamanhos de tela, principalmente no mobile, considerando que o uso em smartphones é provável e prioritário.

A aplicação também deve atender a um público amplo, com pouca necessidade de treinamento, reduzindo atritos na busca por cidades e na leitura dos dados climáticos. Como a proposta é baseada em dados meteorológicos em tempo real e previsão, a solução deve equilibrar clareza visual, confiabilidade da informação e performance.

## Requisitos Funcionais

1. Busca por cidade
   - O usuário deve conseguir pesquisar cidades por nome.
   - A busca deve retornar resultados relevantes e utilizáveis para a seleção da localidade desejada.
   - O sistema deve tratar casos em que a cidade não seja encontrada ou tenha múltiplas ocorrências com nomes semelhantes.

2. Visualização do clima atual
   - A aplicação deve exibir as condições meteorológicas atuais da cidade selecionada.
   - Informações esperadas podem incluir temperatura, sensação térmica, condição climática, umidade, vento e outros dados relevantes.
   - A interface deve apresentar o estado atual de forma legível e organizada.

3. Previsão de 5 dias
   - O usuário deve visualizar a previsão do tempo para os próximos 5 dias.
   - A previsão deve permitir compreensão rápida do comportamento do clima ao longo do período.
   - A apresentação deve manter consistência visual com o clima atual para facilitar comparação.

4. Alternância entre Celsius e Fahrenheit
   - O usuário deve poder trocar a unidade de temperatura entre Celsius e Fahrenheit.
   - A conversão deve refletir imediatamente na interface, sem necessidade de recarregar a página ou repetir a consulta.
   - A opção deve ser clara e facilmente acessível.

5. Suporte a dispositivos móveis
   - A aplicação deve ser responsiva e adequada ao uso em smartphones.
   - A interface deve adaptar layout, tamanho de texto, espaçamento e elementos interativos para telas menores.
   - A navegação e interação devem permanecer funcionais em dispositivos móveis.

6. Experiência de uso básica
   - O produto deve oferecer feedback claro em situações de carregamento e erro.
   - O fluxo principal deve ser simples: buscar cidade, visualizar clima atual e consultar previsão.

## Requisitos Não-Funcionais

1. Usabilidade
   - A interface deve ser intuitiva, com hierarquia visual clara e baixa curva de aprendizado.
   - Os principais elementos, como busca, temperatura e previsão, devem ser facilmente identificáveis.

2. Responsividade
   - A aplicação deve funcionar adequadamente em celulares, tablets e desktop, com prioridade no uso mobile.
   - O layout deve ajustar-se conforme a dimensão da tela sem quebrar a legibilidade.

3. Performance
   - A busca e apresentação dos dados devem ocorrer com tempo de resposta aceitável para o usuário.
   - A interface deve evitar atrasos perceptíveis, especialmente em carregamento de clima e atualização de unidade.

4. Confiabilidade dos dados
   - As informações proporcionadas devem ser consistentes com a fonte meteorológica utilizada.
   - O sistema deve tratar falhas de conexão, ausência de dados e respostas inválidas de forma segura.

5. Acessibilidade
   - O produto deve considerar contraste, foco visual, tamanhos de fonte legíveis e navegação por teclado.
   - Elementos interativos devem ter labels e estados acessíveis.

6. Manutenibilidade
   - A estrutura do código deve permitir evolução futura, como adição de filtros, múltiplas cidades e suporte a novos dados meteorológicos.

## Riscos

1. Dependência de dados externos
   - A aplicação depende de serviços de geolocalização e previsão do tempo externos, o que pode afetar disponibilidade, latência ou consistência dos dados.

2. Ambiguidade de busca por cidade
   - Cidades com nomes repetidos ou variações regionais podem gerar resultados confusos.

3. Uso em mobile e responsividade
   - A adaptação para telas menores pode comprometer legibilidade ou funcionalidade se não houver foco na experiência mobile desde o início.

4. Qualidade da previsão e entendimento do usuário
   - Usuários podem interpretar os dados meteorológicos de forma inadequada se a interface não explicar claramente a escala de tempo, unidade e condições climáticas.

5. Segurança e privacidade
   - Se houver integração com dados de localização do usuário, é preciso considerar consentimento, privacidade e uso responsável de dados pessoais.

6. Escopo funcional insuficiente
   - O briefing menciona busca, clima atual e previsão de 5 dias, mas não detalha requisitos extras como favoritos, pesquisa por geolocalização, alertas climáticos ou múltiplas localizações.

## Perguntas em Aberto

1. A aplicação deve permitir busca por cidade apenas manualmente, ou também por geolocalização automática?
2. A previsão de 5 dias deve incluir apenas temperatura ou também outros indicadores, como chuva, vento e umidade?
3. A empresa pretende disponibilizar a aplicação exclusivamente para mobile, ou também para desktop?
4. A busca deve suportar cidades em diferentes países e idiomas?
5. Existe uma preferência por uma fonte de dados específica para clima e geocodificação?
6. A aplicação deve manter histórico de cidades pesquisadas ou favoritos?
7. O produto precisa ter suporte offline ou apenas funcionamento online?
8. Há requisitos de internacionalização, incluindo troca de idioma?
9. A empresa define algum padrão visual ou branding para a aplicação?
10. Existem critérios de acessibilidade e conformidade específicos a serem atendidos?

## Suposições

1. A aplicação será um produto web responsivo, com foco inicial em uso mobile.
2. A busca por cidade será baseada em um serviço externo de geocodificação e dados meteorológicos.
3. O usuário pretende consultar uma cidade de cada vez na interface principal.
4. A unidade de temperatura será configurável e aplicada globalmente na tela da aplicação.
5. A previsão de 5 dias será apresentada em uma visão resumida, sem necessidade de dados horários detalhados.
6. O produto terá como objetivo principal auxiliar a consulta rápida de clima, sem necessidade de funcionalidades complexas de gestão de dados.
7. A disponibilidade da API externa será tratada como requisito operacional a considerar no desenvolvimento.
8. A experiência mobile será priorizada, mas a solução deve manter funcionalidade aceitável em telas maiores.
