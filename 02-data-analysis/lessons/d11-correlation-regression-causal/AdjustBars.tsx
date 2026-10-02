/** python 으로 계산한 값(가상 데이터 n=2000, seed 51, 참값 2.0). 변수 X 의 계수 추정값과 95% 신뢰구간. */
const TRUE_EFFECT = 2.0;
const ROWS = [
  { label: 'X 만 넣음', est: 3.46, lo: 3.37, hi: 3.55, tag: '위로 치우침', tone: 't-bad' },
  { label: 'X + 교란 변수 Z', est: 2.01, lo: 1.97, hi: 2.05, tag: '참값 근처', tone: 't-good' },
  { label: 'X + Z + 충돌 변수 C', est: 0.51, lo: 0.44, hi: 0.59, tag: '아래로 치우침', tone: 't-bad' },
];

const X0 = 16;
const PER = 82; // 값 1 당 px, 0 에서 4 까지 328px
const xOf = (v: number) => X0 + v * PER;
const TOP = 40; // 점선 시작
const PITCH = 60;

export default function AdjustBars() {
  const rowY = (i: number) => TOP + 20 + i * PITCH; // 라벨 baseline
  const lineBottom = rowY(ROWS.length - 1) + 40;
  const tickY = lineBottom + 24;
  const H = tickY + 4 + 8;
  return (
    <svg viewBox={`0 0 360 ${H}`} role="img" aria-label="변수 X 의 계수 추정값. X 만 넣으면 3.46으로 참값 2.0보다 크고, 교란 변수 Z 를 넣으면 2.01로 참값에 가깝고, 충돌 변수 C 까지 넣으면 0.51로 다시 틀어진다.">
      <text className="t-accent" x={xOf(TRUE_EFFECT)} y={TOP - 12} textAnchor="middle">참값 {TRUE_EFFECT.toFixed(1)}</text>
      <line x1={xOf(TRUE_EFFECT)} y1={TOP} x2={xOf(TRUE_EFFECT)} y2={lineBottom} stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="5 3" />
      {ROWS.map((r, i) => {
        const y = rowY(i);
        const my = y + 24;
        return (
          <g key={r.label}>
            <text className="t-strong" x={X0} y={y}>{r.label}</text>
            <text className={r.tone} x={344} y={y} textAnchor="end">{r.tag}</text>
            <line x1={xOf(r.lo)} y1={my} x2={xOf(r.hi)} y2={my} stroke="var(--strong)" strokeWidth="2" />
            <circle cx={xOf(r.est)} cy={my} r="5" fill="var(--warm)" />
            <text className="t-sub" x={xOf(r.hi) + 10} y={my + 4}>{r.est.toFixed(2)}</text>
          </g>
        );
      })}
      <line x1={X0} y1={lineBottom} x2={xOf(4)} y2={lineBottom} stroke="var(--line)" strokeWidth="1.5" />
      {[0, 1, 2, 3, 4].map((v) => (
        <text key={v} className="t-sub" x={xOf(v)} y={tickY} textAnchor="middle">{v}</text>
      ))}
    </svg>
  );
}
