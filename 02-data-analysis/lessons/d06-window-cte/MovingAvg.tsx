/** 가상 월 매출 6개월과 3개월 이동평균(ROWS BETWEEN 2 PRECEDING AND CURRENT ROW). 값은 코드로 계산하고, 대상이 3개 미만인 달은 속 빈 점으로 표시한다. */
const MONTHS = ['01', '02', '03', '04', '05', '06'];
const REV = [100, 120, 90, 150, 150, 180];
const N = 3;
const windowOf = (i: number) => REV.slice(Math.max(0, i - N + 1), i + 1);
const MA = REV.map((_, i) => windowOf(i).reduce((a, v) => a + v, 0) / windowOf(i).length);
const CNT = REV.map((_, i) => windowOf(i).length);

const XS = REV.map((_, i) => 80 + i * 50);
const AX = 52; // 축 x
const YTOP = 16; // 값 200 의 y
const YBASE = 156; // 값 60 의 y
const yOf = (v: number) => YBASE - (v - 60);
const pts = (vals: number[]) => vals.map((v, i) => `${XS[i]},${yOf(v).toFixed(1)}`).join(' ');

export default function MovingAvg() {
  const monthY = YBASE + 20;
  const rows = [monthY + 28, monthY + 52, monthY + 76];
  const H = Math.ceil(rows[2] + 6 + 12);
  return (
    <svg viewBox={`0 0 360 ${H}`} role="img" aria-label="월 매출 100, 120, 90, 150, 150, 180 과 3개월 이동평균 100, 110, 103.3, 120, 130, 160. 이동평균은 들쭉날쭉한 변동을 완만하게 하고, 처음 두 달은 평균 대상이 1개와 2개뿐이다.">
      <line x1={AX} y1={YBASE} x2="352" y2={YBASE} stroke="var(--line)" strokeWidth="1.5" />
      <line x1={AX} y1={YTOP} x2={AX} y2={YBASE} stroke="var(--line)" strokeWidth="1.5" />
      {[100, 150, 200].map((v) => (
        <g key={v}>
          <line x1={AX} y1={yOf(v)} x2="352" y2={yOf(v)} stroke="var(--line)" strokeDasharray="2 4" />
          <text className="t-sub" x={AX - 8} y={yOf(v) + 4} textAnchor="end">{v}</text>
        </g>
      ))}
      <polyline points={pts(REV)} fill="none" stroke="var(--muted)" strokeWidth="1.5" />
      {REV.map((v, i) => <circle key={i} cx={XS[i]} cy={yOf(v)} r="3" fill="var(--muted)" />)}
      <polyline points={pts(MA)} fill="none" stroke="var(--accent)" strokeWidth="2.5" />
      {MA.map((v, i) => (
        <circle key={i} cx={XS[i]} cy={yOf(v)} r="4.5" fill={CNT[i] < N ? 'var(--bg)' : 'var(--accent)'} stroke="var(--accent)" strokeWidth="2" />
      ))}
      {MONTHS.map((m, i) => <text key={m} className="t-sub" x={XS[i]} y={monthY} textAnchor="middle">{m}월</text>)}
      <text className="t-sub" x="8" y={rows[0]}>매출</text>
      <text className="t-accent" x="8" y={rows[1]}>평균</text>
      <text className="t-warm" x="8" y={rows[2]}>대상</text>
      {XS.map((x, i) => (
        <g key={i}>
          <text x={x} y={rows[0]} textAnchor="middle" fontSize="13">{REV[i]}</text>
          <text className="t-accent" x={x} y={rows[1]} textAnchor="middle" fontSize="13">{MA[i].toFixed(1)}</text>
          <text className={CNT[i] < N ? 't-warm' : 't-sub'} x={x} y={rows[2]} textAnchor="middle">{CNT[i]}</text>
        </g>
      ))}
    </svg>
  );
}
