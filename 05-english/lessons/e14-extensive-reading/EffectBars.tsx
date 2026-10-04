/**
 * Jeon & Day (2016) 조절변수 표의 값. 실험군 대 비교군 51건 안에서 하위 집단별 평균 효과 크기(d).
 * k 는 효과 크기 건수.
 */
type Row = { label: string; k: number; d: number };

const ROWS: Row[] = [
  { label: '전체', k: 51, d: 0.57 },
  { label: 'EFL 환경', k: 37, d: 0.65 },
  { label: 'ESL 환경', k: 14, d: 0.38 },
  { label: '어린이', k: 6, d: 0.52 },
  { label: '청소년', k: 15, d: 0.35 },
  { label: '성인', k: 30, d: 0.70 },
];

const X0 = 8;
const W = 280; // d = 1.0 의 폭
const PITCH = 46;
const TOP = 20;
const BAR_H = 14;

export default function EffectBars() {
  const vbH = TOP + (ROWS.length - 1) * PITCH + 10 + BAR_H + 18;
  return (
    <svg viewBox={`0 0 360 ${vbH}`} role="img" aria-label="비교군 대비 효과 크기 d. 전체 0.57, EFL 0.65, ESL 0.38, 어린이 0.52, 청소년 0.35, 성인 0.70.">
      {ROWS.map((r, i) => {
        const y = TOP + i * PITCH;
        const w = r.d * W;
        return (
          <g key={r.label}>
            <text className="t-sub" x={X0} y={y}>{r.label} · {r.k}건</text>
            <rect className="svg-berg" x={X0} y={y + 10} width={w} height={BAR_H} rx="3" />
            <text className="t-strong" x={X0 + w + 8} y={y + 10 + BAR_H - 1}>{r.d.toFixed(2)}</text>
          </g>
        );
      })}
    </svg>
  );
}
