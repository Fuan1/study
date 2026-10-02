type Step = { q: string; sub: string; chart: string; kind: string };

const STEPS: Step[] = [
  { q: 'x축이 시간인가?', sub: '일, 주, 월 단위 흐름', chart: '선 차트', kind: '추이' },
  { q: '두 수치의 관계인가?', sub: '광고비와 매출', chart: '산점도', kind: '관계' },
  { q: '한 수치의 퍼짐인가?', sub: '결제액, 응답 시간', chart: '히스토그램', kind: '분포' },
  { q: '전체 중 몫인가?', sub: '합이 100%', chart: '누적 막대', kind: '구성' },
];

// 여백 기준: 상자 높이 66, 글자는 왼쪽 가장자리에서 14px, 단계 사이 36px.
const LW = 176; // 질문 상자 폭
const RW = 132; // 결과 상자 폭
const RX = 360 - 8 - RW; // 결과 상자 x
const H = 66;
const GAP = 36;
const y = (i: number) => 8 + i * (H + GAP);

export default function ChartFlow() {
  const last = STEPS.length;
  const bottom = y(last) + H; // 마지막 도형의 아랫변
  const vbH = Math.ceil(bottom + 1 + 10); // 선 두께 절반 + 아래 여백
  return (
    <svg viewBox={`0 0 360 ${vbH}`} role="img" aria-label="차트 고르는 순서. x축이 시간이면 선 차트, 두 수치의 관계면 산점도, 한 수치의 퍼짐이면 히스토그램, 전체 중 몫이면 누적 막대, 모두 아니면 값 순으로 정렬한 가로 막대.">
      <defs>
        <marker id="d12-ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      {STEPS.map((s, i) => (
        <g key={s.q}>
          <rect className="svg-box" x="8" y={y(i)} width={LW} height={H} rx="8" />
          <text className="t-strong" x="22" y={y(i) + 29}>{s.q}</text>
          <text className="t-sub" x="22" y={y(i) + 50}>{s.sub}</text>
          <line className="svg-flow" x1={8 + LW + 6} y1={y(i) + H / 2} x2={RX - 6} y2={y(i) + H / 2} markerEnd="url(#d12-ar)" />
          <text className="t-good" x={(8 + LW + RX) / 2} y={y(i) + H / 2 - 10} textAnchor="middle">예</text>
          <rect className="svg-berg" x={RX} y={y(i)} width={RW} height={H} rx="8" />
          <text className="t-strong" x={RX + 14} y={y(i) + 29}>{s.chart}</text>
          <text className="t-sub" x={RX + 14} y={y(i) + 50}>{s.kind}</text>
          <line className="svg-flow" x1={8 + LW / 2} y1={y(i) + H + 6} x2={8 + LW / 2} y2={y(i) + H + GAP - 6} markerEnd="url(#d12-ar)" />
          <text className="t-sub" x={8 + LW / 2 + 14} y={y(i) + H + GAP / 2 + 5}>아니오</text>
        </g>
      ))}
      <rect className="svg-box-key" x="8" y={y(last)} width={LW} height={H} rx="8" />
      <text className="t-strong" x="22" y={y(last) + 29}>가로 막대</text>
      <text className="t-sub" x="22" y={y(last) + 50}>비교·순위, 값 순 정렬</text>
    </svg>
  );
}
