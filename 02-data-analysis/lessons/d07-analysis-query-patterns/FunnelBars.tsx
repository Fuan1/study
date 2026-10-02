/** 퍼널 쿼리 결과(가정 데이터, 1/25~1/31 주)로 막대를 그린다. 순서·기간 조건 유무에 따른 단계별 사용자 수 비교. */
// 여백 기준: 라벨은 막대 위 10px 이상, 막대 사이 26px, 범례는 마지막 막대 아래 28px.
const STEPS = ['view', 'cart', 'purchase'];
const ORDERED = [130, 64, 30]; // 순서 + 1일 조건 쿼리 결과
const NAIVE = [130, 81, 45]; // 단계별 COUNT(DISTINCT user_id) 만 센 값
const X0 = 16;
const MAXW = 328;
const PITCH = 80;
const BAR_H = 30;

const w = (n: number) => (MAXW * n) / ORDERED[0];
const pct = (a: number, b: number) => ((100 * a) / b).toFixed(1);

export default function FunnelBars() {
  const lastBottom = 8 + (STEPS.length - 1) * PITCH + 24 + BAR_H; // 222
  const lg1 = lastBottom + 28; // 범례 첫 줄 상단
  const lg2 = lg1 + 24;
  const H = lg2 + 12 + 1 + 12; // 범례 아랫변 + 선 두께 절반 + 아래 여백
  return (
    <svg viewBox={`0 0 360 ${H}`} role="img" aria-label="퍼널 단계별 사용자 수. 순서와 1일 조건을 건 값은 view 130, cart 64, purchase 30이고, 조건 없이 단계별 고유 사용자만 센 값은 130, 81, 45로 뒷 단계가 부풀려진다.">
      {STEPS.map((s, i) => {
        const y = 8 + i * PITCH;
        return (
          <g key={s}>
            <text className="t-strong" x={X0} y={y + 14}>{s} {ORDERED[i]}</text>
            <text className="t-sub" x={344} y={y + 14} textAnchor="end">
              {i === 0 ? '첫 단계 100%' : `직전 ${pct(ORDERED[i], ORDERED[i - 1])}% · 첫 단계 ${pct(ORDERED[i], ORDERED[0])}%`}
            </text>
            {NAIVE[i] !== ORDERED[i] && (
              <g>
                <rect className="svg-box-bad" x={X0} y={y + 24} width={w(NAIVE[i])} height={BAR_H} rx="4" />
                <text className="t-bad" x={X0 + w(NAIVE[i]) + 8} y={y + 24 + 19}>{NAIVE[i]}</text>
              </g>
            )}
            <rect className="svg-berg" x={X0} y={y + 24} width={w(ORDERED[i])} height={BAR_H} rx="4" />
          </g>
        );
      })}
      <rect className="svg-berg" x={X0} y={lg1} width="16" height="12" rx="2" />
      <text className="t-sub" x={X0 + 24} y={lg1 + 11}>순서와 1일 조건을 건 값</text>
      <rect className="svg-box-bad" x={X0} y={lg2} width="16" height="12" rx="2" />
      <text className="t-sub" x={X0 + 24} y={lg2 + 11}>조건 없이 고유 사용자만 센 값</text>
    </svg>
  );
}
