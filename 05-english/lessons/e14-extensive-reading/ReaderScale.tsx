/** ERF Guide 16쪽 표의 어휘 범위(Beginner에서 Advanced). 숫자는 표의 값이다. */
type Level = { name: string; ko: string; range: string; start: boolean };

const LEVELS: Level[] = [
  { name: 'Beginner', ko: '입문', range: '1-300', start: true },
  { name: 'Elementary', ko: '초급', range: '301-800', start: true },
  { name: 'Intermediate', ko: '중급', range: '801-1500', start: false },
  { name: 'Upper Intermediate', ko: '중상급', range: '1501-2400', start: false },
  { name: 'Advanced', ko: '상급', range: '2401-4500+', start: false },
];

const H = 44;
const GAP = 10;

export default function ReaderScale() {
  const vbH = 8 + LEVELS.length * H + (LEVELS.length - 1) * GAP + 8;
  return (
    <svg viewBox={`0 0 360 ${vbH}`} role="img" aria-label="ERF 레벨 표의 다섯 단계와 어휘 범위. Beginner 1에서 300, Elementary 301에서 800, Intermediate 801에서 1500, Upper Intermediate 1501에서 2400, Advanced 2401에서 4500 이상. 앞의 두 단계가 입문 독자의 시작 구간이다.">
      {LEVELS.map((l, i) => {
        const y = 8 + i * (H + GAP);
        return (
          <g key={l.name}>
            <rect className={l.start ? 'svg-berg' : 'svg-box'} x="8" y={y} width="344" height={H} rx="8" />
            <text className="t-strong" x="22" y={y + 27}>{l.name}</text>
            <text className="t-sub" x="338" y={y + 27} textAnchor="end">{l.range}</text>
          </g>
        );
      })}
    </svg>
  );
}
