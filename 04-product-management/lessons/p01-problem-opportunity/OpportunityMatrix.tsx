/**
 * 형태 예시(가상 값): 같은 줄의 기회 셋을 Torres 의 네 요인(규모, 시장, 회사, 고객)으로 나란히 비교한 표.
 * 칸의 수준(높음, 보통, 낮음)은 설명용으로 정한 값이다. 노력(구현 난이도)은 요인에 넣지 않는다.
 */
type Level = 0 | 1 | 2; // 0 낮음, 1 보통, 2 높음
const FACTORS = ['규모', '시장', '회사', '고객'];
const ROWS: { key: string; name: string; sub: string; levels: Level[]; pick?: boolean }[] = [
  { key: 'A', name: 'A 옮겨 적기', sub: '고름', levels: [2, 1, 2, 2], pick: true },
  { key: 'B', name: 'B 입력법 모름', sub: '보류', levels: [1, 0, 1, 1] },
  { key: 'C', name: 'C 품절 알림', sub: '조사 더', levels: [0, 1, 0, 2] },
];

const TOP = 8;
const HEAD = 40;
const ROW = 74; // 상자 높이 66 + 간격 8
const BOX = 66;
const LABEL_W = 148;
const COL0 = 8 + LABEL_W + 22; // 첫 열의 중심
const COL_PITCH = 46;
const R = 9;
const LAST_BOTTOM = TOP + HEAD + (ROWS.length - 1) * ROW + BOX;
const LEG_Y = LAST_BOTTOM + 24 + R;
const VB_H = LEG_Y + R + 1 + 8;

// 높음: 찬 원, 보통: 속이 빈 원, 낮음: 작은 점
const Mark = ({ l, cx, cy }: { l: Level; cx: number; cy: number }) =>
  l === 2 ? <circle cx={cx} cy={cy} r={R} fill="var(--accent)" stroke="var(--accent)" strokeWidth="1.5" />
  : l === 1 ? <circle cx={cx} cy={cy} r={R} fill="none" stroke="var(--accent)" strokeWidth="1.5" />
  : <circle cx={cx} cy={cy} r={3} fill="var(--muted)" />;

export default function OpportunityMatrix() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="기회 A, B, C를 규모, 시장, 회사, 고객 네 요인으로 비교한 표. A가 대부분 높아 고르고, B는 보류, C는 고객 요인만 높아 조사를 더 한다. 가상 값이다.">
      {FACTORS.map((f, i) => (
        <text key={f} className="t-sub" x={COL0 + i * COL_PITCH} y={TOP + 24} textAnchor="middle">{f}</text>
      ))}
      {ROWS.map((r, i) => {
        const top = TOP + HEAD + i * ROW;
        return (
          <g key={r.key}>
            <rect className={r.pick ? 'svg-box-key' : 'svg-box'} x="8" y={top} width="344" height={BOX} rx="8" />
            <text className="t-strong" x="22" y={top + 28}>{r.name}</text>
            <text className={r.pick ? 't-accent' : 't-sub'} x="22" y={top + 50}>{r.sub}</text>
            {r.levels.map((l, j) => (
              <Mark key={j} l={l} cx={COL0 + j * COL_PITCH} cy={top + BOX / 2} />
            ))}
          </g>
        );
      })}
      {([2, 1, 0] as Level[]).map((l, i) => (
        <g key={l}>
          <Mark l={l} cx={20 + i * 92} cy={LEG_Y} />
          <text className="t-sub" x={20 + i * 92 + R + 8} y={LEG_Y + 5}>{['높음', '보통', '낮음'][i]}</text>
        </g>
      ))}
    </svg>
  );
}
