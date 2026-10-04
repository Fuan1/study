/**
 * 출처 값: Cepeda 외 (2008). 복습 뒤 시험까지의 기간(RI)별로 회상 점수가 가장 높았던 복습 간격을 보간한 추정치.
 * 기간 7, 35, 70, 350일에서 약 3, 8, 12, 27일이고 RI 대비 43, 23, 17, 8%다.
 * 각 줄은 첫 학습에서 시험까지를 같은 폭으로 줄여 그렸다. 줄마다 축척이 다르다.
 */
type Row = { ri: number; gap: number };
const ROWS: Row[] = [
  { ri: 7, gap: 3 },
  { ri: 35, gap: 8 },
  { ri: 70, gap: 12 },
  { ri: 350, gap: 27 },
];

const X0 = 16;
const X1 = 344;
const TOP = 60;
const PITCH = 96;
const LINE_DY = 28;

export default function OptimalGap() {
  const VB_H = TOP + (ROWS.length - 1) * PITCH + LINE_DY + 6 + 8 + 14 + 14;
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="시험까지 7일이면 복습은 첫 학습 약 3일 뒤, 35일이면 약 8일 뒤, 70일이면 약 12일 뒤, 350일이면 약 27일 뒤가 가장 좋았다. 시험이 멀수록 비율은 작아진다.">
      <circle className="svg-box" cx="14" cy="14" r="6" />
      <text className="t-sub" x="26" y="19">첫 학습</text>
      <circle className="svg-berg" cx="108" cy="14" r="6" />
      <text className="t-sub" x="120" y="19">복습</text>
      <rect className="svg-box-key" x="184" y="8" width="12" height="12" rx="2" />
      <text className="t-sub" x="204" y="19">시험</text>
      {ROWS.map((r, i) => {
        const y0 = TOP + i * PITCH;
        const ly = y0 + LINE_DY;
        const rx = X0 + ((X1 - X0) * r.gap) / (r.gap + r.ri);
        const pct = Math.round((r.gap / r.ri) * 100);
        return (
          <g key={r.ri}>
            <text className="t-strong" x="8" y={y0}>복습 뒤 {r.ri}일에 시험</text>
            <line className="svg-flow" x1={X0} y1={ly} x2={X1} y2={ly} />
            <circle className="svg-box" cx={X0} cy={ly} r="6" />
            <circle className="svg-berg" cx={rx} cy={ly} r="6" />
            <rect className="svg-box-key" x={X1 - 6} y={ly - 6} width="12" height="12" rx="2" />
            <text className="t-sub" x={Math.min(rx - 6, 220)} y={ly + 28}>복습 약 {r.gap}일 뒤 · {pct}%</text>
          </g>
        );
      })}
    </svg>
  );
}
