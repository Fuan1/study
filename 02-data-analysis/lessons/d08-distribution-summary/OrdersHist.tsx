/** 가상 주문 1,000건(python 으로 생성·집계). 구간 폭 1만 원, 마지막 칸은 10만 원 이상. 막대 높이와 위치는 아래에서 계산한다. */
const COUNTS = [26, 216, 266, 200, 104, 63, 38, 28, 14, 3, 42];
const MEAN = 58560;
const MEDIAN = 29500;
const X0 = 16;
const W = 328;
const BASE = 200; // 막대 바닥
const BAR_MAX = 130; // 가장 큰 막대 높이
const STEP = W / COUNTS.length;
const MAX = Math.max(...COUNTS);
const xOf = (won: number) => X0 + (won / 10000) * STEP;
const H = 260; // 축 제목 baseline 242 + 글자 아래 6 + 여백 12

export default function OrdersHist() {
  const last = COUNTS.length - 1;
  return (
    <svg viewBox={`0 0 360 ${H}`} role="img" aria-label="가상 주문 1,000건의 금액 분포. 대부분 1만 원에서 5만 원 사이에 몰려 있고 10만 원 이상에 긴 꼬리가 있다. 중앙값은 29,500원, 평균은 58,560원이다.">
      {COUNTS.map((c, i) => {
        const h = (c / MAX) * BAR_MAX;
        const x = X0 + i * STEP + 2;
        return (
          <g key={i}>
            <rect className={i === last ? 'svg-tip' : 'svg-berg'} x={x} y={BASE - h} width={STEP - 4} height={h} />
            {i === last && <text className="t-sub" x={x + (STEP - 4) / 2} y={BASE - h - 8} textAnchor="middle">{c}</text>}
          </g>
        );
      })}
      <line x1={X0} y1={BASE} x2={X0 + W} y2={BASE} stroke="var(--line)" strokeWidth="1.5" />
      <line x1={xOf(MEDIAN)} y1="24" x2={xOf(MEDIAN)} y2={BASE} stroke="var(--strong)" strokeWidth="2" />
      <text className="t-strong" x={xOf(MEDIAN) + 8} y="16">중앙값 {MEDIAN.toLocaleString('en-US')}</text>
      <line x1={xOf(MEAN)} y1="48" x2={xOf(MEAN)} y2={BASE} stroke="var(--warm)" strokeWidth="2" strokeDasharray="5 3" />
      <text className="t-warm" x={xOf(MEAN) + 8} y="40">평균 {MEAN.toLocaleString('en-US')}</text>
      <text className="t-sub" x={X0} y={BASE + 18}>0</text>
      <text className="t-sub" x={xOf(50000)} y={BASE + 18} textAnchor="middle">5만</text>
      <text className="t-sub" x={X0 + W} y={BASE + 18} textAnchor="end">10만 이상</text>
      <text className="t-sub" x={X0} y={BASE + 42}>주문 금액(원)</text>
      <text className="t-sub" x={X0 + W} y={BASE + 42} textAnchor="end">한 칸 1만 원</text>
    </svg>
  );
}
