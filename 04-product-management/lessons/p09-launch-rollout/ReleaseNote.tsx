// 사용자용 출시 공지 한 장의 모양. 가정 예시이며 실제 서비스의 값이 아니다.
const ROWS: [string, string][] = [
  ['무엇이', '주문 내역에 필터 추가'],
  ['누구에게', '앱 사용자, 순차 적용'],
  ['언제부터', '시작일, 전체 적용 예정일'],
  ['달라지는 점', '기존 화면은 그대로'],
  ['해야 할 일', '없음 (업데이트 불필요)'],
  ['문의', '문의 경로, 알려진 한계'],
];

const TOP = 8;
const HEAD = 40;
const ROW = 38;
const BOTTOM = TOP + HEAD + ROWS.length * ROW;
// 카드 아랫변 + 선 두께 절반 + 아래 여백 8
const VB_H = BOTTOM + 1 + 8;
const VAL_X = 112;

export default function ReleaseNote() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="사용자용 출시 공지 한 장의 모양. 무엇이, 누구에게, 언제부터, 달라지는 점, 해야 할 일, 문의를 한 줄씩 적는다.">
      <rect className="svg-box" x="8" y={TOP} width="344" height={HEAD + ROWS.length * ROW} rx="8" />
      <text className="t-strong" x="22" y={TOP + 26}>출시 공지</text>
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
