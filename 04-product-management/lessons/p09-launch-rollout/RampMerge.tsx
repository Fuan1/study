/**
 * Crook 외(2009) 표 1의 건수(방문자 100만 명씩 이틀):
 * 금요일 대조 20,000/990,000, 처리 230/10,000, 토요일 대조 5,000/500,000, 처리 6,000/500,000.
 * 비율은 건수에서 계산한다.
 */
const DAYS = [
  { head: '금요일 (처리군 1퍼센트에 배정)', c: [20000, 990000], t: [230, 10000] },
  { head: '토요일 (처리군 50퍼센트에 배정)', c: [5000, 500000], t: [6000, 500000] },
];
const sum = (k: 'c' | 't') => [DAYS[0][k][0] + DAYS[1][k][0], DAYS[0][k][1] + DAYS[1][k][1]];
const GROUPS = [
  ...DAYS.map((d) => ({ head: d.head, bad: false, c: d.c, t: d.t })),
  { head: '이틀을 합치면: 처리군이 낮아 보임', bad: true, c: sum('c'), t: sum('t') },
];

const BX = 64;
const SCALE = 90; // 1퍼센트의 폭
const BH = 22;
const PITCH = 30;
const pct = (r: number[]) => (r[0] / r[1]) * 100;

let y = 8;
const layout = GROUPS.map((g) => {
  const headY = y + 14;
  const cTop = headY + 12;
  const tTop = cTop + PITCH;
  y = tTop + BH + 24;
  return { ...g, headY, cTop, tTop };
});
const last = layout[layout.length - 1];
const VB_H = last.tTop + BH + 12;

export default function RampMerge() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="전환율. 금요일은 처리군 2.30퍼센트가 대조군 2.02퍼센트보다 높고, 토요일도 1.20퍼센트가 1.00퍼센트보다 높지만, 이틀을 합치면 처리군 1.22퍼센트가 대조군 1.68퍼센트보다 낮아 보인다.">
      {layout.map((g) => (
        <g key={g.head}>
          <text className={g.bad ? 't-bad' : 't-strong'} x="8" y={g.headY}>{g.head}</text>
          {([['대조군', g.c, g.cTop, 'svg-box'], ['처리군', g.t, g.tTop, 'svg-berg']] as const).map(([label, r, top, cls]) => (
            <g key={label}>
              <text className="t-sub" x="8" y={top + 16}>{label}</text>
              <rect className={cls} x={BX} y={top} width={pct([...r]) * SCALE} height={BH} rx="4" />
              <text className="t-sub" x={BX + pct([...r]) * SCALE + 8} y={top + 16}>{pct([...r]).toFixed(2)}퍼센트</text>
            </g>
          ))}
        </g>
      ))}
    </svg>
  );
}
