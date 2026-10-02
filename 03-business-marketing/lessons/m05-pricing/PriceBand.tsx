/**
 * 가격의 하한과 상한. 모든 입력은 가정이다(글의 표와 같은 값).
 * 개당 변동비 a = 15,600원(매입 12,000 + 포장·배송 3,000 + 반품 600), 가격 비례 비용 r = 3%.
 * 목표 공헌이익 c = (고정비 6,000,000 + 목표 이익 2,000,000) / 1,000개 = 8,000원.
 * 하한 = (a + c) / (1 - r), 공헌이익 0 가격 = a / (1 - r), 상한 = 대안 28,000 + 차별 가치 5,000.
 */
const A = 15600;
const R = 0.03;
const C = (6_000_000 + 2_000_000) / 1000;
const FLOOR = Math.ceil((A + C) / (1 - R));
const ZERO = Math.round(A / (1 - R));
const ALT = 28000;
const CEIL = ALT + 5000;
const fmt = (n: number) => n.toLocaleString('en-US');

const PMIN = 14000;
const PMAX = 36000;
const TOP = 40; // 위쪽 축 제목 아래
const PX = 0.0125; // 원당 px
const yOf = (p: number) => TOP + (PMAX - p) * PX;
const BOTTOM = yOf(PMIN);
const VB_H = Math.ceil(BOTTOM + 1 + 24);

const BX = 12;
const BW = 64;
const TX = 94; // 라벨 x
const G = 2; // 구역 사이 틈

export default function PriceBand() {
  const yCeil = yOf(CEIL);
  const yAlt = yOf(ALT);
  const yFloor = yOf(FLOOR);
  const yZero = yOf(ZERO);
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label={`가격 후보 구간. 하한 ${fmt(FLOOR)}원은 변동비와 목표 공헌이익을 더해 수수료율로 나눈 값이고, 상한 ${fmt(CEIL)}원은 대안 가격 ${fmt(ALT)}원에 차별 가치 5,000원을 더한 값이다. 공헌이익이 0이 되는 가격은 ${fmt(ZERO)}원이다.`}>
      <text className="t-sub" x={BX} y="20">판매가(원)</text>
      <rect className="svg-box-bad" x={BX} y={TOP} width={BW} height={yCeil - TOP - G} rx="6" />
      <rect className="svg-berg" x={BX} y={yCeil + G} width={BW} height={yFloor - yCeil - 2 * G} rx="6" />
      <rect className="svg-tip" x={BX} y={yFloor + G} width={BW} height={yZero - yFloor - 2 * G} rx="6" />
      <rect className="svg-box-bad" x={BX} y={yZero + G} width={BW} height={BOTTOM - yZero - G} rx="6" />
      <text className="t-accent" x={BX + BW / 2} y={(yCeil + yFloor) / 2 + 4} textAnchor="middle">후보</text>
      <text className="t-warm" x={BX + BW / 2} y={(yFloor + yZero) / 2 + 5} textAnchor="middle">미달</text>

      <line x1={BX + BW} y1={yCeil} x2={TX - 8} y2={yCeil} stroke="var(--strong)" strokeWidth="1.5" />
      <text className="t-strong" x={TX} y={yCeil + 5}>상한 {fmt(CEIL)}원</text>
      <text className="t-sub" x={TX} y={yCeil + 25}>대안 {fmt(ALT)} + 차별 가치 {fmt(CEIL - ALT)}</text>

      <line x1={BX + BW} y1={yAlt} x2={TX - 8} y2={yAlt} stroke="var(--line)" strokeWidth="1.5" strokeDasharray="3 2" />
      <text className="t-sub" x={TX} y={yAlt + 5}>대안 가격 {fmt(ALT)}원</text>

      <line x1={BX + BW} y1={yFloor} x2={TX - 8} y2={yFloor} stroke="var(--strong)" strokeWidth="1.5" />
      <text className="t-strong" x={TX} y={yFloor + 5}>하한 {fmt(FLOOR)}원</text>
      <text className="t-sub" x={TX} y={yFloor + 25}>(변동비 + 목표 공헌) ÷ 0.97</text>

      <line x1={BX + BW} y1={yZero} x2={TX - 8} y2={yZero} stroke="var(--bad)" strokeWidth="1.5" />
      <text className="t-bad" x={TX} y={yZero + 5}>{fmt(ZERO)}원: 공헌이익 0</text>
    </svg>
  );
}
