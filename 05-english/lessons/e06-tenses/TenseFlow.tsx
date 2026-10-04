type Step = { q: string; sub: string; yes: string; fix: string };

const STEPS: Step[] = [
  { q: '앞으로 할 일인가?', sub: 'tomorrow, next week', yes: '미래', fix: 'will, going to' },
  { q: '끝난 과거 시점이 있나?', sub: 'yesterday, last year', yes: '과거', fix: 'worked, went' },
  { q: '과거에서 지금까지?', sub: 'for, since, already', yes: '현재완료', fix: 'have worked' },
  { q: '지금 하는 중인가?', sub: 'now, at the moment', yes: '현재진행', fix: 'is working' },
];

// 여백: 상자 안 12px 이상, 두 줄 baseline 간격 20px, 화살표 라벨은 선에서 8px 이상.
const LW = 176; // 질문 상자 폭
const RW = 128; // 결과 상자 폭
const RX = 360 - 8 - RW;
const H = 66;
const GAP = 44;

export default function TenseFlow() {
  const y = (i: number) => 8 + i * (H + GAP);
  const last = STEPS.length;
  const VB_H = y(last) + H + 8;
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="시제를 고르는 순서. 앞일이면 미래 표현, 끝난 과거 시점이 있으면 과거형, 과거에서 지금까지 이어지면 현재완료, 지금 하는 중이면 현재진행, 모두 아니면 습관과 사실을 나타내는 현재형이다.">
      <defs>
        <marker id="ar-tf" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      {STEPS.map((s, i) => (
        <g key={s.q}>
          <rect className="svg-box" x="8" y={y(i)} width={LW} height={H} rx="8" />
          <text className="t-strong" x="20" y={y(i) + 29}>{s.q}</text>
          <text className="t-sub" x="20" y={y(i) + 49}>{s.sub}</text>
          <line className="svg-flow" x1={8 + LW + 6} y1={y(i) + H / 2} x2={RX - 6} y2={y(i) + H / 2} markerEnd="url(#ar-tf)" />
          <text className="t-good" x={(8 + LW + RX) / 2} y={y(i) + H / 2 - 12} textAnchor="middle">예</text>
          <rect className="svg-berg" x={RX} y={y(i)} width={RW} height={H} rx="8" />
          <text className="t-strong" x={RX + 12} y={y(i) + 29}>{s.yes}</text>
          <text className="t-sub" x={RX + 12} y={y(i) + 49}>{s.fix}</text>
          <line className="svg-flow" x1={8 + LW / 2} y1={y(i) + H + 6} x2={8 + LW / 2} y2={y(i) + H + GAP - 6} markerEnd="url(#ar-tf)" />
          <text className="t-sub" x={8 + LW / 2 + 14} y={y(i) + H + GAP / 2 + 5}>아니오</text>
        </g>
      ))}
      <rect className="svg-box-key" x="8" y={y(last)} width={LW} height={H} rx="8" />
      <text className="t-strong" x="20" y={y(last) + 29}>현재형</text>
      <text className="t-sub" x="20" y={y(last) + 49}>습관, 사실: work, works</text>
    </svg>
  );
}
