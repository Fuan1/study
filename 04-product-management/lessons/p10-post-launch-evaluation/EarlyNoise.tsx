/**
 * 이론값. 실제 효과가 0일 때 누적 효과 추정의 95% 범위는 사용자 수의 제곱근에 반비례해 좁아진다.
 * 사용자가 일수에 비례해 쌓인다는 단순 가정(Kohavi 외 2012)에서 21일 시점의 범위를 1로 맞춰 그렸다.
 * 범위의 배수 = 21일 시점 범위 대비 sqrt(21 / 경과 일수).
 */
const DAYS = 21;
const X0 = 48;
const X1 = 326;
const U = 17; // 최종 범위 1배당 높이(px)
const x = (d: number) => X0 + ((d - 1) / (DAYS - 1)) * (X1 - X0);
const mult = (d: number) => Math.sqrt(DAYS / d);
const HALF = mult(1) * U;
const TOP_PAD = 44; // 범례 글자와 1일 라벨이 겹치지 않도록 위 여백을 넉넉히 둔다
const CY = TOP_PAD + HALF;

const steps: number[] = [];
for (let d = 1; d <= DAYS; d += 0.5) steps.push(d);
const upper = steps.map((d) => `${x(d).toFixed(1)},${(CY - mult(d) * U).toFixed(1)}`);
const lower = [...steps].reverse().map((d) => `${x(d).toFixed(1)},${(CY + mult(d) * U).toFixed(1)}`);
const poly = [...upper, ...lower].join(' ');

const MARKS = [1, 7, 21];
const AXIS = CY + HALF + 14;
// 축 제목 baseline 은 눈금 글자 baseline 아래 20px. 글자 아래 여백 4 + 바깥 여백 8
const VB_H = AXIS + 20 + 20 + 4 + 8;

export default function EarlyNoise() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="실제 효과가 0인 제품에서도 누적 효과 추정의 95퍼센트 범위는 첫날이 21일째의 4.6배, 7일째가 1.7배, 21일째가 1배로 점점 좁아진다.">
      <polygon points={poly} fill="var(--accent-soft)" stroke="var(--line)" strokeWidth="1.5" />
      <line x1={X0} y1={CY} x2={X1} y2={CY} stroke="var(--line)" strokeWidth="1.5" />
      <line x1={X0} y1={CY - U} x2={X1} y2={CY - U} stroke="var(--muted)" strokeWidth="1.2" strokeDasharray="4 3" />
      <line x1={X0} y1={CY + U} x2={X1} y2={CY + U} stroke="var(--muted)" strokeWidth="1.2" strokeDasharray="4 3" />
      <text className="t-sub" x="8" y={CY - U + 4}>+1배</text>
      <text className="t-sub" x="8" y={CY + U + 4}>-1배</text>
      <text className="t-sub" x="334" y="20" textAnchor="end">효과 0일 때 95% 범위</text>
      {MARKS.map((d) => {
        const py = CY - mult(d) * U;
        return (
          <g key={d}>
            <circle cx={x(d)} cy={py} r="4" fill="var(--warm)" />
            <text className="t-warm" x={d === 21 ? x(d) + 8 : x(d) + 12} y={d === 1 ? py + 4 : py - 14} textAnchor={d === 21 ? 'end' : 'start'}>
              {d}일 {mult(d).toFixed(1).replace(/\.0$/, '')}배
            </text>
          </g>
        );
      })}
      <line x1={X0} y1={AXIS} x2={X1} y2={AXIS} stroke="var(--line)" strokeWidth="1.5" />
      {[1, 7, 14, 21].map((d) => (
        <text key={d} className="t-sub" x={x(d)} y={AXIS + 20} textAnchor="middle">{d}</text>
      ))}
      <text className="t-sub" x="334" y={AXIS + 40} textAnchor="end">경과 일수</text>
    </svg>
  );
}
