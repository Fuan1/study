/**
 * 할인이 순차로 겹칠 때의 최종가. 입력은 가정이다: 정가 30,000원, 개당 변동비 15,600원 + 가격의 3%,
 * 목표 공헌이익 8,000원이면 하한은 (15,600 + 8,000) / 0.97 = 24,330원.
 * 단계: 상시 15% -> 쿠폰 10% -> 적립 5%(가격에서 빼는 것으로 취급). 최종가 = 정가 x 0.85 x 0.90 x 0.95.
 */
const LIST = 30000;
const FLOOR = Math.ceil((15600 + 8000) / 0.97);
const STEPS = [
  { name: '정가', d: 0 },
  { name: '상시 할인 15%', d: 0.15 },
  { name: '쿠폰 10% 추가', d: 0.1 },
  { name: '적립 5% 추가', d: 0.05 },
];
let price = LIST;
const ROWS = STEPS.map((s) => {
  price *= 1 - s.d;
  return { name: s.name, price };
});
const total = 1 - ROWS[ROWS.length - 1].price / LIST;
const fmt = (n: number) => Math.round(n).toLocaleString('en-US');

const X0 = 8;
const SCALE = 0.008; // 원당 px (30,000원 = 240px)
const xOf = (p: number) => X0 + p * SCALE;
const BAR_H = 20;
const TITLE = 14;
const BAR_DY = 24;
const PITCH = BAR_DY + BAR_H + 24;
const TOP = 40; // 위쪽 하한 라벨 아래
const rowY = (i: number) => TOP + i * PITCH;
const lastBottom = rowY(ROWS.length - 1) + BAR_DY + BAR_H;
const VB_H = Math.ceil(lastBottom + 6 + 1 + 16);

export default function StackedDiscount() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label={`정가 ${fmt(LIST)}원에 할인 15퍼센트, 10퍼센트, 5퍼센트가 차례로 겹치면 최종가는 ${fmt(ROWS[ROWS.length - 1].price)}원으로 정가 대비 ${(total * 100).toFixed(1)}퍼센트 할인이고 하한 ${fmt(FLOOR)}원 아래다. 쿠폰 단계에서 이미 하한 아래로 내려간다.`}>
      <text className="t-sub" x={xOf(FLOOR)} y="14" textAnchor="middle">하한 {fmt(FLOOR)}원</text>
      {ROWS.map((r, i) => {
        const y = rowY(i);
        const under = r.price < FLOOR;
        return (
          <g key={r.name}>
            <text className="t-strong" x={X0} y={y + TITLE}>{r.name}</text>
            <rect className={under ? 'svg-tip' : 'svg-berg'} x={X0} y={y + BAR_DY} width={r.price * SCALE} height={BAR_H} rx="4" />
            <text className={under ? 't-warm' : 't-strong'} x={352} y={y + BAR_DY + 15} textAnchor="end">{fmt(r.price)}원</text>
          </g>
        );
      })}
      <line x1={xOf(FLOOR)} y1="22" x2={xOf(FLOOR)} y2={lastBottom + 6} stroke="var(--strong)" strokeWidth="1.5" strokeDasharray="3 2" />
    </svg>
  );
}
