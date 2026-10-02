/** 현황 요약표의 모양을 보이는 도식. 값은 모두 가상 예시이며 실제 데이터가 아니다. */
const HEAD = ['항목', '값', '읽는 법'];
const ROWS = [
  ['기간', '9/1 ~ 9/30', '시간대 기준을 적는다'],
  ['건수', '12,480', '비율의 분모가 된다'],
  ['결측률', '0.6%', '빠진 건 / 전체 건'],
  ['중앙값', '28,000', '한가운데 값'],
  ['평균', '41,500', '꼬리에 끌려 올라감'],
  ['p90', '96,000', '상위 10% 문턱'],
  ['p99', '310,000', '상위 1% 문턱'],
  ['최대', '2,400,000', '확인 후 메모로'],
];

const RH = 34; // 줄 높이
const TOP = 8;
const COLS = [22, 104, 196]; // 열 시작 x

export default function SummaryTable() {
  const n = ROWS.length + 1;
  const vbH = TOP + n * RH + 1 + 8; // 표 아랫변 + 선 두께 절반 + 아래 여백
  return (
    <svg viewBox={`0 0 360 ${vbH}`} role="img" aria-label="현황 요약표의 모양. 기간, 건수, 결측률, 중앙값, 평균, p90, p99, 최대 여덟 항목을 값과 읽는 법과 함께 적는다. 값은 가상 예시다.">
      <rect className="svg-box" x="8" y={TOP} width="344" height={n * RH} rx="8" />
      {HEAD.map((h, c) => (
        <text key={h} className="t-sub" x={COLS[c]} y={TOP + 22}>{h}</text>
      ))}
      {ROWS.map((r, i) => {
        const y = TOP + (i + 1) * RH;
        return (
          <g key={r[0]}>
            <line x1="8" y1={y} x2="352" y2={y} stroke="var(--line)" strokeWidth="1" />
            <text className="t-strong" x={COLS[0]} y={y + 22}>{r[0]}</text>
            <text x={COLS[1]} y={y + 22} fontSize="14">{r[1]}</text>
            <text className="t-sub" x={COLS[2]} y={y + 22}>{r[2]}</text>
          </g>
        );
      })}
    </svg>
  );
}
