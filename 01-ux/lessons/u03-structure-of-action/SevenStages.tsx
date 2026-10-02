type Stage = { n: number; name: string; sub: string; x: number; y: number; cls: string };

const W = 140;
const H = 42;
const STAGES: Stage[] = [
  { n: 2, name: '계획', sub: '가능한 방법 찾기', x: 8, y: 96, cls: 'pl-ux' },
  { n: 3, name: '명세', sub: '방법 하나 고르기', x: 8, y: 158, cls: 'pl-ux' },
  { n: 4, name: '수행', sub: '실제로 조작', x: 8, y: 220, cls: 'pl-ux' },
  { n: 5, name: '지각', sub: '무슨 일이 생겼나', x: 212, y: 220, cls: 'pl-ui' },
  { n: 6, name: '해석', sub: '그게 무슨 뜻인가', x: 212, y: 158, cls: 'pl-ui' },
  { n: 7, name: '비교', sub: '목표에 닿았나', x: 212, y: 96, cls: 'pl-ui' },
];

export default function SevenStages() {
  return (
    <svg viewBox="0 0 360 338" role="img" aria-label="행동 7단계. 목표에서 시작해 왼쪽의 계획, 명세, 수행이 실행의 간극을 이루고, 세계(제품)를 거쳐 오른쪽의 지각, 해석, 비교가 평가의 간극을 이룬 뒤 다시 목표로 돌아오는 순환.">
      <defs>
        <marker id="ar-u03-stages" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      <rect className="svg-box" x="110" y="8" width={W} height={H} rx="8" />
      <text className="t-strong" x="180" y="26" textAnchor="middle">1 목표</text>
      <text className="t-sub" x="180" y="42" textAnchor="middle">얻고 싶은 결과</text>

      <text className="t-accent" x="8" y="82">실행의 간극</text>
      <text className="t-warm" x="352" y="82" textAnchor="end">평가의 간극</text>

      {STAGES.map((s) => (
        <g key={s.n}>
          <rect className={s.cls} x={s.x} y={s.y} width={W} height={H} rx="8" />
          <text className="t-strong" x={s.x + W / 2} y={s.y + 18} textAnchor="middle">{s.n} {s.name}</text>
          <text className="t-sub" x={s.x + W / 2} y={s.y + 35} textAnchor="middle">{s.sub}</text>
        </g>
      ))}

      <rect className="svg-box" x="110" y="296" width={W} height="34" rx="8" />
      <text className="t-strong" x="180" y="318" textAnchor="middle">세계 (제품)</text>

      <g className="svg-flow">
        <path d="M135 49 L85 95" markerEnd="url(#ar-u03-stages)" />
        <path d="M78 139 L78 157" markerEnd="url(#ar-u03-stages)" />
        <path d="M78 201 L78 219" markerEnd="url(#ar-u03-stages)" />
        <path d="M85 263 L140 295" markerEnd="url(#ar-u03-stages)" />
        <path d="M220 295 L275 263" markerEnd="url(#ar-u03-stages)" />
        <path d="M282 219 L282 201" markerEnd="url(#ar-u03-stages)" />
        <path d="M282 157 L282 139" markerEnd="url(#ar-u03-stages)" />
        <path d="M275 95 L225 49" markerEnd="url(#ar-u03-stages)" />
      </g>
    </svg>
  );
}
