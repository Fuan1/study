// 가정한 구매 버튼 문구 테스트의 설계서 모양. 실제 서비스의 값이 아니다.
const ROWS: [string, string][] = [
  ['가설', '문구 변경이 결제 시작을 늘린다'],
  ['변경 내용', '버튼 문구 하나만 바꿈'],
  ['배정 단위', '사용자(로그인 ID)'],
  ['대상', '모바일 방문자 전체'],
  ['성공 지표', '결제를 시작한 사용자 비율'],
  ['가드레일', '결제 완료율, 오류율, 속도'],
  ['최소 검출 효과', '상대 +5%'],
  ['표본·기간', '사전 계산한 수, 2주'],
  ['멈추는 규칙', '기간 끝까지. 훼손 시만 중단'],
];

const TOP = 8;
const HEAD = 40;
const ROW = 38;
const BOTTOM = TOP + HEAD + ROWS.length * ROW;
// 카드 아랫변 + 선 두께 절반 + 아래 여백 8
const VB_H = BOTTOM + 1 + 8;
const VAL_X = 124;

export default function DesignSheet() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="테스트 설계서 한 장의 모양. 가설, 변경 내용, 배정 단위, 대상, 성공 지표, 가드레일, 최소 검출 효과, 표본과 기간, 멈추는 규칙을 한 줄씩 적는다.">
      <rect className="svg-box" x="8" y={TOP} width="344" height={HEAD + ROWS.length * ROW} rx="8" />
      <text className="t-strong" x="22" y={TOP + 26}>테스트 설계서</text>
      <text className="t-sub" x="352" y={TOP + 26} textAnchor="end" dx="-14">가정 예시</text>
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
