/** 최소 테스트 예산 = 목표 전환 수 ÷ 전환율 × CPC. 목표 30건, CPC 1,000원(가정). */
const K = 30;
const CPC = 1000;
const budget = (cvr: number) => (K / cvr) * CPC;
const man = (v: number) => `${Math.round(v / 10000).toLocaleString('en-US')}만`;

const X0 = 64;
const X1 = 336;
const Y0 = 170;
const YTOP = 52;
const VMAX = 6_000_000;
const C0 = 0.005;
const C1 = 0.05;
const xOf = (c: number) => X0 + ((c - C0) / (C1 - C0)) * (X1 - X0);
const yOf = (v: number) => Y0 - (v / VMAX) * (Y0 - YTOP);
const MARKS = [0.01, 0.02, 0.04];
const XTICKS = [0.01, 0.02, 0.03, 0.04, 0.05];
const YTICKS = [0, 3_000_000, 6_000_000];
const SEP = 224;
const ROW1 = SEP + 28;
const ROW2 = ROW1 + 22;
const VB_H = ROW2 + 12;

export default function BudgetCurve() {
  const pts: string[] = [];
  for (let c = C0; c <= C1 + 1e-9; c += 0.0005) pts.push(`${xOf(c).toFixed(1)},${yOf(budget(c)).toFixed(1)}`);
  const [b1, b2, b4] = MARKS.map(budget);
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label={`전환 ${K}건을 얻는 데 필요한 예산. 전환율 1퍼센트면 ${man(b1)}원, 2퍼센트면 ${man(b2)}원, 4퍼센트면 ${man(b4)}원이다. 전환율이 절반이면 예산은 2배다.`}>
      <text className="t-sub" x="12" y="18">필요 예산(원)</text>
      <rect x={xOf(0.01)} y={YTOP} width={xOf(0.04) - xOf(0.01)} height={Y0 - YTOP} fill="var(--accent-soft)" />
      <text className="t-accent" x={(xOf(0.01) + xOf(0.04)) / 2 + 28} y={YTOP + 28} textAnchor="middle">가정 범위 1~4%</text>
      {YTICKS.map((v) => (
        <g key={v}>
          <line x1={X0} y1={yOf(v)} x2={X1} y2={yOf(v)} stroke="var(--line)" strokeWidth={v === 0 ? 1.5 : 1} />
          <text className="t-sub" x={X0 - 8} y={yOf(v) + 4} textAnchor="end">{v === 0 ? '0' : man(v)}</text>
        </g>
      ))}
      <polyline points={pts.join(' ')} fill="none" stroke="var(--accent)" strokeWidth="2.5" />
      {MARKS.map((c) => (
        <circle key={c} cx={xOf(c)} cy={yOf(budget(c))} r="4" fill="var(--warm)" />
      ))}
      <text className="t-warm" x={xOf(0.01) + 10} y={yOf(b1) - 8}>{man(b1)}</text>
      <text className="t-warm" x={xOf(0.02) + 10} y={yOf(b2) - 8}>{man(b2)}</text>
      <text className="t-warm" x={xOf(0.04) + 12} y={yOf(b4) - 8}>{man(b4)}</text>
      {XTICKS.map((c) => (
        <text key={c} className="t-sub" x={xOf(c)} y={Y0 + 22} textAnchor="middle">{Math.round(c * 100)}%</text>
      ))}
      <text className="t-sub" x={348} y={Y0 + 44} textAnchor="end">클릭 후 전환율 (가정)</text>
      <line x1="8" y1={SEP} x2="352" y2={SEP} stroke="var(--line)" />
      <text x="12" y={ROW1} fontSize="13">전환율 2% → 1%: {man(b2)} → {man(b1)} ({(b1 / b2).toFixed(1)}배)</text>
      <text x="12" y={ROW2} fontSize="13">전환율 2% → 4%: {man(b2)} → {man(b4)} ({(b4 / b2).toFixed(1)}배)</text>
    </svg>
  );
}
