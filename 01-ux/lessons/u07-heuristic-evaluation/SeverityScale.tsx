const FACTORS = [
  { name: '빈도', q: '자주 생기나' },
  { name: '영향', q: '넘기 어렵나' },
  { name: '지속성', q: '계속 겪나' },
];

const LEVELS = [
  { n: 4, name: '사용성 재앙', act: '출시 전에 반드시 고친다', c: 'var(--bad)' },
  { n: 3, name: '주요 문제', act: '높은 우선순위로 고친다', c: 'var(--bad)' },
  { n: 2, name: '사소한 문제', act: '낮은 우선순위', c: 'var(--warm)' },
  { n: 1, name: '미관상 문제', act: '여유가 있을 때만 고친다', c: 'var(--warm)' },
  { n: 0, name: '문제 아님', act: '평가자가 문제로 보지 않음', c: 'var(--muted)' },
];

export default function SeverityScale() {
  const fw = 108;
  return (
    <svg viewBox="0 0 360 336" role="img" aria-label="빈도, 영향, 지속성 세 요소를 함께 보고 문제를 0에서 4까지의 심각도로 매기는 도식. 4는 사용성 재앙, 3은 주요 문제, 2는 사소한 문제, 1은 미관상 문제, 0은 문제 아님.">
      <defs>
        <marker id="sev-ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      {FACTORS.map((f, i) => {
        const x = 8 + i * (fw + 10);
        return (
          <g key={f.name}>
            <rect className="svg-box-key" x={x} y="6" width={fw} height="52" rx="6" />
            <text className="t-strong" x={x + fw / 2} y="26" textAnchor="middle">{f.name}</text>
            <text className="t-sub" x={x + fw / 2} y="46" textAnchor="middle">{f.q}</text>
          </g>
        );
      })}
      <line className="svg-flow" x1="180" y1="62" x2="180" y2="84" markerEnd="url(#sev-ar)" />
      {LEVELS.map((l, i) => {
        const y = 90 + i * 48;
        return (
          <g key={l.n}>
            <rect x="8" y={y} width="344" height="42" rx="8" style={{ fill: 'var(--bg)', stroke: l.c, strokeWidth: 1.5 }} />
            <text x="30" y={y + 28} textAnchor="middle" fontSize="20" fontWeight="700" style={{ fill: l.c }}>{l.n}</text>
            <text className="t-strong" x="54" y={y + 18}>{l.name}</text>
            <text className="t-sub" x="54" y={y + 35}>{l.act}</text>
          </g>
        );
      })}
    </svg>
  );
}
