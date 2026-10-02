type Step = { q: string; sub: string; branch: '예' | '아니오'; yes: string; fix: string };

// 판단 순서: NN/g 의 허영 지표 기준과 Kohavi 외 (2009)의 OEC 시험 질문을 순서로 묶었다.
const STEPS: Step[] = [
  { q: '행동을 바꿀 수 있나?', sub: '보고 후 할 일이 정해지나', branch: '아니오', yes: '허영 의심', fix: '보고용 숫자' },
  { q: '그냥 두면 계속 오르나?', sub: '누적 합계는 늘 오른다', branch: '예', yes: '허영 지표', fix: '비율로 바꿈' },
  { q: '꼼수로도 오를 수 있나?', sub: '예: 클릭만 늘리는 문구', branch: '예', yes: '대리 위험', fix: '짝을 붙임' },
];

const LW = 192;
const RW = 96;
const RX = 360 - 8 - RW;
const H = 68;
const GAP = 48;
const y = (i: number) => 8 + i * (H + GAP);
const VB_H = y(STEPS.length) + H + 12;

export default function VanityFilter() {
  const last = STEPS.length;
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="지표 후보를 거르는 순서. 행동을 바꿀 수 없으면 허영 의심, 그냥 두어도 계속 오르면 허영 지표라 비율로 바꾸고, 꼼수로도 오를 수 있으면 대리 위험이라 짝 지표를 붙인다. 모두 통과하면 지표로 채택한다.">
      <defs>
        <marker id="d01-ar2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      {STEPS.map((s, i) => (
        <g key={s.q}>
          <rect className="svg-box" x="8" y={y(i)} width={LW} height={H} rx="8" />
          <text className="t-strong" x="22" y={y(i) + 29}>{s.q}</text>
          <text className="t-sub" x="22" y={y(i) + 50}>{s.sub}</text>
          <line className="svg-flow" x1={8 + LW + 6} y1={y(i) + H / 2} x2={RX - 6} y2={y(i) + H / 2} markerEnd="url(#d01-ar2)" />
          <text className="t-bad" x={(8 + LW + RX) / 2} y={y(i) + H / 2 - 10} textAnchor="middle">{s.branch}</text>
          <rect className="svg-berg" x={RX} y={y(i)} width={RW} height={H} rx="8" />
          <text className="t-strong" x={RX + 12} y={y(i) + 29}>{s.yes}</text>
          <text className="t-sub" x={RX + 12} y={y(i) + 50}>{s.fix}</text>
          <line className="svg-flow" x1={8 + LW / 2} y1={y(i) + H + 6} x2={8 + LW / 2} y2={y(i) + H + GAP - 6} markerEnd="url(#d01-ar2)" />
          <text className="t-sub" x={8 + LW / 2 + 14} y={y(i) + H + GAP / 2 + 5}>{s.branch === '예' ? '아니오' : '예'}</text>
        </g>
      ))}
      <rect className="svg-box-key" x="8" y={y(last)} width={LW} height={H} rx="8" />
      <text className="t-strong" x="22" y={y(last) + 29}>지표로 채택</text>
      <text className="t-sub" x="22" y={y(last) + 50}>정의서에 적는다</text>
    </svg>
  );
}
