type Step = { title: string; sub: string };

const STEPS: Step[] = [
  { title: '1. 묶음으로 끊는다', sub: 'sh ch th ee ai 를 먼저 묶는다' },
  { title: '2. 모음 소리를 정한다', sub: '끝에 e 가 있는지 본다' },
  { title: '3. 이어 붙여 소리 낸다', sub: '느리게 한 번, 그다음 이어서' },
  { title: '4. 사전 소리와 비교한다', sub: '오디오를 듣고 내 소리와 맞춘다' },
];

const W = 344;
const H = 66;
const GAP = 34;
const HW = 168;
const TOP = 8;

export default function ReadingFlow() {
  const y = (i: number) => TOP + i * (H + GAP);
  const last = STEPS.length;
  const VB_H = y(last) + H + 8;
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="처음 보는 단어를 읽는 순서. 묶음으로 끊고, 모음 소리를 정하고, 이어 붙여 소리 내고, 사전 소리와 비교한다. 같으면 규칙이 맞고 다르면 예외 목록에 적는다.">
      <defs>
        <marker id="ar-e02-flow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      {STEPS.map((s, i) => (
        <g key={s.title}>
          <rect className={i === STEPS.length - 1 ? 'svg-box-key' : 'svg-box'} x="8" y={y(i)} width={W} height={H} rx="8" />
          <text className="t-strong" x="22" y={y(i) + 28}>{s.title}</text>
          <text className="t-sub" x="22" y={y(i) + 50}>{s.sub}</text>
          {i < STEPS.length - 1 && (
            <line className="svg-flow" x1="180" y1={y(i) + H + 6} x2="180" y2={y(i) + H + GAP - 6} markerEnd="url(#ar-e02-flow)" />
          )}
        </g>
      ))}
      <line className="svg-flow" x1={8 + HW / 2} y1={y(3) + H + 6} x2={8 + HW / 2} y2={y(last) - 6} markerEnd="url(#ar-e02-flow)" />
      <line className="svg-flow" x1={8 + HW + 8 + HW / 2} y1={y(3) + H + 6} x2={8 + HW + 8 + HW / 2} y2={y(last) - 6} markerEnd="url(#ar-e02-flow)" />
      <rect className="svg-berg" x="8" y={y(last)} width={HW} height={H} rx="8" />
      <text className="t-good" x="22" y={y(last) + 28}>소리가 같다</text>
      <text className="t-sub" x="22" y={y(last) + 50}>그 규칙을 믿는다</text>
      <rect className="svg-box-bad" x={8 + HW + 8} y={y(last)} width={HW} height={H} rx="8" />
      <text className="t-bad" x={8 + HW + 8 + 14} y={y(last) + 28}>소리가 다르다</text>
      <text className="t-sub" x={8 + HW + 8 + 14} y={y(last) + 50}>예외 목록에 적는다</text>
    </svg>
  );
}
