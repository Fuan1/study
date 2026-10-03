// 백로그 항목 표준 형식의 모양. 값은 설명용 가상 예시이며 실제 서비스의 값이 아니다.
const ROWS: [string, string][] = [
  ['제목', '재설정 메일을 다시 보낸다'],
  ['누가·왜', '가입자 · 메일을 못 받아서'],
  ['범위', '안 재전송 · 밖 문구 변경'],
  ['인수 기준', '주어진 · 하면 · 그러면 시나리오'],
  ['디자인', '기본 · 오류 · 완료 화면 링크'],
  ['열린 질문', '재전송 간격은? → 제품 담당자'],
  ['크기', '개발팀이 기입'],
  ['순서', '목록 위치로만 표시'],
];

const TOP = 8;
const HEAD = 40;
const ROW = 38;
const BOTTOM = TOP + HEAD + ROWS.length * ROW;
// 카드 아랫변 + 선 두께 절반 + 아래 여백 8
const VB_H = BOTTOM + 1 + 8;
const VAL_X = 104;

export default function ItemCard() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="백로그 항목 한 장의 모양. 제목, 누가와 왜, 범위, 인수 기준, 디자인 링크, 열린 질문, 크기, 순서를 한 줄씩 적는다. 크기는 개발팀이, 순서는 목록 위치가 정한다.">
      <rect className="svg-box" x="8" y={TOP} width="344" height={HEAD + ROWS.length * ROW} rx="8" />
      <text className="t-strong" x="22" y={TOP + 26}>백로그 항목</text>
      <text className="t-sub" x="352" y={TOP + 26} textAnchor="end" dx="-14">가상 예시</text>
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
