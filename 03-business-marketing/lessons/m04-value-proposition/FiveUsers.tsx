/** Nielsen and Landauer 모델: n명이 찾는 사용성 문제 비율 = 1-(1-L)^n, L=31%(NN/g가 제시한 평균). 이론값을 코드로 계산한다. */
const L = 0.31;
const NS = Array.from({ length: 10 }, (_, i) => i + 1);
const found = (n: number) => (1 - Math.pow(1 - L, n)) * 100;

const X0 = 12;
const COL = 34;
const BAR_W = 24;
const TOP = 8;
const LABEL_H = 22; // 막대 위 값 글자 자리
const CHART_H = 150;
const AXIS_Y = TOP + LABEL_H + CHART_H;
const VB_H = Math.ceil(AXIS_Y + 8 + 14 + 8);

export default function FiveUsers() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="사용자 수에 따라 찾는 사용성 문제의 비율. 1명 31퍼센트에서 시작해 5명이면 약 84퍼센트, 10명이면 약 98퍼센트로 완만해진다.">
      <line x1={X0 - 4} y1={AXIS_Y} x2="356" y2={AXIS_Y} stroke="var(--line)" />
      {NS.map((n, i) => {
        const v = found(n);
        const h = (v / 100) * CHART_H;
        const x = X0 + i * COL;
        return (
          <g key={n}>
            <rect className={n === 5 ? 'svg-box-key' : 'svg-berg'} x={x} y={AXIS_Y - h} width={BAR_W} height={h} rx="3" />
            <text className="t-sub" x={x + BAR_W / 2} y={AXIS_Y - h - 6} textAnchor="middle">{Math.round(v)}</text>
            <text className="t-sub" x={x + BAR_W / 2} y={AXIS_Y + 8 + 12} textAnchor="middle">{n}</text>
          </g>
        );
      })}
    </svg>
  );
}
