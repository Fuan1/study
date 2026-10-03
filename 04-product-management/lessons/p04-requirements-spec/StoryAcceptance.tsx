// 스토리 하나에서 인수 기준 시나리오 셋으로. 형태 예시(가상 값)이며 수치는 없다.
const SCENARIOS: { name: string; rows: [string, string][] }[] = [
  { name: '정상', rows: [['상황', '로그인, 저장 배송지 있음'], ['행동', '주문 화면을 연다'], ['결과', '저장 배송지가 선택돼 있다']] },
  { name: '예외', rows: [['상황', '저장 배송지 없음'], ['행동', '주문 화면을 연다'], ['결과', '입력 칸이 비어 있다']] },
  { name: '경계', rows: [['상황', '저장 주소가 배송 불가 지역'], ['행동', '주문 화면을 연다'], ['결과', '경고를 띄우고 변경을 요구']] },
];

const STORY_H = 86;
const ARROW = 40;
const SC_H = 102;
const PITCH = 26; // 줄 baseline 간격(글자 사이 12px 이상)
const SC_GAP = 24;
const scY = (i: number) => 8 + STORY_H + ARROW + i * (SC_H + SC_GAP);
// 마지막 상자 아랫변 + 선 두께 절반 + 아래 여백 8
const VB_H = scY(SCENARIOS.length - 1) + SC_H + 1 + 8;

export default function StoryAcceptance() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="사용자 스토리 하나에서 인수 기준 시나리오를 정상, 예외, 경계로 나누어 쓴다. 각 시나리오는 상황, 행동, 결과 세 줄이다.">
      <defs>
        <marker id="p4sa" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      <rect className="svg-box-key" x="8" y="8" width="344" height={STORY_H} rx="8" />
      <text className="t-sub" x="22" y="36">사용자 스토리</text>
      <text x="22" y="57" fontSize="13">구매자로서 배송지를 저장하고 싶다,</text>
      <text x="22" y="77" fontSize="13">다음 주문에서 다시 입력하지 않으려고</text>
      <line className="svg-flow" x1="40" y1={8 + STORY_H + 6} x2="40" y2={8 + STORY_H + ARROW - 6} markerEnd="url(#p4sa)" />
      <text className="t-sub" x="56" y={8 + STORY_H + ARROW / 2 + 4.5}>완료 조건을 시나리오로 쓴다</text>
      {SCENARIOS.map((s, i) => (
        <g key={s.name}>
          <rect className="svg-box" x="8" y={scY(i)} width="344" height={SC_H} rx="8" />
          <text className="t-strong" x="22" y={scY(i) + SC_H / 2 + 5}>{s.name}</text>
          {s.rows.map(([k, v], j) => (
            <g key={k}>
              <text className="t-sub" x="76" y={scY(i) + 32 + j * PITCH}>{k}</text>
              <text x="116" y={scY(i) + 32 + j * PITCH} fontSize="13">{v}</text>
            </g>
          ))}
        </g>
      ))}
    </svg>
  );
}
