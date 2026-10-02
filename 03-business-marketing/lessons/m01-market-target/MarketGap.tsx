/** 같은 시장을 상향식과 하향식으로 계산하고 두 값의 차이를 본다. 모든 입력은 가정(수도권 직장인 점심 샐러드 정기배송). */
const EMP = 3_000_000; // 대상 직장인
const SALAD = 0.25; // 주 1회 이상 샐러드
const AREA = 0.4; // 배송권
const PER = 36 * 8500; // 연 구매 횟수 36회 x 건당 8,500원
const BU_CUST = EMP * SALAD * AREA;
const BU = BU_CUST * PER;
const TD0 = 30e12; // 점심 식사 지출 총액
const TD1 = TD0 * 0.025;
const TD2 = TD1 * 0.5;
const TD3 = TD2 * 0.1;
const GAP = BU / TD3;
const TD_CUST = TD3 / PER;

const fmt = (n: number) => Math.round(n).toLocaleString('en-US');
const eok = (n: number) => `${fmt(n / 1e8)}억원`;

const W = 168;
const X = [8, 184];
const H = 66;
const GAP_Y = 24;
const TOP = 36;
const rowY = (i: number) => TOP + i * (H + GAP_Y);
const STROKE = 1.5;

type Cell = { name: string; value: string };
const BU_ROWS: Cell[] = [
  { name: '대상 직장인', value: `${fmt(EMP)}명` },
  { name: '주 1회 이상 25%', value: `${fmt(EMP * SALAD)}명` },
  { name: '배송권 40%', value: `${fmt(BU_CUST)}명` },
  { name: `× 연 ${fmt(PER)}원`, value: eok(BU) },
];
const TD_ROWS: Cell[] = [
  { name: '점심 식사 지출', value: `${fmt(TD0 / 1e12)}조원` },
  { name: '샐러드 비중 2.5%', value: eok(TD1) },
  { name: '수도권 비중 50%', value: eok(TD2) },
  { name: '정기배송 비중 10%', value: eok(TD3) },
];

const lastBottom = rowY(3) + H;
const SUM_Y = lastBottom + 24;
const VB_H = Math.ceil(SUM_Y + H + STROKE / 2 + 8);

export default function MarketGap() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label={`상향식은 ${eok(BU)}, 하향식은 ${eok(TD3)}으로 ${GAP.toFixed(1)}배 차이가 난다. 하향식 금액을 같은 연 지출로 나누면 고객은 약 ${fmt(TD_CUST)}명이고 상향식은 ${fmt(BU_CUST)}명이다.`}>
      <defs>
        <marker id="mg-ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      <text className="t-strong" x={X[0]} y="20">상향식</text>
      <text className="t-strong" x={X[1]} y="20">하향식</text>
      {[BU_ROWS, TD_ROWS].map((rows, c) => rows.map((r, i) => (
        <g key={`${c}-${i}`}>
          <rect className={i === 3 ? 'svg-box-key' : 'svg-box'} x={X[c]} y={rowY(i)} width={W} height={H} rx="8" />
          <text className="t-sub" x={X[c] + 14} y={rowY(i) + 27}>{r.name}</text>
          <text className="t-strong" x={X[c] + 14} y={rowY(i) + 49}>{r.value}</text>
          {i < 3 && <line className="svg-flow" x1={X[c] + W / 2} y1={rowY(i) + H + 4} x2={X[c] + W / 2} y2={rowY(i + 1) - 4} markerEnd="url(#mg-ar)" />}
        </g>
      )))}
      <rect className="svg-tip" x="8" y={SUM_Y} width="344" height={H} rx="8" />
      <text className="t-warm" x="22" y={SUM_Y + 27}>{GAP.toFixed(1)}배 차이</text>
      <text className="t-sub" x="22" y={SUM_Y + 49}>고객 수로 환산: {fmt(BU_CUST)}명 대 {fmt(TD_CUST)}명</text>
    </svg>
  );
}
