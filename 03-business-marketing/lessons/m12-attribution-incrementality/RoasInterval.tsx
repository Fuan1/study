/** 증분 ROAS(95% 구간)와 귀속 ROAS, 손익분기 ROAS 를 한 축에 놓는다. 숫자는 가상이며 holdout 계산과 같은 식이다. */
const N1 = 200000;
const N0 = 50000;
const C1 = 4800;
const C0 = 1080;
const P1 = C1 / N1;
const P0 = C0 / N0;
const SE = Math.sqrt((P1 * (1 - P1)) / N1 + (P0 * (1 - P0)) / N0);
const AOV = 50000;
const COST = 12_000_000;
const roas = (rate: number) => (rate * N1 * AOV) / COST;
const IROAS = roas(P1 - P0);
const ILO = roas(P1 - P0 - 1.96 * SE);
const IHI = roas(P1 - P0 + 1.96 * SE);
const ATTR = (1900 * AOV) / COST; // 플랫폼 귀속 전환 1,900건(가정)
const BE = 1 / 0.3; // 공헌이익률 30%(가정)

const AX0 = 24;
const AX1 = 336;
const MAX = 9;
const x = (v: number) => AX0 + (v / MAX) * (AX1 - AX0);
const ticks = [0, 2, 4, 6, 8];

const Y_BE_LABEL = 18;
const Y_TOP = 28;
const Y_INT = 92; // 증분 구간선 y
const Y_ATTR = 172; // 귀속 점 y
const Y_AXIS = 224;
const Y_TICK = Y_AXIS + 22;
const VB_H = Math.ceil(Y_TICK + 12);
const f1 = (v: number) => v.toFixed(1);

export default function RoasInterval() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label={`증분 ROAS는 ${f1(IROAS)}이고 95% 구간은 ${f1(ILO)}에서 ${f1(IHI)}로 손익분기 ROAS ${f1(BE)} 아래에 있다. 플랫폼 귀속 ROAS는 ${f1(ATTR)}로 구간 밖에 있다.`}>
      <line x1={x(BE)} y1={Y_TOP} x2={x(BE)} y2={Y_AXIS} stroke="var(--warm)" strokeWidth="1.5" strokeDasharray="4 3" />
      <text className="t-warm" x={x(BE)} y={Y_BE_LABEL} textAnchor="middle">손익분기 {f1(BE)}</text>

      <line x1={x(ILO)} y1={Y_INT} x2={x(IHI)} y2={Y_INT} stroke="var(--accent)" strokeWidth="3" />
      <line x1={x(ILO)} y1={Y_INT - 8} x2={x(ILO)} y2={Y_INT + 8} stroke="var(--accent)" strokeWidth="2" />
      <line x1={x(IHI)} y1={Y_INT - 8} x2={x(IHI)} y2={Y_INT + 8} stroke="var(--accent)" strokeWidth="2" />
      <circle cx={x(IROAS)} cy={Y_INT} r="6" fill="var(--strong)" />
      <text className="t-sub" x={x(BE) - 12} y={Y_INT + 32} textAnchor="end">{f1(IROAS)} ({f1(ILO)}에서 {f1(IHI)})</text>
      <text className="t-strong" x={x(BE) + 16} y={Y_INT + 5}>증분 ROAS</text>

      <circle cx={x(ATTR)} cy={Y_ATTR} r="6" fill="var(--bad)" />
      <text className="t-bad" x={x(ATTR)} y={Y_ATTR - 18} textAnchor="middle">귀속 ROAS {f1(ATTR)}</text>

      <line x1={AX0} y1={Y_AXIS} x2={AX1} y2={Y_AXIS} stroke="var(--line)" strokeWidth="1.5" />
      {ticks.map((t) => (
        <text key={t} className="t-sub" x={x(t)} y={Y_TICK} textAnchor="middle">{t}</text>
      ))}
    </svg>
  );
}
