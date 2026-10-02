/** 비율 추정의 오차 범위(p=0.5, 신뢰수준 95%, 단순 무작위 표본)를 표본 수에 대해 식으로 그린다. */
const Z = 1.959964; // z(0.975), python statistics.NormalDist 로 계산한 값
const moe = (n: number) => 100 * Z * Math.sqrt(0.25 / n); // 단위 %
const need = (e: number) => Math.ceil((Z * Z * 0.25) / ((e / 100) ** 2)); // 필요 표본(모집단이 아주 클 때)
const fmt = (n: number) => n.toLocaleString('en-US');

// 글자와 도형은 x=12~348 안에 둔다.
const X0 = 56;
const X1 = 336;
const Y0 = 170;
const YTOP = 48;
const NMAX = 1200;
const EMAX = 16;
const xOf = (n: number) => X0 + (n / NMAX) * (X1 - X0);
const yOf = (e: number) => Y0 - (e / EMAX) * (Y0 - YTOP);

const MARKS = [10, 5, 3];
const XTICKS = [0, 400, 800, 1200];
const YTICKS = [0, 5, 10, 15];
const SEP = 232;
const ROW1 = SEP + 28;
const ROW2 = ROW1 + 22;
const VB_H = ROW2 + 12;

export default function MoeCurve() {
  const pts: string[] = [];
  for (let n = 50; n <= NMAX; n += 10) pts.push(`${xOf(n).toFixed(1)},${yOf(moe(n)).toFixed(1)}`);
  const n10 = need(10);
  const n5 = need(5);
  const n3 = need(3);
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label={`오차 범위가 10퍼센트이면 ${fmt(n10)}명, 5퍼센트이면 ${fmt(n5)}명, 3퍼센트이면 ${fmt(n3)}명이 필요하다. 오차를 절반으로 줄이려면 표본이 4배 필요하다.`}>
      <text className="t-sub" x="12" y="18">오차 범위(± %p)</text>
      {YTICKS.map((v) => (
        <g key={v}>
          <line x1={X0} y1={yOf(v)} x2={X1} y2={yOf(v)} stroke="var(--line)" strokeWidth={v === 0 ? 1.5 : 1} />
          <text className="t-sub" x={X0 - 8} y={yOf(v) + 4} textAnchor="end">{v}</text>
        </g>
      ))}
      <polyline points={pts.join(' ')} fill="none" stroke="var(--accent)" strokeWidth="2.5" />
      {MARKS.map((e) => (
        <circle key={e} cx={xOf(need(e))} cy={yOf(moe(need(e)))} r="4" fill="var(--warm)" />
      ))}
      <text className="t-warm" x={xOf(n10) + 10} y={yOf(10) - 8}>{fmt(n10)}</text>
      <text className="t-warm" x={xOf(n5) + 10} y={yOf(5) - 10}>{fmt(n5)}</text>
      <text className="t-warm" x={xOf(n3)} y={yOf(3) - 18} textAnchor="end">{fmt(n3)}</text>
      {XTICKS.map((n) => (
        <text key={n} className="t-sub" x={xOf(n)} y={Y0 + 22} textAnchor="middle">{fmt(n)}</text>
      ))}
      <text className="t-sub" x={348} y={Y0 + 44} textAnchor="end">응답 수 n (p 0.5, 95%)</text>
      <line x1="8" y1={SEP} x2="352" y2={SEP} stroke="var(--line)" />
      <text x="12" y={ROW1} fontSize="13">±10% → ±5%: {fmt(n10)} → {fmt(n5)} ({(n5 / n10).toFixed(1)}배)</text>
      <text x="12" y={ROW2} fontSize="13">±5% → ±3%: {fmt(n5)} → {fmt(n3)} ({(n3 / n5).toFixed(1)}배)</text>
    </svg>
  );
}
