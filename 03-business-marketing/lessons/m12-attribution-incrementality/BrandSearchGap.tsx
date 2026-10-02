/** 브랜드 검색 광고(가정): 귀속 전환 중 광고가 만든 몫. 아래 값은 python 으로 계산한 지역 분할 결과(가상 데이터, seed 12)다. */
const ATTR = 3000; // 중단 지역의 사전 4주 귀속 전환(가정)
const PRE_T = 13331.318724451005; // 중단 지역 사전 4주 총 주문
const DIFF = -0.03469485795035454; // 중단 지역 평균 변화율 - 유지 지역 평균 변화율
const DIFF_LO = -0.04299350758549544; // 95% 구간(Welch t)
const DIFF_HI = -0.026396208315213644;
const AOV = 50000;
const COST = 9_000_000;

const INC = -DIFF * PRE_T; // 광고가 만든 주문
const INC_LO = -DIFF_HI * PRE_T;
const INC_HI = -DIFF_LO * PRE_T;
const A_ROAS = (ATTR * AOV) / COST;
const I_ROAS = (INC * AOV) / COST;
const fmt = (n: number) => Math.round(n).toLocaleString('en-US');

const X0 = 12;
const W = 336;
const px = (n: number) => (n / ATTR) * W;
const BAR_Y = 34;
const BH = 44;
const WH_Y = BAR_Y + BH + 14; // 구간 괄호
const NOTE_Y = WH_Y + 26;
const BOX_Y = NOTE_Y + 30;
const BOX_H = 66;
const BOX_W = 160;
const STROKE = 2;
const VB_H = Math.ceil(BOX_Y + BOX_H + STROKE / 2 + 12);

export default function BrandSearchGap() {
  const wIncr = px(INC);
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label={`브랜드 검색 광고가 귀속한 전환 ${fmt(ATTR)}건 중 광고가 만든 주문은 약 ${fmt(INC)}건(95% 구간 ${fmt(INC_LO)}에서 ${fmt(INC_HI)}건)이다. 귀속 ROAS는 ${A_ROAS.toFixed(1)}, 증분 ROAS는 ${I_ROAS.toFixed(1)}이다.`}>
      <text className="t-strong" x={X0} y="20">귀속 전환 {fmt(ATTR)}건 (4주)</text>
      <rect className="svg-berg" x={X0} y={BAR_Y} width={wIncr} height={BH} rx="4" />
      <rect className="svg-box" x={X0 + wIncr} y={BAR_Y} width={W - wIncr} height={BH} rx="4" />
      <text className="t-strong" x={X0 + wIncr / 2} y={BAR_Y + BH / 2 + 5} textAnchor="middle">{fmt(INC)}</text>
      <text className="t-sub" x={X0 + wIncr + 14} y={BAR_Y + BH / 2 + 5}>광고 없이도 샀을 주문 {fmt(ATTR - INC)}</text>
      <line x1={X0 + px(INC_LO)} y1={WH_Y} x2={X0 + px(INC_HI)} y2={WH_Y} stroke="var(--accent)" strokeWidth="2" />
      <line x1={X0 + px(INC_LO)} y1={WH_Y - 5} x2={X0 + px(INC_LO)} y2={WH_Y + 5} stroke="var(--accent)" strokeWidth="2" />
      <line x1={X0 + px(INC_HI)} y1={WH_Y - 5} x2={X0 + px(INC_HI)} y2={WH_Y + 5} stroke="var(--accent)" strokeWidth="2" />
      <text className="t-sub" x={X0} y={NOTE_Y}>광고가 만든 주문 {fmt(INC)}건 (95% 구간 {fmt(INC_LO)}에서 {fmt(INC_HI)})</text>

      <rect className="svg-box" x={X0} y={BOX_Y} width={BOX_W} height={BOX_H} rx="8" />
      <text className="t-strong" x={X0 + 14} y={BOX_Y + 29}>귀속 ROAS</text>
      <text className="t-warm" x={X0 + 14} y={BOX_Y + 50}>{A_ROAS.toFixed(1)}</text>
      <rect className="svg-box-bad" x={360 - 12 - BOX_W} y={BOX_Y} width={BOX_W} height={BOX_H} rx="8" />
      <text className="t-strong" x={360 - 12 - BOX_W + 14} y={BOX_Y + 29}>증분 ROAS</text>
      <text className="t-bad" x={360 - 12 - BOX_W + 14} y={BOX_Y + 50}>{I_ROAS.toFixed(1)}</text>
    </svg>
  );
}
