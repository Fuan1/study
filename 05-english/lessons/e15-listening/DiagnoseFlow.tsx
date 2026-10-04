type Step = { q: string; sub: string; yes: string; fix: string };

// 안 들리는 구간을 대본과 함께 놓고 위에서 아래로 묻는다. 예 가 나오면 거기서 멈춘다.
const STEPS: Step[] = [
  { q: '대본을 봐도 모르나?', sub: '글로 읽어도 뜻이 안 나옴', yes: '단어·문법', fix: '어휘 먼저' },
  { q: '느리게 하면 들리나?', sub: '같은 구간을 천천히 재생', yes: '속도', fix: '쉬운 자료로' },
  { q: '짧고 약한 말을 놓쳤나?', sub: 'a, of, and 같은 말', yes: '소리 변화', fix: '대본 대조' },
];

const LW = 204; // 질문 상자 폭
const RW = 112; // 결과 상자 폭
const RX = 360 - 8 - RW; // 결과 상자 x
const H = 68;
const GAP = 48;

export default function DiagnoseFlow() {
  const y = (i: number) => 8 + i * (H + GAP);
  const last = STEPS.length;
  return (
    <svg viewBox="0 0 360 436" role="img" aria-label="안 들리는 원인을 가르는 순서. 대본을 봐도 모르면 단어와 문법, 느리게 하면 들리면 속도, 짧고 약한 말을 놓쳤으면 소리 변화, 모두 아니면 주제와 집중을 확인한다.">
      <defs>
        <marker id="lis-ar1" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      {STEPS.map((s, i) => (
        <g key={s.q}>
          <rect className="svg-box" x="8" y={y(i)} width={LW} height={H} rx="8" />
          <text className="t-strong" x="22" y={y(i) + 29}>{s.q}</text>
          <text className="t-sub" x="22" y={y(i) + 50}>{s.sub}</text>
          <line className="svg-flow" x1={8 + LW + 6} y1={y(i) + H / 2} x2={RX - 6} y2={y(i) + H / 2} markerEnd="url(#lis-ar1)" />
          <text className="t-good" x={(8 + LW + RX) / 2} y={y(i) + H / 2 - 10} textAnchor="middle">예</text>
          <rect className="svg-berg" x={RX} y={y(i)} width={RW} height={H} rx="8" />
          <text className="t-strong" x={RX + 14} y={y(i) + 29}>{s.yes}</text>
          <text className="t-sub" x={RX + 14} y={y(i) + 50}>{s.fix}</text>
          <line className="svg-flow" x1={8 + LW / 2} y1={y(i) + H + 6} x2={8 + LW / 2} y2={y(i) + H + GAP - 6} markerEnd="url(#lis-ar1)" />
          <text className="t-sub" x={8 + LW / 2 + 14} y={y(i) + H + GAP / 2 + 5}>아니오</text>
        </g>
      ))}
      <rect className="svg-box-key" x="8" y={y(last)} width={LW} height={H} rx="8" />
      <text className="t-strong" x="22" y={y(last) + 29}>주제·집중 확인</text>
      <text className="t-sub" x="22" y={y(last) + 50}>듣는 목적을 정했는가</text>
    </svg>
  );
}
