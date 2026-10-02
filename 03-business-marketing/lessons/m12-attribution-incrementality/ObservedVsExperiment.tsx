/** Blake, Nosko, Tadelis(NBER WP 20171)가 보고한 eBay 검색 광고 ROI. 관측 회귀 대 무작위 실험. 막대 길이는 값에 비례한다. */
const ROWS = [
  { label: '관측 회귀, 통제 없음: 4,100% 이상', v: 4100, kind: 'obs' },
  { label: '관측 회귀, 시간·지역 통제: 1,400% 이상', v: 1400, kind: 'obs' },
  { label: '무작위 지역 실험: −63%', v: -63, kind: 'exp' },
];
const CI = [-124, -3];
const X0 = 24;
const W = 328;
const MAXV = 4100;
const px = (v: number) => (v / MAXV) * W;
const TOP = 30;
const PITCH = 62;
const BAR_H = 16;
const rowY = (i: number) => TOP + i * PITCH;
const LAST_BAR_B = rowY(2) + 24 + BAR_H;
const NOTE_Y = LAST_BAR_B + 8 + 13;
const VB_H = Math.ceil(NOTE_Y + 10);

export default function ObservedVsExperiment() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="같은 eBay 검색 광고의 ROI 를 관측 회귀로 구하면 통제 없이 4100퍼센트 이상, 시간과 지역을 통제해도 1400퍼센트 이상이다. 무작위 지역 실험으로 구하면 마이너스 63퍼센트이고 95퍼센트 구간은 마이너스 124에서 마이너스 3퍼센트다.">
      <text className="t-sub" x={X0} y="16" textAnchor="middle">0</text>
      <line x1={X0} y1="22" x2={X0} y2={LAST_BAR_B + 4} stroke="var(--line)" strokeWidth="1.5" />
      {ROWS.map((r, i) => {
        const y = rowY(i);
        const w = Math.abs(px(r.v));
        const x = r.v >= 0 ? X0 : X0 - w;
        return (
          <g key={r.label}>
            <text className="t-strong" x="8" y={y + 14}>{r.label}</text>
            <rect x={x} y={y + 24} width={w} height={BAR_H} fill={r.kind === 'obs' ? 'var(--warm)' : 'var(--accent)'} />
          </g>
        );
      })}
      <line x1={X0 + px(CI[0])} y1={rowY(2) + 24 + BAR_H / 2} x2={X0 + px(CI[1])} y2={rowY(2) + 24 + BAR_H / 2} stroke="var(--strong)" strokeWidth="1.5" />
      <text className="t-sub" x="8" y={NOTE_Y}>95% 구간 −124%에서 −3%</text>
    </svg>
  );
}
