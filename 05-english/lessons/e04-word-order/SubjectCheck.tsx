type Step = { q: string; sub: string; yes: string; ex: string };

const STEPS: Step[] = [
  { q: '명령이나 부탁인가?', sub: '예: Come on.', yes: '주어 없이', ex: '동사로 시작' },
  { q: '날씨·시간·중요함인가?', sub: '비가 온다, 몇 시다', yes: 'It 로 시작', ex: "It's raining." },
  { q: '있다·없다(존재)인가?', sub: '가게가 두 개 있다', yes: 'There 로 시작', ex: 'there is, are' },
];

const LW = 190;
const RW = 126;
const RX = 360 - 8 - RW;
const H = 68;
const GAP = 44;
const y = (i: number) => 8 + i * (H + GAP);

export default function SubjectCheck() {
  const last = STEPS.length;
  const VB_H = y(last) + H + 8 + 2;
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="주어를 정하는 순서. 명령이면 주어 없이 동사로 시작하고, 날씨·시간·중요함이면 It, 존재이면 There로 시작한다. 모두 아니면 사람이나 사물을 주어로 쓴다.">
      <defs>
        <marker id="ar-e04-subj" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      {STEPS.map((s, i) => (
        <g key={s.q}>
          <rect className="svg-box" x="8" y={y(i)} width={LW} height={H} rx="8" />
          <text className="t-strong" x="22" y={y(i) + 29}>{s.q}</text>
          <text className="t-sub" x="22" y={y(i) + 50}>{s.sub}</text>
          <line className="svg-flow" x1={8 + LW + 6} y1={y(i) + H / 2} x2={RX - 6} y2={y(i) + H / 2} markerEnd="url(#ar-e04-subj)" />
          <text className="t-good" x={(8 + LW + RX) / 2} y={y(i) + H / 2 - 10} textAnchor="middle">예</text>
          <rect className="svg-berg" x={RX} y={y(i)} width={RW} height={H} rx="8" />
          <text className="t-strong" x={RX + 12} y={y(i) + 29}>{s.yes}</text>
          <text className="t-sub" x={RX + 12} y={y(i) + 50}>{s.ex}</text>
          <line className="svg-flow" x1={8 + LW / 2} y1={y(i) + H + 6} x2={8 + LW / 2} y2={y(i) + H + GAP - 6} markerEnd="url(#ar-e04-subj)" />
          <text className="t-sub" x={8 + LW / 2 + 14} y={y(i) + H + GAP / 2 + 5}>아니오</text>
        </g>
      ))}
      <rect className="svg-box-key" x="8" y={y(last)} width={LW} height={H} rx="8" />
      <text className="t-strong" x="22" y={y(last) + 29}>그 외 모든 문장</text>
      <text className="t-sub" x="22" y={y(last) + 50}>I, she, we, 이름을 주어로</text>
    </svg>
  );
}
