/**
 * 가격 결정표의 모양. 형태 예시(가상 값).
 * 가정: 개당 변동비 18,000원, 월 고정비 6,000,000원 + 목표 이익 2,000,000원, 예상 판매량 1,000개
 * -> 목표 개당 공헌이익 8,000원 -> 하한 26,000원. 대안 가격 30,000원 + 확인된 차별 가치 3,000원 -> 상한 33,000원.
 */
const VAR = 18000;
const CM = (6_000_000 + 2_000_000) / 1000;
const FLOOR = VAR + CM;
const ALT = 30000;
const CEIL = ALT + 3000;
const CANDS = [28000, 30000, 32000];
const fmt = (n: number) => n.toLocaleString('en-US');

const PMIN = 24000;
const PMAX = 35000;
const X0 = 16;
const X1 = 344;
const xOf = (p: number) => X0 + ((p - PMIN) / (PMAX - PMIN)) * (X1 - X0);
const BAND_Y = 46;
const BAND_H = 40;
const BAND_B = BAND_Y + BAND_H;
const DIV = BAND_B + 72; // 눈금 라벨 두 줄 아래 20px 이상
const NOTE1 = DIV + 24;
const NOTE2 = NOTE1 + 22;
const VB_H = NOTE2 + 4 + 12;

export default function PriceBand() {
  const xf = xOf(FLOOR);
  const xc = xOf(CEIL);
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label={`가격 후보 구간의 모양. 하한 ${fmt(FLOOR)}원 미만은 미달, 상한 ${fmt(CEIL)}원 초과는 고객이 사지 않는 구간이고, 그 사이에 후보 ${CANDS.map(fmt).join(', ')}원을 둔다. 가상 값이다.`}>
      <rect className="svg-box-bad" x={X0} y={BAND_Y} width={xf - X0} height={BAND_H} rx="6" />
      <rect className="svg-berg" x={xf} y={BAND_Y} width={xc - xf} height={BAND_H} rx="4" />
      <rect className="svg-box-bad" x={xc} y={BAND_Y} width={X1 - xc} height={BAND_H} rx="6" />
      <text className="t-bad" x={(X0 + xf) / 2} y={BAND_Y + 25} textAnchor="middle">미달</text>
      <text className="t-bad" x={(xc + X1) / 2} y={BAND_Y + 25} textAnchor="middle">초과</text>
      {CANDS.map((p) => (
        <g key={p}>
          <text className="t-sub" x={xOf(p)} y={BAND_Y - 10} textAnchor="middle">{fmt(p)}</text>
          <circle cx={xOf(p)} cy={BAND_Y + BAND_H / 2} r="6" fill="var(--accent)" />
        </g>
      ))}
      {[{ x: xf, k: '하한', v: FLOOR }, { x: xc, k: '상한', v: CEIL }].map((m) => (
        <g key={m.k}>
          <line x1={m.x} y1={BAND_B} x2={m.x} y2={BAND_B + 8} stroke="var(--strong)" strokeWidth="1.5" />
          <text className="t-strong" x={m.x} y={BAND_B + 28} textAnchor="middle">{m.k}</text>
          <text className="t-sub" x={m.x} y={BAND_B + 48} textAnchor="middle">{fmt(m.v)}원</text>
        </g>
      ))}
      <line x1="8" y1={DIV} x2="352" y2={DIV} stroke="var(--line)" />
      <text className="t-sub" x={X0} y={NOTE1}>하한: 변동비 {fmt(VAR)} + 개당 공헌 {fmt(CM)}</text>
      <text className="t-sub" x={X0} y={NOTE2}>상한: 대안 {fmt(ALT)} + 확인된 가치 {fmt(CEIL - ALT)}</text>
    </svg>
  );
}
