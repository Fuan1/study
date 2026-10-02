/** 미발송 대조군(holdout) 설계: 무작위로 나눠 같은 기간 결과를 비교한다. 형태 예시. 크기와 기간은 Braze 문서의 안내. */
const X = 8;
const W = 344;
const TOP_H = 44;
const MID_Y = 96;
const MID_H = 66;
const MID_W = 166;
const RES_Y = MID_Y + MID_H + 36;
const RES_H = 66;
const STROKE = 1.5;
export const VB_H = Math.ceil(RES_Y + RES_H + STROKE / 2 + 8);

export default function HoldoutDesign() {
  const lx = X + MID_W / 2;
  const rx = X + W - MID_W / 2;
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="대상 고객을 무작위로 발송군과 미발송 대조군으로 나누고, 같은 기간의 구매와 해지를 비교해 증분을 읽는다.">
      <defs>
        <marker id="ho-ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      <rect className="svg-box" x={X} y={8} width={W} height={TOP_H} rx="8" />
      <text className="t-strong" x={X + W / 2} y={8 + 27} textAnchor="middle">대상 고객 전체</text>
      <line className="svg-flow" x1={lx} y1={8 + TOP_H + 4} x2={lx} y2={MID_Y - 4} markerEnd="url(#ho-ar)" />
      <line className="svg-flow" x1={rx} y1={8 + TOP_H + 4} x2={rx} y2={MID_Y - 4} markerEnd="url(#ho-ar)" />
      <text className="t-accent" x={X + W / 2} y={8 + TOP_H + 30} textAnchor="middle">무작위 배정</text>
      <rect className="svg-box-good" x={X} y={MID_Y} width={MID_W} height={MID_H} rx="8" />
      <text className="t-strong" x={X + 14} y={MID_Y + 28}>발송군</text>
      <text className="t-sub" x={X + 14} y={MID_Y + 50}>메일을 받는다</text>
      <rect className="svg-box-bad" x={X + W - MID_W} y={MID_Y} width={MID_W} height={MID_H} rx="8" />
      <text className="t-strong" x={X + W - MID_W + 14} y={MID_Y + 28}>미발송 대조군</text>
      <text className="t-sub" x={X + W - MID_W + 14} y={MID_Y + 50}>전체의 10% 이하</text>
      <line className="svg-flow" x1={lx} y1={MID_Y + MID_H + 4} x2={lx} y2={RES_Y - 4} markerEnd="url(#ho-ar)" />
      <line className="svg-flow" x1={rx} y1={MID_Y + MID_H + 4} x2={rx} y2={RES_Y - 4} markerEnd="url(#ho-ar)" />
      <rect className="svg-box-key" x={X} y={RES_Y} width={W} height={RES_H} rx="8" />
      <text className="t-strong" x={X + 14} y={RES_Y + 28}>두 군의 차이가 증분</text>
      <text className="t-sub" x={X + 14} y={RES_Y + 50}>1개월 이상, 시작 전에 기간 확정</text>
    </svg>
  );
}
