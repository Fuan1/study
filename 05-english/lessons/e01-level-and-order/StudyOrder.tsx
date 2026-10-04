/** 이 글의 정리. 이 과정의 배치: 언어 학습 칸 안의 순서와, 처음부터 병행하는 입력·출력. */
const STAGES = [
  { t: '1  소리와 철자', s: 'e02 · e03' },
  { t: '2  문장틀과 기본 문법', s: 'e04 - e09' },
  { t: '3  단어와 덩어리', s: 'e10 · e11 · e12' },
];

const W = 344;
const H = 66;
const GAP = 36;

export default function StudyOrder() {
  const y = (i: number) => 8 + i * (H + GAP);
  const bandY = y(STAGES.length - 1) + H + 30;
  const vbH = bandY + H + 9;
  return (
    <svg viewBox={`0 0 360 ${vbH}`} role="img" aria-label="공부 순서. 언어 학습 칸은 소리와 철자, 문장틀과 기본 문법, 단어와 덩어리 순서로 쌓고, 쉬운 읽기·듣기와 짧은 말하기·쓰기는 처음부터 매주 같이 한다.">
      <defs>
        <marker id="e01-ar-order" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      {STAGES.map((s, i) => (
        <g key={s.t}>
          <rect className="svg-box" x="8" y={y(i)} width={W} height={H} rx="8" />
          <text className="t-strong" x="22" y={y(i) + 29}>{s.t}</text>
          <text className="t-sub" x="22" y={y(i) + 50}>{s.s}</text>
          {i < STAGES.length - 1 && (
            <line className="svg-flow" x1="180" y1={y(i) + H + 6} x2="180" y2={y(i) + H + GAP - 6} markerEnd="url(#e01-ar-order)" />
          )}
        </g>
      ))}
      <rect className="svg-berg" x="8" y={bandY} width={W} height={H} rx="8" />
      <text className="t-strong" x="22" y={bandY + 29}>처음부터 매주 같이</text>
      <text className="t-sub" x="22" y={bandY + 50}>e13 - e17 · 쉬운 입력과 짧은 출력</text>
    </svg>
  );
}
