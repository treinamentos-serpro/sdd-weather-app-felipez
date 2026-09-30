# Discovery

## Contexto

O briefing define um produto de previsão do tempo com funcionalidades básicas de busca, clima atual, previsão de 5 dias e conversão entre unidades de temperatura. No entanto, ele permanece incompleto como especificação de produto, pois não esclarece público-alvo, cenário de uso, fontes de dados, público principal e metas de negócio. O resultado é uma solução que pode ser implementada de formas muito diferentes, com impactos diretos em arquitetura, UX, qualidade e custos.

Como PM cético, a principal preocupação é que o produto possa ser entregue com uma visão rasa demais para sustentar decisões técnicas e de experiência. Sem resposta para várias premissas, a equipe corre o risco de construir a solução certa para um problema equivocado.

## Ambiguidades e Lacunas do Briefing

### 1. Objetivo de usuário e caso de uso principal
- Pergunta em aberto: Quem é o público principal da aplicação e qual problema específico ele quer resolver ao consultar o clima?
- Impacto de seguir sem resposta: a equipe pode priorizar o fluxo errado. Se o produto for para uso casual, a experiência pode ser simples e rápida. Se for para uso profissional ou de viagem, a necessidade pode incluir dados mais detalhados, atualização em tempo real e múltiplas cidades.

### 2. Escopo de busca por cidade
- Pergunta em aberto: A busca deve cobrir apenas cidades, ou também regiões, países, aeroportos, bairros e locais customizados?
- Impacto de seguir sem resposta: a UI, a lógica de geocodificação e a qualidade dos resultados ficam mal definidas, e a aplicação pode frustrar o usuário ao não lidar bem com localidades ambíguas ou pouco comuns.

### 3. Fonte e qualidade dos dados meteorológicos
- Pergunta em aberto: Qual fonte de dados será utilizada e qual nível de confiabilidade/atualização ela oferece?
- Impacto de seguir sem resposta: a equipe pode escolher uma API inadequada para o caso de uso, com latência alta, cobertura ruim ou dados insuficientes para previsão de cinco dias.

### 4. Definição de clima atual
- Pergunta em aberto: O que exatamente significa "clima atual" na aplicação: temperatura em tempo real, condição do momento, ícone resumido, ou conjunto completo de métricas?
- Impacto de seguir sem resposta: a tela pode ser implementada de forma inconsistente, com informações essenciais ou redundantes, gerando baixa utilidade percebida.

### 5. Profundidade da previsão de 5 dias
- Pergunta em aberto: A previsão de 5 dias deve incluir apenas temperatura diária ou também chuva, vento, umidade, sensação térmica, sol/chuva e outros indicadores?
- Impacto de seguir sem resposta: o produto pode parecer incompleto ou insuficiente para o uso esperado, além de dificultar a escolha correta da estrutura de dados e layout.

### 6. Unidade de temperatura e comportamento de conversão
- Pergunta em aberto: A conversão entre Celsius e Fahrenheit será global para toda a aplicação ou apenas para alguns componentes?
- Impacto de seguir sem resposta: os usuários podem ficar confundidos se a conversão for aplicada de maneira inconsistente, e a experiência pode parecer pouco confiável.

### 7. Prioridade de plataforma
- Pergunta em aberto: A aplicação deve ser pensada primeiro para mobile, desktop ou ambos com experiências equilibradas?
- Impacto de seguir sem resposta: o design e a arquitetura podem ser direcionados para o canal errado, gerando rejeição em dispositivos principais de uso.

### 8. Requisitos de responsividade
- Pergunta em aberto: Qual é o nível mínimo de suporte exigido para diferentes tamanhos de tela e navegadores?
- Impacto de seguir sem resposta: a equipe pode entregar uma interface que funciona em um smartphone, mas quebra em tablets e desktop, ou vice-versa, aumentando retrabalho e reduzindo qualidade.

### 9. Tratamento de erros e falta de conectividade
- Pergunta em aberto: O que acontece quando a API falha, demora ou retorna dados vazios?
- Impacto de seguir sem resposta: o usuário pode receber uma tela em branco, erro genérico ou informações incorretas, o que danifica a confiança no produto.

### 10. Experiência em cenários sem internet ou com rede fraca
- Pergunta em aberto: O produto precisa funcionar offline ou apenas online com comportamento de falha controlada?
- Impacto de seguir sem resposta: a aplicação pode ser frágil em redes móveis instáveis, que é um cenário comum para aplicações meteorológicas.

