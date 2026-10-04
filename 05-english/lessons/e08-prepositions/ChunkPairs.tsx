/**
 * 형태 예시. 틀린 짝 세 쌍은 Editor World 의 오류 목록(interested on, depend to, married with)에서 가져왔다.
 * 맞는 짝은 British Council 형용사+전치사 페이지(interested in, married to)와 위 목록의 교정형이다.
 */
type Pair = { bad: string; good: string; ko: string };
const PAIRS: Pair[] = [
  { bad: 'interested on', good: 'interested in', ko: '…에 관심이 있다' },
  { bad: 'depend to', good: 'depend on', ko: '…에 달려 있다' },
  { bad: 'married with', good: 'married to', ko: '…와 결혼했다' },
];

const H = 66;
const PITCH = 80;
const TOP = 36;
const LX = 8;
const LW = 148;
const RX = 200;
const RW = 152;

export default function ChunkPairs() {
  const VB_H = TOP + (PAIRS.length - 1) * PITCH + H + 16;
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="낱말 하나씩 고른 틀린 짝과 덩어리로 외운 맞는 짝. interested on 대신 interested in, depend to 대신 depend on, married with 대신 married to.">
      <defs>
        <marker id="arChunk" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      <text className="t-sub" x={LX} y="20">낱말로 고른 짝</text>
      <text className="t-sub" x={RX} y="20">덩어리로 외운 짝</text>
      {PAIRS.map((p, i) => {
        const y = TOP + i * PITCH;
        return (
          <g key={p.bad}>
            <rect className="svg-box-bad" x={LX} y={y} width={LW} height={H} rx="8" />
            <text className="t-strong" x={LX + 14} y={y + 28}>{p.bad}</text>
            <text className="t-bad" x={LX + 14} y={y + 48}>틀린 짝</text>
            <line className="svg-flow" x1={LX + LW + 6} y1={y + H / 2} x2={RX - 6} y2={y + H / 2} markerEnd="url(#arChunk)" />
            <rect className="svg-box-good" x={RX} y={y} width={RW} height={H} rx="8" />
            <text className="t-strong" x={RX + 14} y={y + 28}>{p.good}</text>
            <text className="t-sub" x={RX + 14} y={y + 48}>{p.ko}</text>
          </g>
        );
      })}
    </svg>
  );
}
