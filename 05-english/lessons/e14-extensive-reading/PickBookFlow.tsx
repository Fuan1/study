type Step = { q: string; sub: string; yes: string; fix: string };

const STEPS: Step[] = [
  { q: '모르는 단어가 많나?', sub: '한 쪽에 두세 개 초과', yes: '바꾼다', fix: '더 쉬운 책' },
  { q: '이해가 안 되나?', sub: '줄거리를 놓친다', yes: '바꾼다', fix: '더 쉬운 책' },
  { q: '재미가 없나?', sub: '읽기 싫어진다', yes: '바꾼다', fix: '다른 책' },
];

const LW = 200;
const RW = 104;
const RX = 360 - 8 - RW;
const H = 68;
const GAP = 48;

export default function PickBookFlow() {
  const y = (i: number) => 8 + i * (H + GAP);
  const last = STEPS.length;
  const vbH = y(last) + H + 8;
  return (
    <svg viewBox={`0 0 360 ${vbH}`} role="img" aria-label="책 한 쪽을 읽고 확인하는 순서. 모르는 단어가 많으면 더 쉬운 책, 이해가 안 되면 더 쉬운 책, 재미가 없으면 다른 책으로 바꾸고, 모두 아니오이면 계속 읽는다.">
      <defs>
        <marker id="ar14" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      {STEPS.map((s, i) => (
        <g key={s.q}>
          <rect className="svg-box" x="8" y={y(i)} width={LW} height={H} rx="8" />
          <text className="t-strong" x="22" y={y(i) + 29}>{s.q}</text>
          <text className="t-sub" x="22" y={y(i) + 51}>{s.sub}</text>
          <line className="svg-flow" x1={8 + LW + 6} y1={y(i) + H / 2} x2={RX - 6} y2={y(i) + H / 2} markerEnd="url(#ar14)" />
          <text className="t-bad" x={(8 + LW + RX) / 2} y={y(i) + H / 2 - 10} textAnchor="middle">예</text>
          <rect className="svg-berg" x={RX} y={y(i)} width={RW} height={H} rx="8" />
          <text className="t-strong" x={RX + 14} y={y(i) + 29}>{s.yes}</text>
          <text className="t-sub" x={RX + 14} y={y(i) + 51}>{s.fix}</text>
          <line className="svg-flow" x1={8 + LW / 2} y1={y(i) + H + 6} x2={8 + LW / 2} y2={y(i) + H + GAP - 6} markerEnd="url(#ar14)" />
          <text className="t-sub" x={8 + LW / 2 + 14} y={y(i) + H + GAP / 2 + 5}>아니오</text>
        </g>
      ))}
      <rect className="svg-box-key" x="8" y={y(last)} width={LW} height={H} rx="8" />
      <text className="t-strong" x="22" y={y(last) + 29}>계속 읽는다</text>
      <text className="t-sub" x="22" y={y(last) + 51}>사전 없이 끝까지</text>
    </svg>
  );
}
