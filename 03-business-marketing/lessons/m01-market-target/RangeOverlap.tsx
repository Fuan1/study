/** 형태 예시(가상 값). 가정의 낮음·기준·높음을 곱해 두 방향의 범위를 만들고 겹치는 구간을 보인다. 로그 눈금. */
const T = 30e12; // 점심 식사 지출 총액(가상)
const N = 3_000_000; // 대상 직장인(가상)
const E = 1e8; // 억원

type Tri = [number, number, number]; // 낮음, 기준, 높음
const td = (i: 0 | 1 | 2) => {
  const s: Tri = [0.02, 0.025, 0.03];
  const r: Tri = [0.45, 0.5, 0.55];
  const d: Tri = [0.05, 0.1, 0.15];
  return (T * s[i] * r[i] * d[i]) / E;
};
const bu = (i: 0 | 1 | 2) => {
  const a: Tri = [0.2, 0.25, 0.3];
  const b: Tri = [0.35, 0.4, 0.45];
  const c: Tri = [0.2, 0.3, 0.4];
  const f: Tri = [30, 36, 42];
  const p: Tri = [8000, 8500, 9000];
  return (N * a[i] * b[i] * c[i] * f[i] * p[i]) / E;
};
const ROWS = [
  { label: '하향식', lo: td(0), mid: td(1), hi: td(2) },
  { label: '상향식', lo: bu(0), mid: bu(1), hi: bu(2) },
];
const OV_LO = Math.max(ROWS[0].lo, ROWS[1].lo);
const OV_HI = Math.min(ROWS[0].hi, ROWS[1].hi);

const MIN = 80;
const MAX = 900;
const X0 = 24;
const X1 = 336;
const x = (v: number) => X0 + ((Math.log(v) - Math.log(MIN)) / (Math.log(MAX) - Math.log(MIN))) * (X1 - X0);
const f1 = (v: number) => v.toFixed(1);
const TICKS = [100, 200, 400, 800];

const PITCH = 70;
const rowY = (i: number) => 36 + i * PITCH;
const cy = (i: number) => rowY(i) + 40;
const AXIS = cy(1) + 16 + 22;
// 눈금 글자 baseline 은 축 아래 20, 단위 글자는 40, 아래 여백 12
const VB_H = AXIS + 40 + 12;

export default function RangeOverlap() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label={`가상 값으로 만든 두 방향의 범위. 하향식 ${f1(ROWS[0].lo)}억에서 ${f1(ROWS[0].hi)}억원, 상향식 ${f1(ROWS[1].lo)}억에서 ${f1(ROWS[1].hi)}억원이며 ${f1(OV_LO)}억에서 ${f1(OV_HI)}억원이 겹친다.`}>
      <text className="t-accent" x="16" y="18">겹침 {f1(OV_LO)} - {f1(OV_HI)}억원</text>
      {ROWS.map((r, i) => (
        <g key={r.label}>
          <rect x={x(OV_LO)} y={cy(i) - 16} width={x(OV_HI) - x(OV_LO)} height="32" fill="var(--accent-soft)" />
          <text className="t-strong" x="16" y={rowY(i) + 14}>{r.label}</text>
          <text className="t-sub" x="344" y={rowY(i) + 14} textAnchor="end">{f1(r.lo)} / {f1(r.mid)} / {f1(r.hi)}</text>
          <line x1={x(r.lo)} y1={cy(i)} x2={x(r.hi)} y2={cy(i)} stroke="var(--accent)" strokeWidth="3" />
          <line x1={x(r.lo)} y1={cy(i) - 7} x2={x(r.lo)} y2={cy(i) + 7} stroke="var(--accent)" strokeWidth="2" />
          <line x1={x(r.hi)} y1={cy(i) - 7} x2={x(r.hi)} y2={cy(i) + 7} stroke="var(--accent)" strokeWidth="2" />
          <circle cx={x(r.mid)} cy={cy(i)} r="5" fill="var(--accent)" />
        </g>
      ))}
      <line x1={X0} y1={AXIS} x2={X1} y2={AXIS} stroke="var(--line)" strokeWidth="1.5" />
      {TICKS.map((t) => (
        <text key={t} className="t-sub" x={x(t)} y={AXIS + 20} textAnchor="middle">{t}</text>
      ))}
      <text className="t-sub" x="344" y={AXIS + 40} textAnchor="end">연 지출(억원, 로그 눈금)</text>
    </svg>
  );
}
