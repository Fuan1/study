// 콘텐츠 기획표의 모양. 가상 의자 쇼핑몰의 가정 값이며 실제 데이터가 아니다.
const ROWS: [string, string, string][] = [
  ['의자 허리 아플 때', 'Know', '가이드 글'],
  ['사무용 의자 구매', 'Do', '상품·목록 페이지'],
  ['브랜드명', 'Website', '홈 페이지'],
  ['근처 의자 매장', 'Visit', '매장 안내 페이지'],
];

const TOP = 8;
const HEAD = 40;
const ROW = 46;
const H = HEAD + ROWS.length * ROW;
// 카드 아랫변 + 선 두께 절반 + 아래 여백 8
const VB_H = TOP + H + 1 + 8;
const X1 = 22;
const X2 = 164;
const X3 = 236;

export default function PlanSheet() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="콘텐츠 기획표의 모양. 한 행에 검색어, 의도, 페이지 형식을 적는다. 예: 의자 허리 아플 때는 Know 의도라서 가이드 글, 사무용 의자 구매는 Do 의도라서 상품·목록 페이지.">
      <rect className="svg-box" x="8" y={TOP} width="344" height={H} rx="8" />
      <text className="t-sub" x={X1} y={TOP + 26}>검색어</text>
      <text className="t-sub" x={X2} y={TOP + 26}>의도</text>
      <text className="t-sub" x={X3} y={TOP + 26}>페이지 형식</text>
      {ROWS.map(([q, intent, page], i) => {
        const top = TOP + HEAD + i * ROW;
        return (
          <g key={q}>
            <line x1="8" y1={top} x2="352" y2={top} stroke="var(--line)" />
            <text x={X1} y={top + 28} fontSize="13">{q}</text>
            <text className="t-accent" x={X2} y={top + 28}>{intent}</text>
            <text x={X3} y={top + 28} fontSize="13">{page}</text>
          </g>
        );
      })}
    </svg>
  );
}
