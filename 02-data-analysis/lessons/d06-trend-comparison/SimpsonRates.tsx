/** Crook 외(2009) Table 1 의 사용자 수와 전환 수. 비율과 합계는 여기서 계산한다. */
type Row = { name: string; sub: string; c: [number, number]; t: [number, number] };

const FRI = { c: [20000, 990000], t: [230, 10000] } as const;
const SAT = { c: [5000, 500000], t: [6000, 500000] } as const;
const sum = (a: readonly [number, number], b: readonly [number, number]): [number, number] => [a[0] + b[0], a[1] + b[1]];

const ROWS: Row[] = [
  { name: '금요일', sub: '처리군 1%', c: [...FRI.c], t: [...FRI.t] },
  { name: '토요일', sub: '처리군 50%', c: [...SAT.c], t: [...SAT.t] },
  { name: '이틀 합계', sub: '', c: sum(FRI.c, SAT.c), t: sum(FRI.t, SAT.t) },
];

const rate = (p: [number, number]) => (p[0] / p[1]) * 100;
const X0 = 50; // 막대 시작
const SCALE = 90; // 퍼센트 1당 px. 2.5% = 225px
const PITCH = 104;

export default function SimpsonRates() {
  const friC = FRI.c[1] / (FRI.c[1] + SAT.c[1]); // 대조군 사용자 중 금요일 비중
  const friT = FRI.t[1] / (FRI.t[1] + SAT.t[1]);
  const H = 8 + ROWS.length * PITCH + 24;
  return (
    <svg viewBox={`0 0 360 ${H}`} role="img" aria-label="금요일과 토요일 각각에서는 처리군의 전환율이 대조군보다 높지만, 이틀을 합치면 처리군이 더 낮아 보인다. 처리군은 전환율이 낮은 토요일에 사용자가 몰려 있기 때문이다.">
      {ROWS.map((r, i) => {
        const y0 = 8 + i * PITCH;
        const rc = rate(r.c);
        const rt = rate(r.t);
        const win = rt > rc;
        return (
          <g key={r.name}>
            <text className="t-strong" x="8" y={y0 + 14}>{r.name}</text>
            {r.sub && <text className="t-sub" x="76" y={y0 + 14}>{r.sub}</text>}
            <text className={win ? 't-good' : 't-bad'} x="352" y={y0 + 14} textAnchor="end">{win ? '처리군 높음' : '처리군 낮음'}</text>
            <text className="t-sub" x="8" y={y0 + 42}>대조</text>
            <rect className="svg-box" x={X0} y={y0 + 26} width={rc * SCALE} height="20" rx="3" />
            <text className="t-sub" x={X0 + rc * SCALE + 8} y={y0 + 41}>{rc.toFixed(2)}%</text>
            <text className="t-sub" x="8" y={y0 + 70}>처리</text>
            <rect className="svg-berg" x={X0} y={y0 + 54} width={rt * SCALE} height="20" rx="3" />
            <text className="t-sub" x={X0 + rt * SCALE + 8} y={y0 + 69}>{rt.toFixed(2)}%</text>
          </g>
        );
      })}
      <text className="t-sub" x="8" y={8 + ROWS.length * PITCH + 10}>금요일 사용자 비중: 대조군 {Math.round(friC * 100)}%, 처리군 {Math.round(friT * 100)}%</text>
    </svg>
  );
}
