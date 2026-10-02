import BarRows, { type BarRow } from './BarRows';
import { ORDERS } from './data';

/** 주문 10행에서 WHERE 로 행을, HAVING 으로 그룹을 줄이는 과정을 데이터로 계산해 그린다. */
const paid = ORDERS.filter((o) => o.status === 'paid');
const sums = new Map<string, number>();
for (const o of paid) sums.set(o.channel, (sums.get(o.channel) ?? 0) + (o.amount ?? 0));
const kept = [...sums.values()].filter((s) => s >= 50000);

const ROWS: BarRow[] = [
  { label: 'FROM orders', value: ORDERS.length, unit: '행', kind: 'rows' },
  { label: "WHERE status = 'paid'", value: paid.length, unit: '행', kind: 'rows' },
  { label: 'GROUP BY channel', value: sums.size, unit: '그룹', kind: 'groups' },
  { label: 'HAVING SUM(amount) >= 50000', value: kept.length, unit: '그룹', kind: 'groups' },
];

export default function FilterFunnel() {
  return (
    <BarRows
      rows={ROWS}
      aria={`주문 ${ROWS[0].value}행에서 WHERE 로 ${ROWS[1].value}행이 남고, GROUP BY 로 ${ROWS[2].value}그룹이 되고, HAVING 으로 ${ROWS[3].value}그룹이 남는다.`}
    />
  );
}
