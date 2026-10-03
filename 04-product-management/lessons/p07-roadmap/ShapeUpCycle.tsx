/** Shape Up 8장(The Betting Table)의 값: 사이클 6주, 휴지기 2주. 휴지기에 베팅 회의가 열려 다음 사이클 하나를 정한다. */
const WEEK = 22;
const X0 = 26;
const WORK = 6;
const COOL = 2;
const BAR_Y = 40;
const BAR_H = 36;
const BAR_B = BAR_Y + BAR_H;
const x2 = X0 + WORK * WEEK; // 휴지기 시작
const x3 = x2 + COOL * WEEK; // 다음 사이클 시작
const coolMid = x2 + (COOL * WEEK) / 2;
const ARROW_FROM = BAR_B + 40;
const ARROW_TO = BAR_B + 8;
const LABEL_Y = ARROW_FROM + 28;
const VB_H = LABEL_Y + 22 + 16;

export default function ShapeUpCycle() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="Shape Up 의 사이클. 6주 작업, 2주 휴지기가 이어지고 휴지기의 베팅 회의가 다음 6주 사이클 하나만 정한다.">
      <defs>
        <marker id="sucar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      <text className="t-strong" x={X0 + (WORK * WEEK) / 2} y="26" textAnchor="middle">6주 작업</text>
      <text className="t-strong" x={coolMid} y="26" textAnchor="middle">휴지 2주</text>
      <text className="t-sub" x={x3 + (WORK * WEEK) / 2} y="26" textAnchor="middle">다음 6주</text>
      <rect className="svg-berg" x={X0} y={BAR_Y} width={WORK * WEEK} height={BAR_H} rx="4" />
      {Array.from({ length: WORK - 1 }, (_, i) => (
        <line key={i} x1={X0 + (i + 1) * WEEK} y1={BAR_Y} x2={X0 + (i + 1) * WEEK} y2={BAR_B} stroke="var(--accent)" strokeWidth="1" opacity="0.5" />
      ))}
      <rect className="svg-box" x={x2} y={BAR_Y} width={COOL * WEEK} height={BAR_H} rx="4" />
      <rect className="svg-box" x={x3} y={BAR_Y} width={WORK * WEEK} height={BAR_H} rx="4" strokeDasharray="5 3" />
      <line className="svg-flow" x1={coolMid} y1={ARROW_FROM} x2={coolMid} y2={ARROW_TO} markerEnd="url(#sucar)" />
      <text className="t-strong" x={coolMid} y={LABEL_Y} textAnchor="middle">베팅 회의</text>
      <text className="t-sub" x={coolMid} y={LABEL_Y + 22} textAnchor="middle">다음 사이클 하나만 정한다</text>
    </svg>
  );
}
