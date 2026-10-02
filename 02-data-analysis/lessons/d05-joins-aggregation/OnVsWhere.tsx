/** 가상 데이터: order_items 의 sku 가 B 인 주문만 붙이고 싶을 때, 조건을 WHERE 와 ON 어디에 두는지에 따라 남는 주문. */
const ORDER_IDS = [1, 2, 3, 4];
const ITEMS = [
  { order: 1, sku: 'A' }, { order: 1, sku: 'B' }, { order: 2, sku: 'A' },
  { order: 3, sku: 'A' }, { order: 3, sku: 'B' }, { order: 3, sku: 'C' }, { order: 9, sku: 'A' },
];
const hasB = (id: number) => ITEMS.some((i) => i.order === id && i.sku === 'B');
const rows = ORDER_IDS.map((id) => ({ id, ok: hasB(id) }));

// 여백 기준: 칸 높이 42(글자 위아래 13px 이상), 칸 간격 8, 제목은 칸 위 14px, 칸 안 글자는 좌우 12px.
const CW = 168;
const CH = 42;
const PITCH = 50;
const TOP = 36;
const COLS = [8, 184];

export default function OnVsWhere() {
  const last = TOP + (ORDER_IDS.length - 1) * PITCH + CH;
  const H = last + 8;
  const nWhere = rows.filter((r) => r.ok).length;
  return (
    <svg viewBox={`0 0 360 ${H}`} role="img" aria-label={`조건을 WHERE 에 두면 ${nWhere}행, ON 에 두면 ${ORDER_IDS.length}행이 남는다.`}>
      <text className="t-bad" x={COLS[0]} y="22">WHERE 에 둠 · {nWhere}행</text>
      <text className="t-good" x={COLS[1]} y="22">ON 에 둠 · {ORDER_IDS.length}행</text>
      {rows.map((r, i) => (
        <g key={`w${r.id}`}>
          <rect className={r.ok ? 'svg-berg' : 'svg-box-bad'} x={COLS[0]} y={TOP + i * PITCH} width={CW} height={CH} rx="6" />
          <text className={r.ok ? 't-strong' : 't-bad'} x={COLS[0] + 12} y={TOP + i * PITCH + 26}>{r.ok ? `주문 ${r.id} · B` : `주문 ${r.id} · 탈락`}</text>
        </g>
      ))}
      {rows.map((r, i) => (
        <g key={`o${r.id}`}>
          <rect className={r.ok ? 'svg-berg' : 'svg-box'} x={COLS[1]} y={TOP + i * PITCH} width={CW} height={CH} rx="6" />
          <text className={r.ok ? 't-strong' : 't-sub'} x={COLS[1] + 12} y={TOP + i * PITCH + 26}>{r.ok ? `주문 ${r.id} · B` : `주문 ${r.id} · NULL`}</text>
        </g>
      ))}
    </svg>
  );
}
