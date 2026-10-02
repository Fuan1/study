/** 두 집단 평균 비교, 양측 alpha 0.05, 검정력 80%, 두 집단 크기와 표준편차 같음(가정, sd 18초).
 *  집단당 n = 2 (z_{1-a/2} + z_{1-b})^2 / d^2 (정규 근사). */
const Z_ALPHA = 1.959964; // 양측 0.05
const Z_BETA = 0.841621; // 검정력 80%
const SD = 18;
const DS = [0.4, 0.2, 0.1];
const nOf = (d: number) => Math.ceil((2 * (Z_ALPHA + Z_BETA) ** 2) / (d * d));

const PITCH = 76;
const T = (i: number) => 8 + i * PITCH;
const BAR_Y = (i: number) => T(i) + 28;
const BAR_H = 24;
const BAR_MAX = 250;
const NMAX = nOf(Math.min(...DS));
const VB_H = BAR_Y(DS.length - 1) + BAR_H + 1 + 12;

export default function SampleSizeBars() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="검정력 80퍼센트로 두 집단 평균 차이를 잡으려면 찾으려는 효과가 절반이 될 때마다 집단당 표본이 네 배 필요하다. d 0.4는 99명, 0.2는 393명, 0.1은 1570명이다.">
      {DS.map((d, i) => {
        const n = nOf(d);
        const w = (n / NMAX) * BAR_MAX;
        return (
          <g key={d}>
            <text className="t-sub" x="8" y={T(i) + 14}>잡으려는 차이 {(d * SD).toFixed(1)}초 (d={d})</text>
            <rect className="svg-berg" x="8" y={BAR_Y(i)} width={w} height={BAR_H} rx="4" />
            <text className="t-strong" x={8 + w + 8} y={BAR_Y(i) + 17}>{n.toLocaleString('en-US')}명</text>
          </g>
        );
      })}
    </svg>
  );
}
