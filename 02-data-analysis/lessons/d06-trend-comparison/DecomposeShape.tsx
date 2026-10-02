/** 가상 예시: 추세 + 요일 패턴 + 나머지를 더해 관측값을 만든다(덧셈 분해). 숫자는 모두 가정이다. */
const N = 35; // 5주
const TREND = Array.from({ length: N }, (_, t) => 100 + 0.5 * t);
const WEEKDAY = [2, 3, 3, 4, 6, -9, -9]; // 월~일, 합이 0
const SEASON = Array.from({ length: N }, (_, t) => WEEKDAY[t % 7] * 1.5);
const REMAIN = Array.from({ length: N }, (_, t) => 2.2 * Math.sin(t * 2.3 + 1) + 1.2 * Math.cos(t * 5.1));
const OBS = TREND.map((v, t) => v + SEASON[t] + REMAIN[t]);

const X0 = 8;
const X1 = 352;
const xOf = (t: number) => X0 + (t / (N - 1)) * (X1 - X0);

// 세로 눈금은 네 칸 모두 1px 당 0.7 로 같다(성분 크기를 정직하게 비교).
type Panel = { title: string; data: number[]; h: number; lo: number; hi: number; zero?: boolean };

const PANELS: Panel[] = [
  { title: '관측값 = 아래 셋을 더한 것', data: OBS, h: 64, lo: 85, hi: 130 },
  { title: '추세: 느리게 오른다', data: TREND, h: 40, lo: 94.5, hi: 122.5 },
  { title: '요일 패턴: 7일마다 같은 모양', data: SEASON, h: 40, lo: -14, hi: 14, zero: true },
  { title: '나머지: 설명되지 않는 흔들림', data: REMAIN, h: 40, lo: -14, hi: 14, zero: true },
];

export default function DecomposeShape() {
  let y = 6;
  const blocks = PANELS.map((p) => {
    const top = y + 28;
    y = top + p.h + 24;
    const yOf = (v: number) => top + p.h - ((v - p.lo) / (p.hi - p.lo)) * p.h;
    const pts = p.data.map((v, t) => `${xOf(t).toFixed(1)},${yOf(v).toFixed(1)}`).join(' ');
    return { p, top, pts, yOf };
  });
  const H = y;
  return (
    <svg viewBox={`0 0 360 ${H}`} role="img" aria-label="35일짜리 가상 지표를 추세, 7일 주기 요일 패턴, 나머지로 나눈 모양. 관측값은 세 성분을 더한 값이다.">
      {blocks.map(({ p, top, pts, yOf }, i) => (
        <g key={p.title}>
          <text className="t-strong" x="8" y={top - 10}>{p.title}</text>
          <rect className="svg-box" x={X0} y={top} width={X1 - X0} height={p.h} rx="4" />
          {p.zero && <line x1={X0} y1={yOf(0)} x2={X1} y2={yOf(0)} stroke="var(--line)" strokeDasharray="4 4" />}
          <polyline points={pts} fill="none" stroke={i === 0 ? 'var(--accent)' : 'var(--warm)'} strokeWidth="2" strokeLinejoin="round" />
        </g>
      ))}
    </svg>
  );
}
