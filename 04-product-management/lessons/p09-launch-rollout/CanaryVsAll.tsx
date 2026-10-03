/**
 * Google SRE 워크북 "Canarying Releases"의 설명용 예(작성자가 정한 값):
 * canary 5퍼센트에서 실패율 20퍼센트면 전체 오류율은 0.05 x 20 = 1퍼센트, 전량 배포면 20퍼센트.
 */
const CANARY_SHARE = 0.05;
const FAIL = 20;
const OVERALL = CANARY_SHARE * FAIL;

const ROWS = [
  { label: 'canary 구간만 본 오류율', v: FAIL },
  { label: '전체 오류율 (5퍼센트에만 노출)', v: OVERALL },
  { label: '전체 오류율 (전량 배포)', v: FAIL },
];

const MAXW = 230; // 20퍼센트의 폭
const BH = 22;
const PITCH = 66; // 글줄 + 막대 + 다음 묶음과의 간격
const fmt = (v: number) => `${Math.round(v)}퍼센트`;
const top = (i: number) => 8 + i * PITCH + 24;
const VB_H = top(ROWS.length - 1) + BH + 12;

export default function CanaryVsAll() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="설명용 예. 5퍼센트에만 연 canary의 실패율이 20퍼센트일 때 canary 구간만 보면 20퍼센트, 전체 오류율은 1퍼센트, 전량 배포했다면 20퍼센트다.">
      {ROWS.map((r, i) => (
        <g key={r.label}>
          <text className="t-sub" x="8" y={top(i) - 10}>{r.label}</text>
          <rect className="svg-berg" x="8" y={top(i)} width={(r.v / FAIL) * MAXW} height={BH} rx="4" />
          <text className="t-strong" x={8 + (r.v / FAIL) * MAXW + 8} y={top(i) + 16}>{fmt(r.v)}</text>
        </g>
      ))}
    </svg>
  );
}
