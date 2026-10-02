/** 형태 예시(가상 값). 검증 구간의 평균 절대 오차를 기준선(직전 값) = 100 으로 맞춘 상대값이다. */
type Row = { label: string; v: number; base?: boolean };

const ROWS: Row[] = [
  { label: '직전 값', v: 100, base: true },
  { label: '계절 순진', v: 72 },
  { label: '통계 모델', v: 65 },
  { label: '복잡한 모델', v: 104 },
];

const BX = 150; // 막대 시작
const SCALE = 1.4; // 값 1 당 px. 값 100 = 140px
const BH = 24; // 막대 높이 36 미만이므로 숫자는 막대 밖
const Y0 = 46;
const ROW = 44;
const baseX = BX + 100 * SCALE;

export default function AccuracyBars() {
  const bottom = Y0 + (ROWS.length - 1) * ROW + BH;
  const lineEnd = bottom + 12;
  return (
    <svg viewBox="0 0 360 260" role="img" aria-label="가상 값으로 그린 오차 비교. 직전 값 기준선을 100으로 두면 계절 순진 72와 통계 모델 65는 기준선보다 작고, 복잡한 모델 104는 기준선보다 크다. 기준선보다 작아야 쓸 가치가 있다.">
      <text className="t-accent" x={baseX} y="22" textAnchor="middle">기준선 100</text>
      <line x1={baseX} y1="32" x2={baseX} y2={lineEnd} stroke="var(--muted)" strokeDasharray="4 3" />
      {ROWS.map((r, i) => {
        const y = Y0 + i * ROW;
        const fill = r.base ? 'var(--muted)' : r.v < 100 ? 'var(--good)' : 'var(--bad)';
        return (
          <g key={r.label}>
            <text className="t-strong" x="8" y={y + 17}>{r.label}</text>
            <rect x={BX} y={y} width={r.v * SCALE} height={BH} rx="4" fill={fill} fillOpacity="0.85" />
            <text x={BX + r.v * SCALE + 8} y={y + 17} fontSize="13">{r.v}</text>
          </g>
        );
      })}
      <text className="t-sub" x="180" y={lineEnd + 30} textAnchor="middle">100보다 작아야 기준선을 이긴 것</text>
    </svg>
  );
}
