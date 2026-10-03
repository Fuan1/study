type Step = { q: string; sub: string; no: string; fix: string };

const STEPS: Step[] = [
  { q: '인수 기준을 통과?', sub: '시나리오를 하나씩', no: '아직 미완', fix: '작업 계속' },
  { q: '완료 정의를 충족?', sub: '공통 목록 전부', no: '리뷰에 못 냄', fix: '백로그로 복귀' },
  { q: '기준 안의 요구인가?', sub: '개발 중 늘어난 것', no: '새 항목', fix: '백로그에 추가' },
];

// 여백 기준: 상자 안 14px 이상, 두 줄 상자 높이 68, 라벨은 선·상자에서 8px 이상.
const LW = 170;
const RW = 118;
const RX = 360 - 8 - RW;
const H = 68;
const GAP = 48;
const y = (i: number) => 8 + i * (H + GAP);
const VB_H = y(STEPS.length) + H + 1 + 8;

export default function JudgeFlow() {
  const last = STEPS.length;
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="항목 완료 판정 순서. 인수 기준을 모두 통과하는지 보고, 아니면 작업을 계속한다. 통과하면 공통 완료 정의를 충족하는지 보고, 아니면 리뷰에 내지 못하고 백로그로 돌아간다. 충족하면 기준 안의 요구인지 보고, 기준 밖 요구는 새 항목으로 백로그에 올린다. 모두 지나면 완료로 센다.">
      <defs>
        <marker id="jfar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      {STEPS.map((s, i) => (
        <g key={s.q}>
          <rect className="svg-box" x="8" y={y(i)} width={LW} height={H} rx="8" />
          <text className="t-strong" x="22" y={y(i) + 29}>{s.q}</text>
          <text className="t-sub" x="22" y={y(i) + 50}>{s.sub}</text>
          <line className="svg-flow" x1={8 + LW + 6} y1={y(i) + H / 2} x2={RX - 6} y2={y(i) + H / 2} markerEnd="url(#jfar)" />
          <text className="t-bad" x={(8 + LW + RX) / 2} y={y(i) + H / 2 - 10} textAnchor="middle">아니오</text>
          <rect className="svg-berg" x={RX} y={y(i)} width={RW} height={H} rx="8" />
          <text className="t-strong" x={RX + 14} y={y(i) + 29}>{s.no}</text>
          <text className="t-sub" x={RX + 14} y={y(i) + 50}>{s.fix}</text>
          <line className="svg-flow" x1={8 + LW / 2} y1={y(i) + H + 6} x2={8 + LW / 2} y2={y(i) + H + GAP - 6} markerEnd="url(#jfar)" />
          <text className="t-good" x={8 + LW / 2 + 14} y={y(i) + H + GAP / 2 + 5}>예</text>
        </g>
      ))}
      <rect className="svg-box-key" x="8" y={y(last)} width={LW} height={H} rx="8" />
      <text className="t-strong" x="22" y={y(last) + 29}>완료로 센다</text>
      <text className="t-sub" x="22" y={y(last) + 50}>리뷰에서 보여 준다</text>
    </svg>
  );
}
