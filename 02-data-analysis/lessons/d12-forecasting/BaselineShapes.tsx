/** 형태 예시(가상 값). 계절이 있는 가상 계열 위에 세 가지 기준선이 미래를 어떻게 그리는지 보인다. */
const NH = 24; // 과거 24칸
const NF = 12; // 예측 12칸
const X0 = 8;
const X1 = 352;
const step = (X1 - X0) / (NH + NF - 1);
const xOf = (t: number) => X0 + t * step;

// 가상 계열: 완만한 상승 + 12칸 주기 계절 + 고정된 작은 흔들림(난수 아님)
const wiggle = [3, -2, 4, -3, 1, 2, -4, 3, -1, 2, -3, 4];
const value = (t: number) => 100 + 0.6 * t + 18 * Math.sin((2 * Math.PI * (t + 4)) / 12) + wiggle[t % 12];
const hist = Array.from({ length: NH }, (_, t) => value(t));

const mean = hist.reduce((a, b) => a + b, 0) / NH;
const last = hist[NH - 1];
const seasonal = (h: number) => hist[NH - 12 + h]; // 작년 같은 칸 (h = 0..11)

const VMIN = 70;
const VMAX = 140;
const YT = 34;
const YB = 160;
const yOf = (v: number) => YB - ((v - VMIN) / (VMAX - VMIN)) * (YB - YT);

const pts = (f: (i: number) => number, n: number, from: number) =>
  Array.from({ length: n }, (_, i) => `${xOf(from + i).toFixed(1)},${yOf(f(i)).toFixed(1)}`).join(' ');

const LEG = [
  { label: '평균: 과거 전체 평균으로 쭉', stroke: 'var(--muted)', dash: '2 4' },
  { label: '직전 값: 마지막 값으로 쭉', stroke: 'var(--warm)', dash: '' },
  { label: '계절 순진: 작년 같은 칸 값', stroke: 'var(--good)', dash: '' },
];

export default function BaselineShapes() {
  const xs = xOf(NH - 1);
  return (
    <svg viewBox="0 0 360 252" role="img" aria-label="계절이 있는 가상 계열의 과거 24칸과 이후 12칸. 평균은 수평선, 직전 값은 마지막 값에서 수평선, 계절 순진은 작년 12칸을 그대로 반복한다.">
      <text className="t-sub" x={X0} y="18">과거</text>
      <text className="t-sub" x={xs + 8} y="18">예측</text>
      <line x1={xs} y1={YT - 8} x2={xs} y2={YB + 6} stroke="var(--line)" strokeDasharray="4 3" />
      <polyline points={pts((i) => hist[i], NH, 0)} fill="none" stroke="var(--accent)" strokeWidth="2.5" />
      <polyline points={pts(() => mean, NF + 1, NH - 1)} fill="none" stroke="var(--muted)" strokeWidth="2" strokeDasharray="2 4" />
      <polyline points={`${xOf(NH - 1).toFixed(1)},${yOf(last).toFixed(1)} ${pts(() => last, NF, NH)}`} fill="none" stroke="var(--warm)" strokeWidth="2" />
      <polyline points={pts((i) => seasonal(i), NF, NH)} fill="none" stroke="var(--good)" strokeWidth="2" />
      {LEG.map((l, i) => (
        <g key={l.label}>
          <line x1="8" y1={188 + i * 24} x2="34" y2={188 + i * 24} stroke={l.stroke} strokeWidth="2" strokeDasharray={l.dash} />
          <text className="t-sub" x="44" y={193 + i * 24}>{l.label}</text>
        </g>
      ))}
    </svg>
  );
}
