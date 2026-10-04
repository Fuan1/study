type Step = { q: string; sub: string };

const STEPS: Step[] = [
  { q: '사전에서 단어를 찾는다', sub: '예문 속 같이 쓴 동사·형용사 보기' },
  { q: '짝 표시가 있나 본다', sub: 'Cambridge 의 collocation 표시' },
  { q: '예문이 부족하면 코퍼스', sub: '실제 글에서 옆에 오는 말 보기' },
  { q: '덩어리째 노트에 적는다', sub: '동사와 명사를 한 줄로' },
];

// 여백 기준: 두 줄 상자 높이 66, 화살표 구간 36(라벨 없음), 글자는 상자 안 14.
const W = 344;
const H = 66;
const GAP = 36;

export default function FindFlow() {
  const y = (i: number) => 8 + i * (H + GAP);
  const VB_H = y(STEPS.length - 1) + H + 12;
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="짝을 찾는 순서. 사전에서 단어를 찾고, 짝 표시를 보고, 예문이 부족하면 코퍼스를 보고, 덩어리째 노트에 적는다.">
      <defs>
        <marker id="ff" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      {STEPS.map((s, i) => (
        <g key={s.q}>
          <rect className={i === STEPS.length - 1 ? 'svg-box-key' : 'svg-box'} x="8" y={y(i)} width={W} height={H} rx="8" />
          <text className="t-strong" x="22" y={y(i) + 29}>{s.q}</text>
          <text className="t-sub" x="22" y={y(i) + 50}>{s.sub}</text>
          {i < STEPS.length - 1 && (
            <line className="svg-flow" x1="180" y1={y(i) + H + 5} x2="180" y2={y(i) + H + GAP - 5} markerEnd="url(#ff)" />
          )}
        </g>
      ))}
    </svg>
  );
}
