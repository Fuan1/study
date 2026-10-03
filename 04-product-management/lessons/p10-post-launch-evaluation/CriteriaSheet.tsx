// 형태 예시(가상 값). 기능과 수는 모두 가정이며 실제 제품의 값이 아니다.
const ROWS: [string, string, string?][] = [
  ['목표 지표', '공유 후 재방문율'],
  ['기준값', '기준선 대비 +2%p 이상'],
  ['가드레일', '오류율, 결제 완료율'],
  ['장기 지표', '8주 뒤 유지율'],
  ['비교 방법', '10%를 대조군으로 남김'],
  ['판정 날짜', '출시 14일 뒤'],
  ['달성이면', '유지, 전체 확대', 't-good'],
  ['미달이면', '수정 1회 뒤 재판정'],
  ['해로우면', '즉시 되돌림', 't-bad'],
  ['판정 담당', '제품 담당자 한 명'],
];

const TOP = 8;
const HEAD = 40;
const ROW = 36;
const BOTTOM = TOP + HEAD + ROWS.length * ROW;
// 카드 아랫변 + 선 두께 절반 + 아래 여백 8
const VB_H = BOTTOM + 1 + 8;
const VAL_X = 118;

export default function CriteriaSheet() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="성공 기준표 한 장의 모양. 목표 지표, 기준값, 가드레일, 장기 지표, 비교 방법, 판정 날짜, 달성이면, 미달이면, 해로우면 할 일, 판정 담당을 한 줄씩 적는다.">
      <rect className="svg-box" x="8" y={TOP} width="344" height={HEAD + ROWS.length * ROW} rx="8" />
      <text className="t-strong" x="22" y={TOP + 26}>성공 기준표</text>
      <text className="t-sub" x="338" y={TOP + 26} textAnchor="end">공유 링크 기능(가정)</text>
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
