type Stage = { q: string; sub: string; out: string; kind: string };

const STAGES: Stage[] = [
  { q: '원자료', sub: '노트·로그·문의', out: '자료 목록', kind: '출처 표기' },
  { q: '관찰', sub: '사실 하나씩 카드로', out: '관찰 카드', kind: '사실 한 가지' },
  { q: '묶음', sub: '비슷한 것끼리 이름', out: '어피니티 묶음', kind: '이름 붙임' },
  { q: '통찰', sub: '묶음의 이유 해석', out: '통찰 정리표', kind: '3열 표' },
  { q: '기회', sub: '해결책 없는 필요', out: '결정 후보표', kind: '행동 포함' },
];

// 여백 기준: 상자 안 14px, 두 줄 상자 높이 66, 상자 사이 34px.
const LW = 180; // 단계 상자 폭
const RW = 132; // 결과물 상자 폭
const RX = 360 - 8 - RW;
const H = 66;
const GAP = 34;
const y = (i: number) => 8 + i * (H + GAP);
// 마지막 상자 아랫변 + 선 두께 절반 + 아래 여백 8
const VB_H = y(STAGES.length - 1) + H + 1 + 8;

export default function Pipeline() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="리서치 자료를 결정으로 올리는 5단계. 원자료는 자료 목록, 관찰은 관찰 카드, 묶음은 어피니티 묶음, 통찰은 통찰 정리표, 기회는 결정 후보표를 남긴다.">
      <defs>
        <marker id="pl-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      {STAGES.map((s, i) => (
        <g key={s.q}>
          <rect className={i === STAGES.length - 1 ? 'svg-box-key' : 'svg-box'} x="8" y={y(i)} width={LW} height={H} rx="8" />
          <text className="t-strong" x="22" y={y(i) + 29}>{s.q}</text>
          <text className="t-sub" x="22" y={y(i) + 50}>{s.sub}</text>
          <line className="svg-flow" x1={8 + LW + 6} y1={y(i) + H / 2} x2={RX - 6} y2={y(i) + H / 2} markerEnd="url(#pl-arrow)" />
          <rect className="svg-berg" x={RX} y={y(i)} width={RW} height={H} rx="8" />
          <text className="t-strong" x={RX + 14} y={y(i) + 29}>{s.out}</text>
          <text className="t-sub" x={RX + 14} y={y(i) + 50}>{s.kind}</text>
          {i < STAGES.length - 1 && (
            <line className="svg-flow" x1={8 + LW / 2} y1={y(i) + H + 5} x2={8 + LW / 2} y2={y(i) + H + GAP - 5} markerEnd="url(#pl-arrow)" />
          )}
        </g>
      ))}
    </svg>
  );
}
