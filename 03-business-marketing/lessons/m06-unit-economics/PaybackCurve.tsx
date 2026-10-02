/**
 * 같은 가상 고객 풀(ChurnByTenure 와 같은 모형)의 잔존 곡선과 1인당 누적 공헌이익.
 * n 개월차 = 가입월을 1로 센다. 잔존(n) = S(n-1), 누적(n) = 14,000 x S(0..n-1)의 합. CAC 62,500원.
 * 점선은 이탈을 무시한 단순 회수(월 14,000원 x n).
 */
const FW = 0.3;
const FC = 0.18;
const SC = 0.03;
const MC = 14_000;
const CAC = 62_500;
const S = (t: number) => FW * (1 - FC) ** t + (1 - FW) * (1 - SC) ** t;
const N = 24;
const cum = (n: number) => Array.from({ length: n }, (_, t) => MC * S(t)).reduce((a, b) => a + b, 0);

const X0 = 56;
const X1 = 340;
const xOf = (n: number) => X0 + (n / N) * (X1 - X0);

// 위 패널: 잔존율 0~100%
const R_Y0 = 112;
const R_YTOP = 42;
const rOf = (v: number) => R_Y0 - v * (R_Y0 - R_YTOP);
// 아래 패널: 누적 공헌이익 0~200,000원
const C_TITLE = R_Y0 + 44;
const C_YTOP = C_TITLE + 28;
const C_Y0 = C_YTOP + 120;
const CMAX = 200_000;
const cOf = (v: number) => C_Y0 - (v / CMAX) * (C_Y0 - C_YTOP);
const XLAB = C_Y0 + 22;
const AXT = XLAB + 22; // x 축 제목
const SEP = AXT + 20;
const L1 = SEP + 28;
const L2 = L1 + 22;
const VB_H = L2 + 12;

const fmt = (n: number) => Math.round(n).toLocaleString('en-US');

function crossing() {
  let prev = 0;
  for (let n = 1; n <= 60; n++) {
    const c = cum(n);
    if (c >= CAC) return n - 1 + (CAC - prev) / (c - prev);
    prev = c;
  }
  return NaN;
}

export default function PaybackCurve() {
  const real = crossing();
  const simple = CAC / MC;
  const retPts = Array.from({ length: N }, (_, i) => `${xOf(i + 1).toFixed(1)},${rOf(S(i)).toFixed(1)}`).join(' ');
  const cumPts = Array.from({ length: N }, (_, i) => `${xOf(i + 1).toFixed(1)},${cOf(cum(i + 1)).toFixed(1)}`).join(' ');
  // 이탈을 무시한 직선은 200,000원 에서 자른다
  const nClip = CMAX / MC;
  const xr = xOf(real);
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label={`가입 후 24개월까지 잔존율은 ${Math.round(S(N - 1) * 100)}퍼센트로 내려가고, 1인당 누적 공헌이익은 CAC ${fmt(CAC)}원을 약 ${real.toFixed(1)}개월에 넘는다. 이탈을 무시한 단순 회수 기간은 ${simple.toFixed(1)}개월이다.`}>
      <text className="t-sub" x="12" y="18">잔존율</text>
      {[0, 1].map((v) => (
        <g key={v}>
          <line x1={X0} y1={rOf(v)} x2={X1} y2={rOf(v)} stroke="var(--line)" strokeWidth={v === 0 ? 1.5 : 1} />
          <text className="t-sub" x={X0 - 8} y={rOf(v) + 4} textAnchor="end">{v * 100}%</text>
        </g>
      ))}
      <polyline points={retPts} fill="none" stroke="var(--accent)" strokeWidth="2.5" />
      <text className="t-sub" x={xOf(N)} y={rOf(S(N - 1)) - 10} textAnchor="end">{Math.round(S(N - 1) * 100)}%</text>

      <text className="t-sub" x="12" y={C_TITLE}>1인당 누적 공헌이익 (원)</text>
      {[0, 100_000, 200_000].map((v) => (
        <g key={v}>
          <line x1={X0} y1={cOf(v)} x2={X1} y2={cOf(v)} stroke="var(--line)" strokeWidth={v === 0 ? 1.5 : 1} />
          <text className="t-sub" x={X0 - 8} y={cOf(v) + 4} textAnchor="end">{v === 0 ? '0' : `${v / 10000}만`}</text>
        </g>
      ))}
      <line x1={xOf(0)} y1={cOf(0)} x2={xOf(nClip)} y2={cOf(CMAX)} stroke="var(--muted)" strokeWidth="1.5" strokeDasharray="4 3" />
      <line x1={X0} y1={cOf(CAC)} x2={X1} y2={cOf(CAC)} stroke="var(--warm)" strokeWidth="1.5" />
      <text className="t-warm" x={X1} y={cOf(CAC) + 20} textAnchor="end">CAC {fmt(CAC)}</text>
      <polyline points={cumPts} fill="none" stroke="var(--accent)" strokeWidth="2.5" />
      <circle cx={xr} cy={cOf(CAC)} r="4.5" fill="var(--warm)" />
      <line x1={xr} y1={cOf(CAC)} x2={xr} y2={C_Y0} stroke="var(--warm)" strokeWidth="1" strokeDasharray="3 2" />
      <text className="t-warm" x={xr + 8} y={C_Y0 - 10}>{real.toFixed(1)}개월</text>
      <circle cx={xOf(simple)} cy={cOf(CAC)} r="4" fill="var(--muted)" />
      {[0, 6, 12, 18, 24].map((n) => (
        <text key={n} className="t-sub" x={xOf(n)} y={XLAB} textAnchor="middle">{n}</text>
      ))}
      <text className="t-sub" x="348" y={AXT} textAnchor="end">가입 후 개월 (가입월 = 1)</text>
      <line x1="8" y1={SEP} x2="352" y2={SEP} stroke="var(--line)" />
      <line x1="12" y1={L1 - 4} x2="36" y2={L1 - 4} stroke="var(--accent)" strokeWidth="2.5" />
      <text x="46" y={L1} fontSize="13">이탈 반영: {real.toFixed(1)}개월에 회수</text>
      <line x1="12" y1={L2 - 4} x2="36" y2={L2 - 4} stroke="var(--muted)" strokeWidth="1.5" strokeDasharray="4 3" />
      <text x="46" y={L2} fontSize="13">이탈 무시: {simple.toFixed(1)}개월에 회수</text>
    </svg>
  );
}
