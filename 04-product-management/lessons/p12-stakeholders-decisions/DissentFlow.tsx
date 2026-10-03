// 근거: Amazon 2016 주주 서한의 disagree and commit와 진짜 불일치의 즉시 에스컬레이션. 단계 이름과 결과물 표현은 이 글이 정리했다.
type Stage = { q: string; sub: string; out: string; kind: string };

const STAGES: Stage[] = [
  { q: '의견 내기', sub: '기여자 모두, 반대 포함', out: '이견 기록', kind: '이름과 이유' },
  { q: '결정', sub: '승인자 1명이 마감일에', out: '결정 기록', kind: '한 장' },
  { q: '따르기', sub: '이견이 남아도 실행', out: '실행', kind: '함께 따름' },
];

const LW = 188;
const RW = 120;
const RX = 360 - 8 - RW;
const H = 66;
const GAP = 34;
const y = (i: number) => 8 + i * (H + GAP);
const ALERT_Y = y(STAGES.length - 1) + H + 28;
// 마지막 상자 아랫변 + 선 두께 절반 + 아래 여백 8
const VB_H = ALERT_Y + H + 1 + 8;

export default function DissentFlow() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="의견은 결정 전에 모두 내고, 승인자 한 명이 마감일에 정하고, 이견이 남아도 결정을 따른다. 목표 자체가 다른 불일치는 논의를 더 하지 않고 즉시 위로 올린다.">
      <defs>
        <marker id="sbar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      {STAGES.map((s, i) => (
        <g key={s.q}>
          <rect className={i === 1 ? 'svg-box-key' : 'svg-box'} x="8" y={y(i)} width={LW} height={H} rx="8" />
          <text className="t-strong" x="22" y={y(i) + 29}>{s.q}</text>
          <text className="t-sub" x="22" y={y(i) + 50}>{s.sub}</text>
          <line className="svg-flow" x1={8 + LW + 6} y1={y(i) + H / 2} x2={RX - 6} y2={y(i) + H / 2} markerEnd="url(#sbar)" />
          <rect className="svg-berg" x={RX} y={y(i)} width={RW} height={H} rx="8" />
          <text className="t-strong" x={RX + 14} y={y(i) + 29}>{s.out}</text>
          <text className="t-sub" x={RX + 14} y={y(i) + 50}>{s.kind}</text>
          {i < STAGES.length - 1 && (
            <line className="svg-flow" x1={8 + LW / 2} y1={y(i) + H + 5} x2={8 + LW / 2} y2={y(i) + H + GAP - 5} markerEnd="url(#sbar)" />
          )}
        </g>
      ))}
      <rect className="svg-box-bad" x="8" y={ALERT_Y} width="344" height={H} rx="8" />
      <text className="t-strong" x="22" y={ALERT_Y + 29}>예외: 목표 자체가 다를 때</text>
      <text className="t-sub" x="22" y={ALERT_Y + 50}>논의를 더 하지 말고 바로 위로 올린다</text>
    </svg>
  );
}
