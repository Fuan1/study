/**
 * 가격별 손익분기 판매량과 예상 판매량. 모든 입력은 가정이다.
 * 개당 변동비 15,600원 + 가격의 3%, 월 고정비 6,000,000원.
 * 개당 공헌이익 = 가격 x 0.97 - 15,600, 손익분기 = 고정비 / 개당 공헌이익(올림), 월 이익 = 판매량 x 공헌이익 - 고정비.
 */
const A = 15600;
const R = 0.03;
const F = 6_000_000;
const ROWS = [
  { p: 25000, q: 1100 },
  { p: 28000, q: 900 },
  { p: 30000, q: 780 },
  { p: 33000, q: 600 },
].map((r) => {
  const unit = r.p * (1 - R) - A;
  return { ...r, unit, be: Math.ceil(F / unit), profit: Math.round(r.q * unit - F) };
});
const fmt = (n: number) => n.toLocaleString('en-US');

const X0 = 8;
const SCALE = 0.2; // 판매량 1개당 px (1,100개 = 220px)
const BAR_H = 16;
const BAR_GAP = 6;
const TITLE = 14; // 제목 baseline
const BAR_DY = 26; // 제목 아래 막대 시작(baseline 14 + 12)
const PITCH = BAR_DY + BAR_H + BAR_GAP + BAR_H + 24;
const TOP = 8;
const rowY = (i: number) => TOP + i * PITCH;
const lastBottom = rowY(ROWS.length - 1) + BAR_DY + BAR_H + BAR_GAP + BAR_H;
const VB_H = Math.ceil(lastBottom + 1 + 16);

export default function BreakEvenScenarios() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label={`가격별 손익분기 판매량과 예상 판매량(가정). ${ROWS.map((r) => `${fmt(r.p)}원은 손익분기 ${fmt(r.be)}개, 예상 ${fmt(r.q)}개, 월 이익 ${fmt(r.profit)}원`).join('. ')}.`}>
      {ROWS.map((r, i) => {
        const y = rowY(i);
        const y1 = y + BAR_DY;
        const y2 = y1 + BAR_H + BAR_GAP;
        return (
          <g key={r.p}>
            <text className="t-strong" x={X0} y={y + TITLE}>{fmt(r.p)}원</text>
            <text className="t-sub" x={352} y={y + TITLE} textAnchor="end">월 이익 {fmt(r.profit)}원</text>
            <rect className="svg-tip" x={X0} y={y1} width={r.be * SCALE} height={BAR_H} rx="4" />
            <text className="t-sub" x={X0 + r.be * SCALE + 8} y={y1 + 12.5}>손익분기 {fmt(r.be)}개</text>
            <rect className="svg-berg" x={X0} y={y2} width={r.q * SCALE} height={BAR_H} rx="4" />
            <text className="t-sub" x={X0 + r.q * SCALE + 8} y={y2 + 12.5}>예상 {fmt(r.q)}개</text>
          </g>
        );
      })}
    </svg>
  );
}
