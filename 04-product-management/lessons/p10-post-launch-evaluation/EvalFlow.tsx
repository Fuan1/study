// 출시 후 평가의 흐름. 결과물 세 개가 출시 전, 판정 날짜, 그 뒤에 하나씩 나온다. 실무 관행을 정리한 구조다.
type Stage = { q: string; sub: string; out: string; kind: string };

const STAGES: Stage[] = [
  { q: '출시 전', sub: '기준·날짜·행동을 고정', out: '성공 기준표', kind: '문서 1장' },
  { q: '판정 날짜', sub: '네 질문에 순서대로 답함', out: '판정 기록', kind: '넷 중 하나' },
  { q: '판정 뒤', sub: '믿은 것과 결과를 비교', out: '리뷰 문서', kind: '바꿀 것 포함' },
];

// 여백 기준: 상자 안 14px, 두 줄 상자 높이 66, 상자 사이 34px.
const LW = 188;
const RW = 120;
const RX = 360 - 8 - RW;
const H = 66;
const GAP = 34;
const y = (i: number) => 8 + i * (H + GAP);
// 마지막 상자 아랫변 + 선 두께 절반 + 아래 여백 8
const VB_H = y(STAGES.length - 1) + H + 1 + 8;

export default function EvalFlow() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="출시 후 평가의 흐름. 출시 전에 성공 기준표를 쓰고, 판정 날짜에 네 질문에 답해 판정 기록을 남기고, 그 뒤에 믿은 것과 결과를 비교해 리뷰 문서를 쓴다.">
      <defs>
        <marker id="p10ar1" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      {STAGES.map((s, i) => (
        <g key={s.q}>
          <rect className="svg-box" x="8" y={y(i)} width={LW} height={H} rx="8" />
          <text className="t-strong" x="22" y={y(i) + 29}>{s.q}</text>
          <text className="t-sub" x="22" y={y(i) + 50}>{s.sub}</text>
          <line className="svg-flow" x1={8 + LW + 6} y1={y(i) + H / 2} x2={RX - 6} y2={y(i) + H / 2} markerEnd="url(#p10ar1)" />
          <rect className="svg-berg" x={RX} y={y(i)} width={RW} height={H} rx="8" />
          <text className="t-strong" x={RX + 14} y={y(i) + 29}>{s.out}</text>
          <text className="t-sub" x={RX + 14} y={y(i) + 50}>{s.kind}</text>
          {i < STAGES.length - 1 && (
            <g>
              <line className="svg-flow" x1={8 + LW / 2} y1={y(i) + H + 5} x2={8 + LW / 2} y2={y(i) + H + GAP - 5} markerEnd="url(#p10ar1)" />
              <text className="t-sub" x={8 + LW / 2 + 14} y={y(i) + H + GAP / 2 + 5}>{i === 0 ? '날짜 전에는 판정하지 않음' : '기록 뒤에'}</text>
            </g>
          )}
        </g>
      ))}
    </svg>
  );
}
