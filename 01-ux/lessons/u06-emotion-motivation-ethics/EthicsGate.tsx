const QUESTIONS = [
  ['조건과 비용을 알고', '선택했는가'],
  ['거절과 해지가 가입만큼', '쉬운가'],
  ['사용자 자신의 목표에', '도움이 되는가'],
  ['가짜 시간, 수량, 기본값', '같은 속임 요소가 없는가'],
];

// 여백 기준: 상자 안 12px 이상(두 줄 상자 높이 66), 단계 사이 40px, 라벨은 선·상자와 8px 이상.
export default function EthicsGate() {
  const h = 66;
  const gap = 40;
  const top = 8;
  const W = 170; // 질문 상자 폭
  const RW = 84; // 결과 상자 폭
  const RX = 360 - 8 - RW;
  const cx = 8 + W / 2;
  const bottom = top + QUESTIONS.length * h + (QUESTIONS.length - 1) * gap;
  const endY = bottom + gap;
  const mid = (top + bottom) / 2;
  return (
    <svg viewBox="0 0 360 488" role="img" aria-label="같은 심리 원리를 쓸 때 던지는 네 질문. 모두 예이면 돕는 설계이고, 하나라도 아니오이면 다크패턴을 의심한다.">
      <defs>
        <marker id="ar-eth" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      {QUESTIONS.map((q, i) => {
        const y = top + i * (h + gap);
        return (
          <g key={i}>
            <rect className="svg-box" x="8" y={y} width={W} height={h} rx="6" />
            <text x="20" y={y + 27} fontSize="13">{q[0]}</text>
            <text x="20" y={y + 47} fontSize="13">{q[1]}</text>
            <line className="svg-flow" x1={8 + W + 6} y1={y + h / 2} x2={RX - 6} y2={y + h / 2} stroke="var(--bad)" markerEnd="url(#ar-eth)" />
            <text className="t-bad" x={(8 + W + RX) / 2} y={y + h / 2 - 10} textAnchor="middle">아니오</text>
            {i < QUESTIONS.length - 1 && (
              <>
                <line className="svg-flow" x1={cx} y1={y + h + 4} x2={cx} y2={y + h + gap - 4} markerEnd="url(#ar-eth)" />
                <text className="t-good" x={cx + 12} y={y + h + gap / 2 + 5}>예</text>
              </>
            )}
          </g>
        );
      })}
      <rect className="svg-box-bad" x={RX} y={top} width={RW} height={bottom - top} rx="8" />
      <g textAnchor="middle">
        <text className="t-bad" x={RX + RW / 2} y={mid - 36}>하나라도</text>
        <text className="t-bad" x={RX + RW / 2} y={mid - 16}>아니오면</text>
        <text className="t-bad" x={RX + RW / 2} y={mid + 16}>다크패턴</text>
        <text className="t-bad" x={RX + RW / 2} y={mid + 36}>의심</text>
      </g>
      <line className="svg-flow" x1={cx} y1={bottom + 4} x2={cx} y2={endY - 4} markerEnd="url(#ar-eth)" />
      <text className="t-good" x={cx + 12} y={bottom + gap / 2 + 5}>모두 예</text>
      <rect className="svg-box-good" x="8" y={endY} width={W} height="48" rx="8" />
      <text className="t-good" x={cx} y={endY + 29} textAnchor="middle">돕는 설계</text>
    </svg>
  );
}
