/** 주지표 결과 x 가드레일 결과로 정하는 판정 표. 칸 안 글은 짧게, 설명은 본문 표로 둔다. */
type Cell = { title: string; sub: string; cls: string };

// 행: 가드레일 악화 없음 / 악화. 열: 주지표 유의한 개선 / 유의하지 않음.
const CELLS: Cell[][] = [
  [
    { title: '출시', sub: '배포 진행', cls: 'svg-box-good' },
    { title: '재실험·종료', sub: 'CI 폭으로 가림', cls: 'svg-box' },
  ],
  [
    { title: '보류', sub: '득실 따져 결정', cls: 'svg-tip' },
    { title: '출시 안 함', sub: '원인 조사', cls: 'svg-box-bad' },
  ],
];
const COLS = ['유의한 개선', '유의하지 않음'];
const ROWS = [['가드레일', '악화 없음'], ['가드레일', '악화']];

const CW = 124;
const CH = 72;
const CX = [96, 228];
const CGAP = 8;
const HEAD = 56; // 첫 행 y
const rowY = (i: number) => HEAD + i * (CH + CGAP);
const STROKE = 2;
const VB_H = Math.ceil(rowY(1) + CH + STROKE / 2 + 8);

export default function VerdictMatrix() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="판정 매트릭스. 주지표가 유의하게 개선되고 가드레일이 악화되지 않으면 출시. 개선됐지만 가드레일이 악화되면 보류. 유의하지 않고 가드레일이 정상이면 신뢰구간 폭을 보고 재실험 또는 종료. 유의하지 않고 가드레일이 악화되면 출시하지 않는다.">
      <text className="t-strong" x={(CX[0] + CX[1] + CW) / 2} y="20" textAnchor="middle">주지표</text>
      {COLS.map((c, j) => (
        <text key={c} className="t-sub" x={CX[j] + CW / 2} y="42" textAnchor="middle">{c}</text>
      ))}
      {ROWS.map((r, i) => (
        <g key={r[1]}>
          <text className="t-sub" x="8" y={rowY(i) + 30}>{r[0]}</text>
          <text className="t-sub" x="8" y={rowY(i) + 50}>{r[1]}</text>
        </g>
      ))}
      {CELLS.map((row, i) => row.map((c, j) => (
        <g key={`${i}-${j}`}>
          <rect className={c.cls} x={CX[j]} y={rowY(i)} width={CW} height={CH} rx="8" />
          <text className="t-strong" x={CX[j] + 12} y={rowY(i) + 30}>{c.title}</text>
          <text className="t-sub" x={CX[j] + 12} y={rowY(i) + 52}>{c.sub}</text>
        </g>
      )))}
    </svg>
  );
}
