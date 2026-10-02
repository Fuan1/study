/**
 * RFM 점수 → 세그먼트 격자. 가상 고객 10명(글 본문 표와 같은 값)을 코드로 점수화해 칸에 넣는다.
 * R: 마지막 구매 후 경과일, F: 최근 12개월 주문 수, M: 최근 12개월 결제액. 가치 V = F점수 + M점수.
 */
type Cust = { id: string; days: number; orders: number; amount: number };

const CUSTOMERS: Cust[] = [
  { id: '가', days: 12, orders: 6, amount: 520000 },
  { id: '나', days: 25, orders: 3, amount: 210000 },
  { id: '다', days: 8, orders: 1, amount: 45000 },
  { id: '라', days: 55, orders: 4, amount: 380000 },
  { id: '마', days: 70, orders: 2, amount: 150000 },
  { id: '바', days: 40, orders: 1, amount: 80000 },
  { id: '사', days: 130, orders: 5, amount: 610000 },
  { id: '아', days: 150, orders: 2, amount: 120000 },
  { id: '자', days: 200, orders: 1, amount: 30000 },
  { id: '차', days: 95, orders: 3, amount: 260000 },
];

const band = (x: number, mid: number, hi: number) => (x >= hi ? 3 : x >= mid ? 2 : 1);
const score = (c: Cust) => {
  const r = band(-c.days, -90, -30); // 경과일은 작을수록 좋아 부호를 뒤집는다
  const f = band(c.orders, 2, 4);
  const m = band(c.amount, 100000, 300000);
  return { r, v: band(f + m, 4, 5) };
};

// 행: R 3(최근) → 1, 열: 가치 V 1(낮음) → 3(높음)
const NAMES: Record<number, string[]> = {
  3: ['신규', '성장', '핵심'],
  2: ['관찰', '유지', '이탈 징후'],
  1: ['휴면 후보', '재참여', '복귀 우선'],
};
const ROW_LABEL: Record<number, string> = { 3: 'R3 · 마지막 구매 30일 이내', 2: 'R2 · 31~90일', 1: 'R1 · 91일 이상' };
const CELL_CLASS = (r: number, v: number) =>
  r === 1 && v === 1 ? 'svg-box-bad' : (r === 3 && v === 3) ? 'svg-berg' : (r !== 3 && v === 3) ? 'svg-tip' : 'svg-box';

// 여백 기준: 두 줄 상자 높이 66, 상자 안 12px 이상, 행 제목은 상자에서 8px 이상, 행 사이 24px 이상.
const X0 = 8;
const GAPX = 8;
const CW = Math.floor((344 - 2 * GAPX) / 3); // 109
const CH = 66;
const COL_BASE = 20; // 열 제목 baseline
const ROW0 = 52; // 첫 행 제목 baseline
const PITCH = 12 + CH + 30; // 제목 baseline → 상자 위 12, 상자 아래 30(= 다음 제목까지 24 이상)
const STROKE = 1.5;
const cellTop = (i: number) => ROW0 + i * PITCH + 12;
export const VB_H = Math.ceil(cellTop(2) + CH + STROKE / 2 + 8);

export default function RfmGrid() {
  const scored = CUSTOMERS.map((c) => ({ ...c, ...score(c) }));
  const rows = [3, 2, 1];
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="RFM 세그먼트 격자. 가로는 가치 점수 낮음, 중간, 높음, 세로는 최근성 점수 3, 2, 1. 최근이고 가치가 높으면 핵심, 최근성이 떨어졌는데 가치가 높으면 이탈 징후 또는 복귀 우선, 오래되고 가치가 낮으면 휴면 후보.">
      {['가치 낮음', '가치 중간', '가치 높음'].map((t, j) => (
        <text key={t} className="t-sub" x={X0 + j * (CW + GAPX) + CW / 2} y={COL_BASE} textAnchor="middle">{t}</text>
      ))}
      {rows.map((r, i) => (
        <g key={r}>
          <text className="t-sub" x={X0} y={ROW0 + i * PITCH}>{ROW_LABEL[r]}</text>
          {[1, 2, 3].map((v, j) => {
            const who = scored.filter((c) => c.r === r && c.v === v).map((c) => c.id);
            const x = X0 + j * (CW + GAPX);
            const top = cellTop(i);
            return (
              <g key={v}>
                <rect className={CELL_CLASS(r, v)} x={x} y={top} width={CW} height={CH} rx="8" />
                <text className="t-strong" x={x + 12} y={top + 28}>{NAMES[r][v - 1]}</text>
                <text className="t-sub" x={x + 12} y={top + 50}>{who.length ? `고객 ${who.join(', ')}` : '해당 없음'}</text>
              </g>
            );
          })}
        </g>
      ))}
    </svg>
  );
}
