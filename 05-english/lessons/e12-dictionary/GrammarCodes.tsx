type Row = { code: string; line1: string; line2: string };

const ROWS: Row[] = [
  { code: '[C]', line1: 'two books', line2: '셀 수 있다. a 나 복수형을 쓴다' },
  { code: '[U]', line1: 'a piece of advice', line2: '복수형이 없다. 단위로 센다' },
  { code: '[T]', line1: 'I enjoyed the movie.', line2: '뒤에 목적어가 온다' },
  { code: '[I]', line1: 'We arrived at the station.', line2: '목적어가 없다. at, in 이 붙는다' },
];

const H = 66;
const GAP = 12;
const CODE_W = 56;

export default function GrammarCodes() {
  const y = (i: number) => 8 + i * (H + GAP);
  const bottom = y(ROWS.length - 1) + H;
  return (
    <svg viewBox={`0 0 360 ${bottom + 12}`} role="img" aria-label="문법 표시와 쓰는 모양. [C] 는 two books, [U] 는 a piece of advice, [T] 는 I enjoyed the movie, [I] 는 We arrived at the station.">
      {ROWS.map((r, i) => (
        <g key={r.code}>
          <rect className="svg-box" x="8" y={y(i)} width="344" height={H} rx="8" />
          <rect className="svg-berg" x="20" y={y(i) + 12} width={CODE_W} height={H - 24} rx="6" />
          <text className="t-strong" x={20 + CODE_W / 2} y={y(i) + H / 2 + 5} textAnchor="middle">{r.code}</text>
          <text className="t-strong" x="92" y={y(i) + 29}>{r.line1}</text>
          <text className="t-sub" x="92" y={y(i) + 51}>{r.line2}</text>
        </g>
      ))}
    </svg>
  );
}
