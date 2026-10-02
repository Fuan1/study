/** 형태 예시(가상 값). 사용자 5명의 활동일(시작일 = 0일)이고, 아래 비율은 이 점들에서 코드로 센 값이다. */
const USERS: { id: string; days: number[] }[] = [
  { id: 'A', days: [0, 1, 2, 7] },
  { id: 'B', days: [0, 3, 9] },
  { id: 'C', days: [0, 5] },
  { id: 'D', days: [0, 1, 8] },
  { id: 'E', days: [0, 7, 8] },
];
const NDAYS = 10;
const N = 7;
const BR_LO = 5;
const BR_HI = 7;

const count = (f: (d: number[]) => boolean) => USERS.filter((u) => f(u.days)).length;
const nDay = count((d) => d.includes(N));
const onOrAfter = count((d) => d.some((x) => x >= N));
const bracket = count((d) => d.some((x) => x >= BR_LO && x <= BR_HI));
const pct = (n: number) => Math.round((n / USERS.length) * 100);

const CX0 = 56;
const PITCH = 31;
const cx = (d: number) => CX0 + d * PITCH;
const GY0 = 70; // 첫 점 중심 y
const GP = 32;
const gridBottom = GY0 + (USERS.length - 1) * GP + 9; // 마지막 점 아랫변
const DIV = gridBottom + 14;
const B0 = DIV + 24 + 14; // 첫 블록 글자 baseline
const BP = 62;

const DEFS = [
  { label: '당일만 (N-day, 7일)', n: nDay, lo: N, hi: N },
  { label: '7일 이후 아무 때나', n: onOrAfter, lo: N, hi: NDAYS - 1 },
  { label: '5일에서 7일 구간 안', n: bracket, lo: BR_LO, hi: BR_HI },
];
const LAST_BOTTOM = B0 + (DEFS.length - 1) * BP + 10 + 14;
const HEIGHT = LAST_BOTTOM + 1 + 14;

export default function DefinitionCompare() {
  return (
    <svg viewBox={`0 0 360 ${HEIGHT}`} role="img" aria-label={`사용자 5명의 활동일 점도. 같은 사용자라도 7일째 당일만 세면 ${nDay}명, 7일 이후 아무 때나 세면 ${onOrAfter}명, 5일에서 7일 구간 안을 세면 ${bracket}명이 유지로 잡힌다.`}>
      <text className="t-sub" x="8" y="18">사용자별 활동일 (점 = 그날 활동)</text>
      {Array.from({ length: NDAYS }).map((_, d) => (
        <text key={d} className="t-sub" x={cx(d)} y="46" textAnchor="middle">{d}</text>
      ))}
      {USERS.map((u, i) => (
        <g key={u.id}>
          <text className="t-strong" x="8" y={GY0 + i * GP + 5}>{u.id}</text>
          {Array.from({ length: NDAYS }).map((_, d) => (
            u.days.includes(d)
              ? <circle key={d} cx={cx(d)} cy={GY0 + i * GP} r="9" fill="var(--accent)" />
              : <circle key={d} cx={cx(d)} cy={GY0 + i * GP} r="3" fill="var(--line)" />
          ))}
        </g>
      ))}
      <line x1="8" y1={DIV} x2="352" y2={DIV} stroke="var(--line)" />
      {DEFS.map((df, i) => {
        const yb = B0 + i * BP;
        return (
          <g key={df.label}>
            <text className="t-strong" x="8" y={yb}>{df.label}</text>
            <text className="t-warm" x="352" y={yb} textAnchor="end">{df.n}/{USERS.length} = {pct(df.n)}%</text>
            <rect className="svg-berg" x={cx(df.lo) - 14} y={yb + 10} width={cx(df.hi) - cx(df.lo) + 28} height="14" rx="4" />
          </g>
        );
      })}
    </svg>
  );
}
