/** 12주 모니터링 달력. 주 15분, 월 60분, 분기 120분(가정)을 칸 수로 세어 합계를 계산한다. */
const WEEKS = 12;
const ROWS = [
  { title: '주간', min: 15, weeks: Array.from({ length: WEEKS }, (_, i) => i + 1) },
  { title: '월간', min: 60, weeks: [4, 8, 12] },
  { title: '분기', min: 120, weeks: [12] },
];
const total = ROWS.reduce((s, r) => s + r.min * r.weeks.length, 0);

const CW = 24;
const STEP = 28;
const X0 = 12;
const HEAD = 16; // 주 번호 baseline
const TITLE0 = 48; // 첫 행 제목 baseline
const ROWSTEP = 72;
const titleY = (i: number) => TITLE0 + i * ROWSTEP;
const cellY = (i: number) => titleY(i) + 10;
const lastCellBottom = cellY(ROWS.length - 1) + CW;
const TOTAL_Y = lastCellBottom + 36; // 합계 baseline (칸 아래 24px 이상)
const VB_H = Math.ceil(TOTAL_Y + 12);

export default function MonitorCycle() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label={`12주 모니터링 달력. ${ROWS.map((r) => `${r.title} ${r.min}분 ${r.weeks.length}회 ${r.min * r.weeks.length}분`).join(', ')}. 합계 ${total}분, ${total / 60}시간.`}>
      {Array.from({ length: WEEKS }, (_, i) => (
        <text key={i} className="t-sub" x={X0 + i * STEP + CW / 2} y={HEAD} textAnchor="middle">{i + 1}</text>
      ))}
      {ROWS.map((r, i) => (
        <g key={r.title}>
          <text className="t-strong" x="12" y={titleY(i)}>{`${r.title} ${r.min}분 × ${r.weeks.length} = ${r.min * r.weeks.length}분`}</text>
          {Array.from({ length: WEEKS }, (_, w) => (
            <rect key={w} className={r.weeks.includes(w + 1) ? 'svg-berg' : 'svg-box'} x={X0 + w * STEP} y={cellY(i)} width={CW} height={CW} rx="4" />
          ))}
        </g>
      ))}
      <text className="t-warm" x="12" y={TOTAL_Y}>{`분기 합계 ${total}분 (${total / 60}시간)`}</text>
    </svg>
  );
}
