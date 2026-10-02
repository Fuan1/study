/** 형태 예시(가상 값). 점은 추정한 차이, 선은 95% 신뢰구간. 기준 +2%는 설계서에 적은 최소 의미 효과로 가정한다. */
type Row = { label: string; cls: string; color: string; est: number; lo: number; hi: number };

const ROWS: Row[] = [
  { label: '기준 위: 출시 후보', cls: 't-good', color: 'var(--good)', est: 3.5, lo: 2.4, hi: 4.6 },
  { label: '걸침: 결론 못 냄', cls: 't-strong', color: 'var(--accent)', est: 1.0, lo: -2.5, hi: 4.5 },
  { label: '0 위, 기준 아래: 작음', cls: 't-warm', color: 'var(--warm)', est: 0.6, lo: 0.2, hi: 1.0 },
  { label: '0 아래: 나빠짐', cls: 't-bad', color: 'var(--bad)', est: -1.8, lo: -3.0, hi: -0.6 },
];

const MIN = -4;
const MAX = 6;
const X0 = 24;
const X1 = 336;
const x = (v: number) => X0 + ((v - MIN) / (MAX - MIN)) * (X1 - X0);
const TOP = 8;
const PITCH = 66;
const lastBottom = TOP + (ROWS.length - 1) * PITCH + 47; // 마지막 구간 끝마디 아랫변
const AXIS = lastBottom + 22; // 축 선
const TICKS = [-4, -2, 0, 2, 4, 6];
const sign = (v: number) => (v > 0 ? `+${v.toFixed(1)}` : v.toFixed(1));
const tick = (t: number) => (t > 0 ? `+${t}` : `${t}`);
// 축 제목 baseline 은 눈금 글자 baseline 아래 20px. 글자 아래 여백 4 + 바깥 여백 8
const VB_H = AXIS + 20 + 20 + 4 + 8;

export default function ResultIntervals() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="신뢰구간이 놓이는 네 가지 모양. 구간 전체가 기준 위면 출시 후보, 0과 기준을 걸치면 결론을 못 내고, 0 위지만 기준 아래면 효과가 작고, 0 아래면 나빠졌을 수 있다.">
      {ROWS.map((r, i) => {
        const y = TOP + i * PITCH;
        const cy = y + 40;
        return (
          <g key={r.label}>
            <text className={r.cls} x="16" y={y + 14}>{r.label}</text>
            <text className="t-sub" x="344" y={y + 14} textAnchor="end">{sign(r.est)} [{sign(r.lo)}, {sign(r.hi)}]</text>
            <line x1={x(0)} y1={cy - 16} x2={x(0)} y2={cy + 16} stroke="var(--muted)" strokeWidth="1.5" />
            <line x1={x(2)} y1={cy - 16} x2={x(2)} y2={cy + 16} stroke="var(--warm)" strokeWidth="1.5" strokeDasharray="4 3" />
            <line x1={x(r.lo)} y1={cy} x2={x(r.hi)} y2={cy} stroke={r.color} strokeWidth="3" />
            <line x1={x(r.lo)} y1={cy - 7} x2={x(r.lo)} y2={cy + 7} stroke={r.color} strokeWidth="2" />
            <line x1={x(r.hi)} y1={cy - 7} x2={x(r.hi)} y2={cy + 7} stroke={r.color} strokeWidth="2" />
            <circle cx={x(r.est)} cy={cy} r="5" fill={r.color} />
          </g>
        );
      })}
      <line x1={X0} y1={AXIS} x2={X1} y2={AXIS} stroke="var(--line)" strokeWidth="1.5" />
      {TICKS.map((t) => (
        <text key={t} className={t === 2 ? 't-warm' : 't-sub'} x={x(t)} y={AXIS + 20} textAnchor="middle">{tick(t)}</text>
      ))}
      <text className="t-sub" x="344" y={AXIS + 40} textAnchor="end">상대 변화(%)</text>
    </svg>
  );
}
