import { useState } from 'react';
import {
  loadResponses, exportAllCSV, type ResponseRecord,
  loadEvaluations, exportEvaluationsCSV, type EvaluationRecord,
} from './storage';
import { profiles, type BartleType } from './questions';
import './AdminPanel.css';

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD as string;

export function AdminPanel() {
  const [senha, setSenha] = useState('');
  const [autenticado, setAutenticado] = useState(false);
  const [erroSenha, setErroSenha] = useState(false);
  const [records, setRecords] = useState<ResponseRecord[]>([]);
  const [evaluations, setEvaluations] = useState<EvaluationRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  async function fetchRecords() {
    setLoading(true);
    setLoadError(null);
    try {
      const [r, e] = await Promise.all([loadResponses(), loadEvaluations()]);
      setRecords(r);
      setEvaluations(e);
    } catch (err) {
      setLoadError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }

  async function handleLogin() {
    if (senha !== ADMIN_PASSWORD) {
      setErroSenha(true);
      return;
    }
    setErroSenha(false);
    setAutenticado(true);
    await fetchRecords();
  }

  if (!autenticado) {
    return (
      <div className="admin-gate">
        <h2>Acesso administrativo</h2>
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
          autoFocus
          className={`admin-input ${erroSenha ? 'admin-input--erro' : ''}`}
        />
        {erroSenha && <p className="admin-erro">Senha incorreta.</p>}
        <button className="btn-admin-login" onClick={handleLogin}>
          Entrar
        </button>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <div>
          <h2>Painel do administrador</h2>
          <p className="admin-sub">
            {loading
              ? 'Carregando…'
              : `${records.length} resposta${records.length !== 1 ? 's' : ''} coletada${records.length !== 1 ? 's' : ''}`}
          </p>
        </div>
        <div className="admin-actions">
          <button className="btn-refresh" onClick={fetchRecords} disabled={loading}>
            ↻ Recarregar
          </button>
          <button
            className="btn-export"
            disabled={records.length === 0 || loading}
            onClick={() => exportAllCSV(records)}
          >
            ⬇ Bartle CSV
          </button>
          <button
            className="btn-export btn-export--secondary"
            disabled={evaluations.length === 0 || loading}
            onClick={() => exportEvaluationsCSV(evaluations)}
          >
            ⬇ Avaliação CSV
          </button>
        </div>
      </div>

      {loadError && (
        <p className="admin-load-error">Erro ao carregar dados: {loadError}</p>
      )}

      {!loading && !loadError && records.length === 0 && (
        <p className="admin-empty">Nenhuma resposta registrada ainda.</p>
      )}

      {records.length > 0 && (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Código</th>
                <th>Data/hora</th>
                <th>Perfil</th>
                <th>E%</th>
                <th>A%</th>
                <th>S%</th>
                <th>K%</th>
              </tr>
            </thead>
            <tbody>
              {records.map((r, i) => {
                const dominantKey = (Object.keys(profiles) as BartleType[]).find(
                  (k) => profiles[k].label === r.perfil_dominante
                );
                const color = dominantKey ? profiles[dominantKey].color : '#999';
                return (
                  <tr key={r.id ?? i}>
                    <td className="td-num">{i + 1}</td>
                    <td className="td-code">{r.codigo}</td>
                    <td className="td-date">
                      {r.timestamp
                        ? new Date(r.timestamp).toLocaleString('pt-BR')
                        : '—'}
                    </td>
                    <td>
                      <span className="badge" style={{ backgroundColor: color }}>
                        {r.perfil_dominante}
                      </span>
                    </td>
                    <td>{r.pct_e}%</td>
                    <td>{r.pct_a}%</td>
                    <td>{r.pct_s}%</td>
                    <td>{r.pct_k}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
