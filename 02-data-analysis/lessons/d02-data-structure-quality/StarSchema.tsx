/** 팩트 하나가 차원 셋을 N:1 로 가리키는 모양. 위치는 상자 높이와 간격에서 계산한다. */
const DIMS = [
  { name: '사용자 (차원)', sub: '한 행 = 한 사용자' },
  { name: '상품 (차원)', sub: '한 행 = 한 상품' },
  { name: '날짜 (차원)', sub: '한 행 = 하루' },
];
const FACT_LINES = ['한 행 = 한 주문', '금액·수량을 더한다', '사용자·상품·날짜 키'];

const PAD = 8;
const DH = 66; // 두 줄 상자 높이
const GAP = 24;
const FW = 160;
const DW = 140;
const DX = 360 - PAD - DW; // 212
const FH = DIMS.length * DH + (DIMS.length - 1) * GAP; // 246

export default function StarSchema() {
  const dy = (i: number) => PAD + i * (DH + GAP);
  const H = Math.ceil(PAD + FH + 0.75 + PAD);
  const t0 = PAD + FH / 2 - 31; // 팩트 글줄 시작 baseline
  return (
    <svg viewBox={`0 0 360 ${H}`} role="img" aria-label="주문 팩트 테이블이 사용자, 상품, 날짜 차원 테이블을 각각 N 대 1 로 가리키는 구조. 금액과 수량은 팩트에서 더하고 분류 기준은 차원에서 가져온다.">
      <defs>
        <marker id="ar-star" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      <rect className="svg-box-key" x={PAD} y={PAD} width={FW} height={FH} rx="8" />
      <text className="t-strong" x={PAD + 14} y={t0}>주문 (팩트)</text>
      {FACT_LINES.map((l, i) => (
        <text key={l} className="t-sub" x={PAD + 14} y={t0 + 22 + i * 20}>{l}</text>
      ))}
      {DIMS.map((d, i) => {
        const cy = dy(i) + DH / 2;
        return (
          <g key={d.name}>
            <line className="svg-flow" x1={PAD + FW + 6} y1={cy} x2={DX - 6} y2={cy} markerEnd="url(#ar-star)" />
            <text className="t-sub" x={(PAD + FW + DX) / 2} y={cy - 10} textAnchor="middle">N:1</text>
            <rect className="svg-box" x={DX} y={dy(i)} width={DW} height={DH} rx="8" />
            <text className="t-strong" x={DX + 14} y={dy(i) + 29}>{d.name}</text>
            <text className="t-sub" x={DX + 14} y={dy(i) + 50}>{d.sub}</text>
          </g>
        );
      })}
    </svg>
  );
}