### 11. Geolocalização e personalização
- Pergunta em aberto: A aplicação deve localizar a cidade do usuário automaticamente, ou a busca manual é suficiente?
- Impacto de seguir sem resposta: pode haver desvio de escopo, além de implicações de privacidade e UX. Sem essa definição, o produto pode ser menos útil para usuários que esperam experiência imediata.

### 12. Histórico, favoritos e múltiplas cidades
- Pergunta em aberto: O usuário poderá salvar cidades, acompanhar favoritos ou comparar locais diferentes?
- Impacto de seguir sem resposta: o produto pode ser entregue como uma ferramenta de consulta única, mas sem atender às necessidades reais de usuários que consultam clima frequentemente ou em viagem.

### 13. Requisitos de acessibilidade
- Pergunta em aberto: Quais padrões de acessibilidade devem ser atendidos, como contraste, leitura por teclado, suporte a leitor de tela e tamanho mínimo de elementos?
- Impacto de seguir sem resposta: a solução corre o risco de ser excluída para usuários com deficiência e de falhar em critérios legais ou de qualidade de experiência.

### 14. Dados adicionais esperados pelo usuário
- Pergunta em aberto: O usuário espera apenas temperatura e condição climática, ou também umidade, vento, sensação térmica, sunrise/sunset, índice UV, radar ou alertas?
- Impacto de seguir sem resposta: a product team pode subestimar a complexidade da UI e do backend, e a entrega final pode parecer superficial demais para o mercado.

### 15. Critérios de sucesso do produto
- Pergunta em aberto: Como a empresa saberá que a aplicação foi bem-sucedida: engajamento, retenção, tempo de uso, quantidade de buscas, ou satisfação dos usuários?
- Impacto de seguir sem resposta: sem métricas, o produto pode ser entregue sem foco em valor real, dificultando validação e priorização de melhorias.

### 16. Relacionamento com concorrentes e diferenciação
- Pergunta em aberto: A solução precisa ser um clone funcional de apps de clima ou deve ter diferenciação clara, como simplicidade, velocidade, foco mobile ou experiência para viagens?
- Impacto de seguir sem resposta: a aplicação pode competir sem vantagem clara, além de consumir recursos em recursos que não geram valor percebido.

### 17. Privacidade e consentimento
- Pergunta em aberto: O app coleta localização do usuário ou apenas busca manual? Qual é a política de privacidade associada?
- Impacto de seguir sem resposta: a solução pode gerar riscos legais, fricção na UX e perda de confiança do usuário, especialmente se vier a exigir acesso a localização.

### 18. Disponibilidade e tolerância a falhas
- Pergunta em aberto: Qual aceitabilidade para indisponibilidade do serviço? A aplicação precisa mostrar fallback ou simplesmente falhar silenciosamente?
- Impacto de seguir sem resposta: sem definir esse critério, a experiência pode ser instável e pouco confiável em produção, especialmente em cenários de latência de rede ou indisponibilidade da API.

## Conclusão

O briefing descreve uma solução funcional mínima, mas não define a base de decisão de produto. Em termos de discovery, ele carece de clareza sobre público, contexto de uso, qualidade dos dados, experiência mobile, acessibilidade, métricas de sucesso e regras de operação. Se essas dúvidas não forem resolvidas antes do desenvolvimento, o projeto corre risco de entregar um app funcional, porém confuso, superficial ou mal alinhado com a necessidade real do usuário.

## Perguntas em Aberto Resumidas

1. Quem é o público principal da aplicação e qual problema real ela resolve?
2. A busca deve cobrir apenas cidades ou também outros tipos de localidade?
3. Qual API será usada e qual nível de confiabilidade, cobertura e latência ela oferece?
4. O que exatamente define o "clima atual"?
5. A previsão de 5 dias inclui apenas temperatura ou também outros dados?
6. A conversão entre Celsius e Fahrenheit será global ou local?
7. A solução prioriza mobile, desktop ou ambos?
8. Quais navegadores e tamanhos de tela precisam ser suportados?
9. Como a aplicação deve lidar com falhas de API e ausência de conexão?
10. A geolocalização automática é obrigatória ou opcional?
11. O app precisa de favoritos, histórico ou comparação entre cidades?
12. Quais padrões de acessibilidade e compatibilidade devem ser obedecidos?
13. Quais métricas de sucesso validam o produto em produção?
14. Há diferenciação competitiva clara para justificar a solução?
15. Qual é a política de privacidade e consentimento para dados de localização?

## Riscos de Negócio

