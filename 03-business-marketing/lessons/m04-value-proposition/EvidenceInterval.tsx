/** 같은 만족 96%라도 모수가 작으면 95% 신뢰구간이 넓다. 값은 Wilson 구간으로 코드에서 계산한다(가정 데이터). */
const Z = 1.959964;

function wilson(k: number, n: number) {
  const p = k / n;
  const d = 1 + (Z * Z) / n;
  const c = (p + (Z * Z) / (2 * n)) / d;
  const h = (Z * Math.sqrt((p * (1 - p)) / n + (Z * Z) / (4 * n * n))) / d;
  return { p, lo: c - h, hi: c + h };
}

const ROWS = [
  { k: 24, n: 25 },
  { k: 96, n: 100 },
  { k: 480, n: 500 },
].map((r) => ({ ...r, ...wilson(r.k, r.n) }));

const MIN = 70; // 축 시작 %
const MAX = 100;
const X0 = 24;
const X1 = 336;
const x = (pct: number) => X0 + ((pct - MIN) / (MAX - MIN)) * (X1 - X0);
const PITCH = 68;
const TOP = 8;
const BAR_H = 14;
const rowY = (i: number) => TOP + i * PITCH;
const BAR_OFF = 32;
const GRID_BOTTOM = rowY(ROWS.length - 1) + BAR_OFF + BAR_H + 12;
const AXIS_Y = GRID_BOTTOM + 22;
const VB_H = Math.ceil(AXIS_Y + 8);
const fmt = (v: number) => (v * 100).toFixed(1);

export default function EvidenceInterval() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label={`같은 만족률 96퍼센트라도 25명 중 24명이면 95퍼센트 구간이 ${fmt(ROWS[0].lo)}에서 ${fmt(ROWS[0].hi)}, 100명 중 96명이면 ${fmt(ROWS[1].lo)}에서 ${fmt(ROWS[1].hi)}, 500명 중 480명이면 ${fmt(ROWS[2].lo)}에서 ${fmt(ROWS[2].hi)}퍼센트다.`}>
      {[70, 80, 90, 100].map((t) => (
        <g key={t}>
          <line className="svg-box" x1={x(t)} y1={TOP} x2={x(t)} y2={GRID_BOTTOM} />
          <text className="t-sub" x={x(t)} y={AXIS_Y} textAnchor="middle">{t}%</text>
        </g>
      ))}
      {ROWS.map((r, i) => (
        <g key={r.n}>
          <text className="t-strong" x="8" y={rowY(i) + 14}>{r.n}명 중 {r.k}명</text>
          <text className="t-sub" x="352" y={rowY(i) + 14} textAnchor="end">{fmt(r.lo)}–{fmt(r.hi)}%</text>
          <rect className="svg-berg" x={x(r.lo * 100)} y={rowY(i) + BAR_OFF} width={x(r.hi * 100) - x(r.lo * 100)} height={BAR_H} rx="7" />
          <circle className="svg-box-key" cx={x(r.p * 100)} cy={rowY(i) + BAR_OFF + BAR_H / 2} r="5" />
        </g>
      ))}
    </svg>
  );
}
