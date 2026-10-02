/** 글 전체가 쓰는 가상의 주문 테이블(실제 데이터가 아님). 본문 쿼리의 예제와 같은 10행이다. */
export type Order = {
  id: number;
  channel: 'web' | 'app';
  status: 'paid' | 'refund' | 'cancel';
  amount: number | null;
  coupon: string | null;
  at: string; // 'YYYY-MM-DD HH:MM:SS'
};

export const ORDERS: Order[] = [
  { id: 1, channel: 'web', status: 'paid', amount: 30000, coupon: 'NEW10', at: '2024-03-01 09:10:00' },
  { id: 2, channel: 'app', status: 'paid', amount: 45000, coupon: null, at: '2024-03-05 14:30:00' },
  { id: 3, channel: 'app', status: 'refund', amount: 30000, coupon: null, at: '2024-03-31 18:20:00' },
  { id: 4, channel: 'web', status: 'paid', amount: null, coupon: null, at: '2024-03-31 23:50:00' },
  { id: 5, channel: 'app', status: 'paid', amount: 12000, coupon: 'NEW10', at: '2024-04-01 00:00:00' },
  { id: 6, channel: 'web', status: 'paid', amount: 8000, coupon: null, at: '2024-04-02 10:00:00' },
  { id: 7, channel: 'app', status: 'paid', amount: 52000, coupon: 'VIP', at: '2024-04-15 20:45:00' },
  { id: 8, channel: 'web', status: 'cancel', amount: 15000, coupon: null, at: '2024-04-20 08:05:00' },
  { id: 9, channel: 'app', status: 'paid', amount: 27000, coupon: null, at: '2024-05-01 12:00:00' },
  { id: 10, channel: 'web', status: 'paid', amount: 9000, coupon: null, at: '2024-05-10 19:30:00' },
];
