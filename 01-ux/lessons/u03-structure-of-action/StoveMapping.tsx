const KNOB_R = 11;

function Stove({ cx, grid }: { cx: number; grid: boolean }) {
  const burners = [
    { dx: -30, y: 50, key: false },
    { dx: 30, y: 50, key: true },
    { dx: -30, y: 96, key: false },
    { dx: 30, y: 96, key: false },
  ];
  const panelH = grid ? 76 : 44;
  const knobs = grid
    ? [
        { x: cx - 30, y: 166, key: false },
        { x: cx + 30, y: 166, key: true },
        { x: cx - 30, y: 202, key: false },
        { x: cx + 30, y: 202, key: false },
      ]
    : [-52, -17, 17, 52].map((dx) => ({ x: cx + dx, y: 166, key: false }));
  return (
    <g>
      <rect className="svg-box" x={cx - 70} y="26" width="140" height="94" rx="8" />
      {burners.map((b, i) => (
        <circle key={i} cx={cx + b.dx} cy={b.y} r="17" className={b.key ? 'svg-berg' : 'svg-box'} />
      ))}
      <rect className="svg-box" x={cx - 70} y="140" width="140" height={panelH} rx="8" />
      {knobs.map((k, i) => (
        <circle key={i} cx={k.x} cy={k.y} r={KNOB_R} className={k.key && grid ? 'svg-berg' : 'svg-box'} />
      ))}
    </g>
  );
}

export default function StoveMapping() {
  return (
    <svg viewBox="0 0 360 276" role="img" aria-label="위에서 본 화구 네 개와 조작 손잡이. 왼쪽은 손잡이가 한 줄로 늘어서 어느 손잡이가 어느 화구인지 알 수 없다. 오른쪽은 손잡이가 화구와 같은 2 곱하기 2 배치라서 강조한 오른쪽 위 화구와 오른쪽 위 손잡이가 대응한다.">
      <Stove cx={90} grid={false} />
      <Stove cx={270} grid />
      <g textAnchor="middle">
        <text className="t-strong" x="90" y="238">A · 손잡이 한 줄</text>
        <text className="t-bad" x="90" y="258">어느 것이 어느 화구인지 모름</text>
        <text className="t-strong" x="270" y="238">B · 화구와 같은 배치</text>
        <text className="t-good" x="270" y="258">위치만 보고 대응을 앎</text>
      </g>
    </svg>
  );
}
