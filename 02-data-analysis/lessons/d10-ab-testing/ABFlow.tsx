type Stage = { q: string; sub: string; out: string; kind: string };

const STAGES: Stage[] = [
  { q: '설계', sub: '질문·지표·표본 고정', out: '설계서', kind: '문서 1장' },
  { q: '배정', sub: '무작위로 A, B에 나눔', out: '배정 기록', kind: '데이터' },
  { q: '시작 직후 점검', sub: '표본 비율, 계측 이상', out: '점검 결과', kind: '통과 여부' },
  { q: '비교', sub: '효과 크기와 신뢰구간', out: '결과 요약표', kind: '표' },
  { q: '판단', sub: '성공·가드레일 지표', out: '출시 판단표', kind: '표' },
];

// 여백 기준: 상자 안 14px, 두 줄 상자 높이 66, 상자 사이 34px.
const LW = 188; // 단계 상자 폭
const RW = 120; // 결과물 상자 폭
const RX = 360 - 8 - RW;
const H = 66;
const GAP = 34;
const y = (i: number) => 8 + i * (H + GAP);
// 마지막 상자 아랫변 + 선 두께 절반 + 아래 여백 8
const VB_H = y(STAGES.length - 1) + H + 1 + 8;

export default function ABFlow() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="A/B 테스트 5단계. 설계는 설계서, 배정은 배정 기록, 시작 직후 점검은 점검 결과, 비교는 결과 요약표, 판단은 출시 판단표를 남긴다. 점검을 통과해야 비교로 넘어간다.">
      <defs>
        <marker id="abar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      {STAGES.map((s, i) => (
        <g key={s.q}>
          <rect className={i === 2 ? 'svg-box-key' : 'svg-box'} x="8" y={y(i)} width={LW} height={H} rx="8" />
          <text className="t-strong" x="22" y={y(i) + 29}>{s.q}</text>
          <text className="t-sub" x="22" y={y(i) + 50}>{s.sub}</text>
          <line className="svg-flow" x1={8 + LW + 6} y1={y(i) + H / 2} x2={RX - 6} y2={y(i) + H / 2} markerEnd="url(#abar)" />
          <rect className="svg-berg" x={RX} y={y(i)} width={RW} height={H} rx="8" />
          <text className="t-strong" x={RX + 14} y={y(i) + 29}>{s.out}</text>
          <text className="t-sub" x={RX + 14} y={y(i) + 50}>{s.kind}</text>
          {i < STAGES.length - 1 && (
            <line className="svg-flow" x1={8 + LW / 2} y1={y(i) + H + 5} x2={8 + LW / 2} y2={y(i) + H + GAP - 5} markerEnd="url(#abar)" />
          )}
          {i === 2 && (
            <text className="t-sub" x={8 + LW / 2 + 14} y={y(i) + H + GAP / 2 + 5}>통과하면</text>
          )}
        </g>
      ))}
    </svg>
  );
}
