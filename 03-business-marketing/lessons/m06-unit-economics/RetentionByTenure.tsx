/**
 * 출처 값: Fader & Hardie (2006) Table 1 의 연도별 생존율(%). 사업 이름은 비공개이고 Berry & Linoff (2004) 의 데이터다.
 * 연 유지율 r(n) = S(n) / S(n-1) 은 이 파일에서 나눗셈으로 계산한다. 점선은 첫해 유지율을 끝까지 쓴 가정이다.
 */
const HIGH = [100.0, 86.9, 74.3, 65.3, 59.3, 55.1, 51.7, 49.1, 46.8, 44.5, 42.7, 40.9, 39.4];
const REG = [100.0, 63.1, 46.8, 38.2, 32.6, 28.9, 26.2, 24.1, 22.3, 20.7, 19.4, 18.3, 17.3];
const rate = (s: number[]) => s.slice(1).map((v, i) => (v / s[i]) * 100);
const RH = rate(HIGH);
const RR = rate(REG);

const X0 = 48;
const X1 = 344;
const xOf = (yr: number) => X0 + ((yr - 1) / 11) * (X1 - X0);
const YTOP = 44;
const Y0 = YTOP + 190;
const yOf = (v: number) => Y0 - ((v - 50) / 50) * (Y0 - YTOP);
const XLAB = Y0 + 22;
const AXT = XLAB + 24;
const SEP = AXT + 20;
const L1 = SEP + 28;
const L2 = L1 + 24;
const VB_H = L2 + 12;

const line = (r: number[]) => r.map((v, i) => `${xOf(i + 1).toFixed(1)},${yOf(v).toFixed(1)}`).join(' ');

export default function RetentionByTenure() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label={`가입 후 연 유지율은 High End 고객군이 ${RH[0].toFixed(1)}퍼센트에서 ${RH[11].toFixed(1)}퍼센트로, Regular 고객군이 ${RR[0].toFixed(1)}퍼센트에서 ${RR[11].toFixed(1)}퍼센트로 해마다 오른다.`}>
      <text className="t-sub" x="12" y="20">연 유지율 (%)</text>
      {[50, 75, 100].map((v) => (
        <g key={v}>
          <line x1={X0} y1={yOf(v)} x2={X1} y2={yOf(v)} stroke="var(--line)" strokeWidth={v === 50 ? 1.5 : 1} />
          <text className="t-sub" x={X0 - 8} y={yOf(v) + 4} textAnchor="end">{v}</text>
        </g>
      ))}
      <line x1={X0} y1={yOf(RH[0])} x2={X1} y2={yOf(RH[0])} stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="4 3" />
      <line x1={X0} y1={yOf(RR[0])} x2={X1} y2={yOf(RR[0])} stroke="var(--muted)" strokeWidth="1.5" strokeDasharray="4 3" />
      <polyline points={line(RH)} fill="none" stroke="var(--accent)" strokeWidth="2.5" />
      <polyline points={line(RR)} fill="none" stroke="var(--muted)" strokeWidth="2.5" />
      <text className="t-accent" x={X1} y={yOf(RH[11]) - 12} textAnchor="end">High End</text>
      <text className="t-sub" x={X1} y={yOf(RR[11]) + 20} textAnchor="end">Regular</text>
      {[1, 4, 8, 12].map((n) => (
        <text key={n} className="t-sub" x={xOf(n)} y={XLAB} textAnchor="middle">{n}</text>
      ))}
      <text className="t-sub" x="348" y={AXT} textAnchor="end">가입 후 n년째</text>
      <line x1="8" y1={SEP} x2="352" y2={SEP} stroke="var(--line)" />
      <line x1="12" y1={L1 - 4} x2="40" y2={L1 - 4} stroke="var(--accent)" strokeWidth="2.5" />
      <text className="t-sub" x="50" y={L1}>실선: 관측한 연 유지율</text>
      <line x1="12" y1={L2 - 4} x2="40" y2={L2 - 4} stroke="var(--muted)" strokeWidth="1.5" strokeDasharray="4 3" />
      <text className="t-sub" x="50" y={L2}>점선: 첫해 값을 끝까지 쓴 가정</text>
    </svg>
  );
}
