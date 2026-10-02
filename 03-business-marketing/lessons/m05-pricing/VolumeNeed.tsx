/** 가격 10% 인하에서 총 공헌이익을 지키는 데 필요한 판매량 증가. 이론값: d / (m - d).
 *  m = 공헌이익률(개당 공헌이익 / 가격), 가격에 비례하는 비용은 없다고 둔다. */
const D = 0.1;
const ROWS = [0.2, 0.3, 0.4, 0.5, 0.6].map((m) => ({ m, need: D / (m - D) }));

const X0 = 16;
const BAR_MAX = 328;
const PITCH = 56;
const maxNeed = ROWS[0].need;
const pct = (n: number) => `+${(n * 100).toFixed(n >= 0.995 ? 0 : 1)}%`;
const lastBarBottom = 8 + (ROWS.length - 1) * PITCH + 26 + 22;
const VB_H = lastBarBottom + 1 + 8;

export default function VolumeNeed() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label={`가격을 10퍼센트 내릴 때 같은 총 공헌이익에 필요한 판매량 증가. 공헌이익률 20, 30, 40, 50, 60퍼센트에서 ${ROWS.map((r) => pct(r.need)).join(', ')}이다.`}>
      {ROWS.map((r, i) => {
        const y = 8 + i * PITCH;
        return (
          <g key={r.m}>
            <text className="t-strong" x={X0} y={y + 14}>공헌이익률 {Math.round(r.m * 100)}%</text>
            <text className="t-sub" x={360 - X0} y={y + 14} textAnchor="end">필요 증가 {pct(r.need)}</text>
            <rect x={X0} y={y + 26} width={BAR_MAX} height="22" rx="4" className="svg-box" />
            <rect x={X0} y={y + 26} width={Math.max(4, (r.need / maxNeed) * BAR_MAX)} height="22" rx="2" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1.5" />
          </g>
        );
      })}
    </svg>
  );
}
