/** 시장 규모를 두 방향으로 센다. 출발이 반대이고 같은 정의의 연 지출에서 만난다. 숫자 없음. */
type Box = { name: string; sub: string };

const COLS: { head: string; x: number; boxes: Box[] }[] = [
  {
    head: '하향식',
    x: 8,
    boxes: [
      { name: '산업 전체 수치', sub: '통계의 큰 금액' },
      { name: '범위로 줄임', sub: '지역·품목 비중' },
      { name: '연 지출 추정', sub: '하향식 값' },
    ],
  },
  {
    head: '상향식',
    x: 192,
    boxes: [
      { name: '단위 시장 고객 수', sub: '세어 볼 수 있는 곳' },
      { name: '연 지출을 곱함', sub: '횟수 × 단가' },
      { name: '연 지출 추정', sub: '상향식 값' },
    ],
  },
];

const W = 160;
const H = 66;
const GAP = 30;
const TOP = 36;
const rowY = (i: number) => TOP + i * (H + GAP);
const MERGE_Y = rowY(2) + H + GAP;
// 마지막 상자 아랫변 + 선 두께 절반 + 아래 여백 8
const VB_H = Math.ceil(MERGE_Y + H + 0.75 + 8);

export default function DirectionFlow() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="시장 규모를 세는 두 방향. 하향식은 산업 전체 수치에서 범위로 줄여 연 지출을 추정하고, 상향식은 단위 시장의 고객 수에 연 지출을 곱해 추정한다. 두 값은 같은 정의로 맞춰 비교한다.">
      <defs>
        <marker id="df-ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      {COLS.map((c) => (
        <g key={c.head}>
          <text className="t-strong" x={c.x} y="22">{c.head}</text>
          {c.boxes.map((b, i) => (
            <g key={b.name}>
              <rect className={i === 2 ? 'svg-box-key' : 'svg-box'} x={c.x} y={rowY(i)} width={W} height={H} rx="8" />
              <text className="t-strong" x={c.x + 14} y={rowY(i) + 29}>{b.name}</text>
              <text className="t-sub" x={c.x + 14} y={rowY(i) + 50}>{b.sub}</text>
              <line className="svg-flow" x1={c.x + W / 2} y1={rowY(i) + H + 5} x2={c.x + W / 2} y2={(i < 2 ? rowY(i + 1) : MERGE_Y) - 5} markerEnd="url(#df-ar)" />
            </g>
          ))}
        </g>
      ))}
      <rect className="svg-tip" x="8" y={MERGE_Y} width="344" height={H} rx="8" />
      <text className="t-warm" x="22" y={MERGE_Y + 29}>같은 정의로 맞춰 비교</text>
      <text className="t-sub" x="22" y={MERGE_Y + 50}>대상, 지역, 연도, 세금 포함 여부</text>
    </svg>
  );
}
