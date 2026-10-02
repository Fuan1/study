/** 개념도다. 행동선은 설명용 곡선이며 실측 수치가 아니다. 곡선 점은 코드로 계산한다. */
const L = 48;
const T = 14;
const W = 292;
const H = 236;
const K = 0.2; // 곡선 모양을 정하는 상수(설명용)

// 능력 a(0 어려움 ~ 1 쉬움), 동기 m(0 낮음 ~ 1 높음). 능력이 낮을수록 더 높은 동기가 필요하다.
const lineMotivation = (a: number) => Math.min(1, K / a);
const sx = (a: number) => L + a * W;
const sy = (m: number) => T + (1 - m) * H;

const curve = Array.from({ length: 41 }, (_, i) => 0.1 + (i / 40) * 0.9)
  .map((a) => `${sx(a).toFixed(1)},${sy(lineMotivation(a)).toFixed(1)}`)
  .join(' ');

const dots = [
  { a: 0.3, m: 0.85, label: 'A', tone: 'good' as const },
  { a: 0.82, m: 0.08, label: 'B', tone: 'bad' as const },
];

export default function FoggModel() {
  return (
    <svg viewBox="0 0 360 330" role="img" aria-label="Fogg 행동 모델 개념도. 세로축은 동기, 가로축은 능력이다. 행동선 위쪽에서 촉발이 오면 행동하고, 아래쪽에서는 행동하지 않는다.">
      <defs>
        <marker id="ar-fogg" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      <rect className="svg-box" x={L} y={T} width={W} height={H} rx="6" />
      <polygon points={`${curve} ${sx(1)},${sy(0)} ${sx(0.1)},${sy(0)}`} fill="var(--warm-soft)" />
      <polyline points={curve} fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinejoin="round" />
      <text className="t-accent" x={sx(0.5)} y={sy(lineMotivation(0.5)) - 10}>행동선</text>
      <text className="t-good" x={L + W - 10} y={T + 22} textAnchor="end">촉발이 오면 행동</text>
      <text className="t-warm" x={sx(0.25)} y={T + H - 34}>촉발해도 행동 안 함</text>
      {dots.map((d) => (
        <g key={d.label}>
          <circle cx={sx(d.a)} cy={sy(d.m)} r="9" className={d.tone === 'good' ? 'svg-box-good' : 'svg-box-bad'} />
          <text className="t-strong" x={sx(d.a)} y={sy(d.m) + 5} textAnchor="middle">{d.label}</text>
        </g>
      ))}
      <text className="t-sub" x={L + 6} y={T + H + 26}>어렵다</text>
      <text className="t-sub" x={L + W - 6} y={T + H + 26} textAnchor="end">쉽다</text>
      <line className="svg-flow" x1={L + 52} y1={T + H + 22} x2={L + W - 52} y2={T + H + 22} markerEnd="url(#ar-fogg)" />
      <text className="t-strong" x={L + W / 2} y={T + H + 46} textAnchor="middle">능력</text>
      <text className="t-strong" x={L - 8} y={T + 90} textAnchor="end">동기</text>
      <text className="t-sub" x={L - 8} y={T + 108} textAnchor="end">높음</text>
      <text className="t-sub" x={L - 8} y={T + H - 4} textAnchor="end">낮음</text>
      <text className="t-sub" x="180" y="324" textAnchor="middle">A 동기 높음, 어려워도 함. B 동기 낮음, 쉬워도 안 함</text>
    </svg>
  );
}
