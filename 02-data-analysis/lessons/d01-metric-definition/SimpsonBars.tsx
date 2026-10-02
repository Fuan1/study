/** 같은 데이터를 전체와 구간으로 나눠 본 전환율. 방문 수와 구매 수는 가정이며 코드로 계산한다. */
const DATA = {
  A: { 모바일: [800, 24], 데스크톱: [200, 24] },
  B: { 모바일: [200, 5], 데스크톱: [800, 88] },
} as const;
type V = keyof typeof DATA;
const rate = (n: number, b: number) => (100 * b) / n;
const total = (v: V) => {
  const d = Object.values(DATA[v]);
  return rate(d.reduce((s, x) => s + x[0], 0), d.reduce((s, x) => s + x[1], 0));
};

const GROUPS = [
  { title: '전체', note: 'B가 높다', cls: 't-bad', A: total('A'), B: total('B') },
  { title: '모바일', note: 'A가 높다', cls: 't-good', A: rate(...DATA.A.모바일), B: rate(...DATA.B.모바일) },
  { title: '데스크톱', note: 'A가 높다', cls: 't-good', A: rate(...DATA.A.데스크톱), B: rate(...DATA.B.데스크톱) },
];

// 여백 기준: 제목 baseline 위 12, 제목과 첫 막대 사이 12, 막대 높이 22, 막대 간격 8, 묶음 간격 24.
const BAR_X = 36;
const SCALE = 17; // 1% 당 px. 최대 12% = 204px
const BAR_H = 22;
const GROUP_H = 76;
const GROUP_GAP = 24;
const gy = (i: number) => 8 + i * (GROUP_H + GROUP_GAP);
const LAST_BOTTOM = gy(GROUPS.length - 1) + GROUP_H;
const VB_H = LAST_BOTTOM + 1 + 8;

export default function SimpsonBars() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="가정한 두 안의 전환율. 전체는 A 4.8퍼센트, B 9.3퍼센트로 B가 높다. 모바일은 A 3.0, B 2.5, 데스크톱은 A 12.0, B 11.0으로 두 구간 모두 A가 높다.">
      {GROUPS.map((g, i) => (
        <g key={g.title}>
          <text className={g.cls} x="8" y={gy(i) + 12}>{g.title}: {g.note}</text>
          {(['A', 'B'] as const).map((v, k) => {
            const top = gy(i) + 24 + k * (BAR_H + 8);
            const w = g[v] * SCALE;
            return (
              <g key={v}>
                <text className="t-strong" x="8" y={top + 16}>{v}</text>
                <rect className={v === 'A' ? 'svg-berg' : 'svg-tip'} x={BAR_X} y={top} width={w} height={BAR_H} rx="3" />
                <text className="t-sub" x={BAR_X + w + 8} y={top + 16}>{g[v].toFixed(1)}%</text>
              </g>
            );
          })}
        </g>
      ))}
    </svg>
  );
}
