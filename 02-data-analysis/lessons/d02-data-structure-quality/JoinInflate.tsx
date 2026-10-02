/** 1:N 조인 뒤 1쪽 금액을 더하면 N 쪽 행 수만큼 복제된다. 가상 주문 3건과 품목 6행에서 합계를 직접 계산한다. */
const AMOUNTS = [10000, 20000, 30000]; // 주문 금액(가상)
const ITEMS = [2, 1, 3]; // 주문별 품목 행 수(가상)

const BASE = AMOUNTS.reduce((s, a) => s + a, 0);
const JOINED = AMOUNTS.reduce((s, a, i) => s + a * ITEMS[i], 0);
const JOINED_ROWS = ITEMS.reduce((s, n) => s + n, 0);
const RATIO = JOINED / BASE;

const X0 = 8;
const MAXW = 240; // 가장 긴 막대 폭
const BAR_H = 22;
const PITCH = 76;
const fmt = (n: number) => n.toLocaleString('en-US');

const ROWS = [
  { label: `조인 전 주문 합계 (${AMOUNTS.length}행)`, value: BASE, bad: false },
  { label: `조인 후 주문 합계 (${JOINED_ROWS}행)`, value: JOINED, bad: true },
];

export default function JoinInflate() {
  const lastBarBottom = 8 + (ROWS.length - 1) * PITCH + 28 + BAR_H; // 134
  const noteY = lastBarBottom + 24;
  const H = Math.ceil(noteY + 4 + 14);
  return (
    <svg viewBox={`0 0 360 ${H}`} role="img" aria-label={`주문 3건의 금액 합계는 ${fmt(BASE)}이다. 품목 6행과 조인한 뒤 같은 금액을 더하면 ${fmt(JOINED)}로 ${RATIO.toFixed(2)}배가 된다.`}>
      {ROWS.map((r, i) => {
        const y = 8 + i * PITCH;
        const w = (r.value / JOINED) * MAXW;
        return (
          <g key={r.label}>
            <text className="t-strong" x={X0} y={y + 14}>{r.label}</text>
            <rect x={X0} y={y + 28} width={w} height={BAR_H} rx="4" fill="var(--accent-soft)" stroke={r.bad ? 'var(--bad)' : 'var(--accent)'} strokeWidth="1.5" />
            <text className={r.bad ? 't-bad' : 't-sub'} x={X0 + w + 8} y={y + 28 + 16}>{fmt(r.value)}</text>
          </g>
        );
      })}
      <text className="t-bad" x={X0} y={noteY}>실제의 {RATIO.toFixed(2)}배로 부푼다</text>
    </svg>
  );
}
