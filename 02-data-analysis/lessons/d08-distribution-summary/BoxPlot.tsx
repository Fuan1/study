/** 가상 체류 시간 1,000세션(초). 아래 값은 python 으로 계산했고(분위수는 선형 보간), 위치는 여기서 계산한다. */
const Q1 = 20.75;
const MED = 39;
const Q3 = 83;
const MEAN = 68.9;
const WHISK_LO = 2; // 울타리 안 최솟값
const WHISK_HI = 175; // 울타리 안 최댓값
const OUTLIERS = [
  179, 180, 180, 180, 181, 183, 184, 185, 185, 185, 185, 186, 186, 187, 189, 193, 195, 195, 195, 196, 198, 199, 200, 202,
  210, 211, 212, 213, 213, 213, 215, 219, 233, 235, 243, 249, 251, 252, 260, 266, 268, 273, 277, 284, 285, 287, 296, 309,
  311, 312, 313, 321, 329, 333, 345, 356, 359, 367, 369, 371, 392, 428, 448, 458, 464, 485, 489, 518, 541, 553, 555, 561,
  571, 596, 632, 640, 644, 682,
];
const FENCE = Q3 + 1.5 * (Q3 - Q1); // 176.4
const X0 = 16;
const W = 328;
const MAXV = 700;
const xOf = (v: number) => X0 + (v / MAXV) * W;
const CY = 72; // 상자 중심
const BH = 36; // 상자 높이
const AXIS = 112;
const L0 = 184; // 범례 첫 줄 baseline
const GAP = 22;
const H = L0 + 3 * GAP + 6 + 12; // 마지막 줄 baseline + 아래 6 + 여백 12

export default function BoxPlot() {
  const legend = ['상자: Q1 20.8, 중앙값 39, Q3 83', '수염: 울타리 안 값 2에서 175', `점 ${OUTLIERS.length}개: 울타리 밖 값, 최대 682`, '마름모: 평균 68.9'];
  return (
    <svg viewBox={`0 0 360 ${H}`} role="img" aria-label="가상 체류 시간 1,000세션의 박스플롯. 상자는 21초에서 83초, 중앙값 39초이고 평균 68.9초는 중앙값보다 오른쪽이다. 위쪽 울타리 176초 밖에 점 78개가 있다.">
      <line x1={xOf(WHISK_LO)} y1={CY} x2={xOf(Q1)} y2={CY} stroke="var(--accent)" strokeWidth="1.5" />
      <line x1={xOf(Q3)} y1={CY} x2={xOf(WHISK_HI)} y2={CY} stroke="var(--accent)" strokeWidth="1.5" />
      <line x1={xOf(WHISK_HI)} y1={CY - 8} x2={xOf(WHISK_HI)} y2={CY + 8} stroke="var(--accent)" strokeWidth="1.5" />
      <rect className="svg-berg" x={xOf(Q1)} y={CY - BH / 2} width={xOf(Q3) - xOf(Q1)} height={BH} />
      <line x1={xOf(MED)} y1={CY - BH / 2} x2={xOf(MED)} y2={CY + BH / 2} stroke="var(--strong)" strokeWidth="2.5" />
      <polygon points={`${xOf(MEAN)},${CY - 6} ${xOf(MEAN) + 6},${CY} ${xOf(MEAN)},${CY + 6} ${xOf(MEAN) - 6},${CY}`} fill="var(--warm)" />
      {OUTLIERS.map((v, i) => (
        <circle key={i} cx={xOf(v)} cy={CY + ((i * 7) % 5 - 2) * 5} r="2.5" fill="var(--muted)" fillOpacity="0.8" />
      ))}
      <line x1={xOf(FENCE)} y1="34" x2={xOf(FENCE)} y2={AXIS - 8} stroke="var(--warm)" strokeWidth="1.5" strokeDasharray="4 3" />
      <text className="t-warm" x={xOf(FENCE) + 8} y="24">Q3 + 1.5×IQR = {Math.round(FENCE)}</text>
      <line x1={X0} y1={AXIS} x2={X0 + W} y2={AXIS} stroke="var(--line)" strokeWidth="1.5" />
      {[0, 200, 400, 600].map((v) => (
        <g key={v}>
          <line x1={xOf(v)} y1={AXIS} x2={xOf(v)} y2={AXIS + 5} stroke="var(--line)" strokeWidth="1.5" />
          <text className="t-sub" x={xOf(v)} y={AXIS + 22} textAnchor={v === 0 ? 'start' : 'middle'}>{v}</text>
        </g>
      ))}
      <text className="t-sub" x={X0 + W} y={AXIS + 22} textAnchor="end">초</text>
      <rect className="svg-berg" x={X0} y={L0 - 9} width="16" height="10" />
      <line x1={X0} y1={L0 + GAP - 4} x2={X0 + 16} y2={L0 + GAP - 4} stroke="var(--accent)" strokeWidth="1.5" />
      <circle cx={X0 + 8} cy={L0 + 2 * GAP - 4} r="3" fill="var(--muted)" />
      <polygon points={`${X0 + 8},${L0 + 3 * GAP - 10} ${X0 + 14},${L0 + 3 * GAP - 4} ${X0 + 8},${L0 + 3 * GAP + 2} ${X0 + 2},${L0 + 3 * GAP - 4}`} fill="var(--warm)" />
      {legend.map((t, i) => (
        <text key={t} className="t-sub" x={X0 + 28} y={L0 + i * GAP}>{t}</text>
      ))}
    </svg>
  );
}
