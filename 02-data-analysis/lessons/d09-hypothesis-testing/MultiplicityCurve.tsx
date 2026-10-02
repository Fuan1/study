/** 참인 귀무가설을 m번 독립으로 검정할 때 하나 이상 유의하게 나올 확률.
 *  보정 없음: 1-(1-a)^m, 보정 있음(각 검정을 a/m 으로): 1-(1-a/m)^m. 식으로 계산한 값이다. */
const ALPHA = 0.05;
const X0 = 48;
const X1 = 344;
const Y0 = 150; // 확률 0 의 y
const PH = 130; // 확률 1 의 높이
const MMAX = 30;
const xOf = (m: number) => X0 + (m / MMAX) * (X1 - X0);
const yOf = (p: number) => Y0 - p * PH;
const raw = (m: number) => 1 - Math.pow(1 - ALPHA, m);
const adj = (m: number) => 1 - Math.pow(1 - ALPHA / m, m);

const MARKS = [5, 10, 20];
const XTICKS = [1, 5, 10, 20, 30];
const YTICKS = [0, 0.5, 1];
const TICK_Y = Y0 + 22; // 눈금 숫자 baseline
const TITLE_Y = TICK_Y + 30; // 축 제목 baseline: 눈금 숫자 아래 12px 이상 띄움
const VB_H = TITLE_Y + 16; // 글자 아래 여백 8px 이상(내림 획 포함)

export default function MultiplicityCurve() {
  const a: string[] = [];
  const b: string[] = [];
  for (let m = 1; m <= MMAX; m += 0.5) {
    a.push(`${xOf(m).toFixed(1)},${yOf(raw(m)).toFixed(1)}`);
    b.push(`${xOf(m).toFixed(1)},${yOf(adj(m)).toFixed(1)}`);
  }
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="유의수준 0.05로 검정을 m번 하면 거짓 양성이 하나 이상 나올 확률이 5번에 23퍼센트, 10번에 40퍼센트, 20번에 64퍼센트로 오른다. 각 검정을 0.05를 m으로 나눈 값으로 하면 약 5퍼센트에 머문다.">
      <line x1={X0} y1={Y0} x2={X1} y2={Y0} stroke="var(--line)" strokeWidth="1.5" />
      <line x1={X0} y1={Y0} x2={X0} y2={yOf(1)} stroke="var(--line)" strokeWidth="1.5" />
      {YTICKS.map((p) => (
        <text key={p} className="t-sub" x={X0 - 8} y={yOf(p) + 4} textAnchor="end">{Math.round(p * 100)}%</text>
      ))}
      <polyline points={a.join(' ')} fill="none" stroke="var(--bad)" strokeWidth="2.5" />
      <polyline points={b.join(' ')} fill="none" stroke="var(--good)" strokeWidth="2.5" />
      {MARKS.map((m) => (
        <g key={m}>
          <circle cx={xOf(m)} cy={yOf(raw(m))} r="4" fill="var(--warm)" />
          <text className="t-warm" x={xOf(m) - 10} y={yOf(raw(m)) - 8} textAnchor="end">{Math.round(raw(m) * 100)}%</text>
        </g>
      ))}
      {XTICKS.map((m) => (
        <g key={m}>
          <line x1={xOf(m)} y1={Y0} x2={xOf(m)} y2={Y0 + 4} stroke="var(--line)" strokeWidth="1.5" />
          <text className="t-sub" x={xOf(m)} y={TICK_Y} textAnchor="middle">{m}</text>
        </g>
      ))}
      <text className="t-sub" x={X1} y={TITLE_Y} textAnchor="end">검정 횟수 m</text>
      <text className="t-bad" x={X1} y={yOf(raw(MMAX)) - 12} textAnchor="end">보정 없음</text>
      <text className="t-good" x={X1} y={yOf(adj(MMAX)) - 12} textAnchor="end">α/m 보정</text>
    </svg>
  );
}
