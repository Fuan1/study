/** 같은 항목 수를 나누는 세 구조. 한 단계당 선택지 수 x 단계 수 = 목적지 수(64)로 계산해 라벨을 만든다. */
const TOTAL = 64;
const CONFIGS = [
  { levels: 1, label: '넓고 얕게', tone: 'bad' as const, note: '한 화면에 64개' },
  { levels: 2, label: '중간', tone: 'good' as const, note: '1981년 연구에서 가장 빨랐다' },
  { levels: 6, label: '좁고 깊게', tone: 'bad' as const, note: '단계마다 왕복' },
];

export default function DepthBreadth() {
  return (
    <svg viewBox="0 0 360 292" role="img" aria-label="64개 목적지를 한 단계 64개, 두 단계 8개씩, 여섯 단계 2개씩으로 나눈 세 구조. 두 단계 8개씩 구성이 가장 빨랐다는 1981년 연구 결과를 보인다.">
      <defs>
        <marker id="db-ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      {CONFIGS.map((c, r) => {
        const y = 8 + r * 94;
        const per = Math.round(Math.pow(TOTAL, 1 / c.levels));
        const bw = c.levels === 6 ? 40 : c.levels === 2 ? 70 : 120;
        const gap = c.levels === 6 ? 12 : 26;
        const total = c.levels * bw + (c.levels - 1) * gap;
        const x0 = (360 - total) / 2;
        return (
          <g key={c.label}>
            <text className={c.tone === 'good' ? 't-good' : 't-strong'} x="8" y={y + 12}>{c.label}: {c.levels}단계 x {per}개</text>
            {Array.from({ length: c.levels }, (_, i) => {
              const x = x0 + i * (bw + gap);
              return (
                <g key={i}>
                  <rect className={c.tone === 'good' ? 'svg-box-good' : 'svg-box'} x={x} y={y + 24} width={bw} height="34" rx="6" />
                  <text x={x + bw / 2} y={y + 46} textAnchor="middle" fontSize="13">{per}개</text>
                  {i < c.levels - 1 && <line className="svg-flow" x1={x + bw + 1} y1={y + 41} x2={x + bw + gap - 1} y2={y + 41} markerEnd="url(#db-ar)" />}
                </g>
              );
            })}
            <text className={c.tone === 'good' ? 't-good' : 't-sub'} x="8" y={y + 78}>{c.note}</text>
          </g>
        );
      })}
    </svg>
  );
}
