/** 사용자 holdout 설계: 배정 전에 나누고, 같은 기간의 구매율 차이를 증분으로 읽는다. 숫자는 가상이며 코드로 계산한다. */
const N1 = 200000; // 처치군(광고 노출 가능)
const N0 = 50000; // 대조군(광고 제외)
const C1 = 4800;
const C0 = 1080;
const P1 = C1 / N1;
const P0 = C0 / N0;
const D = P1 - P0;
const SE = Math.sqrt((P1 * (1 - P1)) / N1 + (P0 * (1 - P0)) / N0);
const LO = D - 1.96 * SE;
const HI = D + 1.96 * SE;
const fmt = (n: number) => n.toLocaleString('en-US');
const pct = (x: number, d = 2) => `${(x * 100).toFixed(d)}%`;

const H = 66;
const GAP = 44;
const BW = 160;
const LX = 8;
const RX = 360 - 8 - BW;
const ROW = [8, 8 + H + GAP, 8 + 2 * (H + GAP)];
const STROKE = 1.5;
const VB_H = Math.ceil(ROW[2] + H + STROKE / 2 + 12);
const MARK = 'm12-holdout-ar';

export default function HoldoutFlow() {
  const total = N1 + N0;
  const cxL = LX + BW / 2;
  const cxR = RX + BW / 2;
  const arrow = (x: number, y1: number, y2: number) => (
    <line className="svg-flow" x1={x} y1={y1 + 6} x2={x} y2={y2 - 6} markerEnd={`url(#${MARK})`} />
  );
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label={`대상 사용자 ${fmt(total)}명을 배정 전에 무작위로 처치군 ${fmt(N1)}명과 대조군 ${fmt(N0)}명으로 나눈다. 처치군은 광고를 볼 수 있고 대조군은 광고에서 제외한다. 같은 기간 구매율은 ${pct(P1)} 대 ${pct(P0)}이고 차이 ${pct(D)}p가 증분이다.`}>
      <defs>
        <marker id={MARK} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      <rect className="svg-box" x="8" y={ROW[0]} width="344" height={H} rx="8" />
      <text className="t-strong" x="22" y={ROW[0] + 29}>대상 사용자 {fmt(total)}명</text>
      <text className="t-sub" x="22" y={ROW[0] + 50}>배정 전에 조건 고정, 무작위 80 대 20</text>

      {arrow(cxL, ROW[0] + H, ROW[1])}
      {arrow(cxR, ROW[0] + H, ROW[1])}

      <rect className="svg-berg" x={LX} y={ROW[1]} width={BW} height={H} rx="8" />
      <text className="t-strong" x={LX + 14} y={ROW[1] + 29}>처치군 {fmt(N1)}명</text>
      <text className="t-sub" x={LX + 14} y={ROW[1] + 50}>광고 노출 가능</text>
      <rect className="svg-box" x={RX} y={ROW[1]} width={BW} height={H} rx="8" />
      <text className="t-strong" x={RX + 14} y={ROW[1] + 29}>대조군 {fmt(N0)}명</text>
      <text className="t-sub" x={RX + 14} y={ROW[1] + 50}>광고 대상에서 제외</text>

      {arrow(cxL, ROW[1] + H, ROW[2])}
      {arrow(cxR, ROW[1] + H, ROW[2])}

      <rect className="svg-box-key" x="8" y={ROW[2]} width="344" height={H} rx="8" />
      <text className="t-strong" x="22" y={ROW[2] + 29}>구매율 차이 = 증분</text>
      <text className="t-sub" x="22" y={ROW[2] + 50}>{pct(P1)} - {pct(P0)} = {pct(D)}p (구간 {pct(LO)}에서 {pct(HI)})</text>
    </svg>
  );
}
