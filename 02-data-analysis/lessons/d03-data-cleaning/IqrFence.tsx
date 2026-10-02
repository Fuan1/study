/** IQR 1.5 규칙 계산. 값은 d03 가상 주문 중 금액이 있는 17건(천 원). 사분위수는 선형 보간(percentile_cont 와 같은 방식)으로 코드에서 계산한다. */
const AMOUNTS = [18, 19, 22, 24, 25, 27, 28, 28, 29, 30, 32, 35, 38, 41, 46, 60, 520];

function pct(sorted: number[], p: number) {
  const h = (sorted.length - 1) * p;
  const lo = Math.floor(h);
  const hi = Math.min(lo + 1, sorted.length - 1);
  return sorted[lo] + (h - lo) * (sorted[hi] - sorted[lo]);
}
const S = [...AMOUNTS].sort((a, b) => a - b);
const Q1 = pct(S, 0.25);
const MED = pct(S, 0.5);
const Q3 = pct(S, 0.75);
const IQR = Q3 - Q1;
const LO = Q1 - 1.5 * IQR;
const HI = Q3 + 1.5 * IQR;
const FAR = Q3 + 3 * IQR;

// 축은 0~85 만 그리고 520 은 점선 너머에 둔다. 여백: 점 사이 가로 9px 이상(같은 줄), 점 줄 간격 10px.
const AX0 = 14;
const PX = 3.5;
const x = (v: number) => AX0 + v * PX;
const AXIS_MAX = 85;
const FAR_DOT_X = 340;
const R = 4;
const MIN_DX = 9;
const LANE = 10;
const lastX: number[] = [];
const lanes = S.filter((v) => v <= AXIS_MAX).map((v) => {
  let l = lastX.findIndex((lx) => x(v) - lx >= MIN_DX);
  if (l < 0) { l = lastX.length; lastX.push(0); }
  lastX[l] = x(v);
  return { v, l };
});
const NL = lastX.length;

const BOX_Y = 40;
const BOX_H = 36;
const DOT_TOP = BOX_Y + BOX_H + 24;
const DOT_BASE = DOT_TOP + (NL - 1) * LANE; // 가장 아래 줄 중심
const AXIS_Y = DOT_BASE + R + 14;
const TICK_Y = AXIS_Y + 18;
const LEG1 = TICK_Y + 30;
const LEG2 = LEG1 + 20;
const H = LEG2 + 3 + 12;

export default function IqrFence() {
  const out = (v: number) => v < LO || v > HI;
  const whiskerLo = Math.min(...S.filter((v) => v >= LO));
  const whiskerHi = Math.max(...S.filter((v) => v <= HI));
  const mid = BOX_Y + BOX_H / 2;
  return (
    <svg viewBox={`0 0 360 ${H}`} role="img" aria-label={`금액 17건의 Q1 ${Q1}, 중앙값 ${MED}, Q3 ${Q3}, IQR ${IQR}. 하한 ${LO}, 상한 ${HI} 밖은 60과 520 두 건이고 극단 기준 ${FAR} 밖은 520 한 건이다.`}>
      {[[LO, '하한'], [HI, '상한'], [FAR, '극단']].map(([v, name]) => (
        <g key={name as string}>
          <text className="t-accent" x={x(v as number)} y="20" textAnchor="middle">{name} {v}</text>
          <line className="svg-flow" x1={x(v as number)} y1="30" x2={x(v as number)} y2={AXIS_Y} strokeDasharray="4 3" />
        </g>
      ))}
      <line className="svg-flow" x1={x(whiskerLo)} y1={mid} x2={x(Q1)} y2={mid} />
      <line className="svg-flow" x1={x(Q3)} y1={mid} x2={x(whiskerHi)} y2={mid} />
      <rect className="svg-berg" x={x(Q1)} y={BOX_Y} width={(Q3 - Q1) * PX} height={BOX_H} />
      <line className="svg-flow" x1={x(MED)} y1={BOX_Y} x2={x(MED)} y2={BOX_Y + BOX_H} strokeWidth="2.5" />
      {lanes.map(({ v, l }) => (
        <circle key={`${v}-${l}`} cx={x(v)} cy={DOT_BASE - l * LANE} r={R} fill={out(v) ? 'var(--bad)' : 'var(--accent)'} />
      ))}
      <circle cx={FAR_DOT_X} cy={DOT_BASE} r={R} fill="var(--bad)" />
      <text className="t-bad" x={FAR_DOT_X} y={DOT_BASE - 12} textAnchor="middle">520</text>
      <line className="svg-flow" x1={x(AXIS_MAX)} y1={AXIS_Y} x2={FAR_DOT_X + 12} y2={AXIS_Y} strokeDasharray="2 4" />
      <line className="svg-flow" x1={AX0} y1={AXIS_Y} x2={x(AXIS_MAX)} y2={AXIS_Y} />
      {[0, 20, 40, 60, 80].map((t) => (
        <text key={t} className="t-sub" x={x(t)} y={TICK_Y} textAnchor="middle">{t}</text>
      ))}
      <text className="t-sub" x="8" y={LEG1}>상자 {Q1}~{Q3}(IQR {IQR}) · 굵은 선 중앙값 {MED}</text>
      <text className="t-sub" x="8" y={LEG2}>빨간 점은 상한·하한 밖 · 점선 구간은 축 생략</text>
    </svg>
  );
}
