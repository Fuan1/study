const CELLS = [
  { col: 0, row: 0, cond: '영향 큼 · 노력 작음', act: '먼저 한다', note: '가장 먼저 검증한다', cls: 'svg-box-good', tcls: 't-good' },
  { col: 1, row: 0, cond: '영향 큼 · 노력 큼', act: '쪼개서 계획', note: '작은 실험부터 둔다', cls: 'svg-box-key', tcls: 't-strong' },
  { col: 0, row: 1, cond: '영향 작음 · 노력 작음', act: '여유 있을 때', note: '틈이 날 때만 한다', cls: 'svg-box', tcls: 't-strong' },
  { col: 1, row: 1, cond: '영향 작음 · 노력 큼', act: '하지 않는다', note: '목록에서 뺀다', cls: 'svg-box-bad', tcls: 't-bad' },
];

export default function ImpactEffort() {
  const w = 170;
  const h = 98;
  return (
    <svg viewBox="0 0 360 240" role="img" aria-label="영향과 노력 두 축의 2 곱하기 2 매트릭스. 영향 큼 노력 작음은 먼저 한다, 영향 큼 노력 큼은 쪼개서 계획한다, 영향 작음 노력 작음은 여유 있을 때 한다, 영향 작음 노력 큼은 하지 않는다.">
      <text className="t-sub" x={8 + w / 2} y="16" textAnchor="middle">노력 작음</text>
      <text className="t-sub" x={182 + w / 2} y="16" textAnchor="middle">노력 큼</text>
      {CELLS.map((c) => {
        const x = c.col === 0 ? 8 : 182;
        const y = 26 + c.row * (h + 8);
        return (
          <g key={c.cond}>
            <rect className={c.cls} x={x} y={y} width={w} height={h} rx="8" />
            <text className="t-sub" x={x + 10} y={y + 24}>{c.cond}</text>
            <text className={c.tcls} x={x + 10} y={y + 52}>{c.act}</text>
            <text className="t-sub" x={x + 10} y={y + 78}>{c.note}</text>
          </g>
        );
      })}
    </svg>
  );
}
