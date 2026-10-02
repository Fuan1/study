// 시장 규모 추정표 한 장의 모양. 값이 아니라 칸 구성만 보인다.
const ROWS: [string, string][] = [
  ['정의', '연 지출액, 대상, 지역, 연도, 세금 포함'],
  ['하향식', '단계별 계산, 낮음·기준·높음'],
  ['상향식', '단계별 계산, 낮음·기준·높음'],
  ['가정 목록', '값, 근거 종류, 출처, 확인 방법'],
  ['비교', '범위 겹침, 갈라진 단계'],
  ['다음 행동', '먼저 실측할 가정 1-2개'],
];

const TOP = 8;
const HEAD = 40;
const ROW = 56;
const BOTTOM = TOP + HEAD + ROWS.length * ROW;
// 카드 아랫변 + 선 두께 절반 + 아래 여백 8
const VB_H = BOTTOM + 1 + 8;

export default function EstimateSheet() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="시장 규모 추정표 한 장의 모양. 정의, 하향식, 상향식, 가정 목록, 비교, 다음 행동 여섯 칸을 채운다.">
      <rect className="svg-box" x="8" y={TOP} width="344" height={HEAD + ROWS.length * ROW} rx="8" />
      <text className="t-strong" x="22" y={TOP + 26}>시장 규모 추정표</text>
      <text className="t-sub" x="338" y={TOP + 26} textAnchor="end">형태 예시</text>
      {ROWS.map(([k, v], i) => {
        const top = TOP + HEAD + i * ROW;
        return (
          <g key={k}>
            <line x1="8" y1={top} x2="352" y2={top} stroke="var(--line)" />
            <text className="t-strong" x="22" y={top + 24}>{k}</text>
            <text className="t-sub" x="22" y={top + 44}>{v}</text>
          </g>
        );
      })}
    </svg>
  );
}
