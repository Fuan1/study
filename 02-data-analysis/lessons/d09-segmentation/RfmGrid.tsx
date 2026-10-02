/** 최근성 3구간 x 빈도 3구간 칸. 칸 이름과 할 일은 가상 예시다. 금액 축은 칸마다 다시 나눈다. */
type Cell = { name: string; todo: string; cls: string };

// 행: 최근성 높음(위) -> 낮음(아래). 열: 빈도 낮음 -> 높음.
const CELLS: Cell[][] = [
  [
    { name: '신규', todo: '재구매', cls: 'svg-box' },
    { name: '성장', todo: '구매 유도', cls: 'svg-box' },
    { name: '핵심', todo: '혜택 유지', cls: 'svg-berg' },
  ],
  [
    { name: '관망', todo: '이유 확인', cls: 'svg-box' },
    { name: '일반', todo: '기본 안내', cls: 'svg-box' },
    { name: '단골', todo: '관계 유지', cls: 'svg-box' },
  ],
  [
    { name: '휴면', todo: '재활성화', cls: 'svg-box' },
    { name: '이탈 위험', todo: '선제 개입', cls: 'svg-tip' },
    { name: '놓친 단골', todo: '복귀 설득', cls: 'svg-tip' },
  ],
];
const ROW_LABEL = ['높음', '중간', '낮음'];
const COL_LABEL = ['낮음', '중간', '높음'];

const X0 = 66;
const CW = 92;
const CH = 64;
const STEP_X = CW + 4;
const STEP_Y = CH + 4;
const Y0 = 36;

export default function RfmGrid() {
  const bottom = Y0 + 2 * STEP_Y + CH;
  return (
    <svg viewBox={`0 0 360 ${bottom + 1 + 12}`} role="img" aria-label="최근성 세 구간과 빈도 세 구간으로 만든 아홉 칸. 최근성과 빈도가 모두 높은 칸이 핵심, 최근성이 낮고 빈도가 높은 칸이 놓친 단골이다.">
      <text className="t-sub" x="8" y="20">최근성</text>
      {COL_LABEL.map((c, i) => (
        <text key={c} className="t-sub" x={X0 + i * STEP_X + CW / 2} y="20" textAnchor="middle">빈도 {c}</text>
      ))}
      {CELLS.map((row, r) => (
        <g key={r}>
          <text className="t-sub" x="8" y={Y0 + r * STEP_Y + CH / 2 + 5}>{ROW_LABEL[r]}</text>
          {row.map((c, k) => (
            <g key={c.name}>
              <rect className={c.cls} x={X0 + k * STEP_X} y={Y0 + r * STEP_Y} width={CW} height={CH} rx="8" />
              <text className="t-strong" x={X0 + k * STEP_X + CW / 2} y={Y0 + r * STEP_Y + 27} textAnchor="middle">{c.name}</text>
              <text className="t-sub" x={X0 + k * STEP_X + CW / 2} y={Y0 + r * STEP_Y + 47} textAnchor="middle">{c.todo}</text>
            </g>
          ))}
        </g>
      ))}
    </svg>
  );
}
