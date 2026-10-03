// 가상 예시가 아니라 구조 표: 구간별로 어떤 칸을 얼마나 채우는지(Bastow 의 구간 설명을 이 글이 정리).
type Fill = 'full' | 'half' | 'none';
const COLS = [
  { name: 'Later', sub: '낮음', x: 180 },
  { name: 'Next', sub: '중간', x: 248 },
  { name: 'Now', sub: '높음', x: 316 },
];
const ROWS: { label: string; fills: Fill[] }[] = [
  { label: '풀 문제', fills: ['full', 'full', 'full'] },
  { label: '목표와 지표', fills: ['none', 'half', 'full'] },
  { label: '해결 방식', fills: ['none', 'half', 'full'] },
  { label: '상세 범위', fills: ['none', 'none', 'full'] },
];
const R = 11;
const HEAD_BOTTOM = 56;
const ROW = 44;
const rowTop = (i: number) => HEAD_BOTTOM + i * ROW;
const rowsBottom = rowTop(ROWS.length);
const LEG_Y = rowsBottom + 32; // 범례 원 중심
const VB_H = LEG_Y + 7 + 1 + 14;

function Mark({ cx, cy, fill, r = R }: { cx: number; cy: number; fill: Fill; r?: number }) {
  if (fill === 'none') return <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--muted)" strokeWidth="1.5" strokeDasharray="3 2" />;
  return (
    <g>
      {fill === 'half' && <path d={`M${cx},${cy - r} A${r},${r} 0 0 0 ${cx},${cy + r} Z`} fill="var(--accent)" />}
      {fill === 'full' && <circle cx={cx} cy={cy} r={r} fill="var(--accent)" />}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--accent)" strokeWidth="1.5" />
    </g>
  );
}

export default function HorizonFill() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="구간별로 채우는 칸. 풀 문제는 Later, Next, Now 모두 적는다. 목표와 지표, 해결 방식은 Later 에서 비우고 Next 에서 초안, Now 에서 확정한다. 상세 범위는 Now 에서만 적는다.">
      <text className="t-sub" x="14" y="42">확신</text>
      {COLS.map((c) => (
        <g key={c.name}>
          <text className="t-strong" x={c.x} y="22" textAnchor="middle">{c.name}</text>
          <text className="t-sub" x={c.x} y="42" textAnchor="middle">{c.sub}</text>
        </g>
      ))}
      {ROWS.map((r, i) => {
        const top = rowTop(i);
        return (
          <g key={r.label}>
            <line x1="8" y1={top} x2="352" y2={top} stroke="var(--line)" />
            <text className="t-sub" x="14" y={top + ROW / 2 + 5}>{r.label}</text>
            {r.fills.map((f, j) => <Mark key={COLS[j].name} cx={COLS[j].x} cy={top + ROW / 2} fill={f} />)}
          </g>
        );
      })}
      <line x1="8" y1={rowsBottom} x2="352" y2={rowsBottom} stroke="var(--line)" />
      <Mark cx={20} cy={LEG_Y} fill="full" r={7} />
      <text className="t-sub" x="34" y={LEG_Y + 5}>확정해서 적음</text>
      <Mark cx={150} cy={LEG_Y} fill="half" r={7} />
      <text className="t-sub" x="164" y={LEG_Y + 5}>초안·후보</text>
      <Mark cx={256} cy={LEG_Y} fill="none" r={7} />
      <text className="t-sub" x="270" y={LEG_Y + 5}>비워 둠</text>
    </svg>
  );
}
