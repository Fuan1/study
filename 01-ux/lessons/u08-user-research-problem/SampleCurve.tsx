/** Nielsen과 Landauer 모델: 찾은 문제 비율 = 1 - (1 - L)^n, L = 0.31. 값은 모두 계산한다. */
const L = 0.31;
const found = (n: number) => 1 - (1 - L) ** n;
const X0 = 52;
const X1 = 340;
const Y0 = 220; // 0%
const Y1 = 40; // 100%
const NMAX = 15;
const px = (n: number) => X0 + (n / NMAX) * (X1 - X0);
const py = (p: number) => Y0 - p * (Y0 - Y1);

const path = Array.from({ length: NMAX + 1 }, (_, n) => `${n === 0 ? 'M' : 'L'}${px(n).toFixed(1)} ${py(found(n)).toFixed(1)}`).join(' ');
const MARKS = [1, 5, 15];

export default function SampleCurve() {
  return (
    <svg viewBox="0 0 360 282" role="img" aria-label="사용성 테스트에서 참가자가 늘수록 새로 찾는 문제가 줄어드는 곡선. 1명이면 31퍼센트, 5명이면 84퍼센트, 15명이면 거의 전부.">
      {[0, 0.5, 1].map((p) => (
        <g key={p}>
          <line x1={X0} y1={py(p)} x2={X1} y2={py(p)} stroke="var(--line)" strokeWidth="1" />
          <text className="t-sub" x="8" y={py(p) + 4}>{Math.round(p * 100)}%</text>
        </g>
      ))}
      <line x1={X0} y1={py(0.85)} x2={X1} y2={py(0.85)} stroke="var(--warm)" strokeWidth="1" strokeDasharray="4 3" />
      <text className="t-sub" x="8" y={py(0.85) + 4} style={{ fill: 'var(--warm)' }}>85%</text>
      <path d={path} fill="none" stroke="var(--accent)" strokeWidth="2.5" />
      {MARKS.map((n) => {
        const p = found(n);
        const end = n === NMAX;
        return (
          <g key={n}>
            <circle cx={px(n)} cy={py(p)} r="4.5" fill="var(--accent)" />
            <text className="t-strong" x={end ? px(n) - 4 : px(n) + 8} y={end ? py(p) - 17 : py(p) + 26} textAnchor={end ? 'end' : 'start'}>
              {n}명 {Math.round(p * 100)}%
            </text>
          </g>
        );
      })}
      {[0, 5, 10, 15].map((n) => (
        <text key={n} className="t-sub" x={px(n)} y="242" textAnchor="middle">{n}</text>
      ))}
      <text className="t-sub" x="196" y="266" textAnchor="middle">참가자 수(명)</text>
    </svg>
  );
}
