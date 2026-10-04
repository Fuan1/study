/**
 * 짧은 이메일의 블록 구조. 형태 예시이고 문장은 이 글이 만들었다.
 * 제목: Saturday?  본문 네 덩어리를 위에서 아래로 읽는다.
 */
type Block = { label: string; text: string; key?: boolean };

const BLOCKS: Block[] = [
  { label: '1 인사', text: 'Hi Mina,' },
  { label: '2 용건: 첫 문장에 바로', text: 'Are you free on Saturday?', key: true },
  { label: '3 시간·장소 같은 구체 정보', text: 'Shall we meet at noon?' },
  { label: '4 마무리 인사와 이름', text: 'See you soon! Jisoo' },
];

const W = 344;
const H = 66;
const GAP = 24;
const TOP = 8;
const VB_H = TOP + BLOCKS.length * H + (BLOCKS.length - 1) * GAP + 16;

export default function MessageBlocks() {
  const y = (i: number) => TOP + i * (H + GAP);
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="짧은 이메일의 네 덩어리. 인사, 첫 문장의 용건, 구체 정보, 마무리 인사와 이름 순서다.">
      <defs>
        <marker id="ar-e17b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      {BLOCKS.map((b, i) => (
        <g key={b.label}>
          <rect className={b.key ? 'svg-berg' : 'svg-box'} x="8" y={y(i)} width={W} height={H} rx="8" />
          <text className="t-sub" x="22" y={y(i) + 26}>{b.label}</text>
          <text className="t-strong" x="22" y={y(i) + 49}>{b.text}</text>
          {i < BLOCKS.length - 1 && (
            <line className="svg-flow" x1="180" y1={y(i) + H + 6} x2="180" y2={y(i) + H + GAP - 6} markerEnd="url(#ar-e17b)" />
          )}
        </g>
      ))}
    </svg>
  );
}
