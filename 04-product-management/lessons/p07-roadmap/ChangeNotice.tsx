// 가상 예시: 변경 공지 한 건. 항목 하나, 이동, 새 근거, 영향, 그대로인 것, 다음 점검.
const ROWS: [string, string[]][] = [
  ['항목', ['검색 포기 줄이기']],
  ['이동', ['Next 에서 Later 로']],
  ['이유', ['새 근거: 이탈 원인이 검색이', '아니라 필터로 보인다']],
  ['영향', ['영업 자료의 검색 개선 문구', '수정이 필요하다']],
  ['그대로', ['Now 의 목표와 지표는 변함없다']],
  ['다음 점검', ['다음 분기 검토 회의']],
];
const TOP = 8;
const HEAD = 40;
const rowH = (n: number) => (n > 1 ? 60 : 40);
let acc = TOP + HEAD;
const rows = ROWS.map(([k, v]) => {
  const top = acc;
  acc += rowH(v.length);
  return { k, v, top };
});
const BOTTOM = acc;
const VB_H = BOTTOM + 1 + 8;
const VAL_X = 100;

export default function ChangeNotice() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="변경 공지 한 건. 항목, 이동, 이유, 영향, 그대로인 것, 다음 점검을 한 줄씩 적는다.">
      <rect className="svg-box" x="8" y={TOP} width="344" height={BOTTOM - TOP} rx="8" />
      <text className="t-strong" x="22" y={TOP + 26}>변경 공지</text>
      <text className="t-sub" x="338" y={TOP + 26} textAnchor="end">가상 예시</text>
      {rows.map((r) => (
        <g key={r.k}>
          <line x1="8" y1={r.top} x2="352" y2={r.top} stroke="var(--line)" />
          <text className="t-sub" x="22" y={r.top + 26 - (r.v.length > 1 ? 0 : 1)}>{r.k}</text>
          {r.v.map((line, i) => (
            <text key={line} x={VAL_X} y={r.top + 26 - (r.v.length > 1 ? 0 : 1) + i * 20} fontSize="13">{line}</text>
          ))}
        </g>
      ))}
    </svg>
  );
}
