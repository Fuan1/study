/** 가상 테이블: orders 의 order_id 4개, order_items 의 order_id 7개. 조인 종류별 결과 행을 코드로 만든다. */
const LEFT = [1, 2, 3, 4];
const RIGHT = [1, 1, 2, 3, 3, 3, 9];

type Cell = { key: number; kind: 'both' | 'left' | 'right' };

const matched: Cell[] = LEFT.flatMap((k) => RIGHT.filter((r) => r === k).map(() => ({ key: k, kind: 'both' as const })));
const leftOnly: Cell[] = LEFT.filter((k) => !RIGHT.includes(k)).map((k) => ({ key: k, kind: 'left' as const }));
const rightOnly: Cell[] = RIGHT.filter((r) => !LEFT.includes(r)).map((k) => ({ key: k, kind: 'right' as const }));

const SECTIONS: { name: string; cells: Cell[] }[] = [
  { name: 'INNER', cells: matched },
  { name: 'LEFT', cells: [...matched, ...leftOnly] },
  { name: 'FULL', cells: [...matched, ...leftOnly, ...rightOnly] },
];
const CROSS = LEFT.length * RIGHT.length;

// 여백 기준: 칸 36x32(숫자 한 자리), 칸 간격 6, 묶음 사이 24, 제목은 칸 위 9px.
const CW = 36;
const CH = 32;
const GAP = 6;
const X0 = 15;
const SEC_H = 26 + CH;
const SEC_GAP = 24;
const cls = { both: 'svg-berg', left: 'svg-tip', right: 'svg-box-bad' } as const;

export default function JoinRows() {
  const y0 = (i: number) => 8 + i * (SEC_H + SEC_GAP);
  const crossY = y0(SECTIONS.length);
  const crossSubY = crossY + 34;
  const legendY = crossSubY + 3 + 24;
  const H = legendY + 14 + 8;
  const legend = [
    { x: 8, c: 'svg-berg', t: '양쪽 일치' },
    { x: 124, c: 'svg-tip', t: '왼쪽만' },
    { x: 214, c: 'svg-box-bad', t: '오른쪽만' },
  ];
  return (
    <svg viewBox={`0 0 360 ${H}`} role="img" aria-label="조인 종류별 결과 행. INNER 6행, LEFT 7행, FULL 8행, CROSS 28행.">
      {SECTIONS.map((s, i) => (
        <g key={s.name}>
          <text className="t-strong" x="8" y={y0(i) + 14}>{s.name} · {s.cells.length}행</text>
          {s.cells.map((c, j) => (
            <g key={j}>
              <rect className={cls[c.kind]} x={X0 + j * (CW + GAP)} y={y0(i) + 26} width={CW} height={CH} rx="6" />
              <text className="t-strong" x={X0 + j * (CW + GAP) + CW / 2} y={y0(i) + 26 + 21} textAnchor="middle">{c.key}</text>
            </g>
          ))}
        </g>
      ))}
      <text className="t-strong" x="8" y={crossY + 14}>CROSS · {LEFT.length} × {RIGHT.length} = {CROSS}행</text>
      <text className="t-sub" x="8" y={crossSubY}>키와 무관하게 모든 짝을 만든다</text>
      {legend.map((l) => (
        <g key={l.t}>
          <rect className={l.c} x={l.x} y={legendY} width="14" height="14" rx="3" />
          <text className="t-sub" x={l.x + 22} y={legendY + 12}>{l.t}</text>
        </g>
      ))}
    </svg>
  );
}
