const ROWS = [
  { y: 8, name: '설계자 모델', sub: '설계자가 의도한 작동 방식', cls: 'svg-box' },
  { y: 98, name: '시스템 이미지', sub: '화면, 반응, 문구, 설명 전부', cls: 'svg-box-key' },
  { y: 188, name: '사용자 모델', sub: '사용자가 믿는 작동 방식', cls: 'svg-box' },
];

export default function ModelTriad() {
  return (
    <svg viewBox="0 0 360 252" role="img" aria-label="설계자 모델이 시스템 이미지로 구현되고, 사용자는 시스템 이미지를 보고 사용자 모델을 만든다. 설계자와 사용자는 서로 직접 소통할 수 없다.">
      <defs>
        <marker id="ar-u03-triad" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      {ROWS.map((r) => (
        <g key={r.name}>
          <rect className={r.cls} x="8" y={r.y} width="230" height="56" rx="8" />
          <text className="t-strong" x="22" y={r.y + 24}>{r.name}</text>
          <text className="t-sub" x="22" y={r.y + 44}>{r.sub}</text>
        </g>
      ))}
      <path className="svg-flow" d="M40 65 L40 97" markerEnd="url(#ar-u03-triad)" />
      <text className="t-sub" x="52" y="86">제품으로 구현</text>
      <path className="svg-flow" d="M40 155 L40 187" markerEnd="url(#ar-u03-triad)" />
      <text className="t-sub" x="52" y="176">보고 추론</text>
      <path d="M244 36 H262 V216 H244" fill="none" stroke="var(--bad)" strokeWidth="2" strokeDasharray="5 3" />
      <text className="t-bad" x="270" y="118">직접 전달</text>
      <text className="t-bad" x="270" y="136">안 됨</text>
    </svg>
  );
}
