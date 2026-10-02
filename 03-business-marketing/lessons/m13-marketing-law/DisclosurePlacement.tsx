/** 경제적 이해관계 표시는 게시물 첫 부분에 둔다. 나쁜 표시와 고친 표시의 위치를 비교한다. */
type Cell = { text: string; cls: string };
const BAD: Cell[] = [
  { text: '제품 후기', cls: 'svg-box' },
  { text: '본문 … 더보기', cls: 'svg-box' },
  { text: '댓글: 광고료 받음', cls: 'svg-box-bad' },
];
const GOOD: Cell[] = [
  { text: '[광고] 제품 후기', cls: 'svg-box-good' },
  { text: '본문 … 더보기', cls: 'svg-box' },
  { text: '댓글: 어디서 사요?', cls: 'svg-box' },
];

const COL_W = 160;
const X = [8, 360 - 8 - COL_W];
const CELL_H = 40;
const CELL_GAP = 12;
const HEAD_Y = 20; // 열 제목 baseline
const FIRST_Y = 36;
const cellY = (i: number) => FIRST_Y + i * (CELL_H + CELL_GAP);
const lastBottom = cellY(2) + CELL_H;
const NOTE_Y = lastBottom + 24; // 상자와 결과 문장 사이 24
const STROKE = 2;
const VB_H = Math.ceil(NOTE_Y + 4 + STROKE / 2 + 8);

function Col({ x, title, titleCls, cells, note, noteCls }: { x: number; title: string; titleCls: string; cells: Cell[]; note: string; noteCls: string }) {
  return (
    <g>
      <text className={titleCls} x={x} y={HEAD_Y}>{title}</text>
      {cells.map((c, i) => (
        <g key={i}>
          <rect className={c.cls} x={x} y={cellY(i)} width={COL_W} height={CELL_H} rx="6" />
          <text className="t-sub" x={x + 12} y={cellY(i) + 25}>{c.text}</text>
        </g>
      ))}
      <text className={noteCls} x={x} y={NOTE_Y}>{note}</text>
    </g>
  );
}

export default function DisclosurePlacement() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="협찬 표시 위치 비교. 나쁜 표시는 댓글에 광고료를 받았다고 적어 게시물 첫 부분에서 보이지 않는다. 고친 표시는 제목 맨 앞에 광고라고 적는다.">
      <Col x={X[0]} title="나쁜 표시" titleCls="t-bad" cells={BAD} note="첫 화면에서 안 보인다" noteCls="t-bad" />
      <Col x={X[1]} title="고친 표시" titleCls="t-good" cells={GOOD} note="첫 화면에서 바로 보인다" noteCls="t-good" />
    </svg>
  );
}
