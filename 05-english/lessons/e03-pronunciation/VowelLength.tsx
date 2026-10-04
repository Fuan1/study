/**
 * 형태 예시(가상 값). 막대 길이는 모양만 보이는 값이다. 측정값이 아니다.
 * 짝은 Walker 의 LFC 해설에 나오는 단어쌍이다. 같은 모음이고 뒤 자음이 유성이면 길고, 무성이면 짧다.
 */
type Pair = { long: string; short: string };

const PAIRS: Pair[] = [
  { long: 'made', short: 'mate' },
  { long: 'eyes', short: 'ice' },
  { long: 'bag', short: 'back' },
];

const X0 = 64;
const LONG = 170;
const SHORT = 112;
const BH = 22;
const ROW = 32;
const GROUP = 24;
const TOP = 8;

export default function VowelLength() {
  const gy = (i: number) => TOP + i * (2 * ROW + GROUP);
  const VB_H = gy(PAIRS.length - 1) + ROW + BH + 1 + 8;
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="같은 모음에서 뒤 자음이 유성이면 모음이 길고 무성이면 짧다. made와 mate, eyes와 ice, bag과 back.">
      {PAIRS.map((p, i) => {
        const y = gy(i);
        return (
          <g key={p.long}>
            <text className="t-strong" x="8" y={y + 16}>{p.long}</text>
            <rect className="svg-berg" x={X0} y={y} width={LONG} height={BH} rx="4" />
            <text className="t-sub" x={X0 + LONG + 8} y={y + 16}>길다</text>
            <text className="t-strong" x="8" y={y + ROW + 16}>{p.short}</text>
            <rect className="svg-box" x={X0} y={y + ROW} width={SHORT} height={BH} rx="4" />
            <text className="t-sub" x={X0 + SHORT + 8} y={y + ROW + 16}>짧다</text>
          </g>
        );
      })}
    </svg>
  );
}
