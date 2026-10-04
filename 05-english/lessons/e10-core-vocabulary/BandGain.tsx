/**
 * 출처 값: Nation 2006 표 1(LOB 코퍼스, 영국 영어 글 약 100만 토큰)의 토큰 비율.
 * 7~14번째 1,000 은 표의 값 0.65, 0.40, 0.32, 0.32, 0.16, 0.14, 0.12, 0.10 을 이 글이 합산한다.
 */
const LEVELS = [77.86, 8.23, 3.7, 1.79, 1.04, 0.7];
const REST = [0.65, 0.4, 0.32, 0.32, 0.16, 0.14, 0.12, 0.1];
const restSum = Math.round(REST.reduce((a, b) => a + b, 0) * 100) / 100;

const ROWS: { label: string; v: number }[] = [
  ...LEVELS.map((v, i) => ({ label: `${i + 1}번째 1,000`, v })),
  { label: '7~14번째', v: restSum },
];

const BX = 96;
const SCALE = 180 / 78;
const BH = 20;
const PITCH = 34;
const TOP = 8;

export default function BandGain() {
  const VB_H = TOP + ROWS.length * PITCH + 6;
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="빈도 순서로 1,000개씩 끊을 때 글을 덮는 비율. 첫 1,000이 77.86퍼센트이고 이후 구간은 8.23, 3.70, 1.79, 1.04, 0.70으로 줄어든다.">
      {ROWS.map((r, i) => {
        const top = TOP + i * PITCH;
        const w = r.v * SCALE;
        return (
          <g key={r.label}>
            <text className={i === 0 ? 't-strong' : 't-sub'} x="8" y={top + 15}>{r.label}</text>
            <rect className={i === 0 ? 'svg-berg' : 'svg-box'} x={BX} y={top} width={w} height={BH} rx="4" />
            <text className={i === 0 ? 't-strong' : 't-sub'} x={BX + w + 8} y={top + 15}>{r.v.toFixed(2)}%</text>
          </g>
        );
      })}
    </svg>
  );
}
