/**
 * 형태 예시(가상 값): 광고비 10,000,000원에 신규 200명, 20,000,000원에 신규 270명.
 * 평균 CAC = 광고비 / 신규. 늘린 몫의 CAC(한계 CAC) = 늘어난 광고비 / 늘어난 신규.
 * 허용 CAC = 월 공헌이익 14,000원, 월 이탈률 5%일 때 12개월 누적 공헌이익(이탈 반영).
 */
const B1 = 10_000_000;
const N1 = 200;
const B2 = 20_000_000;
const N2 = 270;
const ALLOW = (14_000 * (1 - 0.95 ** 12)) / 0.05;
const ROWS = [
  { label: '평균 · 증액 전', v: B1 / N1, cls: 'svg-box' },
  { label: '평균 · 증액 후', v: B2 / N2, cls: 'svg-box' },
  { label: '늘린 몫 (한계)', v: (B2 - B1) / (N2 - N1), cls: 'svg-tip' },
];
const fmt = (n: number) => Math.round(n).toLocaleString('en-US');

const X0 = 8;
const SCALE = 210 / 150_000;
const PITCH = 72;
const TOP = 52;
const BAR_DY = 28;
const BAR_H = 22;
const rowY = (i: number) => TOP + i * PITCH;
const lastBottom = rowY(ROWS.length - 1) + BAR_DY + BAR_H;
const VB_H = lastBottom + 12;
const lx = X0 + ALLOW * SCALE;

export default function MarginalCac() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label={`증액 후 평균 CAC는 ${fmt(ROWS[1].v)}원이지만 늘린 몫의 CAC는 ${fmt(ROWS[2].v)}원으로 허용 CAC ${fmt(ALLOW)}원을 넘는다.`}>
      <text className="t-warm" x={lx} y="18" textAnchor="middle">허용 CAC {fmt(ALLOW)}원</text>
      <line x1={lx} y1="30" x2={lx} y2={lastBottom + 4} stroke="var(--warm)" strokeWidth="1.5" strokeDasharray="4 3" />
      {ROWS.map((r, i) => {
        const y = rowY(i);
        const w = r.v * SCALE;
        return (
          <g key={r.label}>
            <text className="t-strong" x={X0} y={y + 14}>{r.label}</text>
            <rect className={r.cls} x={X0} y={y + BAR_DY} width={w} height={BAR_H} rx="4" />
            <text className="t-sub" x={X0 + w + 8} y={y + BAR_DY + 16}>{fmt(r.v)}원</text>
          </g>
        );
      })}
    </svg>
  );
}
