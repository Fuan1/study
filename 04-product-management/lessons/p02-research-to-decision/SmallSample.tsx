const CAN = ['문제가 있다', '어떤 상황인가', '왜 그런가(후보)', '어떤 종류가 있나'];
const CANNOT = ['몇 퍼센트인가', '어느 쪽이 더 많나', '전체를 대표하나', '해결책이 통하나'];

// 여백 기준: 상자 안 14px, 항목 줄 간격 26px, 상자와 아래 상자 사이 34px.
const COLW = 168;
const RX = 360 - 8 - COLW;
const TOP = 8;
const ITEM0 = 58;
const PITCH = 26;
const BH = ITEM0 + (CAN.length - 1) * PITCH + 16; // 마지막 항목 baseline + 아래 여백
const GAP = 34;
const Y3 = TOP + BH + GAP;
const H3 = 48;
// 마지막 상자 아랫변 + 선 두께 절반 + 아래 여백 8
const VB_H = Y3 + H3 + 1 + 8;

export default function SmallSample() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="소수 인터뷰로 말할 수 있는 것과 없는 것. 문제의 존재, 상황, 이유 후보, 종류는 말할 수 있고, 비율, 어느 쪽이 많은지, 전체 대표성, 해결책의 효과는 말할 수 없다. 비율과 크기 질문은 로그나 설문으로 넘긴다.">
      <defs>
        <marker id="ss-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      <rect className="svg-box-good" x="8" y={TOP} width={COLW} height={BH} rx="8" />
      <text className="t-good" x="22" y={TOP + 28}>말할 수 있다</text>
      {CAN.map((t, i) => (
        <text key={t} x="22" y={TOP + ITEM0 + i * PITCH} fontSize="13">{t}</text>
      ))}
      <rect className="svg-box-bad" x={RX} y={TOP} width={COLW} height={BH} rx="8" />
      <text className="t-bad" x={RX + 14} y={TOP + 28}>말할 수 없다</text>
      {CANNOT.map((t, i) => (
        <text key={t} x={RX + 14} y={TOP + ITEM0 + i * PITCH} fontSize="13">{t}</text>
      ))}
      <line className="svg-flow" x1={RX + COLW / 2} y1={TOP + BH + 6} x2={RX + COLW / 2} y2={Y3 - 6} markerEnd="url(#ss-arrow)" />
      <rect className="svg-box-key" x="8" y={Y3} width="344" height={H3} rx="8" />
      <text className="t-strong" x="180" y={Y3 + 29} textAnchor="middle">비율·크기 질문은 로그·설문으로</text>
    </svg>
  );
}
