type Metric = { name: string; unit: string; max: number; good: number; poor: number; fmt: (v: number) => string };

const METRICS: Metric[] = [
  { name: 'LCP · 로딩', unit: '초', max: 6, good: 2.5, poor: 4, fmt: (v) => `${v}초` },
  { name: 'INP · 반응', unit: 'ms', max: 800, good: 200, poor: 500, fmt: (v) => `${v}ms` },
  { name: 'CLS · 안정성', unit: '', max: 0.4, good: 0.1, poor: 0.25, fmt: (v) => `${v}` },
];

const X0 = 8;
const W = 344;

export default function CwvBands() {
  return (
    <svg viewBox="0 0 360 376" role="img" aria-label="Core Web Vitals 세 지표의 구간. LCP는 2.5초 이하가 좋음, 4초 초과가 나쁨. INP는 200밀리초 이하가 좋음, 500밀리초 초과가 나쁨. CLS는 0.1 이하가 좋음, 0.25 초과가 나쁨.">
      {METRICS.map((m, i) => {
        const y = 8 + i * 120;
        const xg = X0 + (W * m.good) / m.max;
        const xp = X0 + (W * m.poor) / m.max;
        return (
          <g key={m.name}>
            <text className="t-strong" x={X0} y={y + 14}>{m.name}</text>
            <rect x={X0} y={y + 30} width={xg - X0} height="40" style={{ fill: 'var(--good)', fillOpacity: 0.28 }} stroke="var(--good)" />
            <rect x={xg} y={y + 30} width={xp - xg} height="40" style={{ fill: 'var(--warm)', fillOpacity: 0.28 }} stroke="var(--warm)" />
            <rect x={xp} y={y + 30} width={X0 + W - xp} height="40" style={{ fill: 'var(--bad)', fillOpacity: 0.28 }} stroke="var(--bad)" />
            <text className="t-good" x={(X0 + xg) / 2} y={y + 55} textAnchor="middle">좋음</text>
            <text className="t-sub" x={(xg + xp) / 2} y={y + 55} textAnchor="middle">개선 필요</text>
            <text className="t-bad" x={(xp + X0 + W) / 2} y={y + 55} textAnchor="middle">나쁨</text>
            <text className="t-sub" x={xg} y={y + 91} textAnchor="middle">{m.fmt(m.good)}</text>
            <text className="t-sub" x={xp} y={y + 91} textAnchor="middle">{m.fmt(m.poor)}</text>
          </g>
        );
      })}
    </svg>
  );
}
