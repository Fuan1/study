const Q = [
  { x: 50, name: 'Discover', mode: '발산', what: '문제 이해' },
  { x: 134, name: 'Define', mode: '수렴', what: '문제 정의' },
  { x: 218, name: 'Develop', mode: '발산', what: '해법 탐색' },
  { x: 302, name: 'Deliver', mode: '수렴', what: '해법 시험' },
];

export default function DoubleDiamond() {
  return (
    <svg viewBox="0 0 360 262" role="img" aria-label="더블 다이아몬드. 왼쪽 다이아몬드는 문제 공간에서 Discover로 넓히고 Define으로 좁힌다. 오른쪽 다이아몬드는 해법 공간에서 Develop으로 넓히고 Deliver로 좁힌다.">
      <text className="t-accent" x="92" y="22" textAnchor="middle">문제 공간</text>
      <text className="t-accent" x="260" y="22" textAnchor="middle">해법 공간</text>
      <polygon className="svg-berg" points="8,110 92,40 176,110 92,180" />
      <polygon className="svg-berg" points="176,110 260,40 344,110 260,180" />
      <line x1="92" y1="40" x2="92" y2="180" style={{ stroke: 'var(--accent)', strokeWidth: 1, strokeDasharray: '4 3' }} />
      <line x1="260" y1="40" x2="260" y2="180" style={{ stroke: 'var(--accent)', strokeWidth: 1, strokeDasharray: '4 3' }} />
      <circle cx="176" cy="110" r="4" style={{ fill: 'var(--warm)' }} />
      {Q.map((q) => (
        <g key={q.name} textAnchor="middle">
          <text className="t-strong" x={q.x} y="208">{q.name}</text>
          <text className="t-accent" x={q.x} y="227">{q.mode}</text>
          <text className="t-sub" x={q.x} y="246">{q.what}</text>
        </g>
      ))}
    </svg>
  );
}
