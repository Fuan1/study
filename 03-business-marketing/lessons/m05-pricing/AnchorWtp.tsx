/** Ariely, Loewenstein, Prelec (2003) 표 I의 값. 무선 키보드에 대한 평균 지불 의사(달러)를
 *  사회보장번호 끝 두 자리의 5분위별로 나눈 것. 값은 원문 그대로다. */
const ROWS = [
  { q: '1분위 (낮은 번호)', v: 16.09 },
  { q: '2분위', v: 26.82 },
  { q: '3분위', v: 29.27 },
  { q: '4분위', v: 34.55 },
  { q: '5분위 (높은 번호)', v: 55.64 },
];

const X0 = 16;
const BAR_MAX = 328;
const PITCH = 56;
const max = ROWS[ROWS.length - 1].v;
const lastBarBottom = 8 + (ROWS.length - 1) * PITCH + 26 + 22;
const VB_H = lastBarBottom + 1 + 8;

export default function AnchorWtp() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label={`같은 무선 키보드에 대한 평균 지불 의사를 사회보장번호 끝 두 자리 5분위별로 나눈 값. ${ROWS.map((r) => `${r.q} ${r.v.toFixed(2)}달러`).join(', ')}.`}>
      {ROWS.map((r, i) => {
        const y = 8 + i * PITCH;
        return (
          <g key={r.q}>
            <text className="t-strong" x={X0} y={y + 14}>{r.q}</text>
            <text className="t-sub" x={360 - X0} y={y + 14} textAnchor="end">${r.v.toFixed(2)}</text>
            <rect x={X0} y={y + 26} width={BAR_MAX} height="22" rx="4" className="svg-box" />
            <rect x={X0} y={y + 26} width={Math.max(4, (r.v / max) * BAR_MAX)} height="22" rx="2" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1.5" />
          </g>
        );
      })}
    </svg>
  );
}