- Entrega de um produto que resolve o problema errado.
- Aumento de retrabalho por mudança de escopo após desenvolvimento inicial.
- Frustração do usuário por ausência de dados esperados ou má qualidade de UX.
- Dependência excessiva de API externa sem estratégia de fallback.
- Baixa adoção por não atender necessidades reais de contexto de uso e mobilidade.

## Principais Riscos Técnicos e de Produto

| Risco | Probabilidade | Impacto | Estratégia de mitigação |
| --- | --- | --- | --- |
| Dependência de API externa instável | Alta | Alto | Validar a API antes da implementação, definir fallback para erro de rede e exibir estados de carregamento/erro claros. |
| Latência alta em redes móveis | Alta | Médio | Priorizar interface mobile-first, reduzir payloads, usar cache para dados frequentes e otimizar chamadas. |
| Ambiguidade de cidades e locais | Média | Médio | Implementar busca com resultados sugeridos, exibir opções quando houver múltiplos matches e validar regras de geocodificação. |
| Dados meteorológicos inconsistentes ou incompletos | Média | Alto | Definir contrato de dados, validar respostas da API, criar tratamento para campos ausentes e manter mensagens de erro amigáveis. |
| UX frágil em dispositivos pequenos | Média | Alto | Testar em múltiplas resoluções e navegadores, usar design responsivo, priorizar legibilidade e interação touch-friendly. |
| Falta de acessibilidade | Média | Médio | Seguir diretrizes de acessibilidade, validar contraste, foco visual, navegação por teclado e semântica dos elementos. |
| Escopo mal definido e mudanças frequentes | Alta | Alto | Documentar requisitos, validar hipóteses com stakeholders e transformar dúvidas em critérios de aceite antes do desenvolvimento. |
| Baixa adoção do produto por não resolver problema real | Média | Alto | Validar com usuários, medir engajamento e retenção, e priorizar funcionalidades com maior valor percebido. |
| Falha na gestão de erro e fallback | Média | Alto | Criar estados de erro consistentes, fallback visual e recuperação automática quando a API responder novamente. |
| Privacidade e uso de localização | Baixa | Alto | Solicitar consentimento explícito, limitar coleta e documentar claramente uso dos dados de localização. |
| Requisições excessivas e custo operacional | Média | Médio | Implementar cache, evitar chamadas redundantes e otimizar frequência de atualização dos dados. |
| Dificuldade de manutenção do código e evolução do produto | Média | Médio | Estruturar arquitetura com separação clara de responsabilidades, componentes reutilizáveis e testes automatizados. |

## Observação

Os riscos de maior atenção são aqueles ligados à dependência externa de dados meteorológicos, experiência mobile e clareza de escopo. Esses três fatores impactam diretamente a confiabilidade, a percepção de valor e a capacidade de entregar um produto útil em produção.

## Personas

### 1. Maria, 29 anos — Usuária casual em trânsito
- Objetivo principal: verificar rapidamente as condições climáticas antes de sair de casa ou escolher o que vestir.
- Contexto de uso: mobile, em deslocamento, em poucos segundos, com necessidade de informação imediata e legível.
- Métrica de sucesso: tempo médio para encontrar a previsão da cidade desejada e voltar à rotina sem fricção; alta taxa de uso recorrente em dias com mudança brusca de clima.

### 2. Lucas, 35 anos — Usuário prático com rotina de viagem
- Objetivo principal: consultar a previsão de destino e planejar compromissos, deslocamentos e itens a levar.
- Contexto de uso: mobile e desktop, dependendo do momento; usa o app com frequência antes de viajar ou durante deslocamentos.
- Métrica de sucesso: número de consultas por semana, retenção de uso em viagens e taxa de satisfação ao comparar o clima em diferentes cidades.

### 3. Ana, 42 anos — Usuária orientada a planejamento
- Objetivo principal: acompanhar a previsão de 5 dias para planejar trabalho, atividades externas e rotina da família.
- Contexto de uso: desktop em casa e mobile em consultas rápidas fora de casa.
- Métrica de sucesso: recorrência de uso ao longo da semana, uso de previsão de 5 dias e percepção de utilidade na organização diária.

## Como as personas influenciam o produto

Esses perfis sugerem que a aplicação precisa equilibrar simplicidade e profundidade: a experiência em mobile deve priorizar velocidade e clareza, enquanto em desktop pode haver maior espaço para análise de previsão e dados complementares. A combinação de uso casual e uso planejado reforça a importância de uma interface intuitiva, previsibilidade e boa legibilidade dos dados meteorológicos.
