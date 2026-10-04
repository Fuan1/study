type Step = { q: string; sub: string; yes: string; fix: string };

const STEPS: Step[] = [
  { q: '빼도 문장이 통하나?', sub: '그 단어를 지우고 읽기', yes: '넘긴다', fix: '점 하나 표시' },
  { q: '문맥으로 짐작되나?', sub: '품사, 앞뒤, 단어 모양', yes: '짐작해 읽는다', fix: '뒤에서 확인' },
  { q: '핵심이거나 반복되나?', sub: '제목, 핵심, 3번 이상', yes: '사전을 편다', fix: '한 단락 뒤에' },
];

const LW = 192;
const RW = 128;
const RX = 360 - 8 - RW;
const H = 68;
const GAP = 48;

export default function DecideFlow() {
  const y = (i: number) => 8 + i * (H + GAP);
  const last = STEPS.length;
  const VB_H = y(last) + H + 8;
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="모르는 단어를 만났을 때 판단 순서. 단어를 빼도 문장이 통하면 표시만 하고 넘긴다. 아니면 문맥으로 짐작하고, 짐작이 안 되는데 핵심이거나 반복되는 단어면 사전을 편다. 모두 아니면 표시하고 넘긴다.">
      <defs>
        <marker id="arDecide" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      {STEPS.map((s, i) => (
        <g key={s.q}>
          <rect className="svg-box" x="8" y={y(i)} width={LW} height={H} rx="8" />
          <text className="t-strong" x="22" y={y(i) + 29}>{s.q}</text>
          <text className="t-sub" x="22" y={y(i) + 50}>{s.sub}</text>
          <line className="svg-flow" x1={8 + LW + 6} y1={y(i) + H / 2} x2={RX - 6} y2={y(i) + H / 2} markerEnd="url(#arDecide)" />
          <text className="t-good" x={(8 + LW + RX) / 2} y={y(i) + H / 2 - 10} textAnchor="middle">예</text>
          <rect className="svg-berg" x={RX} y={y(i)} width={RW} height={H} rx="8" />
          <text className="t-strong" x={RX + 14} y={y(i) + 29}>{s.yes}</text>
          <text className="t-sub" x={RX + 14} y={y(i) + 50}>{s.fix}</text>
          <line className="svg-flow" x1={8 + LW / 2} y1={y(i) + H + 6} x2={8 + LW / 2} y2={y(i) + H + GAP - 6} markerEnd="url(#arDecide)" />
          <text className="t-sub" x={8 + LW / 2 + 14} y={y(i) + H + GAP / 2 + 5}>아니오</text>
        </g>
      ))}
      <rect className="svg-box-key" x="8" y={y(last)} width="344" height={H} rx="8" />
      <text className="t-strong" x="22" y={y(last) + 29}>표시하고 넘긴다</text>
      <text className="t-sub" x="22" y={y(last) + 50}>다시 나오면 그때 찾는다</text>
    </svg>
  );
}
