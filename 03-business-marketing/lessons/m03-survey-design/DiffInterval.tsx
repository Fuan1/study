/** 두 집단 비율 차이의 95% 신뢰구간을 표본 수별로 계산해 0 과 비교한다. 비율 60%, 52%는 가정. */
const Z = 1.959964; // z(0.975)
const CASES = [
  { n1: 100, n2: 75 },
  { n1: 400, n2: 300 },
  { n1: 1600, n2: 1200 },
];
const P1 = 0.6;
const P2 = 0.52;
const interval = (n1: number, n2: number) => {
  const d = P1 - P2;
  const se = Math.sqrt((P1 * (1 - P1)) / n1 + (P2 * (1 - P2)) / n2);
  return { d: 100 * d, lo: 100 * (d - Z * se), hi: 100 * (d + Z * se) };
};
const sgn = (v: number) => `${v >= 0 ? '+' : ''}${v.toFixed(1)}`;

const AX0 = 24;
const AX1 = 336;
const LO = -10;
const HI = 25;
const xOf = (v: number) => AX0 + ((v - LO) / (HI - LO)) * (AX1 - AX0);
const PITCH = 64;
const labelY = (i: number) => 24 + i * PITCH;
const barY = (i: number) => labelY(i) + 24;
const TICKS = [-10, 0, 10, 20];
const AXIS_Y = barY(CASES.length - 1) + 24;
const TICK_BASE = AXIS_Y + 22;
const TITLE_Y = TICK_BASE + 28;
const VB_H = TITLE_Y + 12;

export default function DiffInterval() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="두 집단의 비율 차이 8퍼센트포인트의 95퍼센트 신뢰구간. 100명 대 75명이면 0을 포함하고, 400명 대 300명과 1,600명 대 1,200명이면 0을 포함하지 않는다. 표본이 커질수록 구간이 좁아진다.">
      {CASES.map((c, i) => {
        const r = interval(c.n1, c.n2);
        const inside = r.lo <= 0 && r.hi >= 0;
        const color = inside ? 'var(--bad)' : 'var(--good)';
        const by = barY(i);
        return (
          <g key={c.n1}>
            <text className="t-sub" x="12" y={labelY(i)}>{c.n1}명 대 {c.n2}명: {sgn(r.d)} [{sgn(r.lo)}, {sgn(r.hi)}]</text>
            <text className={inside ? 't-bad' : 't-good'} x="348" y={labelY(i)} textAnchor="end">{inside ? '0 포함' : '0 제외'}</text>
            <line x1={xOf(0)} y1={by - 10} x2={xOf(0)} y2={by + 10} stroke="var(--muted)" strokeWidth="1.5" strokeDasharray="3 3" />
            <line x1={xOf(r.lo)} y1={by} x2={xOf(r.hi)} y2={by} stroke={color} strokeWidth="3" />
            <line x1={xOf(r.lo)} y1={by - 6} x2={xOf(r.lo)} y2={by + 6} stroke={color} strokeWidth="2" />
            <line x1={xOf(r.hi)} y1={by - 6} x2={xOf(r.hi)} y2={by + 6} stroke={color} strokeWidth="2" />
            <circle cx={xOf(r.d)} cy={by} r="4.5" fill={color} />
          </g>
        );
      })}
      <line x1={AX0} y1={AXIS_Y} x2={AX1} y2={AXIS_Y} stroke="var(--line)" strokeWidth="1.5" />
      {TICKS.map((v) => (
        <g key={v}>
          <line x1={xOf(v)} y1={AXIS_Y} x2={xOf(v)} y2={AXIS_Y + 5} stroke="var(--line)" strokeWidth="1.5" />
          <text className="t-sub" x={xOf(v)} y={TICK_BASE} textAnchor="middle">{v > 0 ? `+${v}` : v}</text>
        </g>
      ))}
      <text className="t-sub" x="348" y={TITLE_Y} textAnchor="end">A 비율 - B 비율 (%p), 점선은 0</text>
    </svg>
  );
}
