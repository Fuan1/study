type Step = { head: string; sub: string };

const STEPS: Step[] = [
  { head: '1 문장에서 품사를 짐작한다', sub: 'I 뒤의 booked 는 동사 자리' },
  { head: '2 같은 품사 구획만 본다', sub: 'book 의 verb 구획 안 뜻들' },
  { head: '3 예문을 내 문장과 비교한다', sub: 'a table 을 예약하는 예문을 찾는다' },
  { head: '4 맞는 뜻 한 줄을 적는다', sub: '예약하다' },
];

// 위 문장 상자는 한 줄이라 높이 44, 단계 상자는 두 줄이라 66.
const SH = 44;
const H = 66;
const GAP = 32;

export default function PickSense() {
  const y = (i: number) => 8 + SH + GAP + i * (H + GAP);
  const bottom = y(STEPS.length - 1) + H;
  const arrow = (y1: number, y2: number) => (
    <line className="svg-flow" x1="180" y1={y1 + 6} x2="180" y2={y2 - 6} markerEnd="url(#ar-sense)" />
  );
  return (
    <svg viewBox={`0 0 360 ${bottom + 12}`} role="img" aria-label="뜻이 여러 개일 때 고르는 순서. 문장 I booked a table for two 에서 품사를 짐작하고, 같은 품사 구획의 뜻을 보고, 예문을 비교해 예약하다를 고른다.">
      <defs>
        <marker id="ar-sense" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      <rect className="svg-box-key" x="8" y="8" width="344" height={SH} rx="8" />
      <text className="t-strong" x="180" y={8 + SH / 2 + 5} textAnchor="middle">I booked a table for two.</text>
      {arrow(8 + SH, y(0))}
      {STEPS.map((s, i) => (
        <g key={s.head}>
          <rect className={i === STEPS.length - 1 ? 'svg-berg' : 'svg-box'} x="8" y={y(i)} width="344" height={H} rx="8" />
          <text className="t-strong" x="22" y={y(i) + 29}>{s.head}</text>
          <text className="t-sub" x="22" y={y(i) + 51}>{s.sub}</text>
          {i < STEPS.length - 1 && arrow(y(i) + H, y(i + 1))}
        </g>
      ))}
    </svg>
  );
}
