/** Anscombe(1973)의 공개 자료 네 벌. 값은 원 자료이며 가상 예시가 아니다. 상관계수와 회귀선은 코드로 계산한다. */
const X123 = [10, 8, 13, 9, 11, 14, 6, 4, 12, 7, 5];
const SETS = [
  { name: '자료 1', x: X123, y: [8.04, 6.95, 7.58, 8.81, 8.33, 9.96, 7.24, 4.26, 10.84, 4.82, 5.68] },
  { name: '자료 2', x: X123, y: [9.14, 8.14, 8.74, 8.77, 9.26, 8.1, 6.13, 3.1, 9.13, 7.26, 4.74] },
  { name: '자료 3', x: X123, y: [7.46, 6.77, 12.74, 7.11, 7.81, 8.84, 6.08, 5.39, 8.15, 6.42, 5.73] },
  { name: '자료 4', x: [8, 8, 8, 8, 8, 8, 8, 19, 8, 8, 8], y: [6.58, 5.76, 7.71, 8.84, 8.47, 7.04, 5.25, 12.5, 5.56, 7.91, 6.89] },
];

const mean = (a: number[]) => a.reduce((s, v) => s + v, 0) / a.length;
function fit(x: number[], y: number[]) {
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
  const slope = sxy / sxx;
  return { r: sxy / Math.sqrt(sxx * syy), slope, icpt: my - slope * mx };
}

// 칸 폭 168, 칸 사이 8. 제목 baseline 16, 틀 y 26부터 높이 104, 점은 틀 안쪽 10px 여백.
const CW = 168;
const PH = 104;
const PAD = 10;
const PITCH = 154; // 틀 아랫변과 다음 제목 사이 24px 이상
const XMIN = 3;
const XMAX = 20;
const YMIN = 3;
const YMAX = 14;
// 이상값 표시: 자료 3의 12.74, 자료 4의 (19, 12.5)
const isOdd = (set: number, i: number) => (set === 2 && i === 2) || (set === 3 && i === 7);

export default function AnscombeQuartet() {
  const height = 8 + PITCH + 26 + PH + 8;
  return (
    <svg viewBox={`0 0 360 ${height}`} role="img" aria-label="Anscombe의 네 자료를 나란히 그린 산점도. 상관계수는 네 벌 모두 약 0.82이지만 자료 1은 직선, 자료 2는 곡선, 자료 3은 이상값 하나, 자료 4는 점 하나가 만든 기울기다.">
      {SETS.map((s, k) => {
        const ox = 8 + (k % 2) * (CW + 8);
        const oy = 8 + Math.floor(k / 2) * PITCH;
        const { r, slope, icpt } = fit(s.x, s.y);
        const px = (v: number) => ox + PAD + ((v - XMIN) / (XMAX - XMIN)) * (CW - 2 * PAD);
        const py = (v: number) => oy + 26 + PH - PAD - ((v - YMIN) / (YMAX - YMIN)) * (PH - 2 * PAD);
        return (
          <g key={s.name}>
            <text className="t-strong" x={ox} y={oy + 16}>{s.name}</text>
            <text className="t-sub" x={ox + CW} y={oy + 16} textAnchor="end">r = {r.toFixed(2)}</text>
            <rect className="svg-box" x={ox} y={oy + 26} width={CW} height={PH} rx="6" />
            <line x1={px(XMIN)} y1={py(icpt + slope * XMIN)} x2={px(XMAX)} y2={py(icpt + slope * XMAX)} stroke="var(--muted)" strokeWidth="1.5" />
            {s.x.map((xv, i) => (
              <circle key={i} cx={px(xv)} cy={py(s.y[i])} r="3.5" fill={isOdd(k, i) ? 'var(--bad)' : 'var(--accent)'} />
            ))}
          </g>
        );
      })}
    </svg>
  );
}
