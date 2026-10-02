const CELLS = [
  { col: 0, row: 0, title: '드물지만 치명적', a: '피해가 크면', b: '먼저 고친다', cls: 'svg-box' },
  { col: 1, row: 0, title: '가장 먼저', a: '여러 명이 막히고', b: '결과가 심각', cls: 'svg-box-key' },
  { col: 0, row: 1, title: '나중에', a: '기록해 두고', b: '재발하면 올린다', cls: 'svg-box' },
  { col: 1, row: 1, title: '자주 거슬림', a: '비슷한 것끼리', b: '묶어서 고친다', cls: 'svg-box' },
];

export default function PriorityMatrix() {
  const x0 = 56;
  const y0 = 10;
  const cw = 146;
  const ch = 108;
  const g = 8;
  return (
    <svg viewBox="0 0 360 286" role="img" aria-label="문제 우선순위 격자. 가로는 몇 명이 겪었나(빈도), 세로는 막았을 때 결과가 얼마나 나쁜가(심각도). 심각도가 높고 빈도가 높은 칸이 가장 먼저다.">
      {CELLS.map((c) => {
        const x = x0 + c.col * (cw + g);
        const y = y0 + c.row * (ch + g);
        return (
          <g key={c.title}>
            <rect className={c.cls} x={x} y={y} width={cw} height={ch} rx="8" />
            <text className={c.cls === 'svg-box-key' ? 't-warm' : 't-strong'} x={x + 12} y={y + 34}>{c.title}</text>
            <text className="t-sub" x={x + 12} y={y + 60}>{c.a}</text>
            <text className="t-sub" x={x + 12} y={y + 80}>{c.b}</text>
          </g>
        );
      })}
      <text className="t-sub" x={x0} y={y0 + 2 * ch + g + 22}>적게 겪음</text>
      <text className="t-sub" x={x0 + 2 * cw + g} y={y0 + 2 * ch + g + 22} textAnchor="end">많이 겪음</text>
      <text className="t-strong" x={x0 + cw + g / 2} y={y0 + 2 * ch + g + 44} textAnchor="middle">빈도</text>
      <text className="t-sub" x="50" y={y0 + 20} textAnchor="end">높음</text>
      <text className="t-sub" x="50" y={y0 + 2 * ch + g - 6} textAnchor="end">낮음</text>
      <text className="t-strong" x="50" y={y0 + ch + g / 2 + 5} textAnchor="end">심각도</text>
    </svg>
  );
}
