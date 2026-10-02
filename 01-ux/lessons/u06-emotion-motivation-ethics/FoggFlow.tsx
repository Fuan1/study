const STEPS = [
  { q: ['지금 하라는 신호가', '있는가(촉발)'], fix: ['알림, 버튼, 안내를', '알맞은 때에 둔다'] },
  { q: ['지금 사용자가 해낼', '수 있는가(능력)'], fix: ['행동을 작게 줄이고', '단계를 덜어낸다'] },
  { q: ['하고 싶어 하는가', '(동기)'], fix: ['얻는 가치를', '분명히 보여준다'] },
];

// 여백 기준: 상자 안 12px 이상(두 줄 상자 높이 66), 단계 사이 40px, 라벨은 선·상자와 8px 이상.
export default function FoggFlow() {
  const h = 66;
  const gap = 40;
  const top = 8;
  const W = 140; // 상자 폭(좌우 같음)
  const RX = 360 - 8 - W; // 처방 상자 x
  const cx = 8 + W / 2; // 세로 화살표 x
  const bottom = top + STEPS.length * h + (STEPS.length - 1) * gap;
  const endY = bottom + gap;
  return (
    <svg viewBox="0 0 360 382" role="img" aria-label="행동이 일어나지 않을 때 점검 순서. 촉발, 능력, 동기 순으로 묻고 아니오이면 오른쪽 처방을 적용한다.">
      <defs>
        <marker id="ar-fogg" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      {STEPS.map((s, i) => {
        const y = top + i * (h + gap);
        return (
          <g key={i}>
            <rect className="svg-box" x="8" y={y} width={W} height={h} rx="6" />
            <text x="20" y={y + 27} fontSize="13">{s.q[0]}</text>
            <text x="20" y={y + 47} fontSize="13">{s.q[1]}</text>
            <line className="svg-flow" x1={8 + W + 6} y1={y + h / 2} x2={RX - 6} y2={y + h / 2} stroke="var(--bad)" markerEnd="url(#ar-fogg)" />
            <text className="t-bad" x={(8 + W + RX) / 2} y={y + h / 2 - 10} textAnchor="middle">아니오</text>
            <rect className="svg-box-key" x={RX} y={y} width={W} height={h} rx="6" />
            <text x={RX + 12} y={y + 27} fontSize="13">{s.fix[0]}</text>
            <text x={RX + 12} y={y + 47} fontSize="13">{s.fix[1]}</text>
            {i < STEPS.length - 1 && (
              <>
                <line className="svg-flow" x1={cx} y1={y + h + 4} x2={cx} y2={y + h + gap - 4} markerEnd="url(#ar-fogg)" />
                <text className="t-good" x={cx + 12} y={y + h + gap / 2 + 5}>예</text>
              </>
            )}
          </g>
        );
      })}
      <line className="svg-flow" x1={cx} y1={bottom + 4} x2={cx} y2={endY - 4} markerEnd="url(#ar-fogg)" />
      <text className="t-good" x={cx + 12} y={bottom + gap / 2 + 5}>모두 예</text>
      <rect className="svg-box-good" x="8" y={endY} width={W} height="48" rx="8" />
      <text className="t-good" x={cx} y={endY + 29} textAnchor="middle">행동이 일어난다</text>
    </svg>
  );
}
