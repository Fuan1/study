/** 가상 매출 6행. GROUP BY 는 지역별로 합쳐 2행, 윈도우 합계는 6행을 그대로 두고 열만 붙인다. 합계는 코드로 계산한다. */
const SALES = [
  { rep: 'kim', region: 'east', amount: 300 },
  { rep: 'lee', region: 'east', amount: 300 },
  { rep: 'park', region: 'east', amount: 200 },
  { rep: 'choi', region: 'west', amount: 500 },
  { rep: 'jung', region: 'west', amount: 400 },
  { rep: 'han', region: 'west', amount: 400 },
];
const REGIONS = ['east', 'west'];
const totalOf = (region: string) => SALES.filter((s) => s.region === region).reduce((a, s) => a + s.amount, 0);

const X = 8;
const W = 344;
const ROW = 40; // 칸 높이: 글자 16 + 위아래 여백 12씩
const HL_X = 254; // 합계 열 강조 시작 x
const SUM_X = 338; // 합계 열 오른쪽 정렬 x

export default function WindowVsGroup() {
  // 1번 묶음: GROUP BY (제목 + 머리글 1행 + 2행)
  const t1 = 22;
  const top1 = t1 + 12;
  const bottom1 = top1 + ROW * (1 + REGIONS.length);
  // 2번 묶음: 윈도우 합계 (묶음 사이 24px 이상)
  const t2 = bottom1 + 24 + 14;
  const top2 = t2 + 12;
  const bottom2 = top2 + ROW * (1 + SALES.length);
  const H = Math.ceil(bottom2 + 0.75 + 12);
  const base = (top: number, i: number) => top + i * ROW + 24; // 글자 위 12, 아래 12
  return (
    <svg viewBox={`0 0 360 ${H}`} role="img" aria-label="같은 6행 데이터에 GROUP BY region 을 쓰면 지역별 2행으로 줄고, SUM(amount) OVER (PARTITION BY region) 을 쓰면 6행이 그대로 남고 지역 합계 열이 붙는다.">
      <text className="t-strong" x={X} y={t1}>GROUP BY region</text>
      <text className="t-warm" x={X + W} y={t1} textAnchor="end">6행 → {REGIONS.length}행</text>
      <rect className="svg-box" x={X} y={top1} width={W} height={bottom1 - top1} rx="8" />
      <rect className="svg-berg" x={HL_X} y={top1 + 1} width={X + W - HL_X - 1} height={bottom1 - top1 - 2} rx="7" />
      <text className="t-sub" x="22" y={base(top1, 0)}>region</text>
      <text className="t-sub" x={SUM_X} y={base(top1, 0)} textAnchor="end">total</text>
      {REGIONS.map((r, i) => (
        <g key={r}>
          <line x1={X} y1={top1 + (i + 1) * ROW} x2={X + W} y2={top1 + (i + 1) * ROW} stroke="var(--line)" />
          <text x="22" y={base(top1, i + 1)} fontSize="13">{r}</text>
          <text className="t-strong" x={SUM_X} y={base(top1, i + 1)} textAnchor="end">{totalOf(r)}</text>
        </g>
      ))}

      <text className="t-strong" x={X} y={t2}>OVER (PARTITION BY region)</text>
      <text className="t-good" x={X + W} y={t2} textAnchor="end">6행 → {SALES.length}행</text>
      <rect className="svg-box" x={X} y={top2} width={W} height={bottom2 - top2} rx="8" />
      <rect className="svg-berg" x={HL_X} y={top2 + 1} width={X + W - HL_X - 1} height={bottom2 - top2 - 2} rx="7" />
      <text className="t-sub" x="22" y={base(top2, 0)}>rep</text>
      <text className="t-sub" x="84" y={base(top2, 0)}>region</text>
      <text className="t-sub" x="216" y={base(top2, 0)} textAnchor="end">amount</text>
      <text className="t-sub" x={SUM_X} y={base(top2, 0)} textAnchor="end">reg_total</text>
      {SALES.map((s, i) => (
        <g key={s.rep}>
          <line x1={X} y1={top2 + (i + 1) * ROW} x2={X + W} y2={top2 + (i + 1) * ROW} stroke={i === 3 ? 'var(--muted)' : 'var(--line)'} />
          <text x="22" y={base(top2, i + 1)} fontSize="13">{s.rep}</text>
          <text x="84" y={base(top2, i + 1)} fontSize="13">{s.region}</text>
          <text x="216" y={base(top2, i + 1)} fontSize="13" textAnchor="end">{s.amount}</text>
          <text className="t-strong" x={SUM_X} y={base(top2, i + 1)} textAnchor="end">{totalOf(s.region)}</text>
        </g>
      ))}
    </svg>
  );
}
