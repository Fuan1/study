const STEPS = [
  { t: '범위 정하기', a: '화면과 과업을 좁히고', b: '평가자가 연습을 한 번 한다' },
  { t: '개별 평가', a: '평가자마다 1-2시간, 두 번 훑는다', b: '서로 결과를 보지 않는다' },
  { t: '통합', a: '한 목록으로 합쳐 중복을 묶고', b: '의견이 갈린 곳을 논의한다' },
  { t: '우선순위', a: '각자 심각도를 매겨 평균을 내고', b: '고칠 순서를 정한다' },
];

export default function ProcessFlow() {
  const h = 68;
  const gap = 18;
  return (
    <svg viewBox="0 0 360 330" role="img" aria-label="휴리스틱 평가의 네 단계. 범위 정하기, 개별 평가, 통합, 우선순위 순서이며 개별 평가 단계에서는 평가자끼리 결과를 보지 않는다.">
      <defs>
        <marker id="pf-ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      {STEPS.map((s, i) => {
        const y = 4 + i * (h + gap);
        return (
          <g key={s.t}>
            <rect className={i === 1 ? 'svg-box-key' : 'svg-box'} x="8" y={y} width="344" height={h} rx="8" />
            <text x="22" y={y + 24}><tspan style={{ fill: 'var(--accent)', fontWeight: 700, fontSize: 14 }}>{i + 1}</tspan><tspan className="t-strong" dx="8" style={{ fontSize: 14, fontWeight: 700, fill: 'var(--strong)' }}>{s.t}</tspan></text>
            <text className="t-sub" x="22" y={y + 43}>{s.a}</text>
            <text className="t-sub" x="22" y={y + 60}>{s.b}</text>
            {i < STEPS.length - 1 && <line className="svg-flow" x1="180" y1={y + h + 1} x2="180" y2={y + h + gap - 1} markerEnd="url(#pf-ar)" />}
          </g>
        );
      })}
    </svg>
  );
}
