// 비교표의 모양. 칸마다 충족 여부와 근거 등급(확, 추, 미)이 붙는다. 형태 예시이며 값은 모두 가상.
type Cell = [mark: '○' | '×' | '?', grade: '확' | '추' | '미'];

const COLS = ['우리', '직접', '대체재', '안 함'];
const ROWS: { label: string; cells: Cell[] }[] = [
  { label: '기준 1', cells: [['○', '확'], ['×', '확'], ['○', '확'], ['×', '확']] },
  { label: '기준 2', cells: [['○', '확'], ['○', '확'], ['×', '추'], ['×', '확']] },
  { label: '기준 3', cells: [['○', '확'], ['×', '추'], ['?', '미'], ['×', '확']] },
  { label: '기준 4', cells: [['×', '확'], ['○', '확'], ['○', '추'], ['×', '확']] },
  { label: '기준 5', cells: [['○', '확'], ['○', '미'], ['×', '확'], ['×', '확']] },
];

const TOP = 8;
const TITLE = 34; // 기준일 줄
const HEAD = 34; // 열 제목 줄
const ROW = 34;
const LABW = 84; // 행 제목 칸 폭
const COLW = 65; // 값 칸 폭(4열, 합 344)
const BODY0 = TOP + TITLE + HEAD;
const FOOT0 = BODY0 + ROWS.length * ROW;
const BOTTOM = FOOT0 + ROW;
// 카드 아랫변 + 선 두께 절반 + 아래 여백 8
const VB_H = Math.ceil(BOTTOM + 0.75 + 8);
const cx = (j: number) => 8 + LABW + COLW * j + COLW / 2;
const gradeFill = (g: string) => (g === '확' ? 'var(--muted)' : 'var(--warm)');

export default function CompareShape() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="비교표의 모양. 열은 우리, 직접 경쟁, 대체재, 아무것도 안 하기이고 행은 고객 기준이다. 칸마다 충족 여부와 근거 등급이 있고, 우리가 약한 행도 있으며, 맨 아래에 출처가 붙는다.">
      <rect className="svg-box" x="8" y={TOP} width="344" height={BOTTOM - TOP} rx="8" />
      <text className="t-sub" x="22" y={TOP + 22}>기준일 2026-10-01 (가상)</text>
      <line x1="8" y1={TOP + TITLE} x2="352" y2={TOP + TITLE} stroke="var(--line)" />
      {COLS.map((c, j) => (
        <text key={c} className="t-sub" x={cx(j)} y={TOP + TITLE + 22} textAnchor="middle">{c}</text>
      ))}
      <line x1={8 + LABW} y1={TOP + TITLE} x2={8 + LABW} y2={BOTTOM} stroke="var(--line)" />
      {ROWS.map((r, i) => {
        const top = BODY0 + i * ROW;
        return (
          <g key={r.label}>
            <line x1="8" y1={top} x2="352" y2={top} stroke="var(--line)" />
            <text className="t-sub" x="22" y={top + 22}>{r.label}</text>
            {r.cells.map(([m, g], j) => (
              <text key={j} x={cx(j)} y={top + 22} textAnchor="middle" fontSize="13.5" fill="var(--strong)">
                {m}
                <tspan dx="4" fontSize="12.5" fill={gradeFill(g)}>{g}</tspan>
              </text>
            ))}
          </g>
        );
      })}
      <line x1="8" y1={FOOT0} x2="352" y2={FOOT0} stroke="var(--line)" />
      <text className="t-sub" x="22" y={FOOT0 + 22}>출처</text>
      {COLS.map((c, j) => (
        <text key={c} className="t-sub" x={cx(j)} y={FOOT0 + 22} textAnchor="middle">링크</text>
      ))}
    </svg>
  );
}
