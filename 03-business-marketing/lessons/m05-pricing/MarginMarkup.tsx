/**
 * 같은 이익에서 마진율(공헌이익 / 가격)과 마크업(공헌이익 / 변동비)은 다른 숫자다.
 * 마진율 m 이면 마크업 k = m / (1 - m). 값은 모두 식으로 계산한다.
 */
const MARGINS = [0.2, 0.3, 0.5, 0.6];
const markup = (m: number) => m / (1 - m);
const pct = (x: number) => {
  const v = Math.round(x * 1000) / 10;
  return `${Number.isInteger(v) ? v : v.toFixed(1)}%`;
};

const X0 = 8;
const SCALE = 160; // 1.0(100%) 가 160px, 150% 가 240px
const BAR_H = 18;
const GAP = 8;
const PITCH = 68; // 행 높이 44 + 행 사이 24
const TOP = 8;
const rowY = (i: number) => TOP + i * PITCH;
const lastBottom = rowY(MARGINS.length - 1) + BAR_H + GAP + BAR_H;
const VB_H = Math.ceil(lastBottom + 1 + 16);

export default function MarginMarkup() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label={`같은 이익을 마진율과 마크업으로 쓴 값. ${MARGINS.map((m) => `마진율 ${pct(m)}는 마크업 ${pct(markup(m))}`).join(', ')}이다.`}>
      {MARGINS.map((m, i) => {
        const y = rowY(i);
        const k = markup(m);
        return (
          <g key={m}>
            <rect className="svg-berg" x={X0} y={y} width={m * SCALE} height={BAR_H} rx="4" />
            <text className="t-accent" x={X0 + m * SCALE + 8} y={y + 14}>마진율 {pct(m)}</text>
            <rect className="svg-tip" x={X0} y={y + BAR_H + GAP} width={k * SCALE} height={BAR_H} rx="4" />
            <text className="t-warm" x={X0 + k * SCALE + 8} y={y + BAR_H + GAP + 14}>마크업 {pct(k)}</text>
          </g>
        );
      })}
    </svg>
  );
}
