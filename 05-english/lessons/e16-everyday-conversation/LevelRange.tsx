type Level = { title: string; lines: string[]; cls: string };

// 출처: CEFR 기술자(구판 척도 사본)를 이 글이 한국어로 줄였다.
const LEVELS: Level[] = [
  {
    title: 'A1 · 상대가 맞춰 줘야 하는 단계',
    lines: ['천천히 · 반복 · 바꿔 말하기에 의존', '간단한 질문 묻기와 답하기', '물건 달라고 하기 · 숫자 · 값 · 시간'],
    cls: 'svg-box',
  },
  {
    title: 'A2 · 짧은 일상 대화를 하는 단계',
    lines: ['예측되는 상황의 짧은 교환', '주문 · 길 묻기 · 간단한 구매', '반복을 요청하고 핵심어를 되묻기', '아직: 대화를 스스로 이어 가기 어려움'],
    cls: 'svg-berg',
  },
];

const X = 8;
const W = 344;
const GAP = 36;
const boxH = (n: number) => 29 + 21 * n + 16;

export default function LevelRange() {
  const h0 = boxH(LEVELS[0].lines.length);
  const h1 = boxH(LEVELS[1].lines.length);
  const y1 = 8 + h0 + GAP;
  const vb = y1 + h1 + 14;
  const ys = [8, y1];
  const hs = [h0, h1];
  return (
    <svg viewBox={`0 0 360 ${vb}`} role="img" aria-label="말하기 수준 범위. A1 은 상대가 천천히 반복해 줘야 성립하는 간단한 묻고 답하기, A2 는 예측되는 일상 상황의 짧은 대화이며 스스로 대화를 이어 가기는 아직 어렵다.">
      <defs>
        <marker id="ar-e16e" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      {LEVELS.map((l, i) => (
        <g key={l.title}>
          <rect className={l.cls} x={X} y={ys[i]} width={W} height={hs[i]} rx="8" />
          <text className="t-strong" x={X + 14} y={ys[i] + 29}>{l.title}</text>
          {l.lines.map((t, j) => (
            <text key={t} className="t-sub" x={X + 14} y={ys[i] + 29 + 21 * (j + 1)}>{t}</text>
          ))}
        </g>
      ))}
      <line className="svg-flow" x1={X + W / 2} y1={8 + h0 + 6} x2={X + W / 2} y2={y1 - 6} markerEnd="url(#ar-e16e)" />
    </svg>
  );
}
