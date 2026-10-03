/**
 * 출처: Fowler "Technical Debt Quadrant" (2009). 세로축은 신중/무모, 가로축은 의도적/비의도적.
 * 칸 설명은 그 글을 이 글이 줄여 쓴 것이다.
 */
type Cell = { title: string; lines: string[]; bad: boolean };

const COLS = ['의도적 (알고 택함)', '비의도적 (나중에 앎)'];
const ROWS: { label: string; cells: Cell[] }[] = [
  {
    label: '신중한 빚',
    cells: [
      { title: '출시용 지름길', lines: ['이득과 비용을', '따져 알고 택함', '갚을 계획 필요'], bad: false },
      { title: '배운 뒤 생긴 빚', lines: ['만들면서 더 나은', '설계를 알게 됨', '좋은 팀도 겪음'], bad: false },
    ],
  },
  {
    label: '무모한 빚',
    cells: [
      { title: '대충 짜기', lines: ['시간이 없다며', '알면서 대충 함', '보통 손해로 끝남'], bad: true },
      { title: '몰라서 생긴 엉망', lines: ['설계 지식 없이', '짠 코드. 이자가', '매우 큼'], bad: true },
    ],
  },
];

const CW = 168;
const CH = 120;
const CX = [8, 184];
const ROW_LABEL_Y = [56, 222];
const ROW_TOP = [68, 234];
const VB_H = ROW_TOP[1] + CH + 1 + 8;

export default function Quadrant() {
  return (
    <svg
      viewBox={`0 0 360 ${VB_H}`}
      role="img"
      aria-label="기술 부채 사분면. 신중하고 의도적인 출시용 지름길, 신중하고 비의도적인 배운 뒤 생긴 빚, 무모하고 의도적인 대충 짜기, 무모하고 비의도적인 몰라서 생긴 엉망."
    >
      {COLS.map((c, i) => (
        <text key={c} className="t-strong" x={CX[i] + CW / 2} y="22" textAnchor="middle">{c}</text>
      ))}
      {ROWS.map((r, ri) => (
        <g key={r.label}>
          <text className="t-sub" x="8" y={ROW_LABEL_Y[ri]}>{r.label}</text>
          {r.cells.map((c, ci) => {
            const top = ROW_TOP[ri];
            return (
              <g key={c.title}>
                <rect className={c.bad ? 'svg-box-bad' : 'svg-box'} x={CX[ci]} y={top} width={CW} height={CH} rx="8" />
                <text className="t-strong" x={CX[ci] + 14} y={top + 30}>{c.title}</text>
                {c.lines.map((l, li) => (
                  <text key={l} className="t-sub" x={CX[ci] + 14} y={top + 54 + li * 22}>{l}</text>
                ))}
              </g>
            );
          })}
        </g>
      ))}
    </svg>
  );
}
