// 형태 예시(가상 값): 두 막대 값 50과 52를 축 시작점만 달리해 그린다. 높이와 비는 코드로 계산한다.
const A = 50;
const B = 52;
const PLOT = 140; // 막대 영역 높이
const BASE = 200; // 막대 아랫선 y
const BAR_W = 44;

const PANELS = [
  { x: 8, lo: 0, hi: 60, title: '축이 0에서 시작', cls: 't-good' },
  { x: 184, lo: 48, hi: 54, title: '축이 48에서 시작', cls: 't-bad' },
];

export default function BarBaseline() {
  return (
    <svg viewBox="0 0 360 298" role="img" aria-label="같은 값 50과 52를 막대로 그린 두 그림. 축이 0에서 시작하면 두 막대 길이 비가 1.04배이고, 48에서 시작하면 2.00배로 보인다.">
      {PANELS.map((p) => {
        const h = (v: number) => ((v - p.lo) / (p.hi - p.lo)) * PLOT;
        const ratio = h(B) / h(A);
        return (
          <g key={p.title}>
            <text className="t-strong" x={p.x} y="22">{p.title}</text>
            {[{ v: A, name: 'A안', dx: 28 }, { v: B, name: 'B안', dx: 96 }].map((b) => (
              <g key={b.name}>
                <rect className="svg-berg" x={p.x + b.dx} y={BASE - h(b.v)} width={BAR_W} height={h(b.v)} rx="3" />
                <text className="t-sub" x={p.x + b.dx + BAR_W / 2} y={BASE - h(b.v) - 8} textAnchor="middle">{b.v}</text>
                <text className="t-sub" x={p.x + b.dx + BAR_W / 2} y={BASE + 22} textAnchor="middle">{b.name}</text>
              </g>
            ))}
            <line x1={p.x} y1={BASE} x2={p.x + 168} y2={BASE} stroke="var(--line)" />
            <text className={p.cls} x={p.x} y="254">길이 비 {ratio.toFixed(2)}배</text>
          </g>
        );
      })}
      <text className="t-sub" x="8" y="284">실제 값의 비는 52 나누기 50, 1.04배</text>
    </svg>
  );
}
