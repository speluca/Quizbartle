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

// 30 questões — 5 por par, 6 pares (S×E, S×A, E×A, S×K, E×K, A×K)
// Porcentagem = (pontos do perfil / 30) × 100 — soma sempre 100%
export const TOTAL_QUESTIONS = 30;

export const questions: Question[] = [
  // ── S vs E ──────────────────────────────────────────────────────────────
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
  {
    id: 4,
    text: 'O que é mais importante para você?',
    options: [
      { text: 'A qualidade da interpretação/representação de um jogo online.', type: 'S' },
      { text: 'A originalidade dos recursos e a mecânica do jogo.', type: 'E' },
    ],
  },
  {
    id: 5,
    text: 'Você é um jogador de um jogo online e quer lutar contra um dragão muito duro. Como você abordaria esse problema?',
    options: [
      { text: 'Conseguir um grande grupo de jogadores para matá-lo.', type: 'S' },
      { text: 'Tentar uma variedade de armas e magia contra ele, até encontrar sua fraqueza.', type: 'E' },
    ],
  },
  // ── S vs A ──────────────────────────────────────────────────────────────
  {
    id: 6,
    text: 'Do que você mais gosta das missões?',
    options: [
      { text: 'Envolver-se no enredo/estória.', type: 'S' },
      { text: 'Receber as recompensas no final.', type: 'A' },
    ],
  },
  {
    id: 7,
    text: 'Como você prefere ser notado em um jogo online?',
    options: [
      { text: 'Popular.', type: 'S' },
      { text: 'Rico.', type: 'A' },
    ],
  },
  {
    id: 8,
    text: 'Qual você preferiria ter como jogador em um jogo online?',
    options: [
      { text: 'Um canal privado, sobre o qual você e seus amigos podem se comunicar.', type: 'S' },
      { text: 'Sua própria casa, valendo milhões de moedas de ouro.', type: 'A' },
    ],
  },
  {
    id: 9,
    text: 'Você está prestes a entrar em uma masmorra desconhecida e tem a escolha de mais uma pessoa para sua festa. Você traz:',
    options: [
      { text: 'Um bardo (contador de estórias), que é um bom amigo seu e ótimo para entreter você e seus amigos.', type: 'S' },
      { text: 'Um mago, para identificar os itens que você encontra lá.', type: 'A' },
    ],
  },
  {
    id: 10,
    text: 'Em um jogo online, você prefere ser conhecido como:',
    options: [
      { text: 'Alguém que pode correr de dois pontos no mundo e realmente sabe o que fazer.', type: 'S' },
      { text: 'A pessoa com o melhor e mais exclusivo equipamento do jogo.', type: 'A' },
    ],
  },
  // ── E vs A ──────────────────────────────────────────────────────────────
  {
    id: 11,
    text: 'Qual você gosta mais em um jogo online?',
    options: [
      { text: 'Obter as últimas novidades.', type: 'E' },
      { text: 'Obter um novo item.', type: 'A' },
    ],
  },
  {
    id: 12,
    text: 'Em um jogo online, uma nova área se abre. O que você espera mais?',
    options: [
      { text: 'Explorar a nova área e descobrir sua história.', type: 'E' },
      { text: 'Ser o primeiro a receber o novo equipamento da área.', type: 'A' },
    ],
  },
  {
    id: 13,
    text: 'Você prefere:',
    options: [
      { text: 'Tornar-se um herói mais rápido que seus amigos.', type: 'A' },
      { text: 'Saber mais segredos do que seus amigos.', type: 'E' },
    ],
  },
  {
    id: 14,
    text: 'Você tende a:',
    options: [
      { text: 'Saber coisas que ninguém mais sabe.', type: 'E' },
      { text: 'Ter itens que ninguém mais tem.', type: 'A' },
    ],
  },
  {
    id: 15,
    text: 'O que você prefere fazer?',
    options: [
      { text: 'Resolver um enigma que ninguém mais resolveu.', type: 'E' },
      { text: 'Chegar a um certo nível de experiência mais rápido do que qualquer outra pessoa.', type: 'A' },
    ],
  },
  // ── S vs K ──────────────────────────────────────────────────────────────
  {
    id: 16,
    text: 'Você preferiria:',
    options: [
      { text: 'Derrotar seus inimigos.', type: 'K' },
      { text: 'Convencer seus inimigos a trabalhar para você, não contra você.', type: 'S' },
    ],
  },
  {
    id: 17,
    text: 'O que você acha mais emocionante?',
    options: [
      { text: 'Um cenário bem interpretado.', type: 'S' },
      { text: 'Uma batalha mortal.', type: 'K' },
    ],
  },
  {
    id: 18,
    text: 'Qual você gostaria de mais?',
    options: [
      { text: 'Ganhar um duelo com outro jogador.', type: 'K' },
      { text: 'Ser aceito por um clã (um grupo de outros jogadores).', type: 'S' },
    ],
  },
  {
    id: 19,
    text: 'É melhor ser:',
    options: [
      { text: 'Temido.', type: 'K' },
      { text: 'Amado.', type: 'S' },
    ],
  },
  {
    id: 20,
    text: 'Você prefere:',
    options: [
      { text: 'Ouvir o que alguém tem a dizer.', type: 'S' },
      { text: 'Mostrar a lâmina afiada do seu machado.', type: 'K' },
    ],
  },
  // ── E vs K ──────────────────────────────────────────────────────────────
  {
    id: 21,
    text: 'Em um jogo online, prefere ser conhecido por:',
    options: [
      { text: 'Conhecimento.', type: 'E' },
      { text: 'Poder.', type: 'K' },
    ],
  },
  {
    id: 22,
    text: 'Em um jogo online, você prefere:',
    options: [
      { text: 'Derrotar um inimigo.', type: 'K' },
      { text: 'Explorar.', type: 'E' },
    ],
  },
  {
    id: 23,
    text: 'Se você está sozinho em uma área, você pensa:',
    options: [
      { text: 'É seguro explorar.', type: 'E' },
      { text: 'Você terá que procurar em outro lugar por presas.', type: 'K' },
    ],
  },
  {
    id: 24,
    text: 'Você soube que outro jogador está planejando sua morte. Você:',
    options: [
      { text: 'Vai para uma área com a qual seu oponente não está familiarizado e se prepara.', type: 'E' },
      { text: 'Ataca-o antes que ele ataque você.', type: 'K' },
    ],
  },
  {
    id: 25,
    text: 'Você conhece um novo jogador. Você pensa nele como:',
    options: [
      { text: 'Alguém que possa apreciar seu conhecimento do jogo.', type: 'E' },
      { text: 'Uma presa em potencial.', type: 'K' },
    ],
  },
  // ── A vs K ──────────────────────────────────────────────────────────────
  {
    id: 26,
    text: 'Em um jogo online, você prefere:',
    options: [
      { text: 'Ter uma espada duas vezes mais poderosa que qualquer outra no jogo.', type: 'A' },
      { text: 'Ser a pessoa mais temida no jogo.', type: 'K' },
    ],
  },
  {
    id: 27,
    text: 'Em um jogo online, você estaria mais propenso a se gabar:',
    options: [
      { text: 'Quantos outros jogadores você matou.', type: 'K' },
      { text: 'Do seu equipamento.', type: 'A' },
    ],
  },
  {
    id: 28,
    text: 'Você prefere ter:',
    options: [
      { text: 'Um feitiço para danificar outros jogadores.', type: 'K' },
      { text: 'Um feitiço que aumenta a taxa na qual você ganha pontos de experiência.', type: 'A' },
    ],
  },
  {
    id: 29,
    text: 'Você prefere receber como recompensa da missão:',
    options: [
      { text: 'Pontos de experiência.', type: 'A' },
      { text: 'Uma varinha com 3 cargas de um feitiço que permite controlar outros jogadores, contra a vontade deles.', type: 'K' },
    ],
  },
  {
    id: 30,
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
