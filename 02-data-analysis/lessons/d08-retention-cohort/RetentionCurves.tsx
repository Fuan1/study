/** 형태 예시(가상 값). 두 식이 그리는 모양이며 실제 제품의 측정값이 아니다.
 *  A: 0을 향해 계속 떨어진다  r = exp(-t / 4.5)
 *  B: 바닥(0.25)이 있어 평평해진다  r = 0.25 + 0.75 * exp(-t / 1.8)
 *  평평해지는 지점 = 주간 하락이 처음 1%p 아래로 내려가는 주(그림용 기준). */
const WEEKS = 12;
const X0 = 48;
const X1 = 328; // 12주 눈금 글자가 오른쪽 가장자리를 넘지 않게
const YTOP = 30; // 100%
const YBOT = 180; // 0%
const xOf = (t: number) => X0 + (t / WEEKS) * (X1 - X0);
const yOf = (r: number) => YBOT - r * (YBOT - YTOP);

const rA = (t: number) => Math.exp(-t / 4.5);
const rB = (t: number) => 0.25 + 0.75 * Math.exp(-t / 1.8);
const path = (f: (t: number) => number) => {
  const pts: string[] = [];
  for (let t = 0; t <= WEEKS + 1e-9; t += 0.25) pts.push(`${xOf(t).toFixed(1)},${yOf(f(t)).toFixed(1)}`);
  return pts.join(' ');
};
let flat = WEEKS;
for (let t = 1; t <= WEEKS; t += 1) {
  if (rB(t - 1) - rB(t) < 0.01) { flat = t; break; }
}

const TICKS = [0, 4, 8, 12];
const AXIS_LABEL = YBOT + 18;
const AXIS_TITLE = AXIS_LABEL + 28; // 눈금 글자 아래와 제목 윗변 사이 9px 이상
const DIV = AXIS_TITLE + 14;
const LG1 = DIV + 26;
const LG2 = LG1 + 26;
const HEIGHT = LG2 + 4 + 12;

export default function RetentionCurves() {
  return (
    <svg viewBox={`0 0 360 ${HEIGHT}`} role="img" aria-label={`유지 곡선 두 모양. 한 곡선은 0을 향해 계속 떨어지고, 다른 곡선은 약 ${flat}주 뒤 바닥에서 평평해진다.`}>
      <text className="t-sub" x="8" y="16">남은 비율(%)</text>
      <line x1={X0} y1={YTOP} x2={X0} y2={YBOT} stroke="var(--line)" strokeWidth="1.5" />
      <line x1={X0} y1={YBOT} x2={X1} y2={YBOT} stroke="var(--line)" strokeWidth="1.5" />
      {[0, 50, 100].map((v) => (
        <text key={v} className="t-sub" x={X0 - 8} y={yOf(v / 100) + 4} textAnchor="end">{v}</text>
      ))}
      {TICKS.map((t) => (
        <g key={t}>
          <line x1={xOf(t)} y1={YBOT} x2={xOf(t)} y2={YBOT + 4} stroke="var(--line)" strokeWidth="1.5" />
          <text className="t-sub" x={xOf(t)} y={AXIS_LABEL} textAnchor="middle">{t}주</text>
        </g>
      ))}
      <text className="t-sub" x="352" y={AXIS_TITLE} textAnchor="end">가입 후 경과 주</text>
      <polyline points={path(rA)} fill="none" stroke="var(--warm)" strokeWidth="2.5" />
      <polyline points={path(rB)} fill="none" stroke="var(--accent)" strokeWidth="2.5" />
      <circle cx={xOf(flat)} cy={yOf(rB(flat))} r="5" fill="var(--bg)" stroke="var(--accent)" strokeWidth="2" />
      <text className="t-accent" x={xOf(flat)} y={yOf(rB(flat)) - 20} textAnchor="middle">평평해지는 지점</text>
      <line x1="8" y1={DIV} x2="352" y2={DIV} stroke="var(--line)" />
      <line x1="8" y1={LG1 - 4} x2="32" y2={LG1 - 4} stroke="var(--warm)" strokeWidth="2.5" />
      <text className="t-sub" x="42" y={LG1}>계속 떨어지는 모양</text>
      <line x1="8" y1={LG2 - 4} x2="32" y2={LG2 - 4} stroke="var(--accent)" strokeWidth="2.5" />
      <text className="t-sub" x="42" y={LG2}>바닥에서 평평해지는 모양</text>
    </svg>
  );
}
