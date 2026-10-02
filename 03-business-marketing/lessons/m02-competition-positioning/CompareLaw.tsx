type Item = { t: string; q: string };

const ITEMS: Item[] = [
  { t: '비교 대상', q: '같은 종류이고 거래통념상 동등한가?' },
  { t: '비교 기준', q: '조건, 기간, 세금을 맞췄나?' },
  { t: '비교 내용', q: '사실이고 실증할 수 있나?' },
  { t: '비교 방법', q: '유리한 항목만 골라 전체 우수를 말하나?' },
];

// 여백 기준: 상자 안 14px, 두 줄 상자 높이 66, 상자 사이 24.
const W = 344;
const H = 66;
const GAP = 24;
const y = (i: number) => 8 + i * (H + GAP);
const LAST = ITEMS.length;
const VB_H = Math.ceil(y(LAST) + H + 1 + 8); // 마지막 점선 상자는 선 두께 2

export default function CompareLaw() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="비교를 공개하기 전 4가지 점검. 비교 대상, 비교 기준, 비교 내용, 비교 방법을 묻고, 하나라도 문제가 있으면 공개하지 않고 근거를 보강한다.">
      <defs>
        <marker id="m02cl" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      {ITEMS.map((it, i) => (
        <g key={it.t}>
          <rect className="svg-box" x="8" y={y(i)} width={W} height={H} rx="8" />
          <text className="t-strong" x="22" y={y(i) + 28}>{it.t}</text>
          <text className="t-sub" x="22" y={y(i) + 49}>{it.q}</text>
          <line className="svg-flow" x1="180" y1={y(i) + H + 4} x2="180" y2={y(i) + H + GAP - 4} markerEnd="url(#m02cl)" />
        </g>
      ))}
      <rect className="svg-box-bad" x="8" y={y(LAST)} width={W} height={H} rx="8" />
      <text className="t-strong" x="22" y={y(LAST) + 28}>하나라도 문제가 있으면</text>
      <text className="t-sub" x="22" y={y(LAST) + 49}>공개하지 않고 근거를 보강한다</text>
    </svg>
  );
}
