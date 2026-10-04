type Good = { pre?: string; stem: string; suf?: string; eq: string; mean: string };
type Bad = { word: string; eq: string; mean: string };

const GOOD: Good[] = [
  { pre: 'un-', stem: 'happy', eq: 'not + happy', mean: '행복하지 않은' },
  { stem: 'care', suf: '-less', eq: 'without + care', mean: '주의하지 않는' },
  { stem: 'sing', suf: '-er', eq: '노래하는 + 사람', mean: '가수' },
  { stem: 'quick', suf: '-ly', eq: '빠른 + 방식', mean: '빠르게' },
];
const BAD: Bad[] = [
  { word: 'under', eq: 'un + der 가 아니다', mean: '전치사 under' },
  { word: 'corner', eq: 'corn + er 가 아니다', mean: '명사 corner' },
];

const BH = 40;
const PITCH = 56;
const G_TOP = 40;
const TX = 200;
const blockW = (s: string) => 24 + s.length * 8.6;

export default function WordParts() {
  const bad0 = G_TOP + GOOD.length * PITCH + 24;
  const VB_H = bad0 + 16 + (BAD.length - 1) * PITCH + BH + 8;
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="단어를 접두사 접미사와 뿌리로 나누는 예. unhappy, careless, singer, quickly 는 조각이 뜻을 만든다. under 와 corner 는 조각이 아니다.">
      <rect className="svg-berg" x="8" y="7" width="14" height="14" rx="3" />
      <text className="t-sub" x="30" y="19">붙는 조각</text>
      <rect className="svg-box" x="124" y="7" width="14" height="14" rx="3" />
      <text className="t-sub" x="146" y="19">뿌리 단어</text>
      {GOOD.map((g, i) => {
        const y = G_TOP + i * PITCH;
        let x = 8;
        const parts: { t: string; cls: string; x: number; w: number }[] = [];
        if (g.pre) { const w = blockW(g.pre); parts.push({ t: g.pre, cls: 'svg-berg', x, w }); x += w + 4; }
        { const w = blockW(g.stem); parts.push({ t: g.stem, cls: 'svg-box', x, w }); x += w + 4; }
        if (g.suf) { const w = blockW(g.suf); parts.push({ t: g.suf, cls: 'svg-berg', x, w }); }
        return (
          <g key={g.stem}>
            {parts.map((p) => (
              <g key={p.t}>
                <rect className={p.cls} x={p.x} y={y} width={p.w} height={BH} rx="6" />
                <text className="t-strong" x={p.x + p.w / 2} y={y + 25} textAnchor="middle">{p.t}</text>
              </g>
            ))}
            <text className="t-sub" x={TX} y={y + 16}>{g.eq}</text>
            <text className="t-strong" x={TX} y={y + 36}>{g.mean}</text>
          </g>
        );
      })}
      <text className="t-bad" x="8" y={bad0}>쪼개면 틀리는 단어</text>
      {BAD.map((b, i) => {
        const y = bad0 + 16 + i * PITCH;
        const w = blockW(b.word);
        return (
          <g key={b.word}>
            <rect className="svg-box-bad" x="8" y={y} width={w} height={BH} rx="6" />
            <text className="t-strong" x={8 + w / 2} y={y + 25} textAnchor="middle">{b.word}</text>
            <text className="t-sub" x={TX} y={y + 16}>{b.eq}</text>
            <text className="t-strong" x={TX} y={y + 36}>{b.mean}</text>
          </g>
        );
      })}
    </svg>
  );
}
