/** 가상 체류 시간에서 앞 n개를 뽑아 계산한 표본 표준편차(python). 표준오차는 SD 를 √n 으로 나눠 여기서 계산한다. */
const ROWS = [
  { n: 25, sd: 108.2 },
  { n: 100, sd: 106.7 },
  { n: 400, sd: 94.9 },
  { n: 1000, sd: 88.9 },
];
const X0 = 16;
const BX = 80; // 막대 시작
const BMAX = 208; // 가장 긴 막대 폭(SD 108.2)
const BH = 20;
const PITCH = 70; // 묶음 높이 46 + 묶음 사이 24
const TOP = 66;
const SCALE = BMAX / Math.max(...ROWS.map((r) => r.sd));
const lastBottom = TOP + (ROWS.length - 1) * PITCH + 26 + BH; // 마지막 막대 아랫변
const H = lastBottom + 1 + 12;

export default function SdSe() {
  return (
    <svg viewBox={`0 0 360 ${H}`} role="img" aria-label="표본 크기 n이 25, 100, 400, 1000으로 커질 때 표준편차는 108에서 89로 거의 그대로이고 표준오차는 21.6, 10.7, 4.7, 2.8로 줄어든다.">
      <rect x={X0} y="6" width="12" height="12" fill="var(--muted)" />
      <text className="t-sub" x={X0 + 22} y="17">표준편차 SD: 데이터의 퍼짐</text>
      <rect x={X0} y="30" width="12" height="12" fill="var(--accent)" />
      <text className="t-sub" x={X0 + 22} y="41">표준오차 SE = SD / √n: 평균의 흔들림</text>
      {ROWS.map((r, k) => {
        const y = TOP + k * PITCH;
        const se = r.sd / Math.sqrt(r.n);
        return (
          <g key={r.n}>
            <text className="t-strong" x={X0} y={y + 30}>n={r.n}</text>
            <rect x={BX} y={y} width={r.sd * SCALE} height={BH} fill="var(--muted)" />
            <text className="t-sub" x={BX + r.sd * SCALE + 8} y={y + 15}>{r.sd.toFixed(1)}</text>
            <rect x={BX} y={y + 26} width={se * SCALE} height={BH} fill="var(--accent)" />
            <text className="t-sub" x={BX + se * SCALE + 8} y={y + 41}>{se.toFixed(1)}</text>
          </g>
        );
      })}
    </svg>
  );
}
