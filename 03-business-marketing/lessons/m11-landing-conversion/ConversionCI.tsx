/**
 * 같은 전환율 차이(5.0% 대 6.0%)라도 표본에 따라 95% 신뢰구간이 0을 덮는지가 갈린다. 가정한 숫자.
 * 차이 d = p2 - p1, SE = sqrt(p1(1-p1)/n1 + p2(1-p2)/n2), 구간 d ± 1.959964 SE (python 으로 같은 값 확인).
 */
const Z = 1.959964;
type Case = { title: string; n: number; x1: number; x2: number };
const CASES: Case[] = [
  { title: '군당 2,000명', n: 2000, x1: 100, x2: 120 },
  { title: '군당 20,000명', n: 20000, x1: 1000, x2: 1200 },
];

const calc = (c: Case) => {
  const p1 = c.x1 / c.n;
  const p2 = c.x2 / c.n;
  const d = (p2 - p1) * 100;
  const se = Math.sqrt((p1 * (1 - p1)) / c.n + (p2 * (1 - p2)) / c.n) * 100;
  return { d, lo: d - Z * se, hi: d + Z * se };
};

// 축: -1%p 에서 +3%p 가 x 30 에서 330
const AMIN = -1;
const AMAX = 3;
const AX0 = 30;
const AX1 = 330;
const sx = (v: number) => AX0 + ((v - AMIN) / (AMAX - AMIN)) * (AX1 - AX0);
const signed = (v: number) => (v < 0 ? '−' : '+') + Math.abs(v).toFixed(1);

// 여백 기준: 행 간격 116(제목 baseline, 구간선은 제목에서 46 아래, 숫자는 구간선에서 32 아래), 축은 마지막 숫자에서 24 아래.
const PITCH = 116;
const TITLE_Y = 20;
const LINE_DY = 46;
const NUM_DY = 78;
const lastNum = TITLE_Y + (CASES.length - 1) * PITCH + NUM_DY;
const AXIS_Y = lastNum + 24;
const TICK_LABEL_Y = AXIS_Y + 22;
const VB_H = Math.ceil(TICK_LABEL_Y + 6 + 8);
const TICKS = [-1, 0, 1, 2, 3];

export default function ConversionCI() {
  const rows = CASES.map((c) => ({ c, r: calc(c) }));
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label={`전환율 5.0퍼센트에서 6.0퍼센트로 차이 1.0퍼센트포인트. ${rows.map(({ c, r }) => `${c.title}이면 95퍼센트 구간 ${signed(r.lo)}에서 ${signed(r.hi)}로 0을 ${r.lo <= 0 ? '포함한다' : '포함하지 않는다'}`).join('. ')}.`}>
      {rows.map(({ c, r }, i) => {
        const ty = TITLE_Y + i * PITCH;
        const ly = ty + LINE_DY;
        const contains0 = r.lo <= 0 && r.hi >= 0;
        const color = contains0 ? 'var(--warm)' : 'var(--good)';
        return (
          <g key={c.title}>
            <text className="t-strong" x="8" y={ty}>{c.title}</text>
            <text className={contains0 ? 't-warm' : 't-good'} x="352" y={ty} textAnchor="end">{contains0 ? '0 포함: 보류' : '0 제외: 개선'}</text>
            <line x1={sx(0)} y1={ly - 14} x2={sx(0)} y2={ly + 14} stroke="var(--strong)" strokeWidth="1.5" strokeDasharray="3 2" />
            <line x1={sx(r.lo)} y1={ly} x2={sx(r.hi)} y2={ly} stroke={color} strokeWidth="3" />
            <line x1={sx(r.lo)} y1={ly - 7} x2={sx(r.lo)} y2={ly + 7} stroke={color} strokeWidth="3" />
            <line x1={sx(r.hi)} y1={ly - 7} x2={sx(r.hi)} y2={ly + 7} stroke={color} strokeWidth="3" />
            <circle cx={sx(r.d)} cy={ly} r="5" fill={color} />
            <text className="t-sub" x={(sx(r.lo) + sx(r.hi)) / 2} y={ty + NUM_DY} textAnchor="middle">{`차이 ${signed(r.d)}%p, 구간 ${signed(r.lo)} ~ ${signed(r.hi)}%p`}</text>
          </g>
        );
      })}
      <line className="svg-flow" x1={AX0} y1={AXIS_Y} x2={AX1} y2={AXIS_Y} />
      {TICKS.map((t) => (
        <g key={t}>
          <line className="svg-flow" x1={sx(t)} y1={AXIS_Y} x2={sx(t)} y2={AXIS_Y + 6} />
          <text className="t-sub" x={sx(t)} y={TICK_LABEL_Y} textAnchor="middle">{(t === 0 ? '0' : signed(t).replace('.0', '')) + (t === AMAX ? '%p' : '')}</text>
        </g>
      ))}
    </svg>
  );
}
