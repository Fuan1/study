/** 세 축(최근성, 빈도, 금액)을 같은 구간 수 n 으로 나누면 조합은 n 의 세제곱이다. 3구간 27, 5구간 125 는 출처에 있는 값이고 2, 4는 같은 식으로 계산했다. */
const BINS = [2, 3, 4, 5];
const SOURCED = new Set([3, 5]);

const X0 = 68;
const MAX = 5 ** 3; // 125
const SCALE = 200 / MAX;
const BAR = 22;
const PITCH = 44;
const Y0 = 40;

export default function ComboCount() {
  const bottom = Y0 + (BINS.length - 1) * PITCH + BAR;
  return (
    <svg viewBox={`0 0 360 ${bottom + 1 + 14}`} role="img" aria-label="세 축을 같은 구간 수로 나눈 조합 수. 2구간 8개, 3구간 27개, 4구간 64개, 5구간 125개로 구간 수의 세제곱만큼 는다.">
      <text className="t-strong" x="8" y="20">세 축을 나눈 구간 수와 조합 수</text>
      {BINS.map((n, i) => {
        const y = Y0 + i * PITCH;
        const v = n ** 3;
        return (
          <g key={n}>
            <text className="t-sub" x="8" y={y + 16}>구간 {n}개</text>
            <rect x={X0} y={y} width={v * SCALE} height={BAR} rx="4" fill={SOURCED.has(n) ? 'var(--accent)' : 'var(--muted)'} />
            <text className="t-strong" x={X0 + v * SCALE + 8} y={y + 16}>{v}개</text>
          </g>
        );
      })}
    </svg>
  );
}
