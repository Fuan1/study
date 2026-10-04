/**
 * 출처 값: Cepeda 외 (2006) 표 1. 최종 회상 정답률(%)을 몰아서 학습한 조건과 나눠서 학습한 조건으로 비교.
 * 연구 수는 각 구간의 연구 건수다. 막대는 0에서 100% 축을 같은 비율로 그렸다.
 */
type Row = { label: string; massed: number; spaced: number };
const ROWS: Row[] = [
  { label: '전체 · 연구 254건', massed: 36.7, spaced: 47.3 },
  { label: '시험까지 1일 · 15건', massed: 32.9, spaced: 43.0 },
  { label: '2일에서 7일 · 9건', massed: 31.1, spaced: 45.4 },
  { label: '8일에서 30일 · 6건', massed: 32.8, spaced: 62.2 },
];

const BX = 8;
const SCALE = 3; // 1% = 3px, 100% = 300px
const BH = 20;
const TOP = 64;
const GROUP = 96;

export default function MassedSpaced() {
  const VB_H = TOP + (ROWS.length - 1) * GROUP + 24 + 2 * BH + 8 + 12;
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="몰아서 학습과 나눠서 학습의 최종 회상 정답률. 전체 평균은 36.7퍼센트 대 47.3퍼센트이고, 구간별로 나눠서 학습한 쪽이 높다.">
      <rect className="svg-box" x="8" y="7" width="14" height="14" rx="3" />
      <text className="t-sub" x="30" y="20">몰아서 학습</text>
      <rect className="svg-berg" x="8" y="27" width="14" height="14" rx="3" />
      <text className="t-sub" x="30" y="40">나눠서 학습</text>
      {ROWS.map((r, i) => {
        const y0 = TOP + i * GROUP;
        const bars = [
          { v: r.massed, cls: 'svg-box', top: y0 + 24 },
          { v: r.spaced, cls: 'svg-berg', top: y0 + 24 + BH + 8 },
        ];
        return (
          <g key={r.label}>
            <text className="t-strong" x="8" y={y0 + 14}>{r.label}</text>
            {bars.map((b) => (
              <g key={b.cls}>
                <rect className={b.cls} x={BX} y={b.top} width={b.v * SCALE} height={BH} rx="4" />
                <text className={b.cls === 'svg-berg' ? 't-strong' : 't-sub'} x={BX + b.v * SCALE + 8} y={b.top + 15}>{b.v.toFixed(1)}%</text>
              </g>
            ))}
          </g>
        );
      })}
    </svg>
  );
}
