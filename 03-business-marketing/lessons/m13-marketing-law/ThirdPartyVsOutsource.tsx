/** 개인정보를 넘길 때: 제3자 제공은 받는 쪽의 목적이라 동의가 필요하고, 위탁은 우리 업무라 문서·공개·감독이 필요하다. */
const TOP = 8;
const BOX_H = 88;
const GAP = 24;
const X_L = 8;
const W_L = 120;
const X_R = 184;
const W_R = 360 - 8 - X_R;
const Y1 = TOP;
const Y2 = TOP + BOX_H + GAP;
const BOTTOM = Y2 + BOX_H;
const STROKE = 2;
const VB_H = Math.ceil(BOTTOM + STROKE / 2 + 8);
const C1 = Y1 + BOX_H / 2;
const C2 = Y2 + BOX_H / 2;
const MID = (TOP + BOTTOM) / 2;

export default function ThirdPartyVsOutsource() {
  const arrowX1 = X_L + W_L + 6;
  const arrowX2 = X_R - 6;
  const labelX = (arrowX1 + arrowX2) / 2;
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="개인정보를 넘기는 두 방식. 문자 발송 대행사에 맡기는 위탁은 우리 업무를 대신 처리하므로 문서, 공개, 감독이 필요하다. 제휴사에 주는 제3자 제공은 받는 쪽의 목적으로 쓰이므로 별도 동의가 필요하다.">
      <defs>
        <marker id="ar-m13e" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      <rect className="svg-box-key" x={X_L} y={TOP} width={W_L} height={BOTTOM - TOP} rx="8" />
      <text className="t-strong" x={X_L + W_L / 2} y={MID - 4} textAnchor="middle">우리 회사</text>
      <text className="t-sub" x={X_L + W_L / 2} y={MID + 18} textAnchor="middle">개인정보 보유</text>

      <line className="svg-flow" x1={arrowX1} y1={C1} x2={arrowX2} y2={C1} markerEnd="url(#ar-m13e)" />
      <text className="t-sub" x={labelX} y={C1 - 12} textAnchor="middle">위탁</text>
      <rect className="svg-berg" x={X_R} y={Y1} width={W_R} height={BOX_H} rx="8" />
      <text className="t-strong" x={X_R + 12} y={Y1 + 28}>문자 대행사</text>
      <text className="t-sub" x={X_R + 12} y={Y1 + 48}>우리 업무를 대신 처리</text>
      <text className="t-sub" x={X_R + 12} y={Y1 + 68}>필요: 문서·공개·감독</text>

      <line className="svg-flow" x1={arrowX1} y1={C2} x2={arrowX2} y2={C2} markerEnd="url(#ar-m13e)" />
      <text className="t-sub" x={labelX} y={C2 - 12} textAnchor="middle">제공</text>
      <rect className="svg-tip" x={X_R} y={Y2} width={W_R} height={BOX_H} rx="8" />
      <text className="t-strong" x={X_R + 12} y={Y2 + 28}>제휴사 (제3자)</text>
      <text className="t-sub" x={X_R + 12} y={Y2 + 48}>받는 쪽 목적으로 이용</text>
      <text className="t-sub" x={X_R + 12} y={Y2 + 68}>필요: 별도 동의</text>
    </svg>
  );
}
