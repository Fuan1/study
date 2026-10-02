const QUESTIONS = [
  ['조건과 비용을 알고', '선택했는가'],
  ['거절과 해지가 가입만큼', '쉬운가'],
  ['사용자 자신의 목표에', '도움이 되는가'],
  ['가짜 시간, 수량, 기본값 같은', '속임 요소가 없는가'],
];

export default function EthicsGate() {
  const h = 46;
  const gap = 20;
  const top = 8;
  const bottom = top + QUESTIONS.length * h + (QUESTIONS.length - 1) * gap;
  return (
    <svg viewBox="0 0 360 330" role="img" aria-label="같은 심리 원리를 쓸 때 던지는 네 질문. 모두 예이면 돕는 설계이고, 하나라도 아니오이면 다크패턴을 의심한다.">
      <defs>
        <marker id="ar-eth" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      {QUESTIONS.map((q, i) => {
        const y = top + i * (h + gap);
        return (
          <g key={i}>
            <rect className="svg-box" x="8" y={y} width="206" height={h} rx="6" />
            <text x="20" y={y + 20} fontSize="13">{q[0]}</text>
            <text x="20" y={y + 37} fontSize="13">{q[1]}</text>
            <line className="svg-flow" x1="214" y1={y + h / 2} x2="262" y2={y + h / 2} stroke="var(--bad)" markerEnd="url(#ar-eth)" />
            <text className="t-bad" x="218" y={y + h / 2 - 5}>아니오</text>
            {i < QUESTIONS.length - 1 && (
              <>
                <line className="svg-flow" x1="111" y1={y + h + 1} x2="111" y2={y + h + gap - 1} markerEnd="url(#ar-eth)" />
                <text className="t-good" x="120" y={y + h + 15}>예</text>
              </>
            )}
          </g>
        );
      })}
      <rect className="svg-box-bad" x="266" y={top} width="86" height={bottom - top} rx="8" />
      <g textAnchor="middle">
        <text className="t-bad" x="309" y={top + 70}>하나라도</text>
        <text className="t-bad" x="309" y={top + 90}>아니오면</text>
        <text className="t-bad" x="309" y={top + 118}>다크패턴</text>
        <text className="t-bad" x="309" y={top + 138}>의심</text>
      </g>
      <line className="svg-flow" x1="111" y1={bottom + 1} x2="111" y2={bottom + 20} markerEnd="url(#ar-eth)" />
      <text className="t-good" x="120" y={bottom + 16}>모두 예</text>
      <rect className="svg-box-good" x="8" y={bottom + 22} width="206" height="40" rx="8" />
      <text className="t-good" x="111" y={bottom + 47} textAnchor="middle">돕는 설계</text>
    </svg>
  );
}
