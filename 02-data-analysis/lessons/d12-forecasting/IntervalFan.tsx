/**
 * 형태 예시(가상 값). 가상 과거 계열 뒤에 직전 값 예측과 예측 구간을 그린다.
 * 구간 폭은 직전 값(나이브) 방법의 공식 그대로: 구간 반폭 = c × 오차 표준편차 × √h.
 * c 는 80% 1.28, 95% 1.96. 오차 표준편차 SIGMA 는 가상 값이다.
 */
const NH = 24;
const NF = 12;
const X0 = 8;
const X1 = 352;
const step = (X1 - X0) / (NH + NF - 1);
const xOf = (t: number) => X0 + t * step;

const SIGMA = 4; // 가상
const C80 = 1.28;
const C95 = 1.96;
const half = (c: number, h: number) => c * SIGMA * Math.sqrt(h);

// 가상 과거: 작은 상승과 고정된 흔들림(난수 아님)
const wiggle = [2, -3, 4, -2, 3, -4, 1, 3, -2, 4, -3, 2];
const hist = Array.from({ length: NH }, (_, t) => 100 + 0.7 * t + wiggle[t % 12]);
const last = hist[NH - 1];

const VMIN = last - half(C95, NF) - 4;
const VMAX = last + half(C95, NF) + 4;
const YT = 30;
const YB = 196;
const yOf = (v: number) => YB - ((v - VMIN) / (VMAX - VMIN)) * (YB - YT);

const band = (c: number) => {
  const up: string[] = [`${xOf(NH - 1).toFixed(1)},${yOf(last).toFixed(1)}`];
  const dn: string[] = [];
  for (let h = 1; h <= NF; h++) {
    up.push(`${xOf(NH - 1 + h).toFixed(1)},${yOf(last + half(c, h)).toFixed(1)}`);
    dn.unshift(`${xOf(NH - 1 + h).toFixed(1)},${yOf(last - half(c, h)).toFixed(1)}`);
  }
  return [...up, ...dn].join(' ');
};

export default function IntervalFan() {
  const xs = xOf(NH - 1);
  const histPts = hist.map((v, t) => `${xOf(t).toFixed(1)},${yOf(v).toFixed(1)}`).join(' ');
  const fcPts = `${xs.toFixed(1)},${yOf(last).toFixed(1)} ${xOf(NH - 1 + NF).toFixed(1)},${yOf(last).toFixed(1)}`;
  const ratio = Math.sqrt(NF); // 12칸 뒤 폭 / 1칸 뒤 폭
  const yLeg = YB + 32;
  return (
    <svg viewBox="0 0 360 276" role="img" aria-label="가상 과거 계열 뒤에 점 예측 한 줄과 80퍼센트, 95퍼센트 예측 구간이 부채꼴로 넓어진다. 12칸 뒤 구간 폭은 1칸 뒤의 약 3.5배다.">
      <text className="t-sub" x={X0} y="18">과거</text>
      <text className="t-sub" x={xs + 8} y="18">예측</text>
      <line x1={xs} y1={YT - 8} x2={xs} y2={YB + 6} stroke="var(--line)" strokeDasharray="4 3" />
      <polygon points={band(C95)} fill="var(--accent)" fillOpacity="0.16" />
      <polygon points={band(C80)} fill="var(--accent)" fillOpacity="0.3" />
      <polyline points={histPts} fill="none" stroke="var(--accent)" strokeWidth="2.5" />
      <polyline points={fcPts} fill="none" stroke="var(--warm)" strokeWidth="2.5" />
      <rect x="8" y={yLeg - 10} width="14" height="14" rx="3" fill="var(--accent)" fillOpacity="0.3" />
      <text className="t-sub" x="30" y={yLeg + 2}>80% 구간</text>
      <rect x="130" y={yLeg - 10} width="14" height="14" rx="3" fill="var(--accent)" fillOpacity="0.16" />
      <text className="t-sub" x="152" y={yLeg + 2}>95% 구간</text>
      <line x1="252" y1={yLeg - 3} x2="276" y2={yLeg - 3} stroke="var(--warm)" strokeWidth="2.5" />
      <text className="t-sub" x="284" y={yLeg + 2}>점 예측</text>
      <text className="t-sub" x="180" y={yLeg + 32} textAnchor="middle">구간 폭: 1칸 뒤 1배, 12칸 뒤 {ratio.toFixed(1)}배</text>
    </svg>
  );
}
