type Rung = { en: string; ko: string };

// 이 글의 정리: 되묻는 말을 가벼운 것부터 구체적인 것 순으로 놓았다.
const RUNGS: Rung[] = [
  { en: 'Sorry? / Pardon?', ko: '전체를 한 번 더 듣고 싶을 때' },
  { en: 'Could you say that again, please?', ko: '같은 말을 정중하게 다시 부탁할 때' },
  { en: 'Could you speak more slowly?', ko: '말이 빨라 따라가기 어려울 때' },
  { en: 'What does X mean?', ko: '뜻을 물을 때. 철자는 How do you spell X?' },
];

const H = 66;
const GAP = 34;
const X = 8;
const W = 344;

export default function ClarifyLadder() {
  const y = (i: number) => 8 + i * (H + GAP);
  const vb = y(RUNGS.length - 1) + H + 14;
  return (
    <svg viewBox={`0 0 360 ${vb}`} role="img" aria-label="못 알아들었을 때 되묻는 말 네 단계. Sorry, Could you say that again, Could you speak more slowly, What does X mean 순서로 점점 구체적이다.">
      <defs>
        <marker id="ar-e16b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      {RUNGS.map((r, i) => (
        <g key={r.en}>
          <rect className={i === 0 ? 'svg-box-key' : 'svg-box'} x={X} y={y(i)} width={W} height={H} rx="8" />
          <text className="t-strong" x={X + 14} y={y(i) + 29}>{r.en}</text>
          <text className="t-sub" x={X + 14} y={y(i) + 50}>{r.ko}</text>
          {i < RUNGS.length - 1 && (
            <>
              <line className="svg-flow" x1={X + 28} y1={y(i) + H + 6} x2={X + 28} y2={y(i) + H + GAP - 6} markerEnd="url(#ar-e16b)" />
              <text className="t-sub" x={X + 44} y={y(i) + H + GAP / 2 + 5}>그래도 안 되면</text>
            </>
          )}
        </g>
      ))}
    </svg>
  );
}
