/** 개념도다. 측정값이 아니라 도전과 능력의 관계를 설명하는 모형이다. */
const L = 48;
const T = 12;
const W = 292;
const H = 252;
const MX = L + W / 2; // 개인 평균 능력
const MY = T + H / 2; // 개인 평균 도전

// 몰입 띠: 평균 교차점에서 오른쪽 위 모서리 쪽으로 뻗는 대각선 띠를 계산한다.
const HALF = 20;
const [sx0, sy0] = [MX + 4, MY - 4];
const [ex0, ey0] = [L + W - 14, T + 14];
const len = Math.hypot(ex0 - sx0, ey0 - sy0);
const nx = -(ey0 - sy0) / len; // 선분에 수직인 단위 벡터
const ny = (ex0 - sx0) / len;
const BAND = [
  [sx0 - nx * HALF, sy0 - ny * HALF],
  [ex0 - nx * HALF, ey0 - ny * HALF],
  [ex0 + nx * HALF, ey0 + ny * HALF],
  [sx0 + nx * HALF, sy0 + ny * HALF],
]
  .map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`)
  .join(' ');

export default function FlowChannels() {
  return (
    <svg viewBox="0 0 360 320" role="img" aria-label="도전과 능력 평면. 둘 다 개인 평균 이상이고 균형일 때 몰입, 도전이 능력보다 크면 불안, 능력이 도전보다 크면 지루함, 둘 다 낮으면 무관심이다.">
      <defs>
        <marker id="ar-flow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      <rect className="svg-box" x={L} y={T} width={W} height={H} rx="6" />
      <polygon points={BAND} className="svg-berg" />
      <line x1={MX} y1={T} x2={MX} y2={T + H} stroke="var(--line)" strokeWidth="1.5" strokeDasharray="4 4" />
      <line x1={L} y1={MY} x2={L + W} y2={MY} stroke="var(--line)" strokeWidth="1.5" strokeDasharray="4 4" />
      <text className="t-bad" x={L + 10} y={T + 24}>불안</text>
      <text className="t-sub" x={L + 10} y={T + 42}>도전이 능력보다 큼</text>
      <text className="t-accent" x={MX + 10} y={T + 24}>몰입</text>
      <text className="t-warm" x={L + W - 10} y={T + H - 28} textAnchor="end">지루함</text>
      <text className="t-sub" x={L + W - 10} y={T + H - 10} textAnchor="end">능력이 도전보다 큼</text>
      <text className="t-sub" x={L + 10} y={T + H - 10}>무관심</text>
      <line className="svg-flow" x1={L + 4} y1={T + H + 10} x2={L + W - 4} y2={T + H + 10} markerEnd="url(#ar-flow)" />
      <text className="t-strong" x={MX} y={T + H + 30} textAnchor="middle">능력</text>
      <text className="t-sub" x={MX} y={T + H + 48} textAnchor="middle">점선은 그 사람의 평균. 몰입은 둘 다 평균 이상</text>
      <text className="t-strong" x={L - 8} y={MY + 5} textAnchor="end">도전</text>
      <text className="t-sub" x={L - 8} y={T + 14} textAnchor="end">높음</text>
      <text className="t-sub" x={L - 8} y={T + H - 4} textAnchor="end">낮음</text>
    </svg>
  );
}
