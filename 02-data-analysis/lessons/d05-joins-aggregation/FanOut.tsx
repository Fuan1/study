/** 가상 데이터: orders 의 amount 와 order_items 의 주문별 행 수. 조인 전후 행을 코드로 만든다. */
const ORDERS = [
  { id: 1, amount: 100, items: 2 },
  { id: 2, amount: 200, items: 1 },
  { id: 3, amount: 300, items: 3 },
  { id: 4, amount: 200, items: 0 },
];
type Row = { id: number; amount: number; dup: boolean };
const before: Row[] = ORDERS.map((o) => ({ id: o.id, amount: o.amount, dup: false }));
const after: Row[] = ORDERS.flatMap((o) =>
  Array.from({ length: Math.max(o.items, 1) }, (_, k) => ({ id: o.id, amount: o.amount, dup: k > 0 })),
);
const sum = (rows: Row[]) => rows.reduce((a, r) => a + r.amount, 0);

// 여백 기준: 막대 높이 20 미만이므로 글자는 막대 밖. 제목은 막대 위 14px, 두 묶음 사이 32px.
const BX = 64;
const SCALE = 200 / 300;
const BH = 20;
const PITCH = 28;
const LABEL_X = 8;

function Panel({ y0, title, rows, bad }: { y0: number; title: string; rows: Row[]; bad: boolean }) {
  return (
    <g>
      <text className={bad ? 't-bad' : 't-good'} x="8" y={y0 + 14}>{title}</text>
      {rows.map((r, i) => {
        const y = y0 + 28 + i * PITCH;
        const w = r.amount * SCALE;
        return (
          <g key={i}>
            <text className="t-sub" x={LABEL_X} y={y + 15}>주문 {r.id}</text>
            <rect className={r.dup ? 'svg-box-bad' : 'svg-berg'} x={BX} y={y} width={w} height={BH} rx="4" />
            <text className={r.dup ? 't-bad' : 't-sub'} x={BX + w + 8} y={y + 15}>{r.amount}</text>
            {r.dup && <text className="t-bad" x="316" y={y + 15}>중복</text>}
          </g>
        );
      })}
    </g>
  );
}

export default function FanOut() {
  const p1 = 8;
  const p1End = p1 + 28 + (before.length - 1) * PITCH + BH;
  const p2 = p1End + 32;
  const p2End = p2 + 28 + (after.length - 1) * PITCH + BH;
  const H = p2End + 8;
  return (
    <svg viewBox={`0 0 360 ${H}`} role="img" aria-label={`주문 합계. 조인 전 ${before.length}행 합계 ${sum(before)}, 상품과 조인한 뒤 ${after.length}행 합계 ${sum(after)}.`}>
      <Panel y0={p1} title={`조인 전 · ${before.length}행 · 합계 ${sum(before)}`} rows={before} bad={false} />
      <Panel y0={p2} title={`조인 후 · ${after.length}행 · 합계 ${sum(after)}`} rows={after} bad />
    </svg>
  );
}
