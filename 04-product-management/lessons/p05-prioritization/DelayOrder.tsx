/**
 * 형태 예시(가상 값). 큰 일 X 는 주당 지연 비용 80,000, 12주. 작은 일 Y 는 주당 8,000, 1주.
 * 먼저 하는 일은 기다리지 않고, 나중 일은 먼저 하는 일의 기간만큼 기다린다. 기다린 손실 = 주당 지연 비용 × 기다린 주.
 */
type Job = { id: 'X' | 'Y'; cod: number; weeks: number };
const X: Job = { id: 'X', cod: 80000, weeks: 12 };
const Y: Job = { id: 'Y', cod: 8000, weeks: 1 };

const ORDERS: { first: Job; second: Job }[] = [
  { first: X, second: Y },
  { first: Y, second: X },
];

const X0 = 24;
const WK = 24;
const BH = 40;
const BLOCK_TOP = 12;
const GROUP_TOP = 70;
const GROUP = 106;
const fmt = (n: number) => n.toLocaleString('en-US');

export default function DelayOrder() {
  const VB_H = GROUP_TOP + GROUP + BLOCK_TOP + BH + 24 + 8;
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="작업 순서에 따른 기다림 손실. 작은 일 Y를 먼저 하면 손실이 80,000, 큰 일 X를 먼저 하면 96,000이다.">
      <rect className="svg-box" x="8" y="7" width="14" height="14" rx="3" />
      <text className="t-sub" x="30" y="20">X 주당 {fmt(X.cod)} · {X.weeks}주</text>
      <rect className="svg-berg" x="8" y="27" width="14" height="14" rx="3" />
      <text className="t-sub" x="30" y="40">Y 주당 {fmt(Y.cod)} · {Y.weeks}주</text>
      {ORDERS.map((o, i) => {
        const y0 = GROUP_TOP + i * GROUP;
        const w1 = o.first.weeks * WK;
        const w2 = o.second.weeks * WK;
        const loss = o.second.cod * o.first.weeks;
        const blockTop = y0 + BLOCK_TOP;
        return (
          <g key={i}>
            <text className="t-strong" x="8" y={y0}>{o.first.id} 먼저</text>
            <rect className={o.first.id === 'Y' ? 'svg-berg' : 'svg-box'} x={X0} y={blockTop} width={w1} height={BH} rx="4" />
            {o.first.id === 'X' && <text className="t-strong" x={X0 + w1 / 2} y={blockTop + 25} textAnchor="middle">X · 12주</text>}
            <rect className={o.second.id === 'Y' ? 'svg-berg' : 'svg-box'} x={X0 + w1} y={blockTop} width={w2} height={BH} rx="4" />
            {o.second.id === 'X' && <text className="t-strong" x={X0 + w1 + w2 / 2} y={blockTop + 25} textAnchor="middle">X · 12주</text>}
            <text className="t-sub" x="8" y={blockTop + BH + 24}>기다린 {o.second.id}: {fmt(o.second.cod)} × {o.first.weeks}주 = {fmt(loss)}</text>
          </g>
        );
      })}
    </svg>
  );
}
