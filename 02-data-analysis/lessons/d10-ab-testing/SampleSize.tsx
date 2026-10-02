/** Kohavi 외(2007)의 근사식 n = (4 r σ / Δ)^2 (신뢰 95%, 검정력 90%)에 r=2, 전환율 5%를 넣어 계산한다.
 *  σ = sqrt(p(1-p)), Δ = p × 상대 변화율. 사용자 수의 절대값이 아니라 효과가 절반이 될 때 4배가 되는 관계를 보인다. */
const P = 0.05;
const need = (rel: number) => Math.pow((4 * 2 * Math.sqrt(P * (1 - P))) / (P * rel), 2);
const ROWS = [0.4, 0.2, 0.1, 0.05].map((rel) => ({ rel, n: Math.round(need(rel)) }));

const X0 = 16;
const BAR_MAX = 328;
const PITCH = 64;
const fmt = (n: number) => n.toLocaleString('en-US');
const last = ROWS.length - 1;
const lastBarBottom = 8 + last * PITCH + 26 + 22;
const DIV = lastBarBottom + 24;
const VB_H = DIV + 24 + 20 + 12;

export default function SampleSize() {
  const max = ROWS[ROWS.length - 1].n;
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="전환율 5퍼센트에서 검출하려는 상대 변화가 40, 20, 10, 5퍼센트로 절반씩 줄 때 필요한 사용자 수는 약 7600, 30400, 121600, 486400명으로 매번 4배가 된다.">
      {ROWS.map((r, i) => {
        const y = 8 + i * PITCH;
        return (
          <g key={r.rel}>
            <text className="t-strong" x={X0} y={y + 14}>검출할 변화 +{Math.round(r.rel * 100)}%</text>
            <text className="t-sub" x={360 - X0} y={y + 14} textAnchor="end">{fmt(r.n)}명</text>
            <rect x={X0} y={y + 26} width={BAR_MAX} height="22" rx="4" className="svg-box" />
            <rect x={X0} y={y + 26} width={Math.max(4, (r.n / max) * BAR_MAX)} height="22" rx="2" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1.5" />
          </g>
        );
      })}
      <line x1="8" y1={DIV} x2="352" y2={DIV} stroke="var(--line)" />
      <text className="t-sub" x={X0} y={DIV + 24}>가정: 현재 전환율 5%, 신뢰 95%, 검정력 90%</text>
      <text className="t-sub" x={X0} y={DIV + 44}>근사식 계산값. 정확한 계산기와 다를 수 있다</text>
    </svg>
  );
}
