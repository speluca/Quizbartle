export interface EvalQuestion {
  id: string;
  category: 'Relevância' | 'Satisfação' | 'Jogos';
  text: string;
}

// Nomes dos jogos conforme exibidos no painel admin (sem identificar o perfil)
export const GAME_NAMES: Record<string, string> = {
  g1: 'Explorador',
  g2: 'Conquistador',
  g3: 'Socializador',
  g4: 'Competidor',
};

export const evalQuestions: EvalQuestion[] = [
  // IMMS — Relevância (Q5–Q8)
  {
    id: 'r1',
    category: 'Relevância',
    text: 'Ficou claro para mim que o conteúdo das aulas está relacionado às coisas que eu já conhecia.',
  },
  {
    id: 'r2',
    category: 'Relevância',
    text: 'O conteúdo das aulas é relevante para os meus interesses.',
  },
  {
    id: 'r3',
    category: 'Relevância',
    text: 'Houve explicações ou exemplos de como as pessoas usam/aplicam o conhecimento desta disciplina.',
  },
  {
    id: 'r4',
    category: 'Relevância',
    text: 'O conteúdo desta lição será útil para mim.',
  },
  // IMMS — Satisfação (Q13–Q16)
  {
    id: 's1',
    category: 'Satisfação',
    text: 'Concluir esta lição com sucesso foi importante para mim.',
  },
  {
    id: 's2',
    category: 'Satisfação',
    text: 'Concluir os exercícios nesta disciplina me deu uma satisfação de realização.',
  },
  {
    id: 's3',
    category: 'Satisfação',
    text: 'Foi por causa do meu esforço pessoal que consegui avançar na aprendizagem, por isso me sinto recompensado.',
  },
  {
    id: 's4',
    category: 'Satisfação',
    text: 'Gostei tanto dessa disciplina que gostaria de saber mais sobre ela.',
  },
  // Avaliação dos jogos
  { id: 'g1', category: 'Jogos', text: `Gostei de jogar o jogo ${GAME_NAMES.g1}.` },
  { id: 'g2', category: 'Jogos', text: `Gostei de jogar o jogo ${GAME_NAMES.g2}.` },
  { id: 'g3', category: 'Jogos', text: `Gostei de jogar o jogo ${GAME_NAMES.g3}.` },
  { id: 'g4', category: 'Jogos', text: `Gostei de jogar o jogo ${GAME_NAMES.g4}.` },
];

export const LIKERT_LABELS: Record<number, string> = {
  1: 'Discordo totalmente',
  2: 'Discordo',
  3: 'Neutro',
  4: 'Concordo',
  5: 'Concordo totalmente',
};
