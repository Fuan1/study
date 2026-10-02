const KNOB_R = 11;

function Stove({ cx, grid }: { cx: number; grid: boolean }) {
  const burners = [
    { dx: -30, y: 43, key: false },
    { dx: 30, y: 43, key: true },
    { dx: -30, y: 91, key: false },
    { dx: 30, y: 91, key: false },
  ];
  const panelH = grid ? 86 : 50; // 손잡이 위아래 여백 14px
  const knobs = grid
    ? [
        { x: cx - 30, y: 167, key: false },
        { x: cx + 30, y: 167, key: true },
        { x: cx - 30, y: 203, key: false },
        { x: cx + 30, y: 203, key: false },
      ]
    : [-54, -18, 18, 54].map((dx) => ({ x: cx + dx, y: 167, key: false }));
  return (
    <g>
      <rect className="svg-box" x={cx - 78} y="12" width="156" height="110" rx="8" />
      {burners.map((b, i) => (
        <circle key={i} cx={cx + b.dx} cy={b.y} r="17" className={b.key ? 'svg-berg' : 'svg-box'} />
      ))}
      <rect className="svg-box" x={cx - 78} y="142" width="156" height={panelH} rx="8" />
      {knobs.map((k, i) => (
        <circle key={i} cx={k.x} cy={k.y} r={KNOB_R} className={k.key && grid ? 'svg-berg' : 'svg-box'} />
      ))}
    </g>
  );
}

export default function StoveMapping() {
  return (
    <svg viewBox="0 0 360 284" role="img" aria-label="위에서 본 화구 네 개와 조작 손잡이. 왼쪽은 손잡이가 한 줄로 늘어서 어느 손잡이가 어느 화구인지 알 수 없다. 오른쪽은 손잡이가 화구와 같은 2 곱하기 2 배치라서 강조한 오른쪽 위 화구와 오른쪽 위 손잡이가 대응한다.">
      <Stove cx={90} grid={false} />
      <Stove cx={270} grid />
      <g textAnchor="middle">
        <text className="t-strong" x="90" y="252">A · 손잡이 한 줄</text>
        <text className="t-bad" x="90" y="272">어느 것이 어느 화구인지 모름</text>
        <text className="t-strong" x="270" y="252">B · 화구와 같은 배치</text>
        <text className="t-good" x="270" y="272">위치만 보고 대응을 앎</text>
      </g>
    </svg>
  );
}
