/** Hick-Hyman 식의 log2(n+1) 값을 직접 계산한다. 반응 시간 실측값이 아니라 식이 그리는 모양이다. */
const X0 = 44;
const X1 = 344;
const Y0 = 150; // 값 0 의 y
const PER_BIT = 24;
const NMAX = 32;
const xOf = (n: number) => X0 + (n / NMAX) * (X1 - X0);
const yOf = (n: number) => Y0 - Math.log2(n + 1) * PER_BIT;

const DOUBLINGS = [2, 4, 8, 16, 32];

export default function HickCurve() {
  const pts: string[] = [];
  for (let n = 1; n <= NMAX; n += 0.5) pts.push(`${xOf(n).toFixed(1)},${yOf(n).toFixed(1)}`);
  const cols = [90, 150, 210, 270, 330];
  return (
    <svg viewBox="0 0 360 252" role="img" aria-label="선택지 수 n에 대해 log2(n+1)을 그린 곡선. n이 두 배가 될 때마다 값이 1비트 안쪽으로 늘어나며 증가폭이 정비례보다 훨씬 완만하다.">
      <line x1={X0} y1={Y0} x2={X1} y2={Y0} stroke="var(--line)" strokeWidth="1.5" />
      <line x1={X0} y1={Y0} x2={X0} y2="14" stroke="var(--line)" strokeWidth="1.5" />
      <text className="t-sub" x="12" y="14">log2(n+1)</text>
      <polyline points={pts.join(' ')} fill="none" stroke="var(--accent)" strokeWidth="2.5" />
      {DOUBLINGS.map((n) => (
        <g key={n}>
          <circle cx={xOf(n)} cy={yOf(n)} r="4" fill="var(--warm)" />
          <line x1={xOf(n)} y1={Y0} x2={xOf(n)} y2={Y0 + 4} stroke="var(--line)" strokeWidth="1.5" />
        </g>
      ))}
      <text className="t-sub" x={X1} y="168" textAnchor="end">선택지 수 n (두 배씩 늘린 지점)</text>
      {DOUBLINGS.map((n, i) => {
        const v = Math.log2(n + 1);
        const prev = Math.log2(n / 2 + 1);
        return (
          <g key={n}>
            <text className="t-strong" x={cols[i]} y="200" textAnchor="middle">{n}</text>
            <text x={cols[i]} y="220" textAnchor="middle" fontSize="13">{v.toFixed(2)}</text>
            <text className="t-warm" x={cols[i]} y="240" textAnchor="middle">+{(v - prev).toFixed(2)}</text>
          </g>
        );
      })}
      <text className="t-sub" x="8" y="200">n</text>
      <text className="t-sub" x="8" y="220">값</text>
      <text className="t-sub" x="8" y="240">증가</text>
    </svg>
  );
}
