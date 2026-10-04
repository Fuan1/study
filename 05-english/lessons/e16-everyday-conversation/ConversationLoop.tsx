type Step = { who: string; line: string; cls: string };

// 대화 한 바퀴: 말 → 대답 + 되묻기 → 짧은 반응. 못 알아들으면 어느 단계에서든 되묻는다.
const STEPS: Step[] = [
  { who: '1. 상대가 말한다', line: 'How are you?', cls: 'svg-box' },
  { who: '2. 답하고 되묻는다', line: 'Fine, thanks. How are you?', cls: 'svg-box-key' },
  { who: '3. 상대 대답에 짧게 반응한다', line: 'Good! / Really?', cls: 'svg-box' },
];

const H = 66;
const GAP = 36;
const X = 8;
const W = 344;

export default function ConversationLoop() {
  const y = (i: number) => 8 + i * (H + GAP);
  const side = y(STEPS.length) + 12;
  return (
    <svg viewBox="0 0 360 404" role="img" aria-label="대화 한 바퀴. 상대가 말하면 답하면서 되묻고, 상대 대답에 짧게 반응한다. 못 알아들었으면 어느 단계에서든 Sorry 로 되묻고 상대가 다시 말하게 한다.">
      <defs>
        <marker id="ar-e16a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      {STEPS.map((s, i) => (
        <g key={s.who}>
          <rect className={s.cls} x={X} y={y(i)} width={W} height={H} rx="8" />
          <text className="t-strong" x={X + 14} y={y(i) + 29}>{s.who}</text>
          <text className="t-sub" x={X + 14} y={y(i) + 50}>{s.line}</text>
          {i < STEPS.length - 1 && (
            <line className="svg-flow" x1={X + W / 2} y1={y(i) + H + 6} x2={X + W / 2} y2={y(i) + H + GAP - 6} markerEnd="url(#ar-e16a)" />
          )}
        </g>
      ))}
      <rect className="svg-berg" x={X} y={side} width={W} height={H} rx="8" />
      <text className="t-strong" x={X + 14} y={side + 29}>못 알아들었을 때 (어느 단계든)</text>
      <text className="t-sub" x={X + 14} y={side + 50}>Sorry? → 상대가 다시 말한다 → 답한다</text>
    </svg>
  );
}
