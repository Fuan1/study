/** 동의 화면: 한 덩어리로 미리 체크한 화면과 항목마다 따로 묻는 화면을 비교한다. */
const LEFT_X = 8;
const LEFT_W = 148;
const RIGHT_X = LEFT_X + LEFT_W + 24; // 두 묶음 사이 24
const RIGHT_W = 360 - 8 - RIGHT_X;

const HEAD_Y = 20;
const FIRST_Y = 36;
const ROW_H = 40;
const ROW_GAP = 12;
const rowY = (i: number) => FIRST_Y + i * (ROW_H + ROW_GAP);
const RIGHT_ROWS = ['(필수) 수집·이용', '(선택) 마케팅 수신', '(선택) 제3자 제공'];

const LEFT_H = 66;
const leftBottom = FIRST_Y + LEFT_H;
const rightBottom = rowY(RIGHT_ROWS.length - 1) + ROW_H;
const NOTE_Y = rightBottom + 24;
const STROKE = 2;
const VB_H = Math.ceil(NOTE_Y + 4 + STROKE / 2 + 8);

const Check = ({ x, y, on }: { x: number; y: number; on: boolean }) => (
  <g>
    <rect className="svg-box" x={x} y={y} width="16" height="16" rx="3" />
    {on && <path className="svg-flow" d={`M${x + 3},${y + 8} l3.5,3.5 l6,-7`} strokeWidth="2" />}
  </g>
);

export default function ConsentScreens() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="동의 화면 비교. 나쁜 화면은 필수와 마케팅과 제3자 제공을 모두 동의 하나로 묶고 미리 체크해 둔다. 고친 화면은 수집 이용, 마케팅 수신, 제3자 제공을 각각 체크 상자로 따로 묻고 선택 항목은 비워 둔다.">
      <text className="t-bad" x={LEFT_X} y={HEAD_Y}>나쁜 화면</text>
      <rect className="svg-box-bad" x={LEFT_X} y={FIRST_Y} width={LEFT_W} height={LEFT_H} rx="8" />
      <Check x={LEFT_X + 12} y={FIRST_Y + 25} on />
      <text className="t-strong" x={LEFT_X + 36} y={FIRST_Y + 27}>모두 동의</text>
      <text className="t-sub" x={LEFT_X + 36} y={FIRST_Y + 49}>마케팅·제공 포함</text>
      <text className="t-bad" x={LEFT_X} y={leftBottom + 24}>미리 체크, 한 덩어리</text>
      <text className="t-bad" x={LEFT_X} y={leftBottom + 44}>선택을 거를 수 없다</text>

      <text className="t-good" x={RIGHT_X} y={HEAD_Y}>고친 화면</text>
      {RIGHT_ROWS.map((t, i) => (
        <g key={t}>
          <rect className="svg-box-good" x={RIGHT_X} y={rowY(i)} width={RIGHT_W} height={ROW_H} rx="6" />
          <Check x={RIGHT_X + 12} y={rowY(i) + 12} on={false} />
          <text className="t-sub" x={RIGHT_X + 36} y={rowY(i) + 25}>{t}</text>
        </g>
      ))}
      <text className="t-good" x={RIGHT_X} y={NOTE_Y}>항목마다 따로 묻는다</text>
    </svg>
  );
}
