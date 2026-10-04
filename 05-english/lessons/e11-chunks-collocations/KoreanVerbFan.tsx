type Row = { chunk: string; ko: string };

const ROWS: Row[] = [
  { chunk: 'do homework', ko: '숙제를 하다' },
  { chunk: 'make a mistake', ko: '실수를 하다' },
  { chunk: 'have a shower', ko: '샤워를 하다' },
  { chunk: 'take a break', ko: '휴식을 하다' },
];

// 여백 기준: 두 줄 상자 높이 66, 상자 사이 14, 글자는 상자 가장자리에서 14 이상.
const LW = 84; // 왼쪽 상자 폭
const RX = 136; // 오른쪽 상자 x
const RW = 360 - 8 - RX; // 오른쪽 상자 폭
const H = 66;
const GAP = 14;
const TOP = 8;

export default function KoreanVerbFan() {
  const y = (i: number) => TOP + i * (H + GAP);
  const total = ROWS.length * H + (ROWS.length - 1) * GAP;
  const midY = TOP + total / 2;
  const VB_H = TOP + total + 12;
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="한국어 동사 하다 하나가 영어에서는 do, make, have, take 로 갈라진다. 숙제는 do homework, 실수는 make a mistake, 샤워는 have a shower, 휴식은 take a break.">
      <defs>
        <marker id="kvf" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      <rect className="svg-berg" x="8" y={midY - H / 2} width={LW} height={H} rx="8" />
      <text className="t-strong" x={8 + LW / 2} y={midY + 5} textAnchor="middle">하다</text>
      {ROWS.map((r, i) => (
        <g key={r.chunk}>
          <line className="svg-flow" x1={8 + LW + 4} y1={midY} x2={RX - 6} y2={y(i) + H / 2} markerEnd="url(#kvf)" />
          <rect className="svg-box" x={RX} y={y(i)} width={RW} height={H} rx="8" />
          <text className="t-strong" x={RX + 14} y={y(i) + 29}>{r.chunk}</text>
          <text className="t-sub" x={RX + 14} y={y(i) + 50}>{r.ko}</text>
        </g>
      ))}
    </svg>
  );
}
