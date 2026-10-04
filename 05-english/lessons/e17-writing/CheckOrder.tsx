/**
 * 한 문장을 쓴 뒤 확인하는 순서. 형태 예시이고 문장은 이 글이 만들었다.
 * 상자 안 글자는 가장자리에서 14px, 두 줄 baseline 간격 21px, 상자 사이 28px(화살표 포함).
 */
type Step = { q: string; ex: string };

const STEPS: Step[] = [
  { q: '1 주어와 동사가 있나?', ex: 'Like tea. → I like tea.' },
  { q: '2 한 문장에 한 생각인가?', ex: '길면 마침표로 나눈다' },
  { q: '3 대문자와 끝부호가 맞나?', ex: 'i am tired → I am tired.' },
  { q: '4 철자가 맞나?', ex: 'tomorow → tomorrow' },
];

const W = 344;
const H = 66;
const GAP = 28;
const TOP = 8;
const VB_H = TOP + STEPS.length * H + (STEPS.length - 1) * GAP + 16;

export default function CheckOrder() {
  const y = (i: number) => TOP + i * (H + GAP);
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="한 문장을 쓴 뒤 확인하는 네 단계. 주어와 동사, 한 문장에 한 생각, 대문자와 끝부호, 철자 순서로 본다.">
      <defs>
        <marker id="ar-e17a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      {STEPS.map((s, i) => (
        <g key={s.q}>
          <rect className={i === 0 ? 'svg-box-key' : 'svg-box'} x="8" y={y(i)} width={W} height={H} rx="8" />
          <text className="t-strong" x="22" y={y(i) + 29}>{s.q}</text>
          <text className="t-sub" x="22" y={y(i) + 50}>{s.ex}</text>
          {i < STEPS.length - 1 && (
            <line className="svg-flow" x1="180" y1={y(i) + H + 6} x2="180" y2={y(i) + H + GAP - 6} markerEnd="url(#ar-e17a)" />
          )}
        </g>
      ))}
    </svg>
  );
}
