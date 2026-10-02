type Step = { q: string; sub: string; yes: string; ex: string };

const STEPS: Step[] = [
  { q: '같은 종류 제품을 쓰나?', sub: '돈 내고 같은 일을 한다', yes: '직접 경쟁', ex: '같은 종류 제품' },
  { q: '다른 유료 해법을 쓰나?', sub: '다른 종류 해법에 돈을 낸다', yes: '간접 경쟁', ex: '다른 유료 해법' },
  { q: '이미 가진 도구로 하나?', sub: '메신저, 엑셀, 종이', yes: '대체재', ex: '이미 가진 도구' },
];

// 여백 기준: 상자 안 14px, 두 줄 상자 높이 68, 단계 사이 48.
const LW = 190; // 질문 상자 폭
const RW = 126; // 결과 상자 폭
const RX = 360 - 8 - RW; // 결과 상자 x
const H = 68;
const GAP = 48;
const STROKE = 1.5;
const y = (i: number) => 8 + i * (H + GAP);
const LAST = STEPS.length;
const VB_H = Math.ceil(y(LAST) + H + STROKE / 2 + 8); // 마지막 상자 아랫변 + 선 반 + 여백

export default function ClassifyFlow() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="경쟁자 범주를 가르는 순서. 같은 종류 제품을 쓰면 직접 경쟁, 다른 유료 해법을 쓰면 간접 경쟁, 이미 가진 도구로 하면 대체재, 모두 아니면 아무것도 안 하기이다.">
      <defs>
        <marker id="m02ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      {STEPS.map((s, i) => (
        <g key={s.q}>
          <rect className="svg-box" x="8" y={y(i)} width={LW} height={H} rx="8" />
          <text className="t-strong" x="22" y={y(i) + 29}>{s.q}</text>
          <text className="t-sub" x="22" y={y(i) + 50}>{s.sub}</text>
          <line className="svg-flow" x1={8 + LW + 6} y1={y(i) + H / 2} x2={RX - 6} y2={y(i) + H / 2} markerEnd="url(#m02ar)" />
          <text className="t-good" x={(8 + LW + RX) / 2} y={y(i) + H / 2 - 10} textAnchor="middle">예</text>
          <rect className="svg-berg" x={RX} y={y(i)} width={RW} height={H} rx="8" />
          <text className="t-strong" x={RX + 14} y={y(i) + 29}>{s.yes}</text>
          <text className="t-sub" x={RX + 14} y={y(i) + 50}>{s.ex}</text>
          <line className="svg-flow" x1={8 + LW / 2} y1={y(i) + H + 6} x2={8 + LW / 2} y2={y(i) + H + GAP - 6} markerEnd="url(#m02ar)" />
          <text className="t-sub" x={8 + LW / 2 + 14} y={y(i) + H + GAP / 2 + 5}>아니오</text>
        </g>
      ))}
      <rect className="svg-box-key" x="8" y={y(LAST)} width={LW} height={H} rx="8" />
      <text className="t-strong" x="22" y={y(LAST) + 29}>아무것도 안 하기</text>
      <text className="t-sub" x="22" y={y(LAST) + 50}>문제를 감수한다</text>
    </svg>
  );
}
