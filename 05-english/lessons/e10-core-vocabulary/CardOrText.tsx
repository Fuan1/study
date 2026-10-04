/** 이 글의 정리(관행): 새 단어를 만났을 때 카드에 올릴지 넘어갈지 정하는 순서. */
type Step = { q: string; sub: string; yes: string; fix: string };

const STEPS: Step[] = [
  { q: 'A1·A2 목록에 있나?', sub: '공개 목록 기준', yes: '카드로 외운다', fix: '뜻·예문 한 줄' },
  { q: '이 글에서 또 나왔나?', sub: '한 번 더 만난 단어', yes: '카드에 올린다', fix: '목록 밖이어도' },
];

const LW = 190;
const RW = 118;
const RX = 360 - 8 - RW;
const H = 68;
const GAP = 48;

export default function CardOrText() {
  const y = (i: number) => 8 + i * (H + GAP);
  const last = STEPS.length;
  const VB_H = y(last) + H + 9;
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="새 단어를 만났을 때의 순서. A1·A2 목록에 있으면 카드로 외우고, 없으면 글에서 또 나왔는지 보고 나왔으면 카드에 올리고 아니면 넘어간다.">
      <defs>
        <marker id="e10flow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      {STEPS.map((s, i) => (
        <g key={s.q}>
          <rect className="svg-box" x="8" y={y(i)} width={LW} height={H} rx="8" />
          <text className="t-strong" x="22" y={y(i) + 29}>{s.q}</text>
          <text className="t-sub" x="22" y={y(i) + 50}>{s.sub}</text>
          <line className="svg-flow" x1={8 + LW + 6} y1={y(i) + H / 2} x2={RX - 6} y2={y(i) + H / 2} markerEnd="url(#e10flow)" />
          <text className="t-good" x={(8 + LW + RX) / 2} y={y(i) + H / 2 - 10} textAnchor="middle">예</text>
          <rect className="svg-berg" x={RX} y={y(i)} width={RW} height={H} rx="8" />
          <text className="t-strong" x={RX + 14} y={y(i) + 29}>{s.yes}</text>
          <text className="t-sub" x={RX + 14} y={y(i) + 50}>{s.fix}</text>
          <line className="svg-flow" x1={8 + LW / 2} y1={y(i) + H + 6} x2={8 + LW / 2} y2={y(i) + H + GAP - 6} markerEnd="url(#e10flow)" />
          <text className="t-sub" x={8 + LW / 2 + 14} y={y(i) + H + GAP / 2 + 5}>아니오</text>
        </g>
      ))}
      <rect className="svg-box-key" x="8" y={y(last)} width={LW} height={H} rx="8" />
      <text className="t-strong" x="22" y={y(last) + 29}>넘어간다</text>
      <text className="t-sub" x="22" y={y(last) + 50}>문맥으로 뜻만 짐작</text>
    </svg>
  );
}
