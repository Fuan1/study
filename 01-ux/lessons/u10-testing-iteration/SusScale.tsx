/** 0-100 눈금 위에 문헌에서 보고된 기준점을 올린다. 위치는 값에서 계산한다. */
const X0 = 14;
const W = 332;
const pos = (v: number) => X0 + (W * v) / 100;

const MARKS = [
  { v: 80, label: '80 이상 · 상위 약 10%', cls: 't-good' },
  { v: 74, label: '74 · 70번째 백분위', cls: 't-accent' },
  { v: 68, label: '68 · 평균(50번째 백분위)', cls: 't-warm' },
];

export default function SusScale() {
  const yBar = 128;
  return (
    <svg viewBox="0 0 360 198" role="img" aria-label="SUS 0에서 100점 눈금. 평균 68점은 50번째 백분위, 74점은 70번째 백분위, 80점 이상은 상위 약 10퍼센트로 보고된다. 점수는 백분율이 아니다.">
      {MARKS.map((m, i) => {
        const y = 22 + i * 26;
        return (
          <g key={m.v}>
            <text className={m.cls} x="8" y={y}>{m.label}</text>
            <line x1="226" y1={y - 4} x2={pos(m.v)} y2={y - 4} stroke="var(--line)" strokeWidth="1" />
            <line x1={pos(m.v)} y1={y - 4} x2={pos(m.v)} y2={yBar} stroke="var(--muted)" strokeWidth="1.5" />
          </g>
        );
      })}
      <rect className="svg-box" x={X0} y={yBar} width={W} height="22" rx="4" />
      <rect x={pos(68)} y={yBar} width={pos(100) - pos(68)} height="22" rx="4" style={{ fill: 'var(--accent-soft)' }} stroke="var(--accent)" />
      {[0, 50, 100].map((v) => (
        <text key={v} className="t-sub" x={pos(v)} y={yBar + 40} textAnchor={v === 0 ? 'start' : v === 100 ? 'end' : 'middle'}>{v}</text>
      ))}
      <text className="t-sub" x="180" y={yBar + 60} textAnchor="middle">SUS 점수. 백분율이 아니라 비교용 눈금이다</text>
    </svg>
  );
}
