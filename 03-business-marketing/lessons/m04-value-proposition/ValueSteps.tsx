/** 가치 제안을 정하는 순서. 앞 네 칸을 채운 뒤에 문장을 쓴다. 칸의 이름만 있고 수치는 없다. */
type Step = { title: string; sub: string; cls: string };

const STEPS: Step[] = [
  { title: '1  고객의 일', sub: '어떤 상황에서 무엇을 해내려 하나', cls: 'svg-box' },
  { title: '2  지금의 대안', sub: '같은 일을 하는 모든 방법', cls: 'svg-box' },
  { title: '3  우리가 다른 점', sub: '대안과 비교한 차이', cls: 'svg-box' },
  { title: '4  증거', sub: '그 차이를 확인할 근거', cls: 'svg-box' },
  { title: '5  문장', sub: '위 네 칸으로만 쓴다', cls: 'svg-box-key' },
];

const W = 344;
const H = 68;
const GAP = 28;
const TOP = 8;
const STROKE = 1.5;
const y = (i: number) => TOP + i * (H + GAP);
const VB_H = Math.ceil(y(STEPS.length - 1) + H + STROKE / 2 + 8);

export default function ValueSteps() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="가치 제안을 정하는 순서. 고객의 일, 지금의 대안, 우리가 다른 점, 증거를 차례로 정하고 마지막에 문장을 쓴다.">
      <defs>
        <marker id="m04vs" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      {STEPS.map((s, i) => (
        <g key={s.title}>
          <rect className={s.cls} x="8" y={y(i)} width={W} height={H} rx="8" />
          <text className="t-strong" x="22" y={y(i) + 29}>{s.title}</text>
          <text className="t-sub" x="22" y={y(i) + 51}>{s.sub}</text>
          {i < STEPS.length - 1 && (
            <line className="svg-flow" x1="180" y1={y(i) + H + 5} x2="180" y2={y(i) + H + GAP - 5} markerEnd="url(#m04vs)" />
          )}
        </g>
      ))}
    </svg>
  );
}
