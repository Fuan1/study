const BOXES = [
  { title: '문제 정의', tag: 'U8', note: '누구의 어떤 문제인가' },
  { title: '가설과 설계', tag: 'U9', note: '바꾸면 무엇이 달라지나' },
  { title: '테스트와 측정', tag: 'U10', note: '관찰하고 수치로 확인' },
  { title: '학습', tag: '해석', note: '맞았나, 틀렸나, 왜' },
];

export default function ImproveLoop() {
  const x = 8;
  const w = 172;
  const h = 68;
  const gap = 32;
  const y = (i: number) => 8 + i * (h + gap);
  const cy = (i: number) => y(i) + h / 2;
  return (
    <svg viewBox="0 0 360 388" role="img" aria-label="문제 정의, 가설과 설계, 테스트와 측정, 학습의 순환. 학습에서 가설이 틀렸으면 가설과 설계로, 문제를 잘못 짚었으면 문제 정의로 돌아간다.">
      <defs>
        <marker id="ar-il" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      {BOXES.map((b, i) => (
        <g key={b.title}>
          <rect className={i === 2 ? 'svg-box-key' : 'svg-box'} x={x} y={y(i)} width={w} height={h} rx="8" />
          <text x={x + 14} y={y(i) + 29}><tspan className="t-strong">{b.title}</tspan><tspan className="t-accent" dx="8">{b.tag}</tspan></text>
          <text className="t-sub" x={x + 14} y={y(i) + 50}>{b.note}</text>
          {i < BOXES.length - 1 && <line className="svg-flow" x1={x + w / 2} y1={y(i) + h + 1} x2={x + w / 2} y2={y(i) + h + gap - 1} markerEnd="url(#ar-il)" />}
        </g>
      ))}
      <path className="svg-flow" d={`M${x + w},${cy(3) - 12} H196 V${cy(1)} H${x + w + 2}`} markerEnd="url(#ar-il)" strokeDasharray="4 3" />
      <path className="svg-flow" d={`M${x + w},${cy(3) + 12} H340 V${cy(0)} H${x + w + 2}`} markerEnd="url(#ar-il)" strokeDasharray="4 3" />
      <text className="t-warm" x="208" y={cy(1) + 55}>가설이 틀렸다</text>
      <text className="t-warm" x="332" y={cy(0) + 55} textAnchor="end">문제가 달랐다</text>
    </svg>
  );
}
