/** 같은 주 결제 ÷ 같은 주 가입 과 가입 코호트 결제율을 비교한다. 가정: 가입자의 10%가 가입 다음 주에 결제. */
const SIGNUPS = [400, 1200, 400, 400]; // 주별 가입자(가정)
const RATE = 0.1; // 가입 코호트의 다음 주 결제율(가정)
const paid = (i: number) => (i > 0 ? SIGNUPS[i - 1] * RATE : 0);
const WEEKS = [1, 2, 3].map((i) => ({
  label: `${i + 1}주차`,
  signups: SIGNUPS[i],
  naive: paid(i) / SIGNUPS[i],
  cohort: RATE,
}));

const X0 = 96;
const MAXW = 200; // 30% 의 폭
const MAXV = 0.3;
const BH = 16;
const ROW_H = BH * 2 + 4; // 36
const GAP = 24;
const Y0 = 68;
const rowY = (i: number) => Y0 + i * (ROW_H + GAP);
const w = (v: number) => (v / MAXV) * MAXW;
const pct = (v: number) => `${(Math.round(v * 1000) / 10).toString()}%`;
const VB_H = Math.ceil(rowY(WEEKS.length - 1) + ROW_H + 0.75 + 12);

export default function CohortSkew() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label={`같은 주의 결제를 같은 주 가입으로 나누면 ${WEEKS.map((d) => `${d.label} ${pct(d.naive)}`).join(', ')}로 요동친다. 가입 코호트로 따라가면 매주 ${pct(RATE)}로 같다.`}>
      <rect x="12" y="6" width="12" height="12" rx="2" fill="var(--bad)" />
      <text className="t-sub" x="32" y="17">같은 주 결제 ÷ 같은 주 가입</text>
      <rect x="12" y="28" width="12" height="12" rx="2" fill="var(--accent)" />
      <text className="t-sub" x="32" y="39">가입 코호트의 결제율</text>
      {WEEKS.map((d, i) => (
        <g key={d.label}>
          <text className="t-strong" x="12" y={rowY(i) + 15}>{d.label}</text>
          <text className="t-sub" x="12" y={rowY(i) + 35}>가입 {d.signups.toLocaleString('en-US')}</text>
          <rect x={X0} y={rowY(i)} width={w(d.naive)} height={BH} rx="2" fill="var(--bad)" />
          <text className="t-bad" x={X0 + w(d.naive) + 8} y={rowY(i) + 13}>{pct(d.naive)}</text>
          <rect x={X0} y={rowY(i) + BH + 4} width={w(d.cohort)} height={BH} rx="2" fill="var(--accent)" />
          <text className="t-sub" x={X0 + w(d.cohort) + 8} y={rowY(i) + BH + 4 + 13}>{pct(d.cohort)}</text>
        </g>
      ))}
    </svg>
  );
}
