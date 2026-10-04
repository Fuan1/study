/**
 * CEFR 듣기 종합 척도(A1, A2, B1)를 줄여 쓴 것. 수준을 가르는 것은 말의 속도와 또렷함이다.
 */
const ROWS = [
  { lv: 'A1', tag: '시작', l1: '아주 느리고 또박또박', l2: '긴 쉼이 있어야 뜻을 잡는다', cls: 'svg-berg' },
  { lv: 'A2', tag: '다음', l1: '또렷하고 느리게', l2: '필요한 것을 이해하고 요지를 잡는다', cls: 'svg-berg' },
  { lv: 'B1', tag: '이 과정 밖', l1: '또렷한 표준 발화, 익숙한 억양', l2: '요지와 세부 정보를 잡는다', cls: 'svg-box' },
];

const H = 72;
const GAP = 32;

export default function LevelLadder() {
  const y = (i: number) => 8 + i * (H + GAP);
  const VB_H = y(ROWS.length - 1) + H + 12;
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="CEFR 듣기 수준. A1 은 아주 느리고 또박또박한 말, A2 는 또렷하고 느린 말, B1 은 또렷한 표준 발화와 익숙한 억양이 조건이다.">
      <defs>
        <marker id="lis-ar2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      {ROWS.map((r, i) => (
        <g key={r.lv}>
          <rect className={r.cls} x="8" y={y(i)} width="344" height={H} rx="8" />
          <text className="t-strong" x="22" y={y(i) + 30}>{r.lv}</text>
          <text className="t-sub" x="22" y={y(i) + 52}>{r.tag}</text>
          <text className="t-strong" x="100" y={y(i) + 30}>{r.l1}</text>
          <text className="t-sub" x="100" y={y(i) + 52}>{r.l2}</text>
          {i < ROWS.length - 1 && (
            <line className="svg-flow" x1="180" y1={y(i) + H + 6} x2="180" y2={y(i) + H + GAP - 6} markerEnd="url(#lis-ar2)" />
          )}
        </g>
      ))}
    </svg>
  );
}
