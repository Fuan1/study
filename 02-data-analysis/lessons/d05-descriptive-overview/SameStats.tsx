/** NIST e-Handbook 에 실린 Anscombe 네 자료(각 11쌍)를 그대로 그린다. 요약 통계는 아래에서 직접 계산해 aria-label 에 쓴다. */
const X123 = [10, 8, 13, 9, 11, 14, 6, 4, 12, 7, 5];
const SETS = [
  { title: '1. 직선과 흩어짐', x: X123, y: [8.04, 6.95, 7.58, 8.81, 8.33, 9.96, 7.24, 4.26, 10.84, 4.82, 5.68] },
  { title: '2. 곡선', x: X123, y: [9.14, 8.14, 8.74, 8.77, 9.26, 8.1, 6.13, 3.1, 9.13, 7.26, 4.74] },
  { title: '3. 이상값 하나', x: X123, y: [7.46, 6.77, 12.74, 7.11, 7.81, 8.84, 6.08, 5.39, 8.15, 6.42, 5.73] },
  { title: '4. 한 점이 좌우', x: [8, 8, 8, 8, 8, 8, 8, 19, 8, 8, 8], y: [6.58, 5.76, 7.71, 8.84, 8.47, 7.04, 5.25, 12.5, 5.56, 7.91, 6.89] },
];

const mean = (a: number[]) => a.reduce((s, v) => s + v, 0) / a.length;
const corr = (x: number[], y: number[]) => {
  const mx = mean(x);
  const my = mean(y);
  let sxy = 0;
  let sxx = 0;
  let syy = 0;
  x.forEach((v, i) => {
    sxy += (v - mx) * (y[i] - my);
    sxx += (v - mx) ** 2;
    syy += (y[i] - my) ** 2;
  });
  return sxy / Math.sqrt(sxx * syy);
};

const PW = 168;
const PH = 112;
const PAD = 12;
const XMIN = 3;
const XMAX = 20;
const YMIN = 2;
const YMAX = 14;
const ROW_Y = [26, 176]; // 패널 윗변
const COL_X = [8, 184];

export default function SameStats() {
  const vbH = ROW_Y[1] + PH + 1 + 8; // 둘째 줄 패널 아랫변 + 선 두께 절반 + 아래 여백
  const stats = SETS.map((s) => `x 평균 ${mean(s.x).toFixed(1)}, y 평균 ${mean(s.y).toFixed(1)}, 상관 ${corr(s.x, s.y).toFixed(2)}`).join(' / ');
  return (
    <svg viewBox={`0 0 360 ${vbH}`} role="img" aria-label={`Anscombe 네 자료의 산점도. 직선과 흩어짐, 곡선, 이상값 하나, 한 점이 좌우하는 모양이다. 요약 통계는 같다: ${stats}.`}>
      {SETS.map((s, k) => {
        const px = COL_X[k % 2];
        const py = ROW_Y[Math.floor(k / 2)];
        const sx = (v: number) => px + PAD + ((v - XMIN) / (XMAX - XMIN)) * (PW - 2 * PAD);
        const sy = (v: number) => py + PH - PAD - ((v - YMIN) / (YMAX - YMIN)) * (PH - 2 * PAD);
        const special = (i: number) => (k === 2 && i === 2) || (k === 3 && i === 7);
        return (
          <g key={s.title}>
            <text className="t-strong" x={px + 4} y={py - 10}>{s.title}</text>
            <rect className="svg-box" x={px} y={py} width={PW} height={PH} rx="8" />
            <line x1={sx(XMIN)} y1={sy(3 + 0.5 * XMIN)} x2={sx(XMAX)} y2={sy(3 + 0.5 * XMAX)} stroke="var(--muted)" strokeWidth="1.5" strokeDasharray="5 3" />
            {s.x.map((xv, i) => (
              <circle key={i} cx={sx(xv)} cy={sy(s.y[i])} r="3.5" fill={special(i) ? 'var(--warm)' : 'var(--accent)'} />
            ))}
          </g>
        );
      })}
    </svg>
  );
}
