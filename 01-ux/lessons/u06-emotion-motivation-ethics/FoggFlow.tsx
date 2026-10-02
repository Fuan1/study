const STEPS = [
  { q: ['지금 하라는 신호가', '있는가(촉발)'], fix: ['알림, 버튼, 안내를', '알맞은 때에 둔다'] },
  { q: ['지금 사용자가 해낼', '수 있는가(능력)'], fix: ['행동을 작게 줄이고', '단계를 덜어낸다'] },
  { q: ['하고 싶어 하는가', '(동기)'], fix: ['얻는 가치를', '분명히 보여준다'] },
];

export default function FoggFlow() {
  const h = 46;
  const gap = 22;
  const top = 8;
  const bottom = top + STEPS.length * h + (STEPS.length - 1) * gap;
  return (
    <svg viewBox="0 0 360 290" role="img" aria-label="행동이 일어나지 않을 때 점검 순서. 촉발, 능력, 동기 순으로 묻고 아니오이면 오른쪽 처방을 적용한다.">
      <defs>
        <marker id="ar-fogg" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      {STEPS.map((s, i) => {
        const y = top + i * (h + gap);
        return (
          <g key={i}>
            <rect className="svg-box" x="8" y={y} width="150" height={h} rx="6" />
            <text x="18" y={y + 20} fontSize="13">{s.q[0]}</text>
            <text x="18" y={y + 37} fontSize="13">{s.q[1]}</text>
            <line className="svg-flow" x1="158" y1={y + h / 2} x2="188" y2={y + h / 2} stroke="var(--bad)" markerEnd="url(#ar-fogg)" />
            <text className="t-bad" x="160" y={y + h / 2 - 5}>아니오</text>
            <rect className="svg-box-key" x="190" y={y} width="162" height={h} rx="6" />
            <text x="200" y={y + 20} fontSize="13">{s.fix[0]}</text>
            <text x="200" y={y + 37} fontSize="13">{s.fix[1]}</text>
            {i < STEPS.length - 1 && (
              <>
                <line className="svg-flow" x1="83" y1={y + h + 1} x2="83" y2={y + h + gap - 1} markerEnd="url(#ar-fogg)" />
                <text className="t-good" x="92" y={y + h + 16}>예</text>
              </>
            )}
          </g>
        );
      })}
      <line className="svg-flow" x1="83" y1={bottom + 1} x2="83" y2={bottom + 22} markerEnd="url(#ar-fogg)" />
      <text className="t-good" x="92" y={bottom + 17}>모두 예</text>
      <rect className="svg-box-good" x="8" y={bottom + 24} width="150" height="40" rx="8" />
      <text className="t-good" x="83" y={bottom + 49} textAnchor="middle">행동이 일어난다</text>
    </svg>
  );
}
