type Gate = { q: string; sub: string; why: string };

const GATES: Gate[] = [
  { q: '고객이 알아채나?', sub: '고르는 순간에 보이나', why: '안 보인다' },
  { q: '증거가 있나?', sub: '고객이 확인할 수 있나', why: '주장일 뿐' },
  { q: '따라 하기 어렵나?', sub: '경쟁자가 쉽게 못 한다', why: '쉽게 따라 함' },
];

// 여백 기준: 상자 안 14px, 두 줄 상자 높이 68, 단계 사이 48, 화살표 라벨은 상자에서 8px 이상.
const LW = 170;
const RW = 118;
const RX = 360 - 8 - RW;
const H = 68;
const GAP = 48;
const y = (i: number) => 8 + i * (H + GAP);
const LAST = GATES.length;
const VB_H = Math.ceil(y(LAST) + H + 0.75 + 8);

export default function DiffGates() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="차별점 판단 순서. 고객이 알아채나, 증거가 있나, 따라 하기 어렵나를 차례로 묻는다. 하나라도 아니오이면 차별점이 아니고, 모두 예이면 문장의 차이 칸에 쓴다.">
      <defs>
        <marker id="m02dg" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      {GATES.map((g, i) => (
        <g key={g.q}>
          <rect className="svg-box" x="8" y={y(i)} width={LW} height={H} rx="8" />
          <text className="t-strong" x="22" y={y(i) + 29}>{g.q}</text>
          <text className="t-sub" x="22" y={y(i) + 50}>{g.sub}</text>
          <line className="svg-flow" x1={8 + LW + 6} y1={y(i) + H / 2} x2={RX - 6} y2={y(i) + H / 2} markerEnd="url(#m02dg)" />
          <text className="t-bad" x={(8 + LW + RX) / 2} y={y(i) + H / 2 - 10} textAnchor="middle">아니오</text>
          <rect className="svg-box-bad" x={RX} y={y(i)} width={RW} height={H} rx="8" />
          <text className="t-strong" x={RX + 14} y={y(i) + 29}>차별점 아님</text>
          <text className="t-sub" x={RX + 14} y={y(i) + 50}>{g.why}</text>
          <line className="svg-flow" x1={8 + LW / 2} y1={y(i) + H + 6} x2={8 + LW / 2} y2={y(i) + H + GAP - 6} markerEnd="url(#m02dg)" />
          <text className="t-good" x={8 + LW / 2 + 14} y={y(i) + H + GAP / 2 + 5}>예</text>
        </g>
      ))}
      <rect className="svg-berg" x="8" y={y(LAST)} width={LW} height={H} rx="8" />
      <text className="t-strong" x="22" y={y(LAST) + 29}>차별점</text>
      <text className="t-sub" x="22" y={y(LAST) + 50}>문장의 차이 칸에 쓴다</text>
    </svg>
  );
}
