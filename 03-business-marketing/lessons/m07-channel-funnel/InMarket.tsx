// 구매 간격(분기 수)에서 분기마다 구매 시점인 사람 비율 = 1 ÷ 분기 수. 구매가 일정한 간격으로 일어난다는 가정의 이론값이다.
const ROWS = [
  { name: '구매 간격 6개월', q: 2 },
  { name: '구매 간격 1년', q: 4 },
  { name: '구매 간격 2년', q: 8 },
  { name: '구매 간격 3년', q: 12 },
  { name: '구매 간격 5년', q: 20 },
].map((r) => ({ ...r, share: 1 / r.q }));

const X0 = 12;
const TW = 336;
const BH = 16;
const PITCH = 62;
const Y0 = 8;
const rowY = (i: number) => Y0 + i * PITCH;
const LAST_BOTTOM = rowY(ROWS.length - 1) + 26 + BH;
const DIV = LAST_BOTTOM + 24;
const VB_H = DIV + 44 + 4 + 8;
const pct = (v: number) => `${Math.round(v * 1000) / 10}%`;

export default function InMarket() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label={`구매 간격별로 한 분기에 구매 시점인 사람의 비율. ${ROWS.map((r) => `${r.name} ${pct(r.share)}`).join(', ')}. 구매 간격이 길수록 지금 살 사람은 적다.`}>
      {ROWS.map((r, i) => {
        const y = rowY(i);
        return (
          <g key={r.name}>
            <text className="t-strong" x={X0} y={y + 14}>{r.name}</text>
            <text className="t-sub" x={X0 + TW} y={y + 14} textAnchor="end">{pct(r.share)}</text>
            <rect className="svg-box" x={X0} y={y + 26} width={TW} height={BH} rx="3" />
            <rect x={X0} y={y + 26} width={TW * r.share} height={BH} rx="3" fill="var(--accent)" />
          </g>
        );
      })}
      <line x1="8" y1={DIV} x2="352" y2={DIV} stroke="var(--line)" />
      <text className="t-sub" x={X0} y={DIV + 24}>한 분기에 구매 시점인 사람 = 1 ÷ 분기 수</text>
      <text className="t-sub" x={X0} y={DIV + 44}>막대 전체 길이가 100%</text>
    </svg>
  );
}
