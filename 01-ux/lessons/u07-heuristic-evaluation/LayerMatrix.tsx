/** 10개 휴리스틱이 주로(2) 또는 보조로(1) 걸리는 5개 층. 이 글의 해석이며 공식 분류가 아니다. */
const LAYERS = ['표면', '골격', '구조', '범위', '전략'];
const ROWS: { n: number; name: string; v: number[] }[] = [
  { n: 1, name: '상태의 가시성', v: [0, 2, 1, 0, 0] },
  { n: 2, name: '현실 세계와의 일치', v: [2, 0, 1, 0, 0] },
  { n: 3, name: '통제와 자유', v: [0, 1, 2, 0, 0] },
  { n: 4, name: '일관성과 표준', v: [2, 2, 0, 0, 0] },
  { n: 5, name: '오류 예방', v: [0, 1, 2, 0, 0] },
  { n: 6, name: '회상보다 인식', v: [1, 2, 0, 0, 0] },
  { n: 7, name: '유연성과 효율성', v: [0, 0, 2, 1, 0] },
  { n: 8, name: '미니멀 디자인', v: [2, 2, 0, 1, 0] },
  { n: 9, name: '오류 복구 문구', v: [2, 0, 1, 0, 0] },
  { n: 10, name: '도움말과 문서', v: [0, 1, 0, 2, 0] },
];

export default function LayerMatrix() {
  const x0 = 140;
  const cw = 44;
  const y0 = 40;
  const rh = 27;
  return (
    <svg viewBox="0 0 360 372" role="img" aria-label="10개 휴리스틱과 UX 5개 층의 대응표. 표면, 골격, 구조에 집중되고 범위는 일부, 전략에는 대응하는 휴리스틱이 없다.">
      <rect x={x0 + 4 * cw} y="4" width={cw} height={y0 + ROWS.length * rh - 4} rx="6" style={{ fill: 'var(--warm-soft)' }} />
      {LAYERS.map((l, i) => (
        <text key={l} className="t-strong" x={x0 + i * cw + cw / 2} y="28" textAnchor="middle" style={{ fontSize: 13 }}>{l}</text>
      ))}
      {ROWS.map((r, ri) => {
        const y = y0 + ri * rh;
        return (
          <g key={r.n}>
            <line x1="8" y1={y} x2="352" y2={y} style={{ stroke: 'var(--line)', strokeWidth: 1 }} />
            <text x="8" y={y + 18} fontSize="12.5"><tspan style={{ fill: 'var(--accent)', fontWeight: 700 }}>{r.n}</tspan><tspan dx="6">{r.name}</tspan></text>
            {r.v.map((v, ci) => v > 0 && (
              <circle key={ci} cx={x0 + ci * cw + cw / 2} cy={y + rh / 2} r="6.5" style={v === 2 ? { fill: 'var(--accent)', stroke: 'var(--accent)', strokeWidth: 1.5 } : { fill: 'none', stroke: 'var(--accent)', strokeWidth: 1.5 }} />
            ))}
          </g>
        );
      })}
      <line x1="8" y1={y0 + ROWS.length * rh} x2="352" y2={y0 + ROWS.length * rh} style={{ stroke: 'var(--line)', strokeWidth: 1 }} />
      <circle cx="16" cy="334" r="6.5" style={{ fill: 'var(--accent)' }} />
      <text className="t-sub" x="28" y="338">주로 걸리는 층</text>
      <circle cx="160" cy="334" r="6.5" style={{ fill: 'none', stroke: 'var(--accent)', strokeWidth: 1.5 }} />
      <text className="t-sub" x="172" y="338">보조로 걸리는 층</text>
      <text className="t-warm" x="8" y="362" style={{ fontSize: 12.5 }}>전략 열은 비어 있다</text>
    </svg>
  );
}
