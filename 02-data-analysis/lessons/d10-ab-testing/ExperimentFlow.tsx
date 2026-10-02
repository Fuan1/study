/** 실험 흐름: 설계, SRM 확인, 분석, 판정. SRM 이 걸리면 분석으로 가지 않고 중단한다. */
type Step = { title: string; sub: string; key?: boolean };

const STEPS: Step[] = [
  { title: '설계', sub: '지표·표본 수·기간 고정' },
  { title: 'SRM 확인', sub: '배정 비율이 설계와 같은가', key: true },
  { title: '분석', sub: '차이, 신뢰구간, 가드레일' },
  { title: '판정', sub: '출시·보류·재실험' },
];

// 여백 기준: 두 줄 상자 높이 66(글자 위아래 12px 이상), 상자 사이 40, 바깥 라벨은 선과 8px 이상.
const X = 8;
const W = 196;
const H = 66;
const GAP = 40;
const TOP = 8;
const RX = 256; // 중단 상자 x
const RW = 360 - 8 - RX; // 중단 상자 폭 96
const STROKE = 1.5;
const y = (i: number) => TOP + i * (H + GAP);
const VB_H = Math.ceil(y(STEPS.length - 1) + H + STROKE / 2 + 8); // 마지막 상자 아랫변 + 선 반 + 여백 8

export default function ExperimentFlow() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="실험 진행 순서. 설계에서 지표, 표본 수, 기간을 고정하고, 기간이 끝나면 SRM을 확인한다. 배정 비율이 설계와 다르면 분석하지 않고 중단해 원인을 조사한다. 통과하면 분석하고 출시, 보류, 재실험 중 하나로 판정한다.">
      <defs>
        <marker id="abf-ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      {STEPS.map((s, i) => (
        <g key={s.title}>
          <rect className={s.key ? 'svg-box-key' : 'svg-box'} x={X} y={y(i)} width={W} height={H} rx="8" />
          <text className="t-strong" x={X + 14} y={y(i) + 28}>{s.title}</text>
          <text className="t-sub" x={X + 14} y={y(i) + 50}>{s.sub}</text>
          {i < STEPS.length - 1 && (
            <line className="svg-flow" x1={X + W / 2} y1={y(i) + H + 6} x2={X + W / 2} y2={y(i) + H + GAP - 6} markerEnd="url(#abf-ar)" />
          )}
        </g>
      ))}
      <text className="t-sub" x={X + W / 2 + 14} y={y(0) + H + GAP / 2 + 5}>기간 끝까지 실행</text>
      <text className="t-good" x={X + W / 2 + 14} y={y(1) + H + GAP / 2 + 5}>일치</text>
      <line className="svg-flow" x1={X + W + 6} y1={y(1) + H / 2} x2={RX - 6} y2={y(1) + H / 2} markerEnd="url(#abf-ar)" />
      <text className="t-bad" x={(X + W + RX) / 2} y={y(1) + H / 2 - 10} textAnchor="middle">불일치</text>
      <rect className="svg-box-bad" x={RX} y={y(1)} width={RW} height={H} rx="8" />
      <text className="t-strong" x={RX + 14} y={y(1) + 28}>중단</text>
      <text className="t-sub" x={RX + 14} y={y(1) + 50}>원인 조사</text>
    </svg>
  );
}
