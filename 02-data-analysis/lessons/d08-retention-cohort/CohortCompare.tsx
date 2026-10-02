/** 형태 예시(가상 값). 두 코호트의 곡선을 식으로 만들어 1주, 4주, 8주 값을 비교한다.
 *  이전: r = 0.20 + 0.80 * exp(-t / 1.5)   개선 후: r = 0.28 + 0.72 * exp(-t / 1.5) */
const POINTS = [1, 4, 8];
const before = (t: number) => Math.round(100 * (0.2 + 0.8 * Math.exp(-t / 1.5)));
const after = (t: number) => Math.round(100 * (0.28 + 0.72 * Math.exp(-t / 1.5)));

const BASE = 190;
const SCALE = 1.6; // 1%p = 1.6px
const BW = 40;
const GC = [70, 180, 290]; // 묶음 중심 x
const LABEL_Y = BASE + 20;
const DIFF_Y = LABEL_Y + 26;
const HEIGHT = DIFF_Y + 4 + 12;

export default function CohortCompare() {
  return (
    <svg viewBox={`0 0 360 ${HEIGHT}`} role="img" aria-label={`개선 전후 두 코호트의 유지율을 가입 후 같은 경과 주끼리 비교. ${POINTS.map((t) => `${t}주 ${before(t)}에서 ${after(t)}`).join(', ')}. 8주 뒤에도 차이가 남는다.`}>
      <rect x="8" y="10" width="14" height="14" rx="3" fill="var(--muted)" fillOpacity="0.45" />
      <text className="t-sub" x="30" y="22">이전 코호트</text>
      <rect x="150" y="10" width="14" height="14" rx="3" fill="var(--accent)" fillOpacity="0.9" />
      <text className="t-sub" x="172" y="22">개선 후 코호트</text>
      <line x1="8" y1={BASE} x2="352" y2={BASE} stroke="var(--line)" strokeWidth="1.5" />
      {POINTS.map((t, i) => {
        const b = before(t);
        const a = after(t);
        const cx = GC[i];
        return (
          <g key={t}>
            <rect x={cx - BW - 4} y={BASE - b * SCALE} width={BW} height={b * SCALE} rx="3" fill="var(--muted)" fillOpacity="0.45" />
            <text className="t-sub" x={cx - BW / 2 - 4} y={BASE - b * SCALE - 13} textAnchor="middle">{b}</text>
            <rect x={cx + 4} y={BASE - a * SCALE} width={BW} height={a * SCALE} rx="3" fill="var(--accent)" fillOpacity="0.9" />
            <text className="t-strong" x={cx + BW / 2 + 4} y={BASE - a * SCALE - 13} textAnchor="middle">{a}</text>
            <text className="t-sub" x={cx} y={LABEL_Y} textAnchor="middle">가입 후 {t}주</text>
            <text className="t-good" x={cx} y={DIFF_Y} textAnchor="middle">+{a - b}%p</text>
          </g>
        );
      })}
    </svg>
  );
}
