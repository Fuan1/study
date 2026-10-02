type Row = { q: [string, string]; name: string; sub: string };

const ROWS: Row[] = [
  { q: ['배정을 우리가', '무작위로 정하나?'], name: '무작위 실험', sub: '교란을 설계로 막음' },
  { q: ['점수 컷오프로', '처리가 갈리나?'], name: '회귀불연속', sub: '컷오프 근처만' },
  { q: ['개입 전후 자료와', '대조 집단이 있나?'], name: '차이의 차이', sub: '평행 추세 가정' },
  { q: ['개입 단위가 하나고', '대조 시계열이 있나?'], name: '시계열 반사실', sub: '사전 적합 필수' },
  { q: ['처리를 움직이는 외부', '요인(도구)이 있나?'], name: '도구변수', sub: '배제 제약 가정' },
  { q: ['교란을 거의 다', '측정했나?'], name: '매칭·보정', sub: '미측정 교란 없음' },
];

// 여백 기준: 상자 안 12px 이상, 두 줄 상자 높이 66, 아래 화살표와 라벨은 상자에서 8px 이상.
const H = 66;
const GAP = 30;
const LW = 168;
const RX = 208;
const RW = 144;
const TOP = 8;

export default function MethodChoice() {
  const y = (i: number) => TOP + i * (H + GAP);
  const endY = y(ROWS.length); // 마지막 판단 상자
  const height = endY + H + 8;
  return (
    <svg viewBox={`0 0 360 ${height}`} role="img" aria-label="처리가 어떻게 배정됐는지로 방법을 고르는 순서. 무작위로 배정할 수 있으면 무작위 실험, 점수 컷오프가 있으면 회귀불연속, 개입 전후와 대조 집단이 있으면 차이의 차이, 개입 단위가 하나면 시계열 반사실, 외부 요인이 있으면 도구변수, 교란을 거의 다 측정했으면 매칭과 보정이다. 모두 아니면 인과 주장을 보류하고 관련이 있다까지만 쓴다.">
      <defs>
        <marker id="mc-ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      {ROWS.map((r, i) => (
        <g key={r.name}>
          <rect className="svg-box" x="8" y={y(i)} width={LW} height={H} rx="8" />
          <text x="20" y={y(i) + 28} fontSize="13">{r.q[0]}</text>
          <text x="20" y={y(i) + 48} fontSize="13">{r.q[1]}</text>
          <line className="svg-flow" x1={8 + LW + 4} y1={y(i) + H / 2} x2={RX - 4} y2={y(i) + H / 2} markerEnd="url(#mc-ar)" />
          <rect className="svg-berg" x={RX} y={y(i)} width={RW} height={H} rx="8" />
          <text className="t-strong" x={RX + 12} y={y(i) + 28}>{r.name}</text>
          <text className="t-sub" x={RX + 12} y={y(i) + 48}>{r.sub}</text>
          <line className="svg-flow" x1={8 + LW / 2} y1={y(i) + H + 4} x2={8 + LW / 2} y2={y(i) + H + GAP - 4} markerEnd="url(#mc-ar)" />
          <text className="t-sub" x={8 + LW / 2 + 12} y={y(i) + H + GAP / 2 + 4}>아니오</text>
        </g>
      ))}
      <rect className="svg-box-bad" x="8" y={endY} width="344" height={H} rx="8" />
      <text className="t-bad" x="22" y={endY + 28}>모두 아니오</text>
      <text x="22" y={endY + 48} fontSize="13">인과는 보류하고 관련이 있다까지만 쓴다</text>
    </svg>
  );
}
