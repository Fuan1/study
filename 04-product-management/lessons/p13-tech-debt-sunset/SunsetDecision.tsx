/** 이 글의 정리: 기능을 접을지 보는 판단 순서. 앞 질문에서 아니오가 나오면 접지 않는다. */
type Step = { q: string; sub: string; no: [string, string] };

const STEPS: Step[] = [
  { q: '쓰는 사람이 적은가', sub: '필수 작업이면 예외', no: ['유지', '개선 검토'] },
  { q: '유지 비용이 더 큰가', sub: '이자·장애·문의 합산', no: ['유지', '비용 낮추기'] },
  { q: '대체할 길이 있는가', sub: '제품 안, 이전 경로', no: ['대안 먼저', '또는 축소'] },
  { q: '약속에 걸리지 않나', sub: '계약·약관·법', no: ['조건에 맞춰', '일정 조정'] },
];

const LW = 176;
const RW = 112;
const RX = 360 - 8 - RW;
const H = 66;
const GAP = 34;
const FINAL_H = 44;
const y = (i: number) => 8 + i * (H + GAP);
const VB_H = y(STEPS.length) + FINAL_H + 1 + 8;

export default function SunsetDecision() {
  return (
    <svg
      viewBox={`0 0 360 ${VB_H}`}
      role="img"
      aria-label="기능 종료 판단 순서. 사용자가 적은가, 유지 비용이 더 큰가, 대체할 길이 있는가, 약속에 걸리지 않는가를 차례로 묻고, 모두 통과하면 종료를 결정하고 공지와 절차로 넘어간다. 중간에 아니오가 나오면 유지, 대안 먼저, 일정 조정 중 하나로 간다."
    >
      <defs>
        <marker id="sdar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      {STEPS.map((s, i) => (
        <g key={s.q}>
          <rect className="svg-box" x="8" y={y(i)} width={LW} height={H} rx="8" />
          <text className="t-strong" x="22" y={y(i) + 29}>{s.q}</text>
          <text className="t-sub" x="22" y={y(i) + 50}>{s.sub}</text>
          <line className="svg-flow" x1={8 + LW + 6} y1={y(i) + H / 2} x2={RX - 6} y2={y(i) + H / 2} markerEnd="url(#sdar)" />
          <text className="t-sub" x={(8 + LW + RX) / 2} y={y(i) + H / 2 - 8} textAnchor="middle">아니오</text>
          <rect className="svg-berg" x={RX} y={y(i)} width={RW} height={H} rx="8" />
          <text className="t-strong" x={RX + 14} y={y(i) + 29}>{s.no[0]}</text>
          <text className="t-sub" x={RX + 14} y={y(i) + 50}>{s.no[1]}</text>
          <line className="svg-flow" x1={8 + LW / 2} y1={y(i) + H + 5} x2={8 + LW / 2} y2={y(i) + H + GAP - 5} markerEnd="url(#sdar)" />
          <text className="t-sub" x={8 + LW / 2 + 12} y={y(i) + H + GAP / 2 + 5}>예</text>
        </g>
      ))}
      <rect className="svg-box-key" x="8" y={y(STEPS.length)} width={LW + 48} height={FINAL_H} rx="8" />
      <text className="t-strong" x="22" y={y(STEPS.length) + 27}>종료 결정 → 공지·절차</text>
    </svg>
  );
}
