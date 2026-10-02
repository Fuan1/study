type Step = { q: string; sub: string; yes: string; fix: string };

const STEPS: Step[] = [
  { q: '전후·짝 비교인가?', sub: '같은 대상을 두 번 쟀다', yes: 'paired t 검정', fix: '전후 차이에 적용' },
  { q: '결과가 비율인가?', sub: '전환·클릭 같은 0/1', yes: '두 비율 z 검정', fix: '카이제곱 · Fisher' },
  { q: '집단이 셋 이상인가?', sub: '여러 집단을 한 번에', yes: 'ANOVA', fix: 'Kruskal–Wallis' },
];

// 여백 기준: 상자 안 14px, 두 줄 상자 높이 66, 단계 사이 36(라벨 공간).
const LW = 172; // 질문 상자 폭
const RW = 142; // 결과 상자 폭
const GAP_X = 30;
const RX = 8 + LW + GAP_X; // 결과 상자 x
const H = 66;
const GAP = 36;
const y = (i: number) => 8 + i * (H + GAP);
const LAST = STEPS.length;
const BOTTOM = y(LAST) + H; // 마지막 도형 아랫변
const VB_H = BOTTOM + 1 + 12; // 선 두께 절반 + 아래 여백

export default function TestFlow() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="검정 고르는 순서. 전후 비교면 paired t, 비율이면 두 비율 z 검정이나 카이제곱, 집단이 셋 이상이면 ANOVA, 나머지 두 집단 평균 비교는 Welch t 검정. 조건이 어긋나면 각각 Fisher, Kruskal–Wallis, Mann–Whitney를 쓴다.">
      <defs>
        <marker id="ar-tf" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      {STEPS.map((s, i) => (
        <g key={s.q}>
          <rect className="svg-box" x="8" y={y(i)} width={LW} height={H} rx="8" />
          <text className="t-strong" x="22" y={y(i) + 29}>{s.q}</text>
          <text className="t-sub" x="22" y={y(i) + 50}>{s.sub}</text>
          <line className="svg-flow" x1={8 + LW + 6} y1={y(i) + H / 2} x2={RX - 6} y2={y(i) + H / 2} markerEnd="url(#ar-tf)" />
          <rect className="svg-berg" x={RX} y={y(i)} width={RW} height={H} rx="8" />
          <text className="t-strong" x={RX + 14} y={y(i) + 29}>{s.yes}</text>
          <text className="t-sub" x={RX + 14} y={y(i) + 50}>{s.fix}</text>
          <line className="svg-flow" x1={8 + LW / 2} y1={y(i) + H + 6} x2={8 + LW / 2} y2={y(i) + H + GAP - 6} markerEnd="url(#ar-tf)" />
          <text className="t-sub" x={8 + LW / 2 + 14} y={y(i) + H + GAP / 2 + 5}>아니오</text>
        </g>
      ))}
      <rect className="svg-box-key" x="8" y={y(LAST)} width={LW} height={H} rx="8" />
      <text className="t-strong" x="22" y={y(LAST) + 29}>두 집단 평균 비교</text>
      <text className="t-sub" x="22" y={y(LAST) + 50}>위가 모두 아니면</text>
      <line className="svg-flow" x1={8 + LW + 6} y1={y(LAST) + H / 2} x2={RX - 6} y2={y(LAST) + H / 2} markerEnd="url(#ar-tf)" />
      <rect className="svg-berg" x={RX} y={y(LAST)} width={RW} height={H} rx="8" />
      <text className="t-strong" x={RX + 14} y={y(LAST) + 29}>Welch t 검정</text>
      <text className="t-sub" x={RX + 14} y={y(LAST) + 50}>Mann–Whitney</text>
    </svg>
  );
}
