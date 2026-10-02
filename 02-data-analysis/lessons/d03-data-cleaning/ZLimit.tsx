/** 표본 크기별 |z| 최댓값. 표본 표준편차를 쓰면 어떤 값도 (n-1)/sqrt(n) 를 넘을 수 없다. 코드에서 계산한다. */
const NS = [5, 10, 17, 30];
const LIMIT = 3;

// 여백 기준: 막대 높이 28 이라 숫자는 왼쪽 라벨에 둔다. 막대 사이 16px. 기준선 라벨은 마지막 막대 아래 24px.
const X0 = 108;
const UNIT = 36;
const PITCH = 44;
const BAR_H = 28;
const maxZ = (n: number) => (n - 1) / Math.sqrt(n);
const lastBottom = 8 + (NS.length - 1) * PITCH + BAR_H; // 168
const limitX = X0 + LIMIT * UNIT;
const LABEL_Y = lastBottom + 24;
const H = LABEL_Y + 3 + 12;

export default function ZLimit() {
  return (
    <svg viewBox={`0 0 360 ${H}`} role="img" aria-label="표본이 5건이면 z 최댓값은 1.79, 10건이면 2.85 로 기준 3 을 넘을 수 없다. 17건은 3.88, 30건은 5.29 로 넘을 수 있다.">
      {NS.map((n, i) => {
        const y = 8 + i * PITCH;
        const z = maxZ(n);
        const can = z >= LIMIT;
        return (
          <g key={n}>
            <text className="t-strong" x="8" y={y + BAR_H / 2 + 5}>n={n} · {z.toFixed(2)}</text>
            <rect className={can ? 'svg-box-good' : 'svg-box-bad'} x={X0} y={y} width={z * UNIT} height={BAR_H} rx="4" />
          </g>
        );
      })}
      <line className="svg-flow" x1={limitX} y1="2" x2={limitX} y2={lastBottom + 6} />
      <text className="t-sub" x={limitX} y={LABEL_Y} textAnchor="middle">기준 z = {LIMIT}</text>
    </svg>
  );
}
