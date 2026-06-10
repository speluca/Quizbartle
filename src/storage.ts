import { supabase } from './supabase';
import { profiles, TOTAL_QUESTIONS, type BartleType, type Scores } from './questions';

const TABLE = 'bartle_respostas';
const TABLE_EVAL = 'bartle_avaliacao';

export interface ResponseRecord {
  id?: string;
  codigo: string;
  timestamp?: string;
  perfil_dominante: string;
  pct_e: number;
  pct_a: number;
  pct_s: number;
  pct_k: number;
  pontos_e: number;
  pontos_a: number;
  pontos_s: number;
  pontos_k: number;
  q1: string;  q2: string;  q3: string;  q4: string;  q5: string;  q6: string;
  q7: string;  q8: string;  q9: string;  q10: string; q11: string; q12: string;
  q13: string; q14: string; q15: string; q16: string; q17: string; q18: string;
  q19: string; q20: string; q21: string; q22: string; q23: string; q24: string;
  q25: string; q26: string; q27: string; q28: string; q29: string; q30: string;
}

type InsertRecord = Omit<ResponseRecord, 'id' | 'timestamp'>;

export function buildRecord(
  codigo: string,
  scores: Scores,
  answers: Record<number, BartleType>
): InsertRecord {
  const sorted = (Object.entries(scores) as [BartleType, number][]).sort((a, b) => b[1] - a[1]);
  const dominant = sorted[0][0];

  return {
    codigo,
    perfil_dominante: profiles[dominant].label,
    pct_e: Math.round((scores.E / TOTAL_QUESTIONS) * 100),
    pct_a: Math.round((scores.A / TOTAL_QUESTIONS) * 100),
    pct_s: Math.round((scores.S / TOTAL_QUESTIONS) * 100),
    pct_k: Math.round((scores.K / TOTAL_QUESTIONS) * 100),
    pontos_e: scores.E,
    pontos_a: scores.A,
    pontos_s: scores.S,
    pontos_k: scores.K,
    q1:  answers[1]  ?? '', q2:  answers[2]  ?? '', q3:  answers[3]  ?? '',
    q4:  answers[4]  ?? '', q5:  answers[5]  ?? '', q6:  answers[6]  ?? '',
    q7:  answers[7]  ?? '', q8:  answers[8]  ?? '', q9:  answers[9]  ?? '',
    q10: answers[10] ?? '', q11: answers[11] ?? '', q12: answers[12] ?? '',
    q13: answers[13] ?? '', q14: answers[14] ?? '', q15: answers[15] ?? '',
    q16: answers[16] ?? '', q17: answers[17] ?? '', q18: answers[18] ?? '',
    q19: answers[19] ?? '', q20: answers[20] ?? '', q21: answers[21] ?? '',
    q22: answers[22] ?? '', q23: answers[23] ?? '', q24: answers[24] ?? '',
    q25: answers[25] ?? '', q26: answers[26] ?? '', q27: answers[27] ?? '',
    q28: answers[28] ?? '', q29: answers[29] ?? '', q30: answers[30] ?? '',
  };
}

export async function saveResponse(record: InsertRecord): Promise<void> {
  const { error } = await supabase.from(TABLE).insert(record);
  if (error) throw new Error(error.message);
}

export async function loadResponses(): Promise<ResponseRecord[]> {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .order('timestamp', { ascending: true });
  if (error) throw new Error(error.message);
  return (data ?? []) as ResponseRecord[];
}

// ── Evaluation ───────────────────────────────────────────────────────────────

export interface EvaluationRecord {
  id?: string;
  codigo: string;
  timestamp?: string;
  imms_r1: number; imms_r2: number; imms_r3: number; imms_r4: number;
  imms_s1: number; imms_s2: number; imms_s3: number; imms_s4: number;
  jogo_explorador: number;
  jogo_conquistador: number;
  jogo_socializador: number;
  jogo_competidor: number;
}

export async function saveEvaluation(
  codigo: string,
  answers: Record<string, number>
): Promise<void> {
  const record = {
    codigo,
    imms_r1: answers.r1, imms_r2: answers.r2, imms_r3: answers.r3, imms_r4: answers.r4,
    imms_s1: answers.s1, imms_s2: answers.s2, imms_s3: answers.s3, imms_s4: answers.s4,
    jogo_explorador:   answers.g1,
    jogo_conquistador: answers.g2,
    jogo_socializador: answers.g3,
    jogo_competidor:   answers.g4,
  };
  const { error } = await supabase.from(TABLE_EVAL).insert(record);
  if (error) throw new Error(error.message);
}

export async function loadEvaluations(): Promise<EvaluationRecord[]> {
  const { data, error } = await supabase
    .from(TABLE_EVAL)
    .select('*')
    .order('timestamp', { ascending: true });
  if (error) throw new Error(error.message);
  return (data ?? []) as EvaluationRecord[];
}

export function exportEvaluationsCSV(records: EvaluationRecord[]): void {
  if (records.length === 0) return;

  const headers = [
    'codigo', 'timestamp',
    'imms_r1', 'imms_r2', 'imms_r3', 'imms_r4',
    'imms_s1', 'imms_s2', 'imms_s3', 'imms_s4',
    'jogo_explorador', 'jogo_conquistador', 'jogo_socializador', 'jogo_competidor',
  ] as const;

  const rows = records.map(r =>
    headers.map(h => String((r as Record<string, unknown>)[h] ?? '')).join(',')
  );

  const csv = '﻿' + [headers.join(','), ...rows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `bartle_avaliacao_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

// ── Bartle CSV ────────────────────────────────────────────────────────────────

export function exportAllCSV(records: ResponseRecord[]): void {
  if (records.length === 0) return;

  const headers = [
    'codigo', 'timestamp', 'perfil_dominante',
    'pct_e', 'pct_a', 'pct_s', 'pct_k',
    'pontos_e', 'pontos_a', 'pontos_s', 'pontos_k',
    'q1',  'q2',  'q3',  'q4',  'q5',  'q6',
    'q7',  'q8',  'q9',  'q10', 'q11', 'q12',
    'q13', 'q14', 'q15', 'q16', 'q17', 'q18',
    'q19', 'q20', 'q21', 'q22', 'q23', 'q24',
    'q25', 'q26', 'q27', 'q28', 'q29', 'q30',
  ] as const;

  const rows = records.map(r =>
    headers.map(h => {
      const v = String((r as Record<string, unknown>)[h] ?? '');
      return v.includes(',') ? `"${v}"` : v;
    }).join(',')
  );

  const csv = '﻿' + [headers.join(','), ...rows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `bartle_dados_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
