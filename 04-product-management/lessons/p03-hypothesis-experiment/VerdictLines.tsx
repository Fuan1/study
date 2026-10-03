/** 형태 예시(가상 값). 가짜 문 시험 결과를 사전에 정한 두 선과 대조한다.
 * 신청 수 / 방문자 1,000명, 95% 구간(Wilson)은 이 글에서 계산: 80명 [6.5, 9.9], 55명 [4.3, 7.1], 10명 [0.5, 1.8]. */
type Row = { label: string; cls: string; color: string; est: number; lo: number; hi: number };

const ROWS: Row[] = [
  { label: '통과: 구간이 통과선 위', cls: 't-good', color: 'var(--good)', est: 8.0, lo: 6.5, hi: 9.9 },
  { label: '결론 못 냄: 선에 걸침', cls: 't-strong', color: 'var(--accent)', est: 5.5, lo: 4.3, hi: 7.1 },
  { label: '기각: 구간이 기각선 아래', cls: 't-bad', color: 'var(--bad)', est: 1.0, lo: 0.5, hi: 1.8 },
];

const MIN = 0;
const MAX = 12;
const X0 = 24;
const X1 = 336;
const x = (v: number) => X0 + ((v - MIN) / (MAX - MIN)) * (X1 - X0);
const TOP = 8;
const PITCH = 66;
const lastBottom = TOP + (ROWS.length - 1) * PITCH + 47;
const AXIS = lastBottom + 22;
const TICKS = [0, 2, 5, 10];
const f = (v: number) => v.toFixed(1);
// 축 제목 baseline 은 눈금 baseline 아래 20px. 글자 아래 여백 4 + 바깥 여백 8
const VB_H = AXIS + 20 + 20 + 4 + 8;

export default function VerdictLines() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="사전에 정한 기각선 2퍼센트와 통과선 5퍼센트에 대해 결과 구간이 놓이는 세 가지 모양. 구간이 통과선 위면 통과, 선에 걸치면 결론을 못 내고, 기각선 아래면 기각이다.">
      {ROWS.map((r, i) => {
        const yy = TOP + i * PITCH;
        const cy = yy + 40;
        return (
          <g key={r.label}>
            <text className={r.cls} x="16" y={yy + 14}>{r.label}</text>
            <text className="t-sub" x="344" y={yy + 14} textAnchor="end">{f(r.est)} [{f(r.lo)}, {f(r.hi)}]</text>
            <line x1={x(2)} y1={cy - 16} x2={x(2)} y2={cy + 16} stroke="var(--bad)" strokeWidth="1.5" strokeDasharray="4 3" />
            <line x1={x(5)} y1={cy - 16} x2={x(5)} y2={cy + 16} stroke="var(--good)" strokeWidth="1.5" strokeDasharray="4 3" />
            <line x1={x(r.lo)} y1={cy} x2={x(r.hi)} y2={cy} stroke={r.color} strokeWidth="3" />
            <line x1={x(r.lo)} y1={cy - 7} x2={x(r.lo)} y2={cy + 7} stroke={r.color} strokeWidth="2" />
            <line x1={x(r.hi)} y1={cy - 7} x2={x(r.hi)} y2={cy + 7} stroke={r.color} strokeWidth="2" />
            <circle cx={x(r.est)} cy={cy} r="5" fill={r.color} />
          </g>
        );
      })}
      <line x1={X0} y1={AXIS} x2={X1} y2={AXIS} stroke="var(--line)" strokeWidth="1.5" />
      {TICKS.map((t) => (
        <text key={t} className={t === 2 ? 't-bad' : t === 5 ? 't-good' : 't-sub'} x={x(t)} y={AXIS + 20} textAnchor="middle">{t}</text>
      ))}
      <text className="t-bad" x={x(2)} y={AXIS + 40} textAnchor="middle">기각선</text>
      <text className="t-good" x={x(5) + 8} y={AXIS + 40} textAnchor="middle">통과선</text>
      <text className="t-sub" x="344" y={AXIS + 40} textAnchor="end">신청률(%)</text>
    </svg>
  );
}
