/**
 * 형태 예시(가상 값): 매달 신규 100명, CAC 60,000원, 월 이탈률 5%, 첫 달 결제, 공헌이익 = 현금.
 * 신규 확보 비용은 가입한 달에 나가고, 각 가입 월 고객이 남기는 월 공헌이익이 이후 매달 들어온다.
 * 누적 현금(m) = sum over 월 t 이하의 (월 t 의 공헌이익 합 - 월 t 의 신규 x CAC).
 */
const NEW = 100;
const CAC = 60_000;
const CH = 0.05;
const T = 15;

function cash(mc: number) {
  let c = 0;
  const out: number[] = [];
  for (let t = 0; t < T; t++) {
    let inflow = 0;
    for (let k = 0; k <= t; k++) inflow += NEW * mc * (1 - CH) ** (t - k);
    c += inflow - NEW * CAC;
    out.push(c / 1e6);
  }
  return out;
}
const payback = (mc: number) => Math.log(1 - (CAC * CH) / mc) / Math.log(1 - CH);
const FAST = cash(14_000);
const SLOW = cash(6_000);

const X0 = 48;
const X1 = 344;
const xOf = (m: number) => X0 + ((m - 1) / (T - 1)) * (X1 - X0);
const YTOP = 44;
const Y0 = YTOP + 200;
const VMIN = -50;
const VMAX = 60;
const yOf = (v: number) => Y0 - ((v - VMIN) / (VMAX - VMIN)) * (Y0 - YTOP);
const XLAB = Y0 + 22;
const AXT = XLAB + 24;
const SEP = AXT + 20;
const L1 = SEP + 28;
const L2 = L1 + 24;
const VB_H = L2 + 12;

const line = (v: number[]) => v.map((x, i) => `${xOf(i + 1).toFixed(1)},${yOf(x).toFixed(1)}`).join(' ');
const trough = (v: number[]) => v.indexOf(Math.min(...v));
const th = trough(FAST);
const ts = trough(SLOW);

export default function CashTrough() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label={`같은 CAC와 신규 수에서 회수 기간이 ${payback(14_000).toFixed(1)}개월이면 누적 현금 최저점이 ${FAST[th].toFixed(1)}백만원, ${payback(6_000).toFixed(1)}개월이면 ${SLOW[ts].toFixed(1)}백만원으로 훨씬 깊다.`}>
      <text className="t-sub" x="12" y="20">누적 현금 (백만원)</text>
      {[-30, 0, 30, 60].map((v) => (
        <g key={v}>
          <line x1={X0} y1={yOf(v)} x2={X1} y2={yOf(v)} stroke="var(--line)" strokeWidth={v === 0 ? 1.5 : 1} />
          <text className="t-sub" x={X0 - 8} y={yOf(v) + 4} textAnchor="end">{v}</text>
        </g>
      ))}
      <polyline points={line(FAST)} fill="none" stroke="var(--accent)" strokeWidth="2.5" />
      <polyline points={line(SLOW)} fill="none" stroke="var(--warm)" strokeWidth="2.5" />
      <circle cx={xOf(th + 1)} cy={yOf(FAST[th])} r="4" fill="var(--accent)" />
      <circle cx={xOf(ts + 1)} cy={yOf(SLOW[ts])} r="4" fill="var(--warm)" />
      <text className="t-accent" x={xOf(th + 1)} y={yOf(FAST[th]) - 14} textAnchor="middle">{FAST[th].toFixed(1)}</text>
      <text className="t-warm" x={xOf(ts + 1)} y={yOf(SLOW[ts]) + 22} textAnchor="middle">{SLOW[ts].toFixed(1)}</text>
      {[1, 5, 10, 15].map((m) => (
        <text key={m} className="t-sub" x={xOf(m)} y={XLAB} textAnchor="middle">{m}</text>
      ))}
      <text className="t-sub" x="348" y={AXT} textAnchor="end">월</text>
      <line x1="8" y1={SEP} x2="352" y2={SEP} stroke="var(--line)" />
      <line x1="12" y1={L1 - 4} x2="40" y2={L1 - 4} stroke="var(--accent)" strokeWidth="2.5" />
      <text className="t-sub" x="50" y={L1}>월 공헌이익 14,000원 (회수 {payback(14_000).toFixed(1)}개월)</text>
      <line x1="12" y1={L2 - 4} x2="40" y2={L2 - 4} stroke="var(--warm)" strokeWidth="2.5" />
      <text className="t-sub" x="50" y={L2}>월 공헌이익 6,000원 (회수 {payback(6_000).toFixed(1)}개월)</text>
    </svg>
  );
}
