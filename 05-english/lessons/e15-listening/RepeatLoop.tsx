/**
 * 같은 자료를 대본 없이 → 대본과 함께 → 대본 없이 순서로 돌리는 순서. 이 글의 정리.
 * 같은 자료 총 5회에서 6회는 섀도잉 연구의 기준이다(일반 듣기에 같은지는 확인 필요).
 */
const STEPS = [
  { n: '1', t: '처음 듣기', s: '대본 없이, 목적 하나만 잡는다' },
  { n: '2', t: '대본 보며 듣기', s: '못 들은 곳에 표시한다' },
  { n: '3', t: '대본 없이 다시', s: '표시한 곳이 들리는지 본다' },
  { n: '4', t: '다음 자료로', s: '같은 자료는 총 5회에서 6회까지' },
];

const H = 66;
const GAP = 30;

export default function RepeatLoop() {
  const y = (i: number) => 8 + i * (H + GAP);
  const VB_H = y(STEPS.length - 1) + H + 12;
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="같은 자료를 반복하는 순서. 대본 없이 듣고, 대본을 보며 못 들은 곳을 표시하고, 대본 없이 다시 듣고, 다섯 번에서 여섯 번이면 다음 자료로 넘어간다.">
      <defs>
        <marker id="lis-ar3" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      {STEPS.map((s, i) => (
        <g key={s.n}>
          <rect className={i === STEPS.length - 1 ? 'svg-box-key' : i === 1 ? 'svg-berg' : 'svg-box'} x="8" y={y(i)} width="344" height={H} rx="8" />
          <text className="t-strong" x="22" y={y(i) + 29}>{s.n}. {s.t}</text>
          <text className="t-sub" x="22" y={y(i) + 50}>{s.s}</text>
          {i < STEPS.length - 1 && (
            <line className="svg-flow" x1="180" y1={y(i) + H + 6} x2="180" y2={y(i) + H + GAP - 6} markerEnd="url(#lis-ar3)" />
          )}
        </g>
      ))}
    </svg>
  );
}
