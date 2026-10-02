type Step = { t: string; sub: string; key?: boolean };

const STEPS: Step[] = [
  { t: '1. 읽는 사람과 결정', sub: '누가 읽고 무엇을 정하나' },
  { t: '2. 결론 한 줄', sub: '결정에 대한 답을 먼저 쓴다', key: true },
  { t: '3. 근거 두세 개', sub: '결론을 받치는 수치와 차트' },
  { t: '4. 한계', sub: '모르는 것, 가정, 반대 해석' },
  { t: '5. 다음 행동', sub: '요청 사항, 담당, 시점' },
];

// 여백 기준: 두 줄 상자 높이 66, 글자는 가장자리에서 14px, 단계 사이 28px.
const X = 8;
const W = 344;
const H = 66;
const GAP = 28;
const TOP = 52; // 맨 위 재료 줄 아래에서 첫 상자까지

export default function ReportFlow() {
  const y = (i: number) => TOP + i * (H + GAP);
  const bottom = y(STEPS.length - 1) + H; // 마지막 상자 아랫변 = 52 + 4*94 + 66 = 494
  const height = bottom + 1 + 9; // 선 두께 절반 이상 + 아래 여백
  return (
    <svg viewBox={`0 0 360 ${height}`} role="img" aria-label="보고서를 쓰는 순서. 분석 결과를 재료로 놓고, 읽는 사람과 결정, 결론 한 줄, 근거 두세 개, 한계, 다음 행동 순서로 채운다.">
      <defs>
        <marker id="d13-ar1" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      <text className="t-sub" x={X} y="20">재료: 분석 결과의 표, 수치, 차트</text>
      <line className="svg-flow" x1="180" y1="28" x2="180" y2={TOP - 6} markerEnd="url(#d13-ar1)" />
      {STEPS.map((s, i) => (
        <g key={s.t}>
          <rect className={s.key ? 'svg-box-key' : 'svg-box'} x={X} y={y(i)} width={W} height={H} rx="8" />
          <text className="t-strong" x={X + 14} y={y(i) + 28}>{s.t}</text>
          <text className="t-sub" x={X + 14} y={y(i) + 49}>{s.sub}</text>
          {i < STEPS.length - 1 && (
            <line className="svg-flow" x1="180" y1={y(i) + H + 5} x2="180" y2={y(i) + H + GAP - 5} markerEnd="url(#d13-ar1)" />
          )}
        </g>
      ))}
    </svg>
  );
}
