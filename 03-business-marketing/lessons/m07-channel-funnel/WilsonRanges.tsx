/** 클릭 수가 늘수록 관측 전환율 2%의 95% 윌슨 구간이 좁아진다. 관측 2%는 가정이다. */
const Z = 1.959964;
const OBS = 0.02;
const wilson = (x: number, n: number) => {
  const p = x / n;
  const d = 1 + (Z * Z) / n;
  const c = (p + (Z * Z) / (2 * n)) / d;
  const h = (Z * Math.sqrt((p * (1 - p)) / n + (Z * Z) / (4 * n * n))) / d;
  return [c - h, c + h] as const;
};
const NS = [100, 500, 2000, 10000];
const rows = NS.map((n) => {
  const x = Math.round(n * OBS);
  const [lo, hi] = wilson(x, n);
  return { n, x, lo, hi };
});

const X0 = 24;
const X1 = 336;
const VMAX = 0.08;
const xOf = (v: number) => X0 + (v / VMAX) * (X1 - X0);
const ROW_H = 36;
const GAP = 24;
const Y0 = 12;
const rowY = (i: number) => Y0 + i * (ROW_H + GAP);
const lineY = (i: number) => rowY(i) + 30;
const CAP = 5;
const AX = lineY(NS.length - 1) + CAP + 24;
const VB_H = Math.ceil(AX + 8 + 12 + 10);
const fmtPct = (v: number) => `${(v * 100).toFixed(v < 0.1 ? (v * 100 < 1 ? 2 : 1) : 0)}%`;

export default function WilsonRanges() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label={`관측 전환율이 2퍼센트일 때 95퍼센트 구간. ${rows.map((r) => `클릭 ${r.n}건이면 ${fmtPct(r.lo)}에서 ${fmtPct(r.hi)}`).join(', ')}. 클릭이 적으면 구간이 넓어 판단할 수 없다.`}>
      {rows.map((r, i) => (
        <g key={r.n}>
          <text className="t-strong" x="12" y={rowY(i) + 14}>클릭 {r.n.toLocaleString('en-US')} · 전환 {r.x}</text>
          <text className="t-sub" x="348" y={rowY(i) + 14} textAnchor="end">{fmtPct(r.lo)} ~ {fmtPct(r.hi)}</text>
          <line x1={xOf(r.lo)} y1={lineY(i)} x2={xOf(r.hi)} y2={lineY(i)} stroke="var(--accent)" strokeWidth="3" />
          <line x1={xOf(r.lo)} y1={lineY(i) - CAP} x2={xOf(r.lo)} y2={lineY(i) + CAP} stroke="var(--accent)" strokeWidth="2" />
          <line x1={xOf(r.hi)} y1={lineY(i) - CAP} x2={xOf(r.hi)} y2={lineY(i) + CAP} stroke="var(--accent)" strokeWidth="2" />
          <circle cx={xOf(OBS)} cy={lineY(i)} r="4" fill="var(--warm)" />
        </g>
      ))}
      <line x1={X0} y1={AX} x2={X1} y2={AX} stroke="var(--line)" strokeWidth="1.5" />
      {[0, 2, 4, 6, 8].map((t) => (
        <text key={t} className="t-sub" x={xOf(t / 100)} y={AX + 20} textAnchor="middle">{t}%</text>
      ))}
    </svg>
  );
}
