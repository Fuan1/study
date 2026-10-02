type Step = { q: string; sub: string; fix: string; fixSub: string };

/** CPA 가 높을 때의 판단 순서. 위에서 아래로 묻고, 예이면 오른쪽에서 고친다. */
const STEPS: Step[] = [
  { q: '전환이 충분한가', sub: '적으면 분해를 미룬다', fix: '더 쌓는다', fixSub: '허용 오차 먼저' },
  { q: 'CPM 이 높은가', sub: '노출 천 회당 비용', fix: '타깃·시기', fixSub: '입찰 방식' },
  { q: 'CTR 이 낮은가', sub: '노출 대비 클릭', fix: '소재·타깃', fixSub: '소재 테스트' },
  { q: 'CVR 이 낮은가', sub: '클릭 대비 전환', fix: '랜딩·제안', fixSub: '유입 의도' },
  { q: '셋 다 기준 안인가', sub: '그래도 CPA 가 높다', fix: '손익분기', fixSub: '객단가·마진 점검' },
];

// 여백 기준: 상자 안 12px 이상, 두 줄 상자 높이 66, 상자 사이 34px.
const LW = 190;
const RW = 124;
const RX = 360 - 8 - RW;
const H = 66;
const GAP = 34;
const y = (i: number) => 8 + i * (H + GAP);
// 마지막 상자 아랫변 + 선 두께 절반 + 아래 여백 8
const VB_H = y(STEPS.length - 1) + H + 1 + 8;

export default function DiagnoseFlow() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="CPA 가 높을 때의 판단 순서. 전환 건수가 충분한지 먼저 보고, 그다음 CPM, CTR, CVR 순으로 기준에서 벗어난 한 항을 찾아 고친다. 셋 다 기준 안이면 손익분기 자체를 다시 계산한다.">
      <defs>
        <marker id="ar-m08d" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      {STEPS.map((s, i) => (
        <g key={s.q}>
          <rect className="svg-box" x="8" y={y(i)} width={LW} height={H} rx="8" />
          <text className="t-strong" x="20" y={y(i) + 29}>{s.q}</text>
          <text className="t-sub" x="20" y={y(i) + 50}>{s.sub}</text>
          <line className="svg-flow" x1={8 + LW + 6} y1={y(i) + H / 2} x2={RX - 6} y2={y(i) + H / 2} markerEnd="url(#ar-m08d)" />
          <rect className="svg-berg" x={RX} y={y(i)} width={RW} height={H} rx="8" />
          <text className="t-strong" x={RX + 12} y={y(i) + 29}>{s.fix}</text>
          <text className="t-sub" x={RX + 12} y={y(i) + 50}>{s.fixSub}</text>
          {i < STEPS.length - 1 && (
            <g>
              <line className="svg-flow" x1={8 + LW / 2} y1={y(i) + H + 5} x2={8 + LW / 2} y2={y(i) + H + GAP - 5} markerEnd="url(#ar-m08d)" />
              <text className="t-sub" x={8 + LW / 2 + 14} y={y(i) + H + GAP / 2 + 5}>아니오</text>
            </g>
          )}
        </g>
      ))}
    </svg>
  );
}
