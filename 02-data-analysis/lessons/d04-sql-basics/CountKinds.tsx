import BarRows, { type BarRow } from './BarRows';
import { ORDERS } from './data';

/** 같은 10행 테이블에서 COUNT 를 세는 방식에 따라 값이 달라지는 것을 데이터로 계산해 그린다. */
const coupons = ORDERS.map((o) => o.coupon).filter((c): c is string => c !== null);
const ROWS: BarRow[] = [
  { label: 'COUNT(*)', value: ORDERS.length, unit: '', kind: 'rows' },
  { label: 'COUNT(amount)', value: ORDERS.filter((o) => o.amount !== null).length, unit: '', kind: 'rows' },
  { label: 'COUNT(coupon)', value: coupons.length, unit: '', kind: 'rows' },
  { label: 'COUNT(DISTINCT coupon)', value: new Set(coupons).size, unit: '', kind: 'groups' },
];

export default function CountKinds() {
  return (
    <BarRows
      rows={ROWS}
      aria={`같은 ${ROWS[0].value}행 테이블에서 COUNT(*) 는 ${ROWS[0].value}, COUNT(amount) 는 ${ROWS[1].value}, COUNT(coupon) 는 ${ROWS[2].value}, COUNT(DISTINCT coupon) 은 ${ROWS[3].value}이다.`}
    />
  );
}
