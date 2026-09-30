# Discovery

## Contexto

A empresa solicitou uma aplicação web de previsão do tempo para atender usuários que precisam consultar condições climáticas de forma rápida, clara e confiável. O produto deve permitir buscar cidades, visualizar o clima atual, consultar a previsão de 5 dias e alternar entre Celsius e Fahrenheit. O uso em dispositivos móveis é um requisito relevante de negócio, pois a consulta ao clima geralmente acontece em contexto de mobilidade e urgência.

A proposta também exige uma experiência acessível e consistente, com foco em legibilidade, simplicidade e resposta rápida. Como se trata de interação com dados externos, a aplicação deve tratar falhas de rede, ausência de dados e variações de precisão das fontes meteorológicas de forma adequada.

## Revisão da Lista de Requisitos

### 1. Buscar cidades
- Classificação: Funcional.
- Motivo: representa uma ação executável pelo usuário que altera o conteúdo exibido pela aplicação.

### 2. Ver o clima atual
- Classificação: Funcional.
- Motivo: corresponde à entrega de um dado meteorológico específico para a cidade selecionada.

### 3. Ver a previsão de 5 dias
- Classificação: Funcional.
- Motivo: é uma funcionalidade de consulta e apresentação de informação climática em período futuro.

### 4. Alternar entre Celsius e Fahrenheit
- Classificação: Funcional.
- Motivo: é uma ação de interação direta na interface que altera a representação dos dados.

### 5. Usar em dispositivos móveis
- Classificação: Não-funcional.
- Motivo: refere-se à adequação da aplicação a diferentes tamanhos de tela e contexto de uso, e não a uma operação específica do sistema.

### 6. Responder rapidamente às buscas
- Classificação: Não-funcional.
- Motivo: é um critério de performance, não uma funcionalidade em si.

### 7. Interface intuitiva e fácil de usar
- Classificação: Não-funcional.
- Motivo: diz respeito à usabilidade e experiência do usuário.

### 8. Suporte a telas menores
- Classificação: Não-funcional.
- Motivo: trata de responsividade e adaptação do layout, e não da execução de uma tarefa funcional.

### 9. Exibir mensagens de carregamento e erro
- Classificação: Funcional, na prática, se a aplicação apresenta feedback de estado do sistema; porém, em muitos casos também é tratado como requisito de experiência do usuário.
- Observação: é melhor classificar como funcional quando há uma regra clara do sistema para apresentar o estado de carregamento ou erro. Mesmo assim, a intenção principal é de UX e robustez do software.

## Itens Classificados Incorretamente

Os itens abaixo foram classificados de forma inadequada se a intenção era separar claramente funcional de não-funcional:

1. "Usar em dispositivos móveis" — classificado como funcional, mas na realidade é um requisito não-funcional de responsividade.
2. "Responder rapidamente às buscas" — não é funcional; é um requisito de performance.
3. "Interface intuitiva e fácil de usar" — não é funcional; é um requisito de usabilidade.
4. "Suporte a telas menores" — não é funcional; é um requisito de responsividade.

Em outras palavras, requisitos de comportamento do sistema são funcionais; requisitos de qualidade, experiência e capacidade operacional são não-funcionais.

## Requisitos Funcionais

1. Buscar cidade por nome.
2. Exibir o clima atual da cidade selecionada.
3. Exibir a previsão do tempo para os próximos 5 dias.
4. Permitir alternar a escala de temperatura entre Celsius e Fahrenheit.
5. Apresentar feedback ao usuário em estados de carregamento, ausência de resultado e erro.

## Requisitos Não-Funcionais

1. Performance
   - A aplicação deve carregar os dados e atualizar a interface em tempo aceitável para o usuário.
   - O tempo de resposta para busca e renderização deve ser baixo, especialmente em mobile.

2. Acessibilidade
   - A interface deve suportar contraste adequado, navegação por teclado, foco visível e labels semânticas.
   - Conteúdo deve ser legível para usuários com necessidades específicas, respeitando diretrizes de acessibilidade.

3. Responsividade
   - A aplicação deve adaptar layout, texto, botões e informações para diferentes tamanhos de tela, priorizando mobile.
   - A usabilidade deve ser preservada em smartphones, tablets e desktops.

4. Disponibilidade
   - A aplicação deve apresentar comportamento resiliente quando a API meteorológica estiver lenta ou indisponível.
   - Deve haver tratamento adequado para falhas de rede e erros de serviço sem quebrar a experiência.

5. Confiabilidade dos dados
   - Os dados climáticos devem refletir a fonte de informação utilizada e devem ser apresentados com consistência.

6. Usabilidade
   - A interface deve ser clara, simples e intuitiva, permitindo que o usuário realize a tarefa principal sem treinamento.

7. Segurança e privacidade
   - Se houver uso de localização ou dados pessoais, o sistema deve respeitar consentimento e tratamento adequado de informações.

## Requisitos Não-Funcionais Provavelmente Faltando para um Web App de Clima

Além dos itens anteriores, os seguintes requisitos não-funcionais são normalmente esperados em um web app meteorológico:

1. Performance
   - Tempo de carregamento rápido.
   - Atualização da interface sem travamentos.
   - Cache e otimização de requisições para reduzir latência.

2. Acessibilidade
   - Suporte a leitores de tela.
   - Contraste adequado e foco visível.
   - Ações acessíveis via teclado e semântica correta em elementos de interface.

3. Responsividade
   - Layout mobile-first.
   - Adaptação a diferentes resoluções e densidades de tela.
   - Botões e campos com tamanho adequado para toque.

4. Disponibilidade
   - Tratamento de indisponibilidade da API.
   - Mensagens amigáveis de falha.
   - Recuperação controlada quando o serviço volta.

5. Segurança
   - Proteção contra uso indevido de endpoints e integridade dos dados.

6. Observabilidade
   - Logs, monitoramento de erros e indicadores de uso para suporte e melhorias futuras.

## Riscos

1. Dependência de APIs externas de clima e geocodificação.
2. Falhas de resposta ou latência em redes móveis.
3. Ambiguidade de nomes de cidades e localidades.
4. Desalinhamento entre expectativa do usuário e dados apresentados.
5. Dificuldade de manter a usabilidade em dispositivos variados.

## Perguntas em Aberto

1. A busca deve aceitar apenas cidades ou também regiões, países e endereços?
2. A previsão de 5 dias deve incluir dados adicionais além de temperatura, como chuva, vento e umidade?
3. O produto será pensado para mobile-first ou terá suporte igual para desktop?
4. A aplicação deve incluir geolocalização automática ou apenas busca manual?
5. Há exigência de suporte a múltiplos idiomas ou localização regional?

## Suposições

1. A aplicação será web e priorizará o uso em celulares.
2. A fonte de dados meteorológicos é externa e pode sofrer variações de disponibilidade.
3. A busca será por cidade, sem necessidade de cadastro do usuário para uso básico.
4. A unidade de temperatura é configurável e deve refletir instantaneamente na interface.
5. A experiência principal é leitura rápida de clima atual e previsão de 5 dias, sem necessidade de recursos avançados do tipo alertas complexos ou histórico detalhado.
