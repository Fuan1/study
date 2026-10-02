type Model = { x: number; y: number; h: number; title: string; sub: string; steps: string[] };

const MODELS: Model[] = [
  { x: 8, y: 4, h: 156, title: 'Double Diamond', sub: 'Design Council', steps: ['Discover', 'Define', 'Develop', 'Deliver'] },
  { x: 184, y: 4, h: 156, title: '3 spaces', sub: 'IDEO, Tim Brown', steps: ['Inspiration', 'Ideation', 'Implementation'] },
  { x: 8, y: 168, h: 208, title: '5 modes', sub: 'Stanford d.school', steps: ['Empathize', 'Define', 'Ideate', 'Prototype', 'Test'] },
  { x: 184, y: 168, h: 208, title: '6 phases', sub: 'Nielsen Norman Group', steps: ['Empathize', 'Define', 'Ideate', 'Prototype', 'Test', 'Implement'] },
];

export default function ThinkingModels() {
  return (
    <svg viewBox="0 0 360 382" role="img" aria-label="네 가지 설계 과정 모델의 단계 이름 비교. Design Council 4단계, IDEO 3공간, d.school 5모드, NN/g 6단계. Define은 세 모델에 공통으로 나온다.">
      {MODELS.map((m) => (
        <g key={m.title}>
          <rect className="svg-box" x={m.x} y={m.y} width="168" height={m.h} rx="8" />
          <text className="t-strong" x={m.x + 10} y={m.y + 21}>{m.title}</text>
          <text className="t-sub" x={m.x + 10} y={m.y + 38} fontSize="12.5">{m.sub}</text>
          {m.steps.map((s, i) => (
            <g key={s}>
              <rect className={s === 'Define' ? 'svg-box-key' : 'svg-box'} x={m.x + 10} y={m.y + 48 + i * 26} width="148" height="22" rx="5" />
              <text x={m.x + 18} y={m.y + 64 + i * 26} fontSize="12.5">{i + 1}  {s}</text>
            </g>
          ))}
        </g>
      ))}
    </svg>
  );
}
