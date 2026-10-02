/**
 * 같은 총 공헌이익을 지키는 데 필요한 판매량 증가율 = d / (m - d).
 * m = 할인 전 마진율(공헌이익 / 가격), d = 할인율. m <= d 이면 불가능.
 * 가격에 비례하는 비용은 없다고 가정한 식이다. 값은 모두 식으로 계산한다.
 */
const MARGINS = [0.2, 0.3, 0.5];
const DISCOUNTS = [0.1, 0.2, 0.3];
const need = (m: number, d: number) => (m > d ? d / (m - d) : null);
const pct0 = (x: number) => `${Math.round(x * 1000) / 10}%`;

const LX = 8; // 할인 라벨
const X0 = 80; // 막대 시작
const SCALE = 100; // 1.0(100%) 가 100px, 200% 가 200px
const BAR_H = 22;
const BAR_PITCH = 30;
const HEAD = 26; // 묶음 제목 baseline 14 + 막대까지 12
const GROUP_H = HEAD + 2 * BAR_PITCH + BAR_H;
const GROUP_PITCH = GROUP_H + 24;
const TOP = 8;
const groupY = (i: number) => TOP + i * GROUP_PITCH;
const lastBottom = groupY(MARGINS.length - 1) + GROUP_H;
const VB_H = Math.ceil(lastBottom + 1 + 16);

export default function DiscountNeed() {
  const label = MARGINS.map((m) => `마진 ${pct0(m)}에서 ` + DISCOUNTS.map((d) => {
    const n = need(m, d);
    return n === null ? `할인 ${pct0(d)}는 불가능` : `할인 ${pct0(d)}는 판매량 ${pct0(n)} 증가`;
  }).join(', ')).join('. ');
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label={`할인 후 총 공헌이익을 지키는 데 필요한 판매량 증가율. ${label}.`}>
      {MARGINS.map((m, gi) => {
        const gy = groupY(gi);
        return (
          <g key={m}>
            <text className="t-strong" x={LX} y={gy + 14}>마진율 {pct0(m)}</text>
            {DISCOUNTS.map((d, di) => {
              const y = gy + HEAD + di * BAR_PITCH;
              const n = need(m, d);
              return (
                <g key={d}>
                  <text className="t-sub" x={LX} y={y + 16}>할인 {pct0(d)}</text>
                  {n === null ? (
                    <text className="t-bad" x={X0} y={y + 16}>불가</text>
                  ) : (
                    <>
                      <rect className={n >= 1 ? 'svg-tip' : 'svg-berg'} x={X0} y={y} width={n * SCALE} height={BAR_H} rx="4" />
                      <text className="t-sub" x={X0 + n * SCALE + 8} y={y + 16}>+{pct0(n)}</text>
                    </>
                  )}
                </g>
              );
            })}
          </g>
        );
      })}
    </svg>
  );
}
