/** 메시지 하우스의 칸 구조. 핵심 약속 하나, 받치는 기둥, 기둥마다 증거. 내용 값은 없다. */
const TOP = 8;
const H = 68;
const GAP = 20;
const COL_GAP = 10;
const PILLAR_W = (344 - 2 * COL_GAP) / 3;
const ROOF_Y = TOP;
const PILLAR_Y = ROOF_Y + H + GAP;
const BASE_Y = PILLAR_Y + H + GAP;
const STROKE = 1.5;
const VB_H = Math.ceil(BASE_Y + H + STROKE / 2 + 8);

export default function MessageHouse() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="메시지 하우스. 위에 핵심 약속 하나, 가운데에 그것을 받치는 혜택 기둥 세 개, 아래에 기둥마다 증거를 둔다.">
      <rect className="svg-box-key" x="8" y={ROOF_Y} width="344" height={H} rx="8" />
      <text className="t-strong" x="22" y={ROOF_Y + 29}>핵심 약속</text>
      <text className="t-sub" x="22" y={ROOF_Y + 51}>한 문장. 일과 차이를 담는다</text>
      {[1, 2, 3].map((n, i) => {
        const x = 8 + i * (PILLAR_W + COL_GAP);
        return (
          <g key={n}>
            <rect className="svg-box" x={x} y={PILLAR_Y} width={PILLAR_W} height={H} rx="8" />
            <text className="t-strong" x={x + 14} y={PILLAR_Y + 29}>기둥 {n}</text>
            <text className="t-sub" x={x + 14} y={PILLAR_Y + 51}>혜택 하나</text>
          </g>
        );
      })}
      <rect className="svg-berg" x="8" y={BASE_Y} width="344" height={H} rx="8" />
      <text className="t-strong" x="22" y={BASE_Y + 29}>증거</text>
      <text className="t-sub" x="22" y={BASE_Y + 51}>기둥마다 하나 이상. 출처와 기간</text>
    </svg>
  );
}
