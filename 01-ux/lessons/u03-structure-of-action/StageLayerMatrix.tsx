const LAYERS = ['표면', '골격', '구조', '범위', '전략'];
const COLS = LAYERS.map((_, i) => 141 + i * 47);

/** 이 글의 해석. 각 단계에서 막힘이 주로 풀리는 층(인덱스는 LAYERS 기준). */
const ROWS = [
  { name: '1 목표', hits: [3, 4], cls: 'pl-mid' },
  { name: '2 계획', hits: [2, 3], cls: 'pl-ux' },
  { name: '3 명세', hits: [1, 2], cls: 'pl-ux' },
  { name: '4 수행', hits: [0, 1], cls: 'pl-ux' },
  { name: '5 지각', hits: [0, 1], cls: 'pl-ui' },
  { name: '6 해석', hits: [0, 2], cls: 'pl-ui' },
  { name: '7 비교', hits: [3, 4], cls: 'pl-ui' },
];

export default function StageLayerMatrix() {
  const top = 40;
  const rh = 36;
  return (
    <svg viewBox="0 0 360 324" role="img" aria-label="행동 7단계와 UX 5개 층의 대응표. 목표와 비교는 전략과 범위, 계획은 범위와 구조, 명세는 구조와 골격, 수행과 지각은 골격과 표면, 해석은 표면과 구조에서 주로 풀린다.">
      {LAYERS.map((l, i) => (
        <text key={l} className="t-sub" x={COLS[i]} y="22" textAnchor="middle">{l}</text>
      ))}
      {ROWS.map((r, ri) => {
        const y = top + ri * rh;
        return (
          <g key={r.name}>
            <line x1="8" y1={y} x2="352" y2={y} stroke="var(--line)" />
            <rect className={r.cls} x="8" y={y + 6} width="5" height={rh - 12} rx="2" />
            <text className="t-strong" x="24" y={y + 23}>{r.name}</text>
            {r.hits.map((h) => (
              <circle key={h} cx={COLS[h]} cy={y + rh / 2} r="8" style={{ fill: 'var(--accent)' }} />
            ))}
          </g>
        );
      })}
      <line x1="8" y1={top + ROWS.length * rh} x2="352" y2={top + ROWS.length * rh} stroke="var(--line)" />
      <text className="t-sub" x="8" y={top + ROWS.length * rh + 22}>표시한 층에서 먼저 원인을 찾는다. 이 글의 정리다.</text>
    </svg>
  );
}
