/** 이론 분포 세 개(정규, 로그정규, 두 정규의 혼합)의 곡선과 중앙값·평균을 식에서 직접 계산한다. 측정 자료가 아니라 형태 예시다. */
const erf = (x: number) => {
  // Abramowitz & Stegun 7.1.26 근사(오차 1.5e-7 이하)
  const s = Math.sign(x);
  const a = Math.abs(x);
  const t = 1 / (1 + 0.3275911 * a);
  const y = 1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-a * a);
  return s * y;
};
const normPdf = (x: number, m: number, sd: number) => Math.exp(-0.5 * ((x - m) / sd) ** 2) / (sd * Math.sqrt(2 * Math.PI));
const normCdf = (x: number, m: number, sd: number) => 0.5 * (1 + erf((x - m) / (sd * Math.SQRT2)));

type Shape = { title: string; note: (mean: number, median: number) => string; lo: number; hi: number; pdf: (x: number) => number; cdf: (x: number) => number; mean: number };

const MIX = { w: 0.6, m1: 0, m2: 3, sd: 0.6 };
const SHAPES: Shape[] = [
  {
    title: '대칭, 봉우리 하나', lo: -4, hi: 4, mean: 0,
    pdf: (x) => normPdf(x, 0, 1), cdf: (x) => normCdf(x, 0, 1),
    note: () => '평균과 중앙값이 같은 자리',
  },
  {
    title: '오른쪽 꼬리가 긴 모양', lo: 0, hi: 6, mean: Math.exp(0.5), // 로그정규(mu 0, sigma 1)의 평균 exp(sigma^2 / 2)
    pdf: (x) => (x <= 0 ? 0 : Math.exp(-0.5 * Math.log(x) ** 2) / (x * Math.sqrt(2 * Math.PI))),
    cdf: (x) => (x <= 0 ? 0 : normCdf(Math.log(x), 0, 1)),
    note: (m, md) => `평균 ${m.toFixed(2)}가 중앙값 ${md.toFixed(2)}보다 크다`,
  },
  {
    title: '봉우리가 둘', lo: -2, hi: 5.5, mean: MIX.w * MIX.m1 + (1 - MIX.w) * MIX.m2,
    pdf: (x) => MIX.w * normPdf(x, MIX.m1, MIX.sd) + (1 - MIX.w) * normPdf(x, MIX.m2, MIX.sd),
    cdf: (x) => MIX.w * normCdf(x, MIX.m1, MIX.sd) + (1 - MIX.w) * normCdf(x, MIX.m2, MIX.sd),
    note: (m) => `평균 ${m.toFixed(2)}은 자료가 드문 빈 곳`,
  },
];

const X0 = 16;
const X1 = 344;
const CURVE_H = 54;
const ROW0 = 44; // 첫 줄 윗변
const PITCH = 132;
const AXIS = 108; // 줄 윗변에서 x축까지

const median = (s: Shape) => {
  let lo = s.lo;
  let hi = s.hi;
  for (let i = 0; i < 60; i++) {
    const mid = (lo + hi) / 2;
    if (s.cdf(mid) < 0.5) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
};

export default function ShapeTypes() {
  const vbH = ROW0 + 2 * PITCH + AXIS + 1 + 12; // 마지막 x축 + 선 두께 절반 + 아래 여백
  return (
    <svg viewBox={`0 0 360 ${vbH}`} role="img" aria-label="분포 모양 세 가지에서 중앙값과 평균의 위치. 대칭이면 같은 자리, 오른쪽 꼬리가 길면 평균이 중앙값보다 오른쪽, 봉우리가 둘이면 평균이 두 봉우리 사이 빈 곳에 놓인다.">
      <line x1="16" y1="12" x2="40" y2="12" stroke="var(--strong)" strokeWidth="2" />
      <text className="t-sub" x="48" y="16">중앙값</text>
      <line x1="120" y1="12" x2="144" y2="12" stroke="var(--warm)" strokeWidth="2" strokeDasharray="5 3" />
      <text className="t-sub" x="152" y="16">평균</text>
      {SHAPES.map((s, i) => {
        const top = ROW0 + i * PITCH;
        const base = top + AXIS;
        const sx = (v: number) => X0 + ((v - s.lo) / (s.hi - s.lo)) * (X1 - X0);
        const N = 160;
        const xs = Array.from({ length: N + 1 }, (_, k) => s.lo + ((s.hi - s.lo) * k) / N);
        const peak = Math.max(...xs.map(s.pdf));
        const pts = xs.map((x) => `${sx(x).toFixed(1)},${(base - (s.pdf(x) / peak) * CURVE_H).toFixed(1)}`);
        const md = median(s);
        return (
          <g key={s.title}>
            <text className="t-strong" x="16" y={top + 16}>{s.title}</text>
            <text className="t-sub" x="16" y={top + 36}>{s.note(s.mean, md)}</text>
            <polygon points={`${sx(s.lo)},${base} ${pts.join(' ')} ${sx(s.hi)},${base}`} fill="var(--accent-soft)" stroke="var(--muted)" strokeWidth="1.5" />
            <line x1={sx(md)} y1={base - CURVE_H - 4} x2={sx(md)} y2={base} stroke="var(--strong)" strokeWidth="2" />
            <line x1={sx(s.mean)} y1={base - CURVE_H - 4} x2={sx(s.mean)} y2={base} stroke="var(--warm)" strokeWidth="2" strokeDasharray="5 3" />
            <line x1={X0} y1={base} x2={X1} y2={base} stroke="var(--line)" strokeWidth="1.5" />
          </g>
        );
      })}
    </svg>
  );
}
