import { useState } from 'react';
import { evalQuestions, LIKERT_LABELS, type EvalQuestion } from './evaluation';
import { saveEvaluation } from './storage';
import './PostEvaluation.css';

interface Props {
  codigo: string;
  onComplete: () => void;
}

const CATEGORIES: EvalQuestion['category'][] = ['Relevância', 'Satisfação', 'Jogos'];

const CATEGORY_LABELS: Record<EvalQuestion['category'], string> = {
  Relevância: 'Relevância',
  Satisfação: 'Satisfação',
  Jogos: 'Avaliação dos Jogos',
};

export function PostEvaluation({ codigo, onComplete }: Props) {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const total = evalQuestions.length;
  const answered = Object.keys(answers).length;
  const allAnswered = answered === total;

  function handleSelect(id: string, value: number) {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  }

  async function handleSubmit() {
    if (!allAnswered || saving) return;
    setSaving(true);
    setError(null);
    try {
      await saveEvaluation(codigo, answers);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      setSaving(false);
      return;
    }
    setSaving(false);
    onComplete();
  }

  return (
    <div className="eval-container">
      <div className="eval-header">
        <h1>Avaliação</h1>
        <p className="eval-subtitle">
          Indique seu grau de concordância com cada afirmação (1 = Discordo totalmente · 5 = Concordo totalmente).
        </p>
        <div className="progress-bar-track">
          <div className="progress-bar-fill" style={{ width: `${(answered / total) * 100}%` }} />
        </div>
        <p className="progress-text">{answered} / {total} respondidas</p>
      </div>

      {CATEGORIES.map((cat) => {
        const questions = evalQuestions.filter((q) => q.category === cat);
        return (
          <section key={cat} className="eval-section">
            <h2 className="eval-category">{CATEGORY_LABELS[cat]}</h2>
            <div className="eval-questions">
              {questions.map((q, i) => {
                const globalIndex = evalQuestions.indexOf(q) + 1;
                const selected = answers[q.id];
                return (
                  <div
                    key={q.id}
                    className={`eval-card ${selected ? 'eval-card--answered' : ''}`}
                  >
                    <p className="eval-question-text">
                      <span className="eval-qnum">{globalIndex}.</span> {q.text}
                    </p>
                    <div className="likert-row">
                      <span className="likert-label-left">Discordo<br/>totalmente</span>
                      <div className="likert-buttons">
                        {[1, 2, 3, 4, 5].map((v) => (
                          <button
                            key={v}
                            className={`likert-btn ${selected === v ? 'likert-btn--selected' : ''}`}
                            onClick={() => handleSelect(q.id, v)}
                            title={LIKERT_LABELS[v]}
                          >
                            {v}
                          </button>
                        ))}
                      </div>
                      <span className="likert-label-right">Concordo<br/>totalmente</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}

      <div className="eval-submit-area">
        {!allAnswered && (
          <p className="submit-hint">Faltam {total - answered} resposta{total - answered !== 1 ? 's' : ''}.</p>
        )}
        {error && <p className="submit-error">{error}</p>}
        <button
          className="btn-submit"
          disabled={!allAnswered || saving}
          onClick={handleSubmit}
        >
          {saving ? 'Salvando…' : 'Finalizar'}
        </button>
      </div>
    </div>
  );
}
