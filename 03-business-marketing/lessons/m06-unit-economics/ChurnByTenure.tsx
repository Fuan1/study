/**
 * 가상 고객 풀: 30%는 월 이탈률 18%, 70%는 3%로 일정하다(합쳐서 보면 경과 월마다 이탈률이 내려간다).
 * 월 이탈률(t) = 1 - S(t)/S(t-1), S(t) = 0.3 x 0.82^t + 0.7 x 0.97^t. 월 공헌이익 14,000원.
 */
const FW = 0.3;
const FC = 0.18;
const SC = 0.03;
const MC = 14_000;
const S = (t: number) => FW * (1 - FC) ** t + (1 - FW) * (1 - SC) ** t;
const churn = (t: number) => 1 - S(t) / S(t - 1);
const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);

const X0 = 28;
const PITCH = 26;
const BAR_W = 18;
const Y0 = 150; // 0% 의 y
const YTOP = 44; // 8% 의 y
const MAXV = 0.08;
const hOf = (v: number) => (v / MAXV) * (Y0 - YTOP);
const SEP = Y0 + 66; // x 눈금 글자와 축 제목 아래
const ROW1 = SEP + 28;
const ROW2 = ROW1 + 22;
const VB_H = ROW2 + 12;

const fmt = (n: number) => Math.round(n).toLocaleString('en-US');
const pct = (v: number) => `${(v * 100).toFixed(1)}%`;

export default function ChurnByTenure() {
  const c1 = churn(1);
  const c12 = churn(12);
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label={`경과 월별 월 이탈률. 1개월차 ${pct(c1)}에서 12개월차 ${pct(c12)}로 내려간다. 1개월차 값으로 월 공헌이익 14,000원을 나누면 ${fmt(MC / c1)}원, 12개월차 값으로 나누면 ${fmt(MC / c12)}원이다.`}>
      <text className="t-sub" x="12" y="18">월 이탈률 (경과 월별)</text>
      <line x1={X0 - 8} y1={Y0} x2="352" y2={Y0} stroke="var(--line)" strokeWidth="1.5" />
      {MONTHS.map((m, i) => {
        const v = churn(m);
        const h = hOf(v);
        const x = X0 + i * PITCH;
        const hi = m === 1 || m === 12;
        return (
          <g key={m}>
            <rect className={hi ? 'svg-tip' : 'svg-berg'} x={x} y={Y0 - h} width={BAR_W} height={h} rx="3" />
            {(m === 1 || m === 6 || m === 12) && (
              <text className="t-sub" x={x + BAR_W / 2} y={Y0 - h - 8} textAnchor="middle">{pct(v)}</text>
            )}
            {(m === 1 || m === 3 || m === 6 || m === 9 || m === 12) && (
              <text className="t-sub" x={x + BAR_W / 2} y={Y0 + 22} textAnchor="middle">{m}</text>
            )}
          </g>
        );
      })}
      <text className="t-sub" x="348" y={Y0 + 48} textAnchor="end">가입 후 경과 개월</text>
      <line x1="8" y1={SEP} x2="352" y2={SEP} stroke="var(--line)" />
      <text x="12" y={ROW1} fontSize="13">1개월차 값으로 계산: {fmt(MC / c1)}원</text>
      <text x="12" y={ROW2} fontSize="13">12개월차 값으로 계산: {fmt(MC / c12)}원</text>
    </svg>
  );
}
