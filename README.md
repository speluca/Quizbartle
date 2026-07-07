# Teste de Bartle

Aplicação web para aplicar o **Teste de Bartle** — questionário de 30 perguntas que classifica o perfil de jogador de cada participante em um dos quatro tipos do modelo de Richard Bartle:

- 🤝 **Socializer** (Socializador)
- 🏆 **Achiever** (Conquistador)
- 🗺️ **Explorer** (Explorador)
- ⚔️ **Killer** (Competidor)

Após o teste, o participante responde a uma avaliação pós-atividade (baseada na escala IMMS de relevância/satisfação, mais uma avaliação dos jogos utilizados em aula). Os resultados são salvos no Supabase e podem ser consultados e exportados em CSV por um painel administrativo.

## Como funciona

1. **Entrada**: o participante informa um código de identificação (ex: `ALU-2024-001`).
2. **Quiz**: responde 30 perguntas de escolha binária (5 perguntas para cada um dos 6 pares de perfis).
3. **Resultado**: vê seu perfil dominante e a distribuição percentual entre os 4 perfis.
4. **Avaliação**: preenche o questionário pós-atividade (escala de 1 a 5).
5. **Painel admin**: acessível em `/?admin`, protegido por senha, permite recarregar os dados e exportar os resultados (teste de Bartle e avaliação) em CSV.

## Stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) (build e dev server)
- [Supabase](https://supabase.com/) (banco de dados / persistência das respostas)

## Pré-requisitos

- Node.js 18+
- Um projeto Supabase com duas tabelas:
  - `bartle_respostas` — respostas do teste de Bartle (`codigo`, `timestamp`, `perfil_dominante`, `pct_e/a/s/k`, `pontos_e/a/s/k`, `q1`...`q30`)
  - `bartle_avaliacao` — respostas da avaliação pós-atividade (`codigo`, `timestamp`, `imms_r1`...`imms_r4`, `imms_s1`...`imms_s4`, `jogo_explorador`, `jogo_conquistador`, `jogo_socializador`, `jogo_competidor`)

## Configuração

Copie `.env.example` para `.env` e preencha os valores (não versionado — peça as credenciais a quem administra o projeto):

```bash
cp .env.example .env
```

Variáveis necessárias:

| Variável | Descrição |
|---|---|
| `VITE_SUPABASE_URL` | URL do projeto Supabase |
| `VITE_SUPABASE_ANON_KEY` | Chave anônima (anon/public) do Supabase |
| `VITE_ADMIN_PASSWORD` | Senha de acesso ao painel administrativo (`/?admin`) |

## Rodando o projeto

```bash
npm install       # instala as dependências
npm run dev       # inicia o servidor de desenvolvimento (Vite)
npm run build     # gera o build de produção em dist/
npm run preview   # serve o build de produção localmente
npm run lint      # roda o ESLint
```

Acesse `http://localhost:5173` (padrão do Vite) para o teste, ou `http://localhost:5173/?admin` para o painel administrativo (senha definida em `VITE_ADMIN_PASSWORD`).
