type Step = { q: string; sub: string; no: string; fix: string };

// 영역 하나(듣기, 읽기, 말하기, 쓰기 중 하나)에 대해 위에서 아래로 묻는다.
const STEPS: Step[] = [
  { q: 'A1 can-do 가 되나?', sub: '낱말·짧은 구, 느린 말', no: 'A1 미만', fix: '기초부터' },
  { q: 'A2 can-do 가 되나?', sub: '일상 주제 짧은 교환', no: 'A1', fix: '입문 안' },
  { q: 'B1 can-do 가 되나?', sub: '익숙한 주제의 연결된 글', no: 'A2', fix: '입문 안' },
];

const LW = 188; // 질문 상자 폭
const RW = 120; // 결과 상자 폭
const RX = 360 - 8 - RW;
const H = 68;
const GAP = 48;

export default function LevelCheck() {
  const y = (i: number) => 8 + i * (H + GAP);
  const last = STEPS.length;
  return (
    <svg viewBox="0 0 360 432" role="img" aria-label="한 영역의 수준을 가르는 순서. A1 can-do 가 안 되면 A1 미만, 되면 A2 can-do 를 묻고, 안 되면 A1, 되면 B1 can-do 를 묻는다. 안 되면 A2, 되면 그 영역은 입문을 벗어난 것이다.">
      <defs>
        <marker id="e01-ar-check" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      {STEPS.map((s, i) => (
        <g key={s.q}>
          <rect className="svg-box" x="8" y={y(i)} width={LW} height={H} rx="8" />
          <text className="t-strong" x="22" y={y(i) + 29}>{s.q}</text>
          <text className="t-sub" x="22" y={y(i) + 50}>{s.sub}</text>
          <line className="svg-flow" x1={8 + LW + 6} y1={y(i) + H / 2} x2={RX - 6} y2={y(i) + H / 2} markerEnd="url(#e01-ar-check)" />
          <text className="t-sub" x={(8 + LW + RX) / 2} y={y(i) + H / 2 - 10} textAnchor="middle">아님</text>
          <rect className="svg-berg" x={RX} y={y(i)} width={RW} height={H} rx="8" />
          <text className="t-strong" x={RX + 14} y={y(i) + 29}>{s.no}</text>
          <text className="t-sub" x={RX + 14} y={y(i) + 50}>{s.fix}</text>
          <line className="svg-flow" x1={8 + LW / 2} y1={y(i) + H + 6} x2={8 + LW / 2} y2={y(i) + H + GAP - 6} markerEnd="url(#e01-ar-check)" />
          <text className="t-good" x={8 + LW / 2 + 14} y={y(i) + H + GAP / 2 + 5}>예</text>
        </g>
      ))}
      <rect className="svg-box-key" x="8" y={y(last)} width={LW} height={H} rx="8" />
      <text className="t-strong" x="22" y={y(last) + 29}>B1: 입문 졸업</text>
      <text className="t-sub" x="22" y={y(last) + 50}>그 영역은 입문 밖</text>
    </svg>
  );
}
