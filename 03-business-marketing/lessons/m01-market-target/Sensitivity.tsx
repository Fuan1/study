/** 가정 하나만 바꿨을 때 시장 규모 변화(가정값). 기준 367.2억원, 곱셈 구조라 변화율은 값의 비율과 같다. */
const BASE_V = { salad: 0.25, area: 0.4, use: 0.4, freq: 36, price: 8500 };
const EMP = 3_000_000;
const calc = (v: typeof BASE_V) => (EMP * v.salad * v.area * v.use * v.freq * v.price) / 1e8;
const BASE = calc(BASE_V);

type Row = { label: string; lo: number; hi: number; low: number; high: number };
const mk = (label: string, key: keyof typeof BASE_V, lo: number, hi: number, show: (n: number) => string): Row & { text: string } => ({
  label,
  lo,
  hi,
  low: calc({ ...BASE_V, [key]: lo }),
  high: calc({ ...BASE_V, [key]: hi }),
  text: `${label} ${show(lo)} / ${show(BASE_V[key])} / ${show(hi)}`,
});
const pct = (n: number) => `${Math.round(n * 100)}%`;
const ROWS = [
  mk('정기배송 이용', 'use', 0.2, 0.6, pct),
  mk('샐러드 주 1회 이상', 'salad', 0.15, 0.35, pct),
  mk('연 구매 횟수', 'freq', 24, 48, (n) => `${n}회`),
  mk('배송권 비율', 'area', 0.3, 0.5, pct),
  mk('건당 단가', 'price', 7500, 9500, (n) => `${n.toLocaleString('en-US')}원`),
].sort((a, b) => b.high - b.low - (a.high - a.low));

const CX = 180;
const SCALE = 120 / (BASE - Math.min(...ROWS.map((r) => r.low)));
const TOP = 40;
const PITCH = 66;
const BAR_H = 20;
const rowY = (i: number) => TOP + i * PITCH;
const f1 = (n: number) => n.toFixed(1);
const BAR_OFF = 26; // 행 라벨 baseline 아래 막대 시작
const VB_H = Math.ceil(rowY(ROWS.length - 1) + BAR_OFF + BAR_H + 1 + 12);

export default function Sensitivity() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label={`기준 ${f1(BASE)}억원에서 가정 하나만 바꾼 결과. ${ROWS.map((r) => `${r.label} ${f1(r.low)}에서 ${f1(r.high)}억원`).join(', ')}.`}>
      <text className="t-strong" x={CX} y="18" textAnchor="middle">기준 {f1(BASE)}억원</text>
      {ROWS.map((r, i) => {
        const by = rowY(i) + BAR_OFF;
        const xl = CX - (BASE - r.low) * SCALE;
        const xr = CX + (r.high - BASE) * SCALE;
        return (
          <g key={r.label}>
            <text className="t-sub" x="8" y={rowY(i) + 14}>{r.text}</text>
            <line x1={CX} y1={by - 4} x2={CX} y2={by + BAR_H + 4} stroke="var(--muted)" strokeWidth="1.5" />
            <rect className="svg-tip" x={xl} y={by} width={CX - xl} height={BAR_H} rx="3" />
            <rect className="svg-berg" x={CX} y={by} width={xr - CX} height={BAR_H} rx="3" />
            <text className="t-sub" x={xl - 6} y={by + 15} textAnchor="end">{f1(r.low)}</text>
            <text className="t-sub" x={xr + 6} y={by + 15}>{f1(r.high)}</text>
          </g>
        );
      })}
    </svg>
  );
}
