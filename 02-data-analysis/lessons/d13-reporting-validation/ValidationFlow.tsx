/** 제출 전 검증 6단계를 순서대로 보인다. 단계 문구만 있고 계산 수치는 없다. */
const STEPS = [
  { t: '요구·정의 재확인', s: '질문, 지표 정의, 기간, 제외 조건' },
  { t: '행 수·합계 대조', s: '원천 합계, 중복, 조인 전후' },
  { t: '다른 방법으로 재계산', s: '경로를 바꿔도 같은 값인가' },
  { t: '세그먼트 합 대조', s: '조각의 합이 전체와 같은가' },
  { t: '극단값·샘플 행 확인', s: '상위·하위·무작위 5행을 눈으로' },
  { t: '결과 방향 확인', s: '이전 값, 외부 수치와 비교' },
];

// 여백 기준: 상자 높이 66(두 줄), 상자 사이 24, 번호 원은 왼쪽 가장자리에서 13px, 글자는 원에서 8px 이상.
const X = 8;
const W = 344;
const H = 66;
const GAP = 24;
const Y0 = 8;
const LAST_H = 40; // 한 줄 상자
const yOf = (i: number) => Y0 + i * (H + GAP);
const lastY = yOf(STEPS.length); // 마지막 상자 위치(단계 상자와 같은 간격)
const bottom = lastY + LAST_H; // 마지막 도형의 아랫변
const VB_H = Math.ceil(bottom + 0.75 + 8); // 선 두께 절반 + 아래 여백 8

export default function ValidationFlow() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="제출 전 검증 순서. 요구와 정의 재확인, 행 수와 합계 대조, 다른 방법으로 재계산, 세그먼트 합 대조, 극단값과 샘플 행 확인, 결과 방향 확인을 차례로 통과하면 제출한다.">
      <defs>
        <marker id="ar-vf" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      {STEPS.map((st, i) => {
        const y = yOf(i);
        return (
          <g key={st.t}>
            <rect className="svg-box" x={X} y={y} width={W} height={H} rx="8" />
            <circle className="svg-box-key" cx={X + 13 + 13} cy={y + H / 2} r="13" />
            <text className="t-strong" x={X + 26} y={y + H / 2 + 5} textAnchor="middle">{i + 1}</text>
            <text className="t-strong" x={X + 54} y={y + 29}>{st.t}</text>
            <text className="t-sub" x={X + 54} y={y + 50}>{st.s}</text>
            <line className="svg-flow" x1={X + W / 2} y1={y + H + 4} x2={X + W / 2} y2={yOf(i + 1) - 4} markerEnd="url(#ar-vf)" />
          </g>
        );
      })}
      <rect className="svg-berg" x={X} y={lastY} width={W} height={LAST_H} rx="8" />
      <text className="t-strong" x={X + W / 2} y={lastY + LAST_H / 2 + 5} textAnchor="middle">제출</text>
    </svg>
  );
}
