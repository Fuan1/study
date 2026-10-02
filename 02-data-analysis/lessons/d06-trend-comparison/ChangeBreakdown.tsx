/** 가상 예시: 채널별 주간 주문 수. 변화량과 합계는 여기서 계산한다. */
const ROWS = [
  { name: '검색 광고', before: 400, after: 340 },
  { name: '앱 푸시', before: 300, after: 285 },
  { name: '자연 유입', before: 250, after: 260 },
  { name: '제휴', before: 50, after: 40 },
];

const ZERO = 232; // 0 의 x
const SCALE = 1.3; // 주문 1건당 px
const PITCH = 64;

export default function ChangeBreakdown() {
  const deltas = ROWS.map((r) => r.after - r.before);
  const total = deltas.reduce((a, b) => a + b, 0);
  const totalBefore = ROWS.reduce((a, r) => a + r.before, 0);
  const totalAfter = ROWS.reduce((a, r) => a + r.after, 0);
  const fmt = (v: number) => (v > 0 ? `+${v}` : `${v}`);
  const bar = (v: number) => ({ x: v < 0 ? ZERO + v * SCALE : ZERO, w: Math.abs(v) * SCALE });
  const lineY = 8 + ROWS.length * PITCH;
  const tY = lineY + 24;
  const H = tY + 56;
  const tb = bar(total);
  return (
    <svg viewBox={`0 0 360 ${H}`} role="img" aria-label={`채널별 변화량 막대. 검색 광고 ${fmt(deltas[0])}, 앱 푸시 ${fmt(deltas[1])}, 자연 유입 ${fmt(deltas[2])}, 제휴 ${fmt(deltas[3])}. 합계는 ${fmt(total)}으로 구간 변화량을 더하면 전체 변화와 같다.`}>
      <line x1={ZERO} y1="4" x2={ZERO} y2={lineY - 4} stroke="var(--line)" strokeWidth="1.5" />
      {ROWS.map((r, i) => {
        const y = 8 + i * PITCH;
        const b = bar(deltas[i]);
        return (
          <g key={r.name}>
            <text className="t-strong" x="8" y={y + 18}>{r.name}</text>
            <text className="t-sub" x="8" y={y + 38}>{r.before} → {r.after}</text>
            <rect x={b.x} y={y + 8} width={b.w} height="24" rx="3" fill="var(--accent-soft)" stroke={deltas[i] < 0 ? 'var(--bad)' : 'var(--good)'} strokeWidth="1.5" />
            <text className={deltas[i] < 0 ? 't-bad' : 't-good'} x="352" y={y + 25} textAnchor="end">{fmt(deltas[i])}</text>
          </g>
        );
      })}
      <line x1="8" y1={lineY} x2="352" y2={lineY} stroke="var(--line)" />
      <text className="t-strong" x="8" y={tY + 18}>합계</text>
      <text className="t-sub" x="8" y={tY + 38}>{totalBefore} → {totalAfter}</text>
      <rect className="svg-berg" x={tb.x} y={tY + 8} width={tb.w} height="24" rx="3" />
      <text className="t-bad" x="352" y={tY + 25} textAnchor="end">{fmt(total)}</text>
    </svg>
  );
}
