// 가상 예시: 소규모 매장용 주문 관리 도구의 문제 정의서 한 장. 실제 서비스의 값이 아니다.
const ROWS: [string, string][] = [
  ['누구에게', '매장 한두 곳을 운영하는 점주'],
  ['어떤 상황에서', '주 1회 지난주 주문을 세무사에게 보낼 때'],
  ['무엇이 어려운가', '화면의 숫자를 손으로 옮겨 적어 오래 걸린다'],
  ['지금의 대안', '화면 캡처, 수기 입력'],
  ['영향의 크기', '점주 수와 빈도. 모름, 로그로 확인'],
  ['성공 판정', '정리 시간이 줄었다고 답한 점주 비율'],
];

const TOP = 8;
const HEAD = 44;
const ROW = 62;
const BOTTOM = TOP + HEAD + ROWS.length * ROW;
// 카드 아랫변 + 선 두께 절반 + 아래 여백 8
const VB_H = BOTTOM + 1 + 8;

export default function ProblemSheet() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="문제 정의서 한 장의 모양. 누구에게, 어떤 상황에서, 무엇이 어려운가, 지금의 대안, 영향의 크기, 성공 판정을 한 칸씩 적고 해결책 이름은 쓰지 않는다. 가정한 주문 관리 도구 예시다.">
      <rect className="svg-box" x="8" y={TOP} width="344" height={HEAD + ROWS.length * ROW} rx="8" />
      <text className="t-strong" x="22" y={TOP + 28}>문제 정의서</text>
      <text className="t-sub" x="338" y={TOP + 28} textAnchor="end">가정 예시</text>
      {ROWS.map(([k, v], i) => {
        const top = TOP + HEAD + i * ROW;
        return (
          <g key={k}>
            <line x1="8" y1={top} x2="352" y2={top} stroke="var(--line)" />
            <text className="t-sub" x="22" y={top + 24}>{k}</text>
            <text x="22" y={top + 47} fontSize="13">{v}</text>
          </g>
        );
      })}
    </svg>
  );
}
