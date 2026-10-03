/**
 * 가상 예시: 해결책으로 온 요청 하나를 문제로 되돌리고, 문제에서 해결 방법이 여럿 열리는 모양.
 * 세 줄의 위계: 요청(해결책) -> 문제 -> 해결 방법 후보.
 */
const W = 344;
const H1 = 66;
const GAP = 48;
const y1 = 8;
const y2 = y1 + H1 + GAP;
const y3 = y2 + H1 + GAP;
const H3 = 66;
const BW = 108;
const BGAP = (W - 3 * BW) / 2;
const SOL: [string, string][] = [['파일', '내보내기'], ['기간별', '요약 화면'], ['요약', '자동 발송']];
const VB_H = y3 + H3 + 1 + 8;

export default function RequestToProblem() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="엑셀 내보내기를 만들어 달라는 요청은 해결책 하나다. 왜 필요한지 물으면 매주 주문 숫자를 손으로 옮겨 적는다는 문제가 나오고, 이 문제에는 파일 내보내기, 기간별 요약 화면, 요약 자동 발송 같은 해결 방법이 여럿 있다.">
      <defs>
        <marker id="p01rp" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      <rect className="svg-box-bad" x="8" y={y1} width={W} height={H1} rx="8" />
      <text className="t-sub" x="22" y={y1 + 28}>요청 (해결책 하나)</text>
      <text className="t-strong" x="22" y={y1 + 52}>엑셀 내보내기 만들어 주세요</text>
      <line className="svg-flow" x1="180" y1={y1 + H1 + 6} x2="180" y2={y2 - 6} markerEnd="url(#p01rp)" />
      <text className="t-sub" x="194" y={y1 + H1 + GAP / 2 + 5}>왜 필요한가</text>
      <rect className="svg-box-good" x="8" y={y2} width={W} height={H1} rx="8" />
      <text className="t-sub" x="22" y={y2 + 28}>문제</text>
      <text className="t-strong" x="22" y={y2 + 52}>매주 주문 숫자를 손으로 옮겨 적는다</text>
      <line className="svg-flow" x1="180" y1={y2 + H1 + 6} x2="180" y2={y3 - 6} markerEnd="url(#p01rp)" />
      <text className="t-sub" x="194" y={y2 + H1 + GAP / 2 + 5}>풀 방법은</text>
      {SOL.map(([a, b], i) => (
        <g key={a}>
          <rect className={i === 0 ? 'svg-berg' : 'svg-box'} x={8 + i * (BW + BGAP)} y={y3} width={BW} height={H3} rx="8" />
          <text className="t-strong" x={8 + i * (BW + BGAP) + BW / 2} y={y3 + 29} textAnchor="middle">{a}</text>
          <text className="t-strong" x={8 + i * (BW + BGAP) + BW / 2} y={y3 + 50} textAnchor="middle">{b}</text>
        </g>
      ))}
    </svg>
  );
}
