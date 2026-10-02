const ROWS = [
  { name: '표면', en: 'Surface', tool: '시각 디자인, 접근성 점검', cls: 'pl-ui' },
  { name: '골격', en: 'Skeleton', tool: '와이어프레임, 프로토타입', cls: 'pl-mid' },
  { name: '구조', en: 'Structure', tool: '카드 소팅, 트리 테스트', cls: 'pl-ux' },
  { name: '범위', en: 'Scope', tool: '우선순위(영향·노력, RICE)', cls: 'pl-ux' },
  { name: '전략', en: 'Strategy', tool: '가설 문장, MVP, 사용자 이해', cls: 'pl-ux' },
];

export default function DecisionStack() {
  const h = 46;
  const gap = 14;
  return (
    <svg viewBox="0 0 360 296" role="img" aria-label="아래에서 위로 전략, 범위, 구조, 골격, 표면 순서로 쌓인 5개 층. 각 층 옆에는 그 층의 결정을 다루는 도구가 적혀 있고, 화살표는 아래층의 결정이 위층으로 이어진다는 뜻이다.">
      <defs>
        <marker id="arStack" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      {ROWS.map((r, i) => {
        const y = 4 + i * (h + gap);
        return (
          <g key={r.name}>
            <rect className={r.cls} x="8" y={y} width="344" height={h} rx="8" />
            <text x="22" y={y + 20}><tspan className="t-strong">{r.name}</tspan><tspan className="t-sub" dx="8">{r.en}</tspan></text>
            <text className="t-sub" x="22" y={y + 38}>{r.tool}</text>
            {i < ROWS.length - 1 && <line className="svg-flow" x1="180" y1={y + h + gap - 1} x2="180" y2={y + h + 1} markerEnd="url(#arStack)" />}
          </g>
        );
      })}
    </svg>
  );
}
