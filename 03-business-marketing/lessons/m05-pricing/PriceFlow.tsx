type Stage = { q: string; sub: string; out: string; kind: string };

const STAGES: Stage[] = [
  { q: '하한', sub: '변동비 + 목표 공헌이익', out: '하한 가격', kind: '식 한 줄' },
  { q: '상한', sub: '대안 가격 + 확인된 가치', out: '상한 가격', kind: '근거 한 줄' },
  { q: '후보', sub: '하한과 상한 사이에서만', out: '가격 결정표', kind: '후보 2~3개' },
  { q: '확인', sub: '실제 구매 행동으로', out: '가격별 결과', kind: '행동 데이터' },
  { q: '할인 규칙', sub: '필요 판매량, 하한 점검', out: '할인 설계표', kind: '규칙 표' },
];

// 여백 기준: 상자 안 14px, 두 줄 상자 높이 66, 상자 사이 32px.
const LW = 192; // 단계 상자 폭
const RW = 120; // 결과물 상자 폭
const RX = 360 - 8 - RW;
const H = 66;
const GAP = 32;
const y = (i: number) => 8 + i * (H + GAP);
// 마지막 상자 아랫변 + 선 두께 절반 + 아래 여백 8
const VB_H = y(STAGES.length - 1) + H + 1 + 8;

export default function PriceFlow() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="가격 결정 순서 5단계. 하한은 하한 가격, 상한은 상한 가격, 후보는 가격 결정표, 확인은 가격별 결과, 할인 규칙은 할인 설계표를 남긴다.">
      <defs>
        <marker id="pfbar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      {STAGES.map((s, i) => (
        <g key={s.q}>
          <rect className="svg-box" x="8" y={y(i)} width={LW} height={H} rx="8" />
          <text className="t-strong" x="22" y={y(i) + 29}>{s.q}</text>
          <text className="t-sub" x="22" y={y(i) + 50}>{s.sub}</text>
          <line className="svg-flow" x1={8 + LW + 6} y1={y(i) + H / 2} x2={RX - 6} y2={y(i) + H / 2} markerEnd="url(#pfbar)" />
          <rect className="svg-berg" x={RX} y={y(i)} width={RW} height={H} rx="8" />
          <text className="t-strong" x={RX + 14} y={y(i) + 29}>{s.out}</text>
          <text className="t-sub" x={RX + 14} y={y(i) + 50}>{s.kind}</text>
          {i < STAGES.length - 1 && (
            <line className="svg-flow" x1={8 + LW / 2} y1={y(i) + H + 5} x2={8 + LW / 2} y2={y(i) + H + GAP - 5} markerEnd="url(#pfbar)" />
          )}
        </g>
      ))}
    </svg>
  );
}
