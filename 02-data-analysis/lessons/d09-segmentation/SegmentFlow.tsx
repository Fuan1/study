type Step = { l1: string; l2: string; arrow?: string; cls: string };

const STEPS: Step[] = [
  { l1: '모으기: 고객별 기록', l2: '고객 한 명이 한 줄이 되게 묶는다', arrow: '기준을 정해 나눈다', cls: 'svg-box' },
  { l1: '분석: 규칙 또는 군집화', l2: '최근성·빈도·금액 점수 등', arrow: '이름을 붙이고 요약한다', cls: 'svg-box' },
  { l1: '결과물: 정의표와 프로파일', l2: '이름, 편입 규칙, 크기, 가치 기여', arrow: '집단마다 할 일을 적는다', cls: 'svg-berg' },
  { l1: '결정: 집단별로 다르게', l2: '맞춤 메시지, 투자 우선순위', cls: 'svg-box-key' },
];

const W = 344;
const H = 66; // 두 줄 상자 66 이상
const GAP = 36; // 화살표 구간

export default function SegmentFlow() {
  const y = (i: number) => 8 + i * (H + GAP);
  const bottom = y(STEPS.length - 1) + H; // 마지막 아랫변
  return (
    <svg viewBox={`0 0 360 ${bottom + 1 + 8}`} role="img" aria-label="세분화 흐름. 고객별 기록을 모아 기준을 정해 나누고, 이름을 붙여 정의표와 프로파일을 만들고, 집단마다 다른 행동을 정한다.">
      <defs>
        <marker id="ar-seg" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      {STEPS.map((s, i) => (
        <g key={s.l1}>
          <rect className={s.cls} x="8" y={y(i)} width={W} height={H} rx="8" />
          <text className="t-strong" x="22" y={y(i) + 29}>{s.l1}</text>
          <text className="t-sub" x="22" y={y(i) + 50}>{s.l2}</text>
          {s.arrow && (
            <g>
              <line className="svg-flow" x1="40" y1={y(i) + H + 6} x2="40" y2={y(i) + H + GAP - 6} markerEnd="url(#ar-seg)" />
              <text className="t-sub" x="56" y={y(i) + H + GAP / 2 + 4}>{s.arrow}</text>
            </g>
          )}
        </g>
      ))}
    </svg>
  );
}
