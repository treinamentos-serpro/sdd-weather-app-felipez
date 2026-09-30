---
mode: agent
description: 'Executa a tarefa T-01, fechando decisões de produto que bloqueiam os contratos técnicos do Weather App.'
---

# Prompt — Implementar T-01: Fechar decisões que bloqueiam os contratos

Você é o **Code Agent** do Weather App. Execute somente a tarefa `T-01` do
backlog, preparando decisões documentadas para que as tarefas de tipos,
funções puras e services possam começar sem novas ambiguidades.

## Contexto obrigatório

Leia antes de editar:

- `specs/discovery.md` — personas, decisões já tomadas, riscos e perguntas em
	aberto.
- `specs/weather-app-spec.md` — requisitos, critérios de aceite, edge cases,
	Open Questions e Spec Review.
- `plans/weather-app-plan.md` — contratos provisórios, endpoints, estados,
	estratégia de erros, testes e gate antes da implementação.
- `tasks/weather-app-tasks.md` — definição de T-01 e dependências das tarefas
	seguintes.

## Tarefa

**T-01 — Fechar decisões que bloqueiam os contratos**

Resolver e registrar as Open Questions 1–8 da spec:

1. Métricas obrigatórias de clima atual.
2. Campos obrigatórios de cada dia da previsão.
3. Browsers, versões e viewports suportados.
4. Timeout da geocodificação e do forecast.
5. Persistência da unidade Celsius/Fahrenheit.
6. Existência, validade e expiração de cache local.
7. Métricas de sucesso do MVP.
8. Tipos de localidade aceitos na busca.

## Critérios de aceite

- Cada Open Question 1–8 tem uma decisão explícita, fonte ou responsável quando
	disponível e impacto técnico resumido.
- A decisão distingue o que pertence ao MVP do que permanece fora do escopo.
- `specs/weather-app-spec.md` não contém contradições entre requisitos,
	critérios de aceite, edge cases, assumptions, out of scope e Open Questions.
- `plans/weather-app-plan.md` reflete as decisões em Data Model, External APIs,
	State Management, Error Handling, Testing Strategy e no gate de implementação.
- O contrato de clima atual, previsão diária e parâmetros `current`/`daily` da
	Open-Meteo são consistentes entre spec e plano.
- Timeout, retry, cache, unidade, timezone, browsers, viewports e critérios de
	acessibilidade podem ser usados como entradas determinísticas nas tarefas
	seguintes.
- Nenhuma resposta é inventada sem fonte ou autoridade de produto. Se uma
	decisão não puder ser tomada neste workspace, mantenha-a como bloqueio
	explícito e descreva exatamente a informação ausente.
- Não há alteração em `src/` nem em `tests/`; T-01 é documentação e decisão.

## Arquivos permitidos

Edite somente, quando necessário:

- `specs/weather-app-spec.md`
- `plans/weather-app-plan.md`

Não crie tipos TypeScript, componentes, services ou testes nesta tarefa.

## Decisões já fechadas

Preserve as decisões da discovery:

- Open-Meteo sem API key.
- Cinco dias como hoje mais quatro dias.
- Celsius como unidade padrão.
- Interface em pt-BR.
- Busca manual, sem geolocalização automática.
- Sem autenticação e sem persistência de servidor.
- Favoritos, histórico, alertas, previsão horária e offline garantido estão
	fora do MVP.

Não introduza funcionalidades fora desse escopo sem registrar a mudança
explicitamente na spec.

## Regras de decisão e documentação

- Use valores concretos para timeout, retry, browsers, viewports e precisão
	somente quando houver base suficiente no briefing, discovery ou decisão
	explícita do produto.
- Não escolha silenciosamente uma resposta para uma ambiguidade sem base.
- Se T-01 não puder ser concluída por falta de autoridade ou informação,
	documente o bloqueio e não declare a tarefa aprovada.
- Atualize critérios de aceite afetados quando uma decisão tornar um termo vago
	verificável.
- Mantenha narrativa e documentação em pt-BR e identificadores técnicos em
	en-US.
- Preserve o formato existente dos artefatos e evite reformatar conteúdo não
	relacionado.

## Validação

Como a tarefa altera somente Markdown:

1. Confirme que as Open Questions 1–8 estão respondidas ou explicitamente
	 bloqueadas.
2. Compare os campos e parâmetros decididos entre spec e plano.
3. Execute:

	 ```text
	 git diff --check -- specs/weather-app-spec.md plans/weather-app-plan.md
	 ```

Não crie ou execute código de aplicação para validar T-01. Se uma decisão
estiver bloqueada, relate-a claramente em vez de mascarar o bloqueio.

## Resultado esperado

Ao finalizar, informe:

- decisões tomadas para as Open Questions 1–8;
- alterações feitas na spec e no plano;
- bloqueios restantes, se houver;
- validações executadas e seus resultados;
- confirmação de que nenhum arquivo fora do escopo foi alterado.
