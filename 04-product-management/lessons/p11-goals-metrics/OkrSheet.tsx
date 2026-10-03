// OKR 한 장의 모양. 목표와 핵심 결과 4개는 What Matters 가 소개한 Healthcare.gov 사례를 옮긴 것이다.
// 유형, 기한·소유자, 증거 칸은 이 글이 덧붙인 형식이다.
const ROWS: [string, string][] = [
  ['목표 (O)', '대다수 사람에게 사이트를 고친다'],
  ['유형', '확약(C) 또는 열망(A) 중 하나'],
  ['핵심 결과 1', '접속자 70퍼센트가 통과한다'],
  ['핵심 결과 2', '응답 시간 1초'],
  ['핵심 결과 3', '오류율 1퍼센트'],
  ['핵심 결과 4', '가동 시간 99퍼센트'],
  ['기한·소유자', '실제 날짜, 한 사람'],
  ['증거', '지표 보고서 링크'],
];

const TOP = 8;
const HEAD = 40;
const ROW = 38;
const BOTTOM = TOP + HEAD + ROWS.length * ROW;
// 카드 아랫변 + 선 두께 절반 + 아래 여백 8
const VB_H = BOTTOM + 1 + 8;
const VAL_X = 124;

export default function OkrSheet() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="OKR 한 장의 모양. 목표 한 줄, 유형, 측정 가능한 핵심 결과 네 개, 기한과 소유자, 증거를 한 줄씩 적는다.">
      <rect className="svg-box" x="8" y={TOP} width="344" height={HEAD + ROWS.length * ROW} rx="8" />
      <text className="t-strong" x="22" y={TOP + 26}>OKR 한 장</text>
      <text className="t-sub" x="338" y={TOP + 26} textAnchor="end">한 분기, 한 목표</text>
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
