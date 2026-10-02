/** 가입 코호트 1,000명의 주당 1인 평균 주문 수. 모든 수치는 가정이며 코드로 계산한다. */
const COHORT = 1000;
const SURVIVORS = 300; // 4주차에 남은 사용자
const W1_ORDERS = 1200;
const W4_ORDERS = 900;

const ROWS = [
  { label: '1주차, 가입자 전체 1,000명', v: W1_ORDERS / COHORT, cls: 'svg-berg', tcls: 't-sub' },
  { label: '4주차, 남은 300명만', v: W4_ORDERS / SURVIVORS, cls: 'svg-box-bad', tcls: 't-bad' },
  { label: '4주차, 가입자 전체 1,000명', v: W4_ORDERS / COHORT, cls: 'svg-box-good', tcls: 't-good' },
];

// 여백 기준: 라벨 baseline 위 12, 라벨과 막대 12, 막대 높이 22, 행 간격 24.
const BAR_X = 8;
const SCALE = 70; // 1건 당 px. 최대 3.0건 = 210px
const BAR_H = 22;
const ROW_H = 46;
const ROW_GAP = 24;
const ry = (i: number) => 8 + i * (ROW_H + ROW_GAP);
const VB_H = ry(ROWS.length - 1) + ROW_H + 1 + 8;

export default function SurvivorBars() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="가정한 가입 코호트의 주당 1인 평균 주문 수. 1주차 1.2건, 4주차 남은 사용자만 보면 3.0건으로 오르지만 가입자 전체로 보면 0.9건으로 내린다.">
      {ROWS.map((r, i) => {
        const w = r.v * SCALE;
        return (
          <g key={r.label}>
            <text className={r.tcls} x={BAR_X} y={ry(i) + 12}>{r.label}</text>
            <rect className={r.cls} x={BAR_X} y={ry(i) + 24} width={w} height={BAR_H} rx="3" />
            <text className="t-strong" x={BAR_X + w + 8} y={ry(i) + 24 + 16}>{r.v.toFixed(1)}건</text>
          </g>
        );
      })}
    </svg>
  );
}
