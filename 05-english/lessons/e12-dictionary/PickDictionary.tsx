type Step = { q: string; yes: string };

const STEPS: Step[] = [
  { q: '뜻만 빨리 알면 되나?', yes: '영한 또는 번역이 붙은 항목' },
  { q: '찾은 뜻이 문장에 안 맞나?', yes: '영어 정의와 예문을 읽는다' },
  { q: '쓰는 법이 궁금한가?', yes: '문법 표시와 예문 모양을 본다' },
];

// 여백 기준: 상자 안 14px, 두 줄 baseline 간격 22px, 상자 사이 40px(화살표 라벨은 선에서 14px 떨어뜨림).
const W = 344;
const H = 70;
const GAP = 40;

export default function PickDictionary() {
  const y = (i: number) => 8 + i * (H + GAP);
  const last = STEPS.length;
  const bottom = y(last) + H;
  return (
    <svg viewBox={`0 0 360 ${bottom + 12}`} role="img" aria-label="사전 고르는 순서. 뜻만 필요하면 영한이나 번역이 붙은 항목, 뜻이 문장에 안 맞으면 영어 정의와 예문, 쓰는 법이 궁금하면 문법 표시와 예문, 모두 아니면 읽기로 돌아간다.">
      <defs>
        <marker id="ar-dict" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      {STEPS.map((s, i) => (
        <g key={s.q}>
          <rect className="svg-box" x="8" y={y(i)} width={W} height={H} rx="8" />
          <text className="t-strong" x="22" y={y(i) + 29}>{s.q}</text>
          <text className="t-good" x="22" y={y(i) + 51}>예</text>
          <text className="t-sub" x="44" y={y(i) + 51}>{s.yes}</text>
          <line className="svg-flow" x1="180" y1={y(i) + H + 6} x2="180" y2={y(i) + H + GAP - 6} markerEnd="url(#ar-dict)" />
          <text className="t-sub" x="194" y={y(i) + H + GAP / 2 + 5}>아니오</text>
        </g>
      ))}
      <rect className="svg-box-key" x="8" y={y(last)} width={W} height={H} rx="8" />
      <text className="t-strong" x="22" y={y(last) + 29}>읽기로 돌아간다</text>
      <text className="t-sub" x="22" y={y(last) + 51}>뜻 한 줄만 적고 간다</text>
    </svg>
  );
}
