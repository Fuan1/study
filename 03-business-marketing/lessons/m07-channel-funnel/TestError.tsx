// 전환 K건으로 잰 값의 95% 상대 오차 ≈ 1.96 ÷ √K(푸아송 근사). 측정값을 100으로 놓고 실제 값이 놓일 범위를 그린다.
const KS = [10, 30, 50, 100, 200];
const ROWS = KS.map((k) => {
  const e = 1.96 / Math.sqrt(k);
  return { k, lo: 100 * (1 - e), hi: 100 * (1 + e) };
});

const X0 = 12;
const TW = 336;
const MAX = 200;
const BH = 16;
const PITCH = 62;
const Y0 = 8;
const rowY = (i: number) => Y0 + i * PITCH;
const LAST_BOTTOM = rowY(ROWS.length - 1) + 26 + BH;
const DIV = LAST_BOTTOM + 24;
const VB_H = DIV + 44 + 4 + 8;
const sx = (v: number) => X0 + (v / MAX) * TW;

export default function TestError() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label={`전환 수별 95퍼센트 범위. 측정값을 100으로 볼 때 ${ROWS.map((r) => `전환 ${r.k}건이면 ${Math.round(r.lo)}에서 ${Math.round(r.hi)}`).join(', ')}.`}>
      {ROWS.map((r, i) => {
        const y = rowY(i);
        return (
          <g key={r.k}>
            <text className="t-strong" x={X0} y={y + 14}>전환 {r.k}건</text>
            <text className="t-sub" x={X0 + TW} y={y + 14} textAnchor="end">{Math.round(r.lo)}에서 {Math.round(r.hi)}</text>
            <rect className="svg-box" x={X0} y={y + 26} width={TW} height={BH} rx="3" />
            <rect x={sx(r.lo)} y={y + 26} width={sx(r.hi) - sx(r.lo)} height={BH} rx="2" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1.5" />
            <line x1={sx(100)} y1={y + 22} x2={sx(100)} y2={y + 26 + BH + 4} stroke="var(--muted)" />
          </g>
        );
      })}
      <line x1="8" y1={DIV} x2="352" y2={DIV} stroke="var(--line)" />
      <text className="t-sub" x={X0} y={DIV + 24}>가운데 세로선이 측정값 100</text>
      <text className="t-sub" x={X0} y={DIV + 44}>범위 = 100 ± 196 ÷ √K, 막대 전체가 0에서 200</text>
    </svg>
  );
}
