/**
 * 부탁 표현의 정중함 단계. 단계 구분과 예문은 영국 문화원 LearnEnglish 자료를 따랐다.
 * 위로 갈수록 정중하다. 정중함은 원어민 관행이라 상황과 억양에 따라 달라진다.
 */
const RUNGS = [
  { en: 'Would you mind closing the door?', ko: '3단계 · 격식 있는 형식. mind 뒤는 ing', cls: 'svg-berg' },
  { en: 'Could you take a message, please?', ko: '2단계 · 정중한 부탁', cls: 'svg-box-key' },
  { en: 'Can you take a message, please?', ko: '1단계 · 덜 정중, 편한 사이', cls: 'svg-box' },
];

const X0 = 44;
const W = 360 - 8 - X0;
const H = 66;
const GAP = 24;
const TOP = 36;

export default function RequestLadder() {
  const bottom = TOP + RUNGS.length * H + (RUNGS.length - 1) * GAP;
  const vbH = bottom + 8 + 30;
  return (
    <svg viewBox={`0 0 360 ${vbH}`} role="img" aria-label="부탁 표현은 Can you, Could you, Would you mind 순으로 정중해진다.">
      <defs>
        <marker id="ar9" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      <text className="t-sub" x="22" y="18" textAnchor="middle">정중</text>
      <line className="svg-flow" x1="22" y1={bottom - 4} x2="22" y2="28" markerEnd="url(#ar9)" />
      <text className="t-sub" x="22" y={bottom + 24} textAnchor="middle">편함</text>
      {RUNGS.map((r, i) => {
        const y = TOP + i * (H + GAP);
        return (
          <g key={r.en}>
            <rect className={r.cls} x={X0} y={y} width={W} height={H} rx="8" />
            <text className="t-strong" x={X0 + 12} y={y + 29}>{r.en}</text>
            <text className="t-sub" x={X0 + 12} y={y + 50}>{r.ko}</text>
          </g>
        );
      })}
    </svg>
  );
}
