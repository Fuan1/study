// 가상 예시: 항목 카드 한 장. 목표값은 합의 뒤에 채우므로 비워 둔다.
const ROWS: [string, string[]][] = [
  ['목표', ['가입 첫 주에 쓰기 시작하는', '사용자를 늘린다']],
  ['풀 문제', ['가입 뒤 첫 사용 전에', '그만두는 사람이 많다']],
  ['성공 지표', ['첫 주 재방문 비율', '목표값: 합의 뒤 기입']],
  ['확신도', ['중간. 인터뷰 근거 있음,', '로그 확인은 아직']],
  ['구간', ['Next']],
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

export default function ItemCard() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="항목 카드. 목표, 풀 문제, 성공 지표, 확신도, 구간을 한두 줄씩 적는다. 상세 일정과 에픽은 없다.">
      <rect className="svg-box" x="8" y={TOP} width="344" height={BOTTOM - TOP} rx="8" />
      <text className="t-strong" x="22" y={TOP + 26}>항목 카드</text>
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
