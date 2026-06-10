export type BartleType = 'S' | 'A' | 'E' | 'K';

export interface Option {
  text: string;
  type: BartleType;
}

export interface Question {
  id: number;
  text: string;
  options: [Option, Option];
}

// 18 questões — 3 por par, 6 pares (S×E, S×A, E×A, S×K, E×K, A×K)
// Porcentagem = (pontos do perfil / 18) × 100 — soma sempre 100%
export const TOTAL_QUESTIONS = 18;

export const questions: Question[] = [
  // S vs E (originais 1, 6, 7)
  {
    id: 1,
    text: 'Você se sente mais à vontade como jogador online:',
    options: [
      { text: 'Conversar com amigos em uma taberna.', type: 'S' },
      { text: 'Caçar Orcs sozinho por experiência.', type: 'E' },
    ],
  },
  {
    id: 2,
    text: 'De que você gostaria mais como jogador de jogos online?',
    options: [
      { text: 'Dirigir sua própria taverna.', type: 'S' },
      { text: 'Fazer seus próprios mapas do mundo e vendê-los.', type: 'E' },
    ],
  },
  {
    id: 3,
    text: 'O que é mais importante em um jogo online para você?',
    options: [
      { text: 'O número de pessoas.', type: 'S' },
      { text: 'O número de áreas a explorar.', type: 'E' },
    ],
  },
  // S vs A (originais 2, 3, 5)
  {
    id: 4,
    text: 'Do que você mais gosta das missões?',
    options: [
      { text: 'Envolver-se no enredo/estória.', type: 'S' },
      { text: 'Receber as recompensas no final.', type: 'A' },
    ],
  },
  {
    id: 5,
    text: 'Como você prefere ser notado em um jogo online?',
    options: [
      { text: 'Popular.', type: 'S' },
      { text: 'Rico.', type: 'A' },
    ],
  },
  {
    id: 6,
    text: 'Qual você preferiria ter como jogador em um jogo online?',
    options: [
      { text: 'Um canal privado, sobre o qual você e seus amigos podem se comunicar.', type: 'S' },
      { text: 'Sua própria casa, valendo milhões de moedas de ouro.', type: 'A' },
    ],
  },
  // E vs A (originais 4, 16, 18)
  {
    id: 7,
    text: 'Qual você gosta mais em um jogo online?',
    options: [
      { text: 'Obter as últimas novidades.', type: 'E' },
      { text: 'Obter um novo item.', type: 'A' },
    ],
  },
  {
    id: 8,
    text: 'Em um jogo online, uma nova área se abre. O que você espera mais?',
    options: [
      { text: 'Explorar a nova área e descobrir sua história.', type: 'E' },
      { text: 'Ser o primeiro a receber o novo equipamento da área.', type: 'A' },
    ],
  },
  {
    id: 9,
    text: 'Você prefere:',
    options: [
      { text: 'Tornar-se um herói mais rápido que seus amigos.', type: 'A' },
      { text: 'Saber mais segredos do que seus amigos.', type: 'E' },
    ],
  },
  // S vs K (originais 11, 13, 14)
  {
    id: 10,
    text: 'Você preferiria:',
    options: [
      { text: 'Derrotar seus inimigos.', type: 'K' },
      { text: 'Convencer seus inimigos a trabalhar para você, não contra você.', type: 'S' },
    ],
  },
  {
    id: 11,
    text: 'Qual você gostaria de mais?',
    options: [
      { text: 'Ganhar um duelo com outro jogador.', type: 'K' },
      { text: 'Ser aceito por um clã (um grupo de outros jogadores).', type: 'S' },
    ],
  },
  {
    id: 12,
    text: 'É melhor ser:',
    options: [
      { text: 'Temido.', type: 'K' },
      { text: 'Amado.', type: 'S' },
    ],
  },
  // E vs K (originais 21, 23, 25)
  {
    id: 13,
    text: 'Em um jogo online, prefere ser conhecido por:',
    options: [
      { text: 'Conhecimento.', type: 'E' },
      { text: 'Poder.', type: 'K' },
    ],
  },
  {
    id: 14,
    text: 'Se você está sozinho em uma área, você pensa:',
    options: [
      { text: 'É seguro explorar.', type: 'E' },
      { text: 'Você terá que procurar em outro lugar por presas.', type: 'K' },
    ],
  },
  {
    id: 15,
    text: 'Você conhece um novo jogador. Você pensa neles como:',
    options: [
      { text: 'Alguém que possa apreciar seu conhecimento do jogo.', type: 'E' },
      { text: 'Como presa em potencial.', type: 'K' },
    ],
  },
  // A vs K (originais 26, 28, 30)
  {
    id: 16,
    text: 'Em um jogo online, você prefere:',
    options: [
      { text: 'Ter uma espada duas vezes mais poderosa que qualquer outra no jogo.', type: 'A' },
      { text: 'Ser a pessoa mais temida no jogo.', type: 'K' },
    ],
  },
  {
    id: 17,
    text: 'Você prefere ter:',
    options: [
      { text: 'Um feitiço para danificar outros jogadores.', type: 'K' },
      { text: 'Um feitiço que aumenta a taxa na qual você ganha pontos de experiência.', type: 'A' },
    ],
  },
  {
    id: 18,
    text: 'Ao jogar um videogame, é mais divertido:',
    options: [
      { text: 'Ter a maior pontuação na lista.', type: 'A' },
      { text: 'Vencer seu melhor amigo individualmente.', type: 'K' },
    ],
  },
];

export interface Scores {
  S: number;
  A: number;
  E: number;
  K: number;
}

export function calculateScores(answers: Record<number, BartleType>): Scores {
  const scores: Scores = { S: 0, A: 0, E: 0, K: 0 };
  for (const type of Object.values(answers)) {
    scores[type]++;
  }
  return scores;
}

export interface ProfileInfo {
  label: string;
  fullName: string;
  description: string;
  color: string;
  emoji: string;
}

export const profiles: Record<BartleType, ProfileInfo> = {
  S: {
    label: 'Socializer',
    fullName: 'Socializador',
    description:
      'Você joga pelo prazer da interação humana. Fazer novos amigos, conversar, ajudar os outros e se envolver com a comunidade é o que torna o jogo especial para você. O mundo virtual é apenas o pano de fundo para as conexões reais que você cria.',
    color: '#4f86c6',
    emoji: '🤝',
  },
  A: {
    label: 'Achiever',
    fullName: 'Conquistador',
    description:
      'Você joga para acumular pontos, itens, níveis e recompensas. Cada objetivo concluído é uma vitória pessoal. Você se motiva por metas claras e gosta de ver seu progresso representado em números, rankings e conquistas.',
    color: '#e8a838',
    emoji: '🏆',
  },
  E: {
    label: 'Explorer',
    fullName: 'Explorador',
    description:
      'Você joga para descobrir o que o mundo do jogo tem a oferecer. Segredos, mecânicas escondidas, lore, mapas desconhecidos — tudo isso alimenta sua curiosidade. Você quer entender o jogo de dentro para fora.',
    color: '#4caf7d',
    emoji: '🗺️',
  },
  K: {
    label: 'Killer',
    fullName: 'Competidor',
    description:
      'Você joga para se impor aos outros jogadores. Seja em duelos, PvP ou rankings, o que importa é a vitória sobre adversários reais. A presença de outros jogadores não é companhia — é desafio.',
    color: '#e05c5c',
    emoji: '⚔️',
  },
};
