/** 두 비율 비교의 군당 표본 수를 식으로 계산해 그린다. 기저 전환율 10%(가정), 검정력 80%, 양측 5%. */
const Z_A = 1.959964; // z(0.975), python statistics.NormalDist 로 계산한 값
const Z_B = 0.841621; // z(0.80)
const BASE = 0.1;
const nPerArm = (rel: number) => {
  const p2 = BASE * (1 + rel);
  const pb = (BASE + p2) / 2;
  const d = p2 - BASE;
  return Math.ceil((2 * pb * (1 - pb) * (Z_A + Z_B) ** 2) / d ** 2);
};
const fmt = (n: number) => n.toLocaleString('en-US');

// 글자와 도형은 x=12~348 안에 둔다. 눈금 글자 폭("60,000" 약 39px)을 고려해 그래프는 x=64 에서 시작한다.
const X0 = 64;
const X1 = 336;
const Y0 = 170; // 값 0 의 y
const YTOP = 48; // 60,000 의 y (축 제목과 눈금 글자 사이를 띄운다)
const NMAX = 60000;
const R0 = 0.05;
const R1 = 0.3;
const xOf = (r: number) => X0 + ((r - R0) / (R1 - R0)) * (X1 - X0);
const yOf = (n: number) => Y0 - (n / NMAX) * (Y0 - YTOP);

const MARKS = [0.05, 0.1, 0.2];
const XTICKS = [0.05, 0.1, 0.2, 0.3];
const YTICKS = [0, 30000, 60000];
const SEP = 224; // 구분선
const ROW1 = SEP + 28;
const ROW2 = ROW1 + 22;
const VB_H = ROW2 + 12; // 마지막 글자 baseline + 아래 여백

export default function SampleCurve() {
  const pts: string[] = [];
  for (let r = R0; r <= R1 + 1e-9; r += 0.005) pts.push(`${xOf(r).toFixed(1)},${yOf(nPerArm(r)).toFixed(1)}`);
  const n5 = nPerArm(0.05);
  const n10 = nPerArm(0.1);
  const n20 = nPerArm(0.2);
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label={`최소 검출 효과가 상대 5퍼센트일 때 군당 ${fmt(n5)}명, 10퍼센트일 때 ${fmt(n10)}명, 20퍼센트일 때 ${fmt(n20)}명이 필요하다. 검출하려는 효과를 절반으로 줄이면 표본은 약 4배가 된다.`}>
      <text className="t-sub" x="12" y="18">군당 표본 수</text>
      {YTICKS.map((v) => (
        <g key={v}>
          <line x1={X0} y1={yOf(v)} x2={X1} y2={yOf(v)} stroke="var(--line)" strokeWidth={v === 0 ? 1.5 : 1} />
          <text className="t-sub" x={X0 - 8} y={yOf(v) + 4} textAnchor="end">{fmt(v)}</text>
        </g>
      ))}
      <polyline points={pts.join(' ')} fill="none" stroke="var(--accent)" strokeWidth="2.5" />
      {MARKS.map((r) => (
        <circle key={r} cx={xOf(r)} cy={yOf(nPerArm(r))} r="4" fill="var(--warm)" />
      ))}
      <text className="t-warm" x={xOf(0.05) + 10} y={yOf(n5) + 18}>{fmt(n5)}</text>
      <text className="t-warm" x={xOf(0.1) + 10} y={yOf(n10) - 8}>{fmt(n10)}</text>
      <text className="t-warm" x={xOf(0.2)} y={yOf(n20) - 12} textAnchor="middle">{fmt(n20)}</text>
      {XTICKS.map((r) => (
        <text key={r} className="t-sub" x={xOf(r)} y={Y0 + 22} textAnchor="middle">{Math.round(r * 100)}%</text>
      ))}
      <text className="t-sub" x={348} y={Y0 + 44} textAnchor="end">MDE (상대 %, 기저 전환율 10%)</text>
      <line x1="8" y1={SEP} x2="352" y2={SEP} stroke="var(--line)" />
      <text x="12" y={ROW1} fontSize="13">MDE 20% → 10%: {fmt(n20)} → {fmt(n10)} ({(n10 / n20).toFixed(1)}배)</text>
      <text x="12" y={ROW2} fontSize="13">MDE 10% → 5%: {fmt(n10)} → {fmt(n5)} ({(n5 / n10).toFixed(1)}배)</text>
    </svg>
  );
}
