/** 빈도 상한은 시퀀스 위에서 고객 단위로 한 번에 건다. 상한을 넘은 메일은 보류 없이 건너뛰고 시퀀스는 다음 단계로 간다. 형태 예시. */
const X = 8;
const SEQ_W = 104;
const SEQ_H = 44;
const SEQ_GAP = 14; // 8 + 3*104 + 2*14 = 348
const SEQ = ['A 구매 후', 'B 재참여', 'C 뉴스레터'];
const CAP_Y = 108;
const CAP_H = 66;
const OUT_Y = CAP_Y + CAP_H + 28;
const OUT_H = 66;
const OUT_W = 166;
const STROKE = 1.5;
export const VB_H = Math.ceil(OUT_Y + OUT_H + STROKE / 2 + 8);

export default function FrequencyCap() {
  const seqX = (i: number) => X + i * (SEQ_W + SEQ_GAP);
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="시퀀스 A, B, C가 모두 고객 단위 빈도 상한과 우선순위를 거친다. 상한 안이면 발송하고, 넘으면 보류 없이 건너뛰며 시퀀스는 다음 단계로 간다.">
      <defs>
        <marker id="fc-ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      {SEQ.map((t, i) => (
        <g key={t}>
          <rect className="svg-box" x={seqX(i)} y={8} width={SEQ_W} height={SEQ_H} rx="8" />
          <text className="t-strong" x={seqX(i) + SEQ_W / 2} y={8 + 27} textAnchor="middle">{t}</text>
          <line className="svg-flow" x1={seqX(i) + SEQ_W / 2} y1={8 + SEQ_H + 4} x2={seqX(i) + SEQ_W / 2} y2={CAP_Y - 4} markerEnd="url(#fc-ar)" />
        </g>
      ))}
      <rect className="svg-box-key" x={X} y={CAP_Y} width={344} height={CAP_H} rx="8" />
      <text className="t-strong" x={X + 14} y={CAP_Y + 28}>고객 단위 상한과 우선순위</text>
      <text className="t-sub" x={X + 14} y={CAP_Y + 50}>시퀀스마다가 아니라 한 번에</text>
      <line className="svg-flow" x1={X + OUT_W / 2} y1={CAP_Y + CAP_H + 4} x2={X + OUT_W / 2} y2={OUT_Y - 4} markerEnd="url(#fc-ar)" />
      <line className="svg-flow" x1={X + 344 - OUT_W / 2} y1={CAP_Y + CAP_H + 4} x2={X + 344 - OUT_W / 2} y2={OUT_Y - 4} markerEnd="url(#fc-ar)" />
      <rect className="svg-box-good" x={X} y={OUT_Y} width={OUT_W} height={OUT_H} rx="8" />
      <text className="t-strong" x={X + 14} y={OUT_Y + 28}>발송</text>
      <text className="t-sub" x={X + 14} y={OUT_Y + 50}>상한 안</text>
      <rect className="svg-box-bad" x={X + 344 - OUT_W} y={OUT_Y} width={OUT_W} height={OUT_H} rx="8" />
      <text className="t-strong" x={X + 344 - OUT_W + 14} y={OUT_Y + 28}>건너뜀</text>
      <text className="t-sub" x={X + 344 - OUT_W + 14} y={OUT_Y + 50}>보류 없음, 다음 단계</text>
    </svg>
  );
}
