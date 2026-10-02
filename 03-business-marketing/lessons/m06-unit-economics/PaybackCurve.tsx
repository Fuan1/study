/**
 * 형태 예시(가상 값): 월 공헌이익 14,000원, 월 이탈률 5%, CAC 60,000원.
 * n개월 누적 공헌이익 = 월 공헌이익 x (1 - (1 - 이탈률)^n) / 이탈률 (첫 달 결제, 이후 매달 이탈률만큼 빠짐).
 * 상한 없는 LTV = 월 공헌이익 / 이탈률.
 */
const MC = 14_000;
const CH = 0.05;
const CAC = 60_000;
const N = 24;
const cum = (n: number) => (MC * (1 - (1 - CH) ** n)) / CH;
const LTV_INF = MC / CH;

const X0 = 52;
const X1 = 340;
const xOf = (n: number) => X0 + (n / N) * (X1 - X0);
const YTOP = 44;
const Y0 = YTOP + 200;
const VMAX = 300_000;
const yOf = (v: number) => Y0 - (v / VMAX) * (Y0 - YTOP);
const XLAB = Y0 + 22;
const AXT = XLAB + 24;
const VB_H = AXT + 12;

const fmt = (n: number) => Math.round(n).toLocaleString('en-US');

function crossing() {
  for (let n = 1; n <= 60; n++) {
    if (cum(n) >= CAC) return n - 1 + (CAC - cum(n - 1)) / (cum(n) - cum(n - 1));
  }
  return NaN;
}

export default function PaybackCurve() {
  const pay = crossing();
  const pts = Array.from({ length: N + 1 }, (_, n) => `${xOf(n).toFixed(1)},${yOf(cum(n)).toFixed(1)}`).join(' ');
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label={`고객 1명의 누적 공헌이익은 약 ${pay.toFixed(1)}개월에 CAC ${fmt(CAC)}원을 넘고, 12개월 ${fmt(cum(12))}원, 24개월 ${fmt(cum(24))}원, 상한 없으면 ${fmt(LTV_INF)}원으로 수명 상한에 따라 LTV가 달라진다.`}>
      <text className="t-sub" x="12" y="20">고객 1명당 누적 공헌이익 (원)</text>
      {[0, 100_000, 200_000, 300_000].map((v) => (
        <g key={v}>
          <line x1={X0} y1={yOf(v)} x2={X1} y2={yOf(v)} stroke="var(--line)" strokeWidth={v === 0 ? 1.5 : 1} />
          <text className="t-sub" x={X0 - 8} y={yOf(v) + 4} textAnchor="end">{v === 0 ? '0' : `${v / 10_000}만`}</text>
        </g>
      ))}
      <line x1={X0} y1={yOf(LTV_INF)} x2={X1} y2={yOf(LTV_INF)} stroke="var(--muted)" strokeWidth="1.5" strokeDasharray="4 3" />
      <text className="t-sub" x={X0 + 8} y={yOf(LTV_INF) + 22}>상한 없음 {fmt(LTV_INF)}</text>
      <line x1={X0} y1={yOf(CAC)} x2={X1} y2={yOf(CAC)} stroke="var(--warm)" strokeWidth="1.5" />
      <text className="t-warm" x={X1} y={yOf(CAC) + 22} textAnchor="end">CAC {fmt(CAC)}</text>
      <polyline points={pts} fill="none" stroke="var(--accent)" strokeWidth="2.5" />
      <line x1={xOf(pay)} y1={yOf(CAC)} x2={xOf(pay)} y2={Y0} stroke="var(--warm)" strokeWidth="1" strokeDasharray="3 2" />
      <circle cx={xOf(pay)} cy={yOf(CAC)} r="4.5" fill="var(--warm)" />
      <text className="t-warm" x={xOf(pay) + 8} y={Y0 - 10}>{pay.toFixed(1)}개월</text>
      {[12, 24].map((n) => (
        <circle key={n} cx={xOf(n)} cy={yOf(cum(n))} r="4" fill="var(--accent)" />
      ))}
      <text className="t-accent" x={xOf(12) - 8} y={yOf(cum(12)) - 12} textAnchor="end">12개월 {fmt(cum(12))}</text>
      <text className="t-accent" x={xOf(24) - 8} y={yOf(cum(24)) - 14} textAnchor="end">24개월 {fmt(cum(24))}</text>
      {[0, 6, 12, 18, 24].map((n) => (
        <text key={n} className="t-sub" x={xOf(n)} y={XLAB} textAnchor="middle">{n}</text>
      ))}
      <text className="t-sub" x="348" y={AXT} textAnchor="end">가입 후 개월 (가입한 달 = 1)</text>
    </svg>
  );
}
