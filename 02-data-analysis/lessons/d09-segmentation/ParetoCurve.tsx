/** 상위 비중 p 의 고객이 가치의 p^e 를 갖는 이론 곡선. e 는 상위 20퍼센트가 80퍼센트를 갖도록 정한다(실제 고객 데이터가 아니다). */
const TOP = 0.2;
const SHARE = 0.8;
const E = Math.log(SHARE) / Math.log(TOP);

const L = 44; // 그림 영역 좌
const R = 332; // 우. 눈금 글자 "100"(폭 약 22)이 x=353 안에 들어오도록 줄였다
const T = 40; // 상
const B = 250; // 하
const px = (p: number) => L + p * (R - L);
const py = (v: number) => B - v * (B - T);

const pts: string[] = [];
for (let i = 0; i <= 200; i++) {
  const p = i / 200;
  pts.push(`${px(p).toFixed(1)},${py(p ** E).toFixed(1)}`);
}

const TICKS = [0, 0.2, 0.4, 0.6, 0.8, 1];

export default function ParetoCurve() {
  return (
    <svg viewBox="0 0 360 308" role="img" aria-label="고객을 가치가 큰 순서로 세웠을 때 가치 누적 비중 곡선. 대각선은 모두 같은 가치일 때다. 상위 20퍼센트가 가치의 80퍼센트를 갖는 이론 곡선은 대각선 위쪽으로 크게 휘어 있다.">
      <text className="t-sub" x="8" y="20">가치 누적 비중</text>
      <rect x={L} y={T} width={R - L} height={B - T} fill="none" stroke="var(--line)" />
      {TICKS.map((t) => (
        <g key={t}>
          <text className="t-sub" x={px(t)} y={B + 20} textAnchor="middle">{Math.round(t * 100)}</text>
          <text className="t-sub" x={L - 8} y={py(t) + 4} textAnchor="end">{Math.round(t * 100)}</text>
        </g>
      ))}
      <line x1={px(0)} y1={py(0)} x2={px(1)} y2={py(1)} stroke="var(--muted)" strokeWidth="1.5" strokeDasharray="4 4" />
      <polyline points={pts.join(' ')} fill="none" stroke="var(--accent)" strokeWidth="2.5" />
      <line x1={px(TOP)} y1={B} x2={px(TOP)} y2={py(SHARE)} stroke="var(--warm)" strokeWidth="1.5" strokeDasharray="3 3" />
      <line x1={L} y1={py(SHARE)} x2={px(TOP)} y2={py(SHARE)} stroke="var(--warm)" strokeWidth="1.5" strokeDasharray="3 3" />
      <circle cx={px(TOP)} cy={py(SHARE)} r="5" fill="var(--warm)" />
      <text className="t-warm" x={px(TOP) + 12} y="108">고객 상위 20%</text>
      <text className="t-warm" x={px(TOP) + 12} y="128">가치의 80%</text>
      <text className="t-sub" x={R - 12} y="160" textAnchor="end">점선: 모두 같을 때</text>
      <text className="t-sub" x={(L + R) / 2} y="294" textAnchor="middle">고객 누적 비중, 가치 큰 순서 (%)</text>
    </svg>
  );
}
