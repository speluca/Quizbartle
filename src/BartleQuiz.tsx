import { useState } from 'react';
import {
  questions,
  calculateScores,
  profiles,
  TOTAL_QUESTIONS,
  type BartleType,
} from './questions';
import { buildRecord, saveResponse } from './storage';
import './BartleQuiz.css';

type Phase = 'entry' | 'quiz' | 'result';

export function BartleQuiz() {
  const [phase, setPhase] = useState<Phase>('entry');
  const [codigo, setCodigo] = useState('');
  const [answers, setAnswers] = useState<Record<number, BartleType>>({});
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const totalAnswered = Object.keys(answers).length;
  const allAnswered = totalAnswered === questions.length;

  function handleStart() {
    if (codigo.trim()) setPhase('quiz');
  }

  function handleSelect(questionId: number, type: BartleType) {
    setAnswers((prev) => ({ ...prev, [questionId]: type }));
  }

  async function handleSubmit() {
    if (!allAnswered || saving) return;
    setSaving(true);
    setSaveError(null);
    const scores = calculateScores(answers);
    const record = buildRecord(codigo, scores, answers);
    try {
      await saveResponse(record);
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : String(err));
      setSaving(false);
      return;
    }
    setSaving(false);
    setPhase('result');
  }

  // ── Entry ────────────────────────────────────────────────────────────────
  if (phase === 'entry') {
    return (
      <div className="quiz-container entry-container">
        <h1 className="entry-title">Teste de Bartle</h1>
        <p className="entry-subtitle">
          Responda 30 perguntas para descobrir seu perfil de jogador segundo o modelo de Richard
          Bartle (Explorer, Achiever, Socializer ou Killer).
        </p>
        <div className="entry-form">
          <label className="entry-label" htmlFor="codigo">
            Código de identificação
          </label>
          <input
            id="codigo"
            className="entry-input"
            type="text"
            placeholder="Ex: ALU-2024-001"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleStart()}
            autoFocus
          />
          <button className="btn-start" disabled={!codigo.trim()} onClick={handleStart}>
            Iniciar teste
          </button>
        </div>
      </div>
    );
  }

  // ── Result ───────────────────────────────────────────────────────────────
  if (phase === 'result') {
    const scores = calculateScores(answers);
    const sorted = (Object.entries(scores) as [BartleType, number][]).sort(
      (a, b) => b[1] - a[1]
    );
    const dominant = sorted[0][0];
    const dominantInfo = profiles[dominant];
    const dominantPct = Math.round((scores[dominant] / TOTAL_QUESTIONS) * 100);

    return (
      <div className="quiz-container">
        <div className="dominant-hero" style={{ backgroundColor: dominantInfo.color }}>
          <div className="dominant-hero-emoji">{dominantInfo.emoji}</div>
          <div className="dominant-hero-pct">{dominantPct}%</div>
          <div className="dominant-hero-name">{dominantInfo.fullName}</div>
          <div className="dominant-hero-label">{dominantInfo.label}</div>
        </div>

        <div className="dominant-desc-box" style={{ borderLeftColor: dominantInfo.color }}>
          <p>{dominantInfo.description}</p>
        </div>

        <div className="scores-section">
          <h3 className="section-title">Distribuição dos perfis</h3>
          <div className="score-bars">
            {sorted.map(([type, score]) => {
              const pct = Math.round((score / TOTAL_QUESTIONS) * 100);
              const info = profiles[type];
              const isDominant = type === dominant;
              return (
                <div key={type} className={`score-row ${isDominant ? 'score-row--dominant' : ''}`}>
                  <div className="score-label">
                    <span className="score-emoji">{info.emoji}</span>
                    <span className="score-name">{info.fullName}</span>
                    <span className="score-tag">{info.label}</span>
                  </div>
                  <div className="bar-track">
                    <div
                      className="bar-fill"
                      style={{ width: `${pct}%`, backgroundColor: info.color }}
                    />
                  </div>
                  <span className="score-pct" style={{ color: isDominant ? info.color : undefined }}>
                    {pct}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="secondary-profiles">
          {sorted.slice(1).map(([type]) => {
            const info = profiles[type];
            const pct = Math.round((scores[type] / TOTAL_QUESTIONS) * 100);
            return (
              <div key={type} className="secondary-card" style={{ borderTopColor: info.color }}>
                <div className="secondary-card-header">
                  <span>{info.emoji}</span>
                  <span className="secondary-name" style={{ color: info.color }}>
                    {info.fullName}
                  </span>
                  <span className="secondary-pct">{pct}%</span>
                </div>
                <p className="secondary-desc">{info.description}</p>
              </div>
            );
          })}
        </div>

      </div>
    );
  }

  // ── Quiz ─────────────────────────────────────────────────────────────────
  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h1>Teste de Bartle</h1>
        <p className="quiz-id">
          Código: <strong>{codigo}</strong>
        </p>
        <div className="progress-bar-track">
          <div
            className="progress-bar-fill"
            style={{ width: `${(totalAnswered / questions.length) * 100}%` }}
          />
        </div>
        <p className="progress-text">
          {totalAnswered} / {questions.length} respondidas
        </p>
      </div>

      <div className="questions-list">
        {questions.map((q) => {
          const selected = answers[q.id];
          return (
            <div
              key={q.id}
              className={`question-card ${selected ? 'question-card--answered' : ''}`}
            >
              <p className="question-text">
                <span className="question-number">{q.id}.</span> {q.text}
              </p>
              <div className="options">
                {q.options.map((opt, i) => (
                  <button
                    key={i}
                    className={`option-btn ${selected === opt.type ? 'option-btn--selected' : ''}`}
                    onClick={() => handleSelect(q.id, opt.type)}
                  >
                    <span className="option-radio">{selected === opt.type ? '●' : '○'}</span>
                    {opt.text}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="submit-area">
        {!allAnswered && (
          <p className="submit-hint">
            Faltam {questions.length - totalAnswered} pergunta
            {questions.length - totalAnswered !== 1 ? 's' : ''}.
          </p>
        )}
        {saveError && <p className="submit-error">{saveError}</p>}
        <button
          className="btn-submit"
          disabled={!allAnswered || saving}
          onClick={handleSubmit}
        >
          {saving ? 'Salvando…' : 'Ver resultado'}
        </button>
      </div>
    </div>
  );
}
