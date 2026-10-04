/**
 * 이 글의 정리. 직접 만든 뒤 도구로 확인하고, 사전으로 다시 확인한 다음 카드로 옮기는 순서.
 * 입증된 연구가 아니라 떠올리기(Nation 2014)와 사전 확인 규칙을 이은 판단이다.
 */
type Step = { q: string; sub: string; cls: string };
const STEPS: Step[] = [
  { q: '1. 직접 써 본다', sub: '틀려도 끝까지 먼저 쓴다', cls: 'svg-berg' },
  { q: '2. 도구에 고쳐 달라고 한다', sub: '틀린 곳과 이유를 같이 묻는다', cls: 'svg-box' },
  { q: '3. 사전 예문으로 확인한다', sub: '고친 단어와 짜임이 용례에 있는가', cls: 'svg-box-key' },
  { q: '4. 틀린 곳 하나만 카드로', sub: '한 장에 한 가지', cls: 'svg-box' },
  { q: '5. 며칠 뒤 안 보고 다시 쓴다', sub: '간격을 두고 떠올린다', cls: 'svg-berg' },
];

const H = 66;
const GAP = 32;
const BX = 8;
const BW = 344;

export default function ToolOrder() {
  const y = (i: number) => 8 + i * (H + GAP);
  const VB_H = y(STEPS.length - 1) + H + 12;
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="도구를 쓰는 순서. 직접 쓰고, 도구에 고쳐 달라고 하며 이유를 묻고, 사전 예문으로 확인하고, 틀린 곳 하나를 카드로 만들고, 며칠 뒤 안 보고 다시 쓴다.">
      <defs>
        <marker id="tool-ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      {STEPS.map((s, i) => (
        <g key={s.q}>
          <rect className={s.cls} x={BX} y={y(i)} width={BW} height={H} rx="8" />
          <text className="t-strong" x={BX + 14} y={y(i) + 29}>{s.q}</text>
          <text className="t-sub" x={BX + 14} y={y(i) + 50}>{s.sub}</text>
          {i < STEPS.length - 1 && (
            <line className="svg-flow" x1="180" y1={y(i) + H + 6} x2="180" y2={y(i) + H + GAP - 6} markerEnd="url(#tool-ar)" />
          )}
        </g>
      ))}
    </svg>
  );
}
