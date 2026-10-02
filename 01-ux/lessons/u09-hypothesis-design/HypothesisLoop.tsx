type Node = { x: number; y: number; no: string; title: string; lines: string[] };

const W = 152;
const H = 76;

const NODES: Node[] = [
  { x: 8, y: 12, no: '1', title: '가정', lines: ['아직 확인하지 않은', '믿음. 틀릴 수 있다'] },
  { x: 200, y: 12, no: '2', title: '가설', lines: ['가정을 확인 가능한', '문장으로 쓴다'] },
  { x: 200, y: 172, no: '3', title: '최소 실험', lines: ['가장 싸게 신호를', '얻는 방법을 고른다'] },
  { x: 8, y: 172, no: '4', title: '학습', lines: ['유지, 수정, 폐기를', '근거로 결정한다'] },
];

export default function HypothesisLoop() {
  return (
    <svg viewBox="0 0 360 270" role="img" aria-label="가정, 가설, 최소 실험, 학습의 네 단계가 시계 방향으로 이어지고 학습에서 다시 가정으로 돌아가는 순환 도식">
      <defs>
        <marker id="arLoop" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      {NODES.map((n, i) => (
        <g key={n.title}>
          <rect className={i === 1 ? 'svg-box-key' : 'svg-box'} x={n.x} y={n.y} width={W} height={H} rx="8" />
          <text className="t-strong" x={n.x + 12} y={n.y + 26}>{n.no}  {n.title}</text>
          {n.lines.map((t, j) => (
            <text key={t} className="t-sub" x={n.x + 12} y={n.y + 47 + j * 18}>{t}</text>
          ))}
        </g>
      ))}
      <line className="svg-flow" x1="162" y1="50" x2="198" y2="50" markerEnd="url(#arLoop)" />
      <line className="svg-flow" x1="276" y1="90" x2="276" y2="170" markerEnd="url(#arLoop)" />
      <line className="svg-flow" x1="198" y1="210" x2="162" y2="210" markerEnd="url(#arLoop)" />
      <line className="svg-flow" x1="84" y1="170" x2="84" y2="90" markerEnd="url(#arLoop)" />
      <text className="t-accent" x="180" y="126" textAnchor="middle">작게 돌리고</text>
      <text className="t-accent" x="180" y="144" textAnchor="middle">자주 돌린다</text>
    </svg>
  );
}
