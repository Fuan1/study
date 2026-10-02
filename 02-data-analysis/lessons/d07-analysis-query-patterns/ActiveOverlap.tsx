/** 7일 고유 사용자 4구간(가정 데이터, 1/4~1/31)을 더한 값과 28일 고유 사용자를 비교한다. 겹치는 사용자가 이중으로 센다. */
// 여백 기준: 라벨은 막대 위 10px, 막대 사이 26px, 아래 주석은 막대에서 24px 이상.
const WEEKS = [33, 42, 53, 146]; // 구간별 COUNT(DISTINCT user_id)
const MONTH = 174; // 같은 28일 전체의 COUNT(DISTINCT user_id)
const X0 = 16;
const MAXW = 328;
const BAR_H = 30;

const SUM = WEEKS.reduce((a, b) => a + b, 0);
const x = (n: number) => X0 + (MAXW * n) / SUM;

export default function ActiveOverlap() {
  const yA = 8;
  const yB = 88;
  const bottomB = yB + 24 + BAR_H;
  const note = bottomB + 28;
  const H = note + 5 + 12;
  let acc = 0;
  return (
    <svg viewBox={`0 0 360 ${H}`} role="img" aria-label={`28일 고유 사용자는 ${MONTH}명이다. 7일 고유 사용자 4구간 ${WEEKS.join(', ')}을 더하면 ${SUM}명으로 ${SUM - MONTH}명이 겹쳐 부풀려진다.`}>
      <text className="t-strong" x={X0} y={yA + 14}>28일 고유 사용자 {MONTH}</text>
      <rect className="svg-berg" x={X0} y={yA + 24} width={x(MONTH) - X0} height={BAR_H} rx="4" />
      <text className="t-strong" x={X0} y={yB + 14}>7일 고유 사용자 4구간의 합 {SUM}</text>
      {WEEKS.map((n, i) => {
        const x1 = x(acc);
        acc += n;
        return (
          <g key={i}>
            <rect className="svg-box" x={x1} y={yB + 24} width={x(acc) - x1} height={BAR_H} rx="4" />
            <text className="t-sub" x={(x1 + x(acc)) / 2} y={yB + 24 + 19} textAnchor="middle">{n}</text>
          </g>
        );
      })}
      <line x1={x(MONTH)} y1={yB + 20} x2={x(MONTH)} y2={bottomB + 6} stroke="var(--bad)" strokeWidth="1.5" strokeDasharray="4 3" />
      <text className="t-bad" x={X0} y={note}>{MONTH}를 넘는 {SUM - MONTH}명은 여러 구간에 겹친 사람</text>
    </svg>
  );
}
