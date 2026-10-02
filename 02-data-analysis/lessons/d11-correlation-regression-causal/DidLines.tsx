/** 가상 데이터(python seed 63): 집단당 주 300명, 개입 전 6주와 후 4주의 주간 평균 결제액(천 원). 점선은 계산한 반사실(비교군 + 개입 전 평균 격차). */
const WEEKS = [-6, -5, -4, -3, -2, -1, 1, 2, 3, 4];
const TREAT = [18.3, 18.5, 18.4, 19.4, 19.7, 19.6, 23.9, 24.6, 24.5, 24.7];
const CTRL = [16.2, 16.6, 17.3, 17.1, 17.4, 17.1, 18.8, 20.0, 19.6, 20.1];

const PRE = WEEKS.filter((w) => w < 0).length;
const GAP_PRE = TREAT.slice(0, PRE).reduce((s, v, i) => s + v - CTRL[i], 0) / PRE; // 개입 전 평균 격차
const CF = CTRL.map((v) => v + GAP_PRE);

const PL = 36;
const PR = 290;
const PT = 34;
const PB = 214;
const YMIN = 14;
const YMAX = 26;
const STEP = (PR - PL - 24) / (WEEKS.length - 1);
const xOf = (i: number) => PL + 12 + i * STEP;
const yOf = (v: number) => PB - ((v - YMIN) / (YMAX - YMIN)) * (PB - PT);
const line = (vals: number[], from = 0) => vals.map((v, i) => (i >= from ? `${xOf(i).toFixed(1)},${yOf(v).toFixed(1)}` : null)).filter(Boolean).join(' ');

export default function DidLines() {
  const xi = (xOf(PRE - 1) + xOf(PRE)) / 2; // 개입 시점
  const last = WEEKS.length - 1;
  const H = PB + 40 + 4 + 8;
  return (
    <svg viewBox={`0 0 360 ${H}`} role="img" aria-label="주간 평균 결제액 선그래프. 개입 전 6주 동안 처치군은 비교군보다 약 2천 원 높고 두 선이 나란하다. 개입 후 처치군이 올랐고, 비교군에 개입 전 격차를 더한 점선과의 간격이 차이의 차이 효과다.">
      <text className="t-sub" x="8" y="14">주당 결제액(천 원)</text>
      {[14, 18, 22, 26].map((v) => (
        <g key={v}>
          <line x1={PL} y1={yOf(v)} x2={PR} y2={yOf(v)} stroke="var(--line)" strokeWidth="1" />
          <text className="t-sub" x={PL - 6} y={yOf(v) + 4} textAnchor="end">{v}</text>
        </g>
      ))}
      <line x1={xi} y1={PT} x2={xi} y2={PB} stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="5 3" />
      <text className="t-accent" x={xi} y={PT - 8} textAnchor="middle">개입</text>
      <polyline points={line(CTRL)} fill="none" stroke="var(--muted)" strokeWidth="2.5" />
      <polyline points={line(CF, PRE - 1)} fill="none" stroke="var(--muted)" strokeWidth="2" strokeDasharray="5 4" />
      <polyline points={line(TREAT)} fill="none" stroke="var(--warm)" strokeWidth="2.5" />
      {WEEKS.map((_, i) => (
        <g key={i}>
          <circle cx={xOf(i)} cy={yOf(CTRL[i])} r="3" fill="var(--muted)" />
          <circle cx={xOf(i)} cy={yOf(TREAT[i])} r="3" fill="var(--warm)" />
        </g>
      ))}
      <line x1={xOf(last) + 10} y1={yOf(TREAT[last])} x2={xOf(last) + 10} y2={yOf(CF[last])} stroke="var(--strong)" strokeWidth="1.5" />
      <text className="t-warm" x={PR + 18} y={yOf(TREAT[last]) + 4}>처치군</text>
      <text className="t-sub" x={PR + 18} y={yOf(CF[last]) + 4}>반사실</text>
      <text className="t-sub" x={PR + 18} y={yOf(CTRL[last]) + 4}>비교군</text>
      {[0, PRE - 1, PRE, last].map((i) => (
        <text key={i} className="t-sub" x={xOf(i)} y={PB + 20} textAnchor="middle">{WEEKS[i]}</text>
      ))}
      <text className="t-sub" x={(PL + PR) / 2} y={PB + 40} textAnchor="middle">개입 전후 주</text>
    </svg>
  );
}
