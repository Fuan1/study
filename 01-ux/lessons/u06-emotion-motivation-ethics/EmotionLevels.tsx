type Level = { ko: string; en: string; q: string; ex: string; speed: string; cls: string };

const LEVELS: Level[] = [
  { ko: '본능적', en: 'Visceral', q: '첫눈에 어떻게 느껴지는가', ex: '생김새, 질감, 소리', speed: '빠르고 자동', cls: 'pl-ui' },
  { ko: '행동적', en: 'Behavioral', q: '쓰는 동안 잘 되는가', ex: '쉬움, 효율, 실수 복구', speed: '사용 중', cls: 'pl-mid' },
  { ko: '반성적', en: 'Reflective', q: '쓰고 나서 어떤 의미인가', ex: '기억, 자기 이미지, 평가', speed: '느리고 의식적', cls: 'pl-ux' },
];

export default function EmotionLevels() {
  const h = 78;
  const gap = 22;
  return (
    <svg viewBox="0 0 360 290" role="img" aria-label="Norman의 감정 디자인 세 수준. 위에서 아래로 본능적, 행동적, 반성적 수준이고 아래로 갈수록 느리고 의식적이다.">
      <defs>
        <marker id="ar-emo" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      {LEVELS.map((l, i) => {
        const y = 6 + i * (h + gap);
        return (
          <g key={l.en}>
            <rect className={l.cls} x="8" y={y} width="344" height={h} rx="8" />
            <text x="22" y={y + 24}><tspan className="t-strong">{l.ko}</tspan><tspan className="t-sub" dx="8">{l.en}</tspan></text>
            <text className="t-accent" x="338" y={y + 24} textAnchor="end">{l.speed}</text>
            <text x="22" y={y + 48} fontSize="13">{l.q}</text>
            <text className="t-sub" x="22" y={y + 67}>{l.ex}</text>
            {i < LEVELS.length - 1 && <line className="svg-flow" x1="180" y1={y + h + 2} x2="180" y2={y + h + gap - 2} markerEnd="url(#ar-emo)" />}
          </g>
        );
      })}
    </svg>
  );
}
