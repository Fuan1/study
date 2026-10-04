/**
 * 짧은 글(자기소개) 한 단락의 블록 구조. 형태 예시이고 문장은 이 글이 만들었다.
 * 주제 문장 하나를 맨 위에 두고, 들여 쓴 뒷받침 문장이 그 주제를 받친다.
 */
const TOPIC = { label: '주제 문장: 무엇에 대한 글인지', text: "I'm Jisoo, and I live in Busan." };
const SUPPORT = [
  { label: '뒷받침 1: 하는 일', text: 'I work in a bookshop.' },
  { label: '뒷받침 2: 공부', text: 'I study English every evening.' },
  { label: '뒷받침 3: 주말', text: 'I walk by the sea on weekends.' },
];
const END = { label: '마무리: 한 줄 인사', text: 'Nice to meet you!' };

const H = 66;
const GAP = 14;
const TOP = 8;
const SX = 40;
const SW = 360 - 8 - SX;
const yAt = (i: number) => TOP + i * (H + GAP);
const VB_H = yAt(4) + H + 16;

export default function ParagraphBlocks() {
  const lineX = 24;
  const lineTop = yAt(0) + H;
  const lineBottom = yAt(3) + H / 2;
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="짧은 글의 구조. 맨 위에 주제 문장 하나, 그 아래 들여 쓴 뒷받침 문장 세 개, 마지막에 마무리 한 줄이 온다.">
      <rect className="svg-berg" x="8" y={yAt(0)} width="344" height={H} rx="8" />
      <text className="t-sub" x="22" y={yAt(0) + 26}>{TOPIC.label}</text>
      <text className="t-strong" x="22" y={yAt(0) + 49}>{TOPIC.text}</text>
      <line className="svg-flow" x1={lineX} y1={lineTop} x2={lineX} y2={lineBottom} />
      {SUPPORT.map((s, i) => (
        <g key={s.label}>
          <line className="svg-flow" x1={lineX} y1={yAt(i + 1) + H / 2} x2={SX - 6} y2={yAt(i + 1) + H / 2} markerEnd="url(#ar-e17c)" />
          <rect className="svg-box" x={SX} y={yAt(i + 1)} width={SW} height={H} rx="8" />
          <text className="t-sub" x={SX + 14} y={yAt(i + 1) + 26}>{s.label}</text>
          <text className="t-strong" x={SX + 14} y={yAt(i + 1) + 49}>{s.text}</text>
        </g>
      ))}
      <rect className="svg-box" x="8" y={yAt(4)} width="344" height={H} rx="8" />
      <text className="t-sub" x="22" y={yAt(4) + 26}>{END.label}</text>
      <text className="t-strong" x="22" y={yAt(4) + 49}>{END.text}</text>
      <defs>
        <marker id="ar-e17c" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
    </svg>
  );
}
