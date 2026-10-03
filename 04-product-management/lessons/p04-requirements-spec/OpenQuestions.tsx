// 열린 질문 목록의 모양. 형태 예시(가상 값)이며 수치는 없다.
const ROWS: [string, string][] = [
  ['배송 불가 지역은 어디서 알리나', '담당 디자인 · 닫을 때 화면 설계 전'],
  ['저장할 수 있는 주소는 몇 개까지인가', '담당 기획 · 닫을 때 개발 시작 전'],
  ['탈퇴하면 저장 주소는 언제 지우나', '담당 개인정보 담당 · 닫을 때 출시 전'],
];

const TOP = 8;
const HEAD = 40;
const ROW = 66;
const BOTTOM = TOP + HEAD + ROWS.length * ROW;
// 카드 아랫변 + 선 두께 절반 + 아래 여백 8
const VB_H = BOTTOM + 1 + 8;

export default function OpenQuestions() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="열린 질문 목록의 모양. 질문마다 담당과 닫을 시점이 붙는다. 시점이 개발 시작 전인 질문만 시작을 막는다.">
      <rect className="svg-box" x="8" y={TOP} width="344" height={HEAD + ROWS.length * ROW} rx="8" />
      <text className="t-strong" x="22" y={TOP + 26}>열린 질문</text>
      <text className="t-sub" x="338" y={TOP + 26} textAnchor="end">형태 예시</text>
      {ROWS.map(([q, who], i) => {
        const top = TOP + HEAD + i * ROW;
        return (
          <g key={q}>
            <line x1="8" y1={top} x2="352" y2={top} stroke="var(--line)" />
            <text x="22" y={top + 28} fontSize="13.5" fontWeight="600" fill="var(--strong)">{q}</text>
            <text className="t-sub" x="22" y={top + 48}>{who}</text>
          </g>
        );
      })}
    </svg>
  );
}
