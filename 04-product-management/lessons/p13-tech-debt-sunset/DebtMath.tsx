/**
 * 출처 값: Fowler "Technical Debt" (2019)의 설명용 예시. 구조가 깨끗하면 기능 하나에 4일,
 * 지저분하면 6일(차이 2일 = 이자), 정리에 5일(원금).
 * 이 글이 계산한 값: 그대로 두면 누적 = 6 x n, 먼저 정리하면 누적 = 5 + 4 x n.
 * 역전 지점 = 원금 / 이자 = 5 / 2 = 2.5 번째 기능.
 */
const CLEAN_DAYS = 4;
const CRUFT_DAYS = 6;
const PRINCIPAL = 5;
const N = 4;
const YMAX = 24;
const cruft = (n: number) => CRUFT_DAYS * n;
const cleaned = (n: number) => PRINCIPAL + CLEAN_DAYS * n;
const cross = PRINCIPAL / (CRUFT_DAYS - CLEAN_DAYS);

const X0 = 44;
const X1 = 316;
const YTOP = 88;
const Y0 = YTOP + 180;
const xOf = (n: number) => X0 + (n / N) * (X1 - X0);
const yOf = (d: number) => Y0 - (d / YMAX) * (Y0 - YTOP);
const XLAB = Y0 + 22;
const AXT = XLAB + 24;
const VB_H = AXT + 12;

const pts = (f: (n: number) => number) =>
  Array.from({ length: N + 1 }, (_, n) => `${xOf(n).toFixed(1)},${yOf(f(n)).toFixed(1)}`).join(' ');

export default function DebtMath() {
  return (
    <svg
      viewBox={`0 0 360 ${VB_H}`}
      role="img"
      aria-label={`같은 영역을 건드리는 기능이 늘수록 누적 작업일은 그대로 두면 기능당 ${CRUFT_DAYS}일씩, 먼저 정리하면 ${PRINCIPAL}일 뒤 기능당 ${CLEAN_DAYS}일씩 늘어 ${cross}번째에 역전된다. 기능 3개면 ${cruft(3)}일 대 ${cleaned(3)}일.`}
    >
      <text className="t-sub" x="12" y="20">누적 작업일 (Fowler의 설명용 예시)</text>
      <line x1="12" y1="38" x2="32" y2="38" stroke="var(--warm)" strokeWidth="2.5" />
      <text className="t-warm" x="40" y="42">그대로 둠: 기능마다 {CRUFT_DAYS}일</text>
      <line x1="12" y1="58" x2="32" y2="58" stroke="var(--accent)" strokeWidth="2.5" />
      <text className="t-accent" x="40" y="62">먼저 정리: {PRINCIPAL}일 + 기능마다 {CLEAN_DAYS}일</text>
      {[0, 6, 12, 18, 24].map((v) => (
        <g key={v}>
          <line x1={X0} y1={yOf(v)} x2={X1} y2={yOf(v)} stroke="var(--line)" strokeWidth={v === 0 ? 1.5 : 1} />
          <text className="t-sub" x={X0 - 8} y={yOf(v) + 4} textAnchor="end">{v}</text>
        </g>
      ))}
      <polyline points={pts(cruft)} fill="none" stroke="var(--warm)" strokeWidth="2.5" />
      <polyline points={pts(cleaned)} fill="none" stroke="var(--accent)" strokeWidth="2.5" />
      <line x1={xOf(cross)} y1={yOf(cruft(cross))} x2={xOf(cross)} y2={Y0} stroke="var(--muted)" strokeWidth="1" strokeDasharray="3 2" />
      <circle cx={xOf(cross)} cy={yOf(cruft(cross))} r="4.5" fill="var(--accent)" />
      <text className="t-sub" x={xOf(cross) + 10} y={Y0 - 14}>{cross}번째에 역전</text>
      <text className="t-warm" x={xOf(N) + 8} y={yOf(cruft(N)) + 4}>{cruft(N)}</text>
      <text className="t-accent" x={xOf(N) + 8} y={yOf(cleaned(N)) + 4}>{cleaned(N)}</text>
      {[0, 1, 2, 3, 4].map((n) => (
        <text key={n} className="t-sub" x={xOf(n)} y={XLAB} textAnchor="middle">{n}</text>
      ))}
      <text className="t-sub" x="348" y={AXT} textAnchor="end">같은 영역을 건드리는 기능 수</text>
    </svg>
  );
}
