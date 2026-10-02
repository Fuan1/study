/** AAPOR(2016)가 설명한 근사식: 평균의 무응답 편향 = 무응답 비율 × (응답자 평균 - 무응답자 평균). 비율과 차이는 가상 값이고 편향은 식에서 계산한다. */
const ROWS = [
  { nr: 0.2, d: 10 },
  { nr: 0.5, d: 10 },
  { nr: 0.8, d: 10 },
  { nr: 0.8, d: 0 },
].map((r) => ({ ...r, bias: r.nr * r.d }));

const PX = 30; // 편향 1점당 30px (최대 8점 = 240px)
const X0 = 8;
const BAR_H = 24;
const STEP = 64;

export default function NonresponseBias() {
  const rowY = (i: number) => 8 + i * STEP;
  const lastBottom = rowY(ROWS.length - 1) + 28 + BAR_H;
  const vbH = lastBottom + 8; // 마지막 막대 아랫변 + 여백
  return (
    <svg viewBox={`0 0 360 ${vbH}`} role="img" aria-label="무응답 편향은 무응답 비율과 응답자와 무응답자의 평균 차이를 곱한 값이다. 차이가 10점일 때 무응답 20퍼센트는 편향 2점, 50퍼센트는 5점, 80퍼센트는 8점이다. 무응답이 80퍼센트여도 차이가 0이면 편향은 0점이다.">
      {ROWS.map((r, i) => {
        const y = rowY(i);
        const w = r.bias * PX;
        return (
          <g key={`${r.nr}-${r.d}`}>
            <text className="t-strong" x={X0} y={y + 14}>무응답 {Math.round(r.nr * 100)}%, 평균 차이 {r.d}점</text>
            {w > 0 ? (
              <>
                <rect x={X0} y={y + 28} width={w} height={BAR_H} rx="4" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1.5" />
                <text className="t-accent" x={X0 + w + 10} y={y + 45}>편향 {r.bias}점</text>
              </>
            ) : (
              <>
                <line x1={X0} y1={y + 28} x2={X0} y2={y + 28 + BAR_H} stroke="var(--good)" strokeWidth="2" />
                <text className="t-good" x={X0 + 10} y={y + 45}>편향 0점</text>
              </>
            )}
          </g>
        );
      })}
    </svg>
  );
}
