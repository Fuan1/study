type Turn = { who: 'c' | 's'; label: string; line: string };

// 출처: British Council LearnEnglish A1 듣기 "Ordering in a café" 대화 한 편의 순서.
const TURNS: Turn[] = [
  { who: 'c', label: '손님이 주문한다', line: 'A mint tea and a slice of lemon cake, please.' },
  { who: 's', label: '점원이 묻는다', line: 'To eat in or take away?' },
  { who: 'c', label: '손님이 짧게 답한다', line: 'Take away, please.' },
  { who: 's', label: '점원이 값을 말한다', line: "That'll be £4.20, please." },
];

const H = 66;
const GAP = 24;
const X = 8;
const W = 344;

export default function CafeOrder() {
  const y = (i: number) => 8 + i * (H + GAP);
  const vb = y(TURNS.length - 1) + H + 14;
  return (
    <svg viewBox={`0 0 360 ${vb}`} role="img" aria-label="카페 주문 대화의 순서. 손님이 주문하고, 점원이 먹고 갈지 가져갈지 묻고, 손님이 답하고, 점원이 값을 말한다.">
      {TURNS.map((t, i) => (
        <g key={t.line}>
          <rect className={t.who === 'c' ? 'svg-box' : 'svg-berg'} x={X} y={y(i)} width={W} height={H} rx="8" />
          <text className="t-strong" x={X + 14} y={y(i) + 29}>{t.label}</text>
          <text className="t-sub" x={X + 14} y={y(i) + 50}>{t.line}</text>
        </g>
      ))}
    </svg>
  );
}
