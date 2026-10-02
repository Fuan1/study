// 채널 테스트 계획서의 모양. 값이 아니라 칸에 무엇을 적는지만 보인다.
const ROWS: [string, string][] = [
  ['채널', '한 번에 하나'],
  ['가설', '타깃이 허용 CAC 안에 온다'],
  ['판정 이벤트', '가입 또는 결제, 하나만'],
  ['전환 수 K', '시작 전에 정한다'],
  ['최소 예산', 'K ÷ 전환율 × CPC'],
  ['전환율·CPC', '낙관·비관 범위로'],
  ['기간', '전환 창이 닫힐 때까지'],
  ['접는 기준', '무전환 시 클릭 수 기준'],
  ['종료일', '시작 전에 적는다'],
];

const TOP = 8;
const HEAD = 40;
const ROW = 38;
const BOTTOM = TOP + HEAD + ROWS.length * ROW;
// 카드 아랫변 + 선 두께 절반 + 아래 여백 8
const VB_H = BOTTOM + 1 + 8;
const VAL_X = 124;

export default function PlanSheet() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="채널 테스트 계획서 한 장의 모양. 채널, 가설, 판정 이벤트, 목표 전환 수, 최소 예산, 전환율과 CPC 범위, 기간, 접는 기준, 종료일을 시작 전에 한 줄씩 적는다.">
      <rect className="svg-box" x="8" y={TOP} width="344" height={HEAD + ROWS.length * ROW} rx="8" />
      <text className="t-strong" x="22" y={TOP + 26}>채널 테스트 계획서</text>
      <text className="t-sub" x="352" y={TOP + 26} textAnchor="end" dx="-14">형태 예시</text>
      {ROWS.map(([k, v], i) => {
        const top = TOP + HEAD + i * ROW;
        return (
          <g key={k}>
            <line x1="8" y1={top} x2="352" y2={top} stroke="var(--line)" />
            <text className="t-sub" x="22" y={top + 24}>{k}</text>
            <text x={VAL_X} y={top + 24} fontSize="13">{v}</text>
          </g>
        );
      })}
    </svg>
  );
}
