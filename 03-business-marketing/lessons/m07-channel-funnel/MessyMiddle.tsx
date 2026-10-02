// Google(2020)이 소개한 구매 결정 모델: 계기 → 탐색과 평가를 오가는 구간 → 구매 → 경험.
const BOX = { x: 100, w: 160, h: 44 };

export default function MessyMiddle() {
  const cx = 180;
  const yTrigger = 8;
  const yCont = yTrigger + BOX.h + 36; // 계기 아랫변에서 36
  const contH = 140;
  const yIn = yCont + 46;
  const inH = 66;
  const yBuy = yCont + contH + 36;
  const yExp = yBuy + BOX.h + 36;
  const VB_H = yExp + BOX.h + 1 + 8;
  const down = (y1: number, y2: number) => <line className="svg-flow" x1={cx} y1={y1 + 6} x2={cx} y2={y2 - 6} markerEnd="url(#mmar)" />;
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="구매 결정 모델. 계기가 있고, 구매 전에 탐색과 평가를 여러 번 오가며, 구매 뒤에 경험이 이어진다. 계기와 구매 사이는 직선이 아니다.">
      <defs>
        <marker id="mmar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      <rect className="svg-box" x={BOX.x} y={yTrigger} width={BOX.w} height={BOX.h} rx="8" />
      <text className="t-strong" x={cx} y={yTrigger + 27} textAnchor="middle">계기</text>
      {down(yTrigger + BOX.h, yCont)}

      <rect className="svg-box-key" x="8" y={yCont} width="344" height={contH} rx="8" />
      <text className="t-sub" x="22" y={yCont + 26}>탐색과 평가를 오가는 구간</text>
      <rect className="svg-berg" x="24" y={yIn} width="140" height={inH} rx="8" />
      <text className="t-strong" x="38" y={yIn + 29}>탐색</text>
      <text className="t-sub" x="38" y={yIn + 50}>넓게 모은다</text>
      <rect className="svg-berg" x="196" y={yIn} width="140" height={inH} rx="8" />
      <text className="t-strong" x="210" y={yIn + 29}>평가</text>
      <text className="t-sub" x="210" y={yIn + 50}>좁혀 비교한다</text>
      <line className="svg-flow" x1="168" y1={yIn + 20} x2="192" y2={yIn + 20} markerEnd="url(#mmar)" />
      <line className="svg-flow" x1="192" y1={yIn + 46} x2="168" y2={yIn + 46} markerEnd="url(#mmar)" />

      {down(yCont + contH, yBuy)}
      <rect className="svg-box" x={BOX.x} y={yBuy} width={BOX.w} height={BOX.h} rx="8" />
      <text className="t-strong" x={cx} y={yBuy + 27} textAnchor="middle">구매</text>
      {down(yBuy + BOX.h, yExp)}
      <rect className="svg-box" x={BOX.x} y={yExp} width={BOX.w} height={BOX.h} rx="8" />
      <text className="t-strong" x={cx} y={yExp + 27} textAnchor="middle">경험</text>
    </svg>
  );
}
