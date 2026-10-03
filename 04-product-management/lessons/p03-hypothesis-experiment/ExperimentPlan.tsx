// 형태 예시(가상 값). 직장인 도시락 구독의 "월 구독료를 낸다" 가정을 가짜 문으로 시험하는 계획서.
// 통과선·기각선은 1,000명 기준 95% 구간(Wilson)으로 이 글에서 계산한 값이다: 64명 이상이면 구간 하한이 5% 위, 11명 이하면 구간 상한이 2% 아래.
const ROWS: [string, string][] = [
  ['가정', '월 구독료를 낸다'],
  ['가설', '가격을 본 직장인이 신청한다'],
  ['방법', '가짜 문(사전 신청 페이지)'],
  ['대상', '직장인 방문자 1,000명'],
  ['통과선', '신청 64명 이상'],
  ['기각선', '신청 11명 이하'],
  ['그 외', '표본을 늘려 재시험'],
  ['기간·비용', '2주, 광고비 상한 고정'],
  ['결정', '통과면 다음 가정으로'],
];

const TOP = 8;
const HEAD = 40;
const ROW = 38;
const BOTTOM = TOP + HEAD + ROWS.length * ROW;
// 카드 아랫변 + 선 두께 절반 + 아래 여백 8
const VB_H = BOTTOM + 1 + 8;
const VAL_X = 108;

export default function ExperimentPlan() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="실험 계획서 한 장의 모양. 가정, 가설, 방법, 대상, 통과선, 기각선, 그 외 처리, 기간과 비용, 결정을 한 줄씩 적는다.">
      <rect className="svg-box" x="8" y={TOP} width="344" height={HEAD + ROWS.length * ROW} rx="8" />
      <text className="t-strong" x="22" y={TOP + 26}>실험 계획서</text>
      <text className="t-sub" x="338" y={TOP + 26} textAnchor="end">가상 예시</text>
      {ROWS.map(([k, v], i) => {
        const top = TOP + HEAD + i * ROW;
        const cls = k === '통과선' ? 't-good' : k === '기각선' ? 't-bad' : 't-sub';
        return (
          <g key={k}>
            <line x1="8" y1={top} x2="352" y2={top} stroke="var(--line)" />
            <text className={cls} x="22" y={top + 24}>{k}</text>
            <text x={VAL_X} y={top + 24} fontSize="13">{v}</text>
          </g>
        );
      })}
    </svg>
  );
}
