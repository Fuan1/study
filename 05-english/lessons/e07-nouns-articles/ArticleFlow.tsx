type Step = { q: string; sub: string; yes: string; fix: string };

const STEPS: Step[] = [
  { q: '셀 수 없는 명사인가?', sub: 'water, information', yes: 'a, -s 없음', fix: 'some 또는 the' },
  { q: '복수인가?', sub: '아니오이면 단수 하나', yes: '-s 로 쓴다', fix: '일반이면 무관사' },
  { q: '상대가 아는 것인가?', sub: '이미 말했거나 하나뿐', yes: 'the', fix: '단수는 the 하나' },
];

const LW = 176;
const RW = 128;
const RX = 360 - 8 - RW;
const H = 68;
const GAP = 48;

export default function ArticleFlow() {
  const y = (i: number) => 8 + i * (H + GAP);
  const last = STEPS.length;
  return (
    <svg viewBox="0 0 360 440" role="img" aria-label="명사 앞을 정하는 순서. 셀 수 없으면 a와 복수 s를 쓰지 않는다. 복수이면 s를 붙이고 일반적인 말은 관사가 없다. 단수이고 상대가 알면 the, 모르면 a 또는 an.">
      <defs>
        <marker id="ar-e07a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      {STEPS.map((s, i) => (
        <g key={s.q}>
          <rect className="svg-box" x="8" y={y(i)} width={LW} height={H} rx="8" />
          <text className="t-strong" x="22" y={y(i) + 29}>{s.q}</text>
          <text className="t-sub" x="22" y={y(i) + 50}>{s.sub}</text>
          <line className="svg-flow" x1={8 + LW + 6} y1={y(i) + H / 2} x2={RX - 6} y2={y(i) + H / 2} markerEnd="url(#ar-e07a)" />
          <text className="t-good" x={(8 + LW + RX) / 2} y={y(i) + H / 2 - 10} textAnchor="middle">예</text>
          <rect className="svg-berg" x={RX} y={y(i)} width={RW} height={H} rx="8" />
          <text className="t-strong" x={RX + 14} y={y(i) + 29}>{s.yes}</text>
          <text className="t-sub" x={RX + 14} y={y(i) + 50}>{s.fix}</text>
          <line className="svg-flow" x1={8 + LW / 2} y1={y(i) + H + 6} x2={8 + LW / 2} y2={y(i) + H + GAP - 6} markerEnd="url(#ar-e07a)" />
          <text className="t-sub" x={8 + LW / 2 + 14} y={y(i) + H + GAP / 2 + 5}>아니오</text>
        </g>
      ))}
      <rect className="svg-box-key" x="8" y={y(last)} width={LW} height={H} rx="8" />
      <text className="t-strong" x="22" y={y(last) + 29}>a / an</text>
      <text className="t-sub" x="22" y={y(last) + 50}>처음 말하는 하나</text>
    </svg>
  );
}
