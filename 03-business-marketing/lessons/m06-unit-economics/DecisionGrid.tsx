/** LTV 대 CAC 비율과 회수 기간을 함께 보는 2x2 판단표. 기준값은 각자 정한다(3 대 1, 12개월은 관행). */
type Cell = { title: string; sub: string; cls: string };
const CELLS: Cell[][] = [
  [
    { title: '증액 후보', sub: '증분 CAC 확인', cls: 'svg-box-good' },
    { title: '현금 점검', sub: '선불·자금 확인', cls: 'svg-box' },
  ],
  [
    { title: '리텐션 개선', sub: '재구매·잔존', cls: 'svg-box' },
    { title: '중단·재설계', sub: '정의부터 점검', cls: 'svg-box-bad' },
  ],
];
const ROW_LABELS = ['비율 높음', '비율 낮음'];
const COL_LABELS = ['회수 짧음', '회수 김'];

const BX = 72; // 상자 영역 시작 x
const BW = 128;
const GAP = 24;
const BH = 70;
const TOP = 34; // 열 제목 baseline 18 아래로 16px
const colX = (c: number) => BX + c * (BW + GAP);
const rowY = (r: number) => TOP + r * (BH + GAP);
const VB_H = rowY(1) + BH + 12;

export default function DecisionGrid() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="LTV 대 CAC 비율과 회수 기간 판단표. 비율 높고 회수 짧으면 증액 후보, 비율 높고 회수 길면 현금 점검, 비율 낮고 회수 짧으면 리텐션 개선, 둘 다 나쁘면 중단 또는 재설계.">
      {COL_LABELS.map((l, c) => (
        <text key={l} className="t-sub" x={colX(c) + BW / 2} y="18" textAnchor="middle">{l}</text>
      ))}
      {CELLS.map((row, r) => (
        <g key={ROW_LABELS[r]}>
          <text className="t-sub" x="8" y={rowY(r) + BH / 2 + 4}>{ROW_LABELS[r]}</text>
          {row.map((c, ci) => (
            <g key={c.title}>
              <rect className={c.cls} x={colX(ci)} y={rowY(r)} width={BW} height={BH} rx="8" />
              <text className="t-strong" x={colX(ci) + 14} y={rowY(r) + 29}>{c.title}</text>
              <text className="t-sub" x={colX(ci) + 14} y={rowY(r) + 50}>{c.sub}</text>
            </g>
          ))}
        </g>
      ))}
    </svg>
  );
}
