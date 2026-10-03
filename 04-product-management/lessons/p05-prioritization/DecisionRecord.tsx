// 형태 예시(가상 값). 우선순위 결정 기록 한 장의 모양이다. 실제 서비스의 값이 아니다.
const ROWS: [string, string, string][] = [
  ['결정', '분기 첫 과제를 고른다', '후보 A, B, C 중 하나'],
  ['점수', 'RICE 순위 A, B, C', '입력표를 첨부'],
  ['입력 가정', '도달은 지난 분기 로그', '영향은 면담 5건 기준'],
  ['점수와 다름', 'B 를 먼저 한다', 'A 의 선행 작업이라서'],
  ['점수 밖 점검', '의존 있음, 전략 부합', '법규 해당 없음'],
  ['다시 볼 때', 'B 출시 뒤 지표 확인', '가정이 틀리면 재점수'],
];

const TOP = 8;
const HEAD = 40;
const ROW = 54;
const BOTTOM = TOP + HEAD + ROWS.length * ROW;
// 카드 아랫변 + 선 두께 절반 + 아래 여백 8
const VB_H = BOTTOM + 1 + 8;
const VAL_X = 118;

export default function DecisionRecord() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="우선순위 결정 기록 한 장의 모양. 결정, 점수, 입력 가정, 점수와 다르게 정한 것, 점수 밖 점검, 다시 볼 때를 한 줄씩 적는다.">
      <rect className="svg-box" x="8" y={TOP} width="344" height={HEAD + ROWS.length * ROW} rx="8" />
      <text className="t-strong" x="22" y={TOP + 26}>우선순위 결정 기록</text>
      <text className="t-sub" x="338" y={TOP + 26} textAnchor="end">가상 예시</text>
      {ROWS.map(([k, v1, v2], i) => {
        const top = TOP + HEAD + i * ROW;
        return (
          <g key={k}>
            <line x1="8" y1={top} x2="352" y2={top} stroke="var(--line)" />
            <text className="t-sub" x="22" y={top + 22}>{k}</text>
            <text x={VAL_X} y={top + 22} fontSize="13">{v1}</text>
            <text className="t-sub" x={VAL_X} y={top + 42}>{v2}</text>
          </g>
        );
      })}
    </svg>
  );
}
