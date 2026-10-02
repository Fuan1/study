/** 사용자 holdout 설계의 순서. 배정 전에 나누고, 같은 기간의 결과를 처치군 전체 대 대조군 전체로 비교한다. 숫자 없음. */
const H = 66;
const GAP = 44;
const BW = 164;
const LX = 8;
const RX = 360 - 8 - BW;
const ROW = [8, 8 + H + GAP, 8 + 2 * (H + GAP)];
const STROKE = 1.5;
const VB_H = Math.ceil(ROW[2] + H + STROKE / 2 + 12);
const MARK = 'm12-holdout-ar';

export default function HoldoutFlow() {
  const cxL = LX + BW / 2;
  const cxR = RX + BW / 2;
  const arrow = (x: number, y1: number, y2: number) => (
    <line className="svg-flow" x1={x} y1={y1 + 6} x2={x} y2={y2 - 6} markerEnd={`url(#${MARK})`} />
  );
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="사용자 holdout 순서. 대상 사용자를 배정 전에 무작위로 처치군과 대조군으로 나눈다. 처치군은 광고를 볼 수 있고 대조군은 광고 대상에서 제외한다. 같은 기간의 결과를 처치군 전체와 대조군 전체로 비교한 차이가 증분이다.">
      <defs>
        <marker id={MARK} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      <rect className="svg-box" x="8" y={ROW[0]} width="344" height={H} rx="8" />
      <text className="t-strong" x="22" y={ROW[0] + 29}>대상 사용자 전체</text>
      <text className="t-sub" x="22" y={ROW[0] + 50}>시작 전에 조건을 고정하고 무작위로 나눔</text>

      {arrow(cxL, ROW[0] + H, ROW[1])}
      {arrow(cxR, ROW[0] + H, ROW[1])}

      <rect className="svg-berg" x={LX} y={ROW[1]} width={BW} height={H} rx="8" />
      <text className="t-strong" x={LX + 14} y={ROW[1] + 29}>처치군</text>
      <text className="t-sub" x={LX + 14} y={ROW[1] + 50}>광고를 볼 수 있음</text>
      <rect className="svg-box" x={RX} y={ROW[1]} width={BW} height={H} rx="8" />
      <text className="t-strong" x={RX + 14} y={ROW[1] + 29}>대조군</text>
      <text className="t-sub" x={RX + 14} y={ROW[1] + 50}>광고 대상에서 제외</text>

      {arrow(cxL, ROW[1] + H, ROW[2])}
      {arrow(cxR, ROW[1] + H, ROW[2])}

      <rect className="svg-box-key" x="8" y={ROW[2]} width="344" height={H} rx="8" />
      <text className="t-strong" x="22" y={ROW[2] + 29}>같은 기간 결과의 차이 = 증분</text>
      <text className="t-sub" x="22" y={ROW[2] + 50}>처치군 전체 대 대조군 전체로 비교</text>
    </svg>
  );
}
