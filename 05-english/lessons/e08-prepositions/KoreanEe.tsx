/**
 * 한국어 에 로 끝나는 말이 영어에서는 at, on, in, to 로 갈린다. 한국어 쪽은 직접 쓴 짝이다.
 * 시간 세 줄은 BC 문법 페이지의 규칙, 장소 두 줄은 BC 장소 페이지와 이동 페이지의 규칙을 따른다.
 */
type Pair = { ko: string; en: string };
const PAIRS: Pair[] = [
  { ko: '3시에', en: 'at 3 o’clock' },
  { ko: '월요일에', en: 'on Monday' },
  { ko: '5월에', en: 'in May' },
  { ko: '학교에 가다', en: 'go to school' },
  { ko: '학교에 있다', en: 'at school' },
];

const H = 50;
const PITCH = 64;
const TOP = 36;
const LW = 120;
const RX = 178;
const RW = 174;

export default function KoreanEe() {
  const VB_H = TOP + (PAIRS.length - 1) * PITCH + H + 16;
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="한국어에서 에로 끝나는 다섯 표현이 영어에서는 달라진다. 3시에는 at, 월요일에는 on, 5월에는 in, 학교에 가다는 to, 학교에 있다는 at.">
      <defs>
        <marker id="arEe" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      <text className="t-sub" x="8" y="20">한국어</text>
      <text className="t-sub" x={RX} y="20">영어</text>
      {PAIRS.map((p, i) => {
        const y = TOP + i * PITCH;
        return (
          <g key={p.ko}>
            <rect className="svg-box" x="8" y={y} width={LW} height={H} rx="8" />
            <text className="t-strong" x={8 + LW / 2} y={y + 30} textAnchor="middle">{p.ko}</text>
            <line className="svg-flow" x1={8 + LW + 6} y1={y + H / 2} x2={RX - 6} y2={y + H / 2} markerEnd="url(#arEe)" />
            <rect className="svg-berg" x={RX} y={y} width={RW} height={H} rx="8" />
            <text className="t-strong" x={RX + 14} y={y + 30}>{p.en}</text>
          </g>
        );
      })}
    </svg>
  );
}
