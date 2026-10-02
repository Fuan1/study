/** 로그정규 분포(mu 0, sigma 1)에서 중앙값, 평균, p90, p99 를 식으로 계산한다. 중앙값이 1이 되도록 맞춘 값이며 측정값이 아니다. */
const erf = (x: number) => {
  const s = Math.sign(x);
  const a = Math.abs(x);
  const t = 1 / (1 + 0.3275911 * a);
  const y = 1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-a * a);
  return s * y;
};
const stdNormCdf = (z: number) => 0.5 * (1 + erf(z / Math.SQRT2));
// 표준정규 분위수는 이분법으로 구한다.
const z = (p: number) => {
  let lo = -8;
  let hi = 8;
  for (let i = 0; i < 80; i++) {
    const mid = (lo + hi) / 2;
    if (stdNormCdf(mid) < p) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
};
const SIGMA = 1;
const q = (p: number) => Math.exp(SIGMA * z(p));

const ROWS = [
  { label: 'p50 중앙값', v: q(0.5), cls: 'svg-berg' },
  { label: '평균', v: Math.exp((SIGMA * SIGMA) / 2), cls: 'svg-tip' },
  { label: 'p90', v: q(0.9), cls: 'svg-berg' },
  { label: 'p99', v: q(0.99), cls: 'svg-berg' },
];

const BX = 112; // 막대 시작 x
const K = 18; // 값 1당 px
const BH = 22;
const PITCH = 44;
const TOP = 40;

export default function TailQuantiles() {
  const vbH = TOP + (ROWS.length - 1) * PITCH + BH + 1 + 14; // 마지막 막대 아랫변 + 선 두께 절반 + 아래 여백
  return (
    <svg viewBox={`0 0 360 ${vbH}`} role="img" aria-label={`꼬리가 긴 분포(로그정규, 가상)에서 중앙값을 1로 맞춘 값. 중앙값 ${ROWS[0].v.toFixed(2)}, 평균 ${ROWS[1].v.toFixed(2)}, p90 ${ROWS[2].v.toFixed(2)}, p99 ${ROWS[3].v.toFixed(2)}. 평균은 p90에도 미치지 못하고 p99는 중앙값의 약 10배다.`}>
      <text className="t-sub" x="8" y="18">중앙값을 1로 맞춘 값</text>
      {ROWS.map((r, i) => {
        const y = TOP + i * PITCH;
        const w = r.v * K;
        return (
          <g key={r.label}>
            <text className="t-strong" x="8" y={y + 16}>{r.label}</text>
            <rect className={r.cls} x={BX} y={y} width={w} height={BH} rx="4" />
            <text className="t-strong" x={BX + w + 8} y={y + 16}>{r.v.toFixed(2)}</text>
          </g>
        );
      })}
    </svg>
  );
}
