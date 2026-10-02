/** 발견율 = 1 - (1 - L)^n. 두 곡선 모두 공식으로 계산한다. */
const found = (L: number, n: number) => 1 - (1 - L) ** n;

const X0 = 44;
const X1 = 344;
const Y0 = 196; // 0%
const Y1 = 20; // 100%
const NMAX = 15;
const px = (n: number) => X0 + ((X1 - X0) * n) / NMAX;
const py = (v: number) => Y0 - (Y0 - Y1) * v;

const path = (L: number) =>
  Array.from({ length: NMAX + 1 }, (_, n) => `${n === 0 ? 'M' : 'L'}${px(n).toFixed(1)},${py(found(L, n)).toFixed(1)}`).join(' ');

export default function SampleCurve() {
  const a = found(0.31, 5);
  const b = found(0.1, 5);
  return (
    <svg viewBox="0 0 360 292" role="img" aria-label="테스트 인원에 따른 문제 발견 비율 곡선. L이 31퍼센트면 5명에서 약 84퍼센트, L이 10퍼센트라고 가정하면 5명에서 약 41퍼센트다.">
      {[0, 0.5, 1].map((v) => (
        <g key={v}>
          <line x1={X0} y1={py(v)} x2={X1} y2={py(v)} stroke="var(--line)" strokeWidth="1" />
          <text className="t-sub" x={X0 - 6} y={py(v) + 4} textAnchor="end">{v * 100}%</text>
        </g>
      ))}
      {[0, 5, 10, 15].map((n) => (
        <text key={n} className="t-sub" x={px(n)} y={Y0 + 20} textAnchor="middle">{n}</text>
      ))}
      <text className="t-sub" x={(X0 + X1) / 2} y={Y0 + 38} textAnchor="middle">테스트한 사용자 수(명)</text>
      <line x1={px(5)} y1={Y1} x2={px(5)} y2={Y0} stroke="var(--accent)" strokeWidth="1" strokeDasharray="4 3" />
      <path d={path(0.1)} fill="none" stroke="var(--warm)" strokeWidth="2.5" />
      <path d={path(0.31)} fill="none" stroke="var(--accent)" strokeWidth="2.5" />
      <circle cx={px(5)} cy={py(a)} r="4.5" style={{ fill: 'var(--accent)' }} />
      <circle cx={px(5)} cy={py(b)} r="4.5" style={{ fill: 'var(--warm)' }} />
      <text className="t-accent" x={px(5) + 8} y={py(a) + 20}>5명 {(a * 100).toFixed(1)}%</text>
      <text className="t-warm" x={px(5) + 8} y={py(b) + 20}>5명 {(b * 100).toFixed(1)}%</text>
      <line x1="8" y1="262" x2="30" y2="262" stroke="var(--accent)" strokeWidth="2.5" />
      <text className="t-sub" x="36" y="266">L = 31% (NN/g가 인용한 평균)</text>
      <line x1="8" y1="282" x2="30" y2="282" stroke="var(--warm)" strokeWidth="2.5" />
      <text className="t-sub" x="36" y="286">L = 10% (비교를 위한 가정 값)</text>
    </svg>
  );
}
