/** 가정한 전환율 12.0% 에서 표본 수 n 별 95% 구간(Wilson 식)을 계산해 그린다. n 이 4배면 폭이 약 절반이다. */
const Z = 1.959964;
const P = 0.12;
const NS = [100, 400, 1600, 6400];

function wilson(p: number, n: number) {
  const d = 1 + (Z * Z) / n;
  const c = (p + (Z * Z) / (2 * n)) / d;
  const h = (Z * Math.sqrt((p * (1 - p)) / n + (Z * Z) / (4 * n * n))) / d;
  return { lo: (c - h) * 100, hi: (c + h) * 100 };
}

// 여백 기준: 왼쪽 글자 열 x 8, 축 x 88에서 344(25%), 행 높이 56, 두 줄 글자 baseline 간격 20.
const AX0 = 88;
const AX1 = 344;
const MAX = 25;
const xOf = (pct: number) => AX0 + (pct / MAX) * (AX1 - AX0);
const ROW = 56;
const Y0 = 8;
const GRID_BOTTOM = Y0 + NS.length * ROW - 6; // 격자 아랫끝
const TICK_Y = GRID_BOTTOM + 22; // 눈금 글자 baseline (격자 끝에서 글자 윗부분까지 약 11)
const VB_H = Math.ceil(TICK_Y + 4 + 8);
const TICKS = [0, 5, 10, 15, 20, 25];

export default function IntervalWidth() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="전환율 12.0퍼센트에서 표본 수가 100, 400, 1600, 6400일 때 95퍼센트 구간. 표본이 4배가 될 때마다 구간 폭이 약 절반으로 줄어든다.">
      {TICKS.map((t) => (
        <line key={t} x1={xOf(t)} y1={Y0} x2={xOf(t)} y2={GRID_BOTTOM} stroke="var(--line)" strokeWidth="1" />
      ))}
      {TICKS.map((t) => (
        <text key={t} className="t-sub" x={xOf(t)} y={TICK_Y} textAnchor={t === 0 ? 'start' : t === MAX ? 'end' : 'middle'}>{t}%</text>
      ))}
      {NS.map((n, i) => {
        const { lo, hi } = wilson(P, n);
        const y = Y0 + i * ROW;
        const cy = y + 22;
        return (
          <g key={n}>
            <text className="t-strong" x="8" y={y + 18}>n={n.toLocaleString('en-US')}</text>
            <text className="t-sub" x="8" y={y + 38}>{lo.toFixed(1)}-{hi.toFixed(1)}</text>
            <rect x={xOf(lo)} y={cy - 6} width={xOf(hi) - xOf(lo)} height="12" rx="6" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1.5" />
            <circle cx={xOf(P * 100)} cy={cy} r="4" fill="var(--strong)" />
          </g>
        );
      })}
    </svg>
  );
}
