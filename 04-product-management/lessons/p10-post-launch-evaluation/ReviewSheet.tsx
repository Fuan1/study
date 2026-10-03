// 형태 예시(가상 값). 공유 링크 기능이라는 가정의 리뷰이며 실제 결과가 아니다.
const ROWS: [string, string, string?][] = [
  ['믿었던 것', '공유가 재방문을 늘린다'],
  ['실제 결과', '목표 미달, 가드레일 유지'],
  ['맞았던 것', '공유 버튼 사용은 기대만큼', 't-good'],
  ['틀렸던 것', '받은 사람의 재방문이 안 늘어남', 't-bad'],
  ['이유 가설', '링크가 첫 화면으로 연결됨'],
  ['확인 방법', '받은 사람의 이동 경로 비교'],
  ['바꿀 것', '링크 도착 화면 수정'],
  ['담당·기한', '이름과 날짜를 적는다'],
];

const TOP = 8;
const HEAD = 40;
const ROW = 36;
const BOTTOM = TOP + HEAD + ROWS.length * ROW;
// 카드 아랫변 + 선 두께 절반 + 아래 여백 8
const VB_H = BOTTOM + 1 + 8;
const VAL_X = 106;

export default function ReviewSheet() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="출시 후 리뷰 문서 한 장의 모양. 믿었던 것, 실제 결과, 맞았던 것, 틀렸던 것, 이유 가설, 확인 방법, 바꿀 것, 담당과 기한을 한 줄씩 적는다.">
      <rect className="svg-box" x="8" y={TOP} width="344" height={HEAD + ROWS.length * ROW} rx="8" />
      <text className="t-strong" x="22" y={TOP + 26}>출시 후 리뷰</text>
      <text className="t-sub" x="338" y={TOP + 26} textAnchor="end">가정 예시</text>
      {ROWS.map(([k, v, cls], i) => {
        const top = TOP + HEAD + i * ROW;
        return (
          <g key={k}>
            <line x1="8" y1={top} x2="352" y2={top} stroke="var(--line)" />
            <text className={cls ?? 't-sub'} x="22" y={top + 23}>{k}</text>
            <text x={VAL_X} y={top + 23} fontSize="13">{v}</text>
          </g>
        );
      })}
    </svg>
  );
}
