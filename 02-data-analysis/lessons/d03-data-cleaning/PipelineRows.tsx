/** 정제 단계별 행 수. 값은 가상 orders_raw 22행에 d03 의 CTE 를 sqlite 로 돌린 결과(22, 22, 20, 20). */
const STEPS = [
  { label: '원본 orders_raw', rows: 22 },
  { label: '문자열 정규화', rows: 22 },
  { label: '키별 최신 1건만 남김', rows: 20 },
  { label: '결측·이상 표시 열 추가', rows: 20 },
];

// 여백 기준: 라벨과 막대 8px 이상, 단계 사이 24px 이상. 막대 높이 28 이라 숫자는 막대 밖(오른쪽 끝 정렬).
const X0 = 8;
const RIGHT = 352;
const UNIT = 11; // 1행 = 11px, 22행 = 242
const PITCH = 78;
const BAR_Y = 26; // 행 시작에서 막대 윗변까지
const BAR_H = 28;
const lastBottom = 8 + (STEPS.length - 1) * PITCH + BAR_Y + BAR_H; // 296
const H = lastBottom + 1 + 16; // 점선 두께 2 의 절반 + 아래 여백

export default function PipelineRows() {
  return (
    <svg viewBox={`0 0 360 ${H}`} role="img" aria-label="가상 주문 22행이 정규화 뒤에도 22행, 키별 최신 1건만 남기면 20행, 표시 열을 붙여도 20행이다. 행 수가 줄어든 단계는 중복 제거 한 곳이다.">
      {STEPS.map((s, i) => {
        const y = 8 + i * PITCH;
        const prev = i === 0 ? s.rows : STEPS[i - 1].rows;
        const delta = prev - s.rows;
        const w = s.rows * UNIT;
        return (
          <g key={s.label}>
            <text className="t-strong" x={X0} y={y + 14}>{s.label}</text>
            {i > 0 && (
              <text className={delta > 0 ? 't-bad' : 't-sub'} x={RIGHT} y={y + 14} textAnchor="end">
                {delta > 0 ? `−${delta}행 줄어듦` : '행 수 그대로'}
              </text>
            )}
            <rect className="svg-berg" x={X0} y={y + BAR_Y} width={w} height={BAR_H} rx="4" />
            {delta > 0 && <rect className="svg-box-bad" x={X0 + w} y={y + BAR_Y} width={delta * UNIT} height={BAR_H} rx="4" />}
            <text className="t-strong" x={RIGHT} y={y + BAR_Y + BAR_H / 2 + 5} textAnchor="end">{s.rows}행</text>
          </g>
        );
      })}
    </svg>
  );
}
