/** 가상 퍼널의 단계 전환율과 목표 대비 달성률. 달성률이 가장 낮은 단계가 병목 후보다. 모든 수치는 가정이다. */
const STAGES = ['도달', '클릭', '가입', '활성화', '결제', '재구매'];
const COUNTS = [200000, 4000, 600, 150, 30, 9];
const TARGET = [0, 0.025, 0.15, 0.4, 0.25, 0.3]; // 단계 전환율 목표(가정)

const rows = STAGES.slice(1).map((s, i) => {
  const rate = COUNTS[i + 1] / COUNTS[i];
  const target = TARGET[i + 1];
  return { name: `${STAGES[i]} → ${s}`, rate, target, ach: rate / target };
});
const worst = rows.reduce((m, r, i) => (r.ach < rows[m].ach ? i : m), 0);

const X0 = 12;
const TW = 276;
const BH = 16;
const ROW_H = 42;
const GAP = 24;
const Y0 = 8;
const rowY = (i: number) => Y0 + i * (ROW_H + GAP);
const pct = (v: number, d = 1) => `${(Math.round(v * 100 * 10 ** d) / 10 ** d).toString()}%`;
const VB_H = Math.ceil(rowY(rows.length - 1) + ROW_H + 0.75 + 12);

export default function FunnelBars() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label={`단계별 전환율의 목표 달성률. ${rows.map((r) => `${r.name} ${pct(r.rate)}, 목표 ${pct(r.target)}, 달성 ${pct(r.ach, 0)}`).join('. ')}. 달성률이 가장 낮은 ${rows[worst].name}가 병목 후보다.`}>
      {rows.map((r, i) => {
        const bad = i === worst;
        const y = rowY(i);
        return (
          <g key={r.name}>
            <text className="t-strong" x="12" y={y + 14}>{r.name}</text>
            <text className="t-sub" x="348" y={y + 14} textAnchor="end">실제 {pct(r.rate)} · 목표 {pct(r.target)}</text>
            <rect className="svg-box" x={X0} y={y + 26} width={TW} height={BH} rx="3" />
            <rect x={X0} y={y + 26} width={TW * Math.min(r.ach, 1)} height={BH} rx="3" fill={bad ? 'var(--bad)' : 'var(--accent)'} />
            <text className={bad ? 't-bad' : 't-sub'} x={X0 + TW + 12} y={y + 39}>{pct(r.ach, bad ? 1 : 0)}</text>
          </g>
        );
      })}
    </svg>
  );
}
