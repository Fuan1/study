/** 전치사를 고르는 순서(이 글의 정리). 위에서 아래로 묻고, 처음 예가 나오는 칸에서 멈춘다. */
type Step = { q: string; sub: string; yes: string; out: string };

const STEPS: Step[] = [
  { q: '굳은 짝인가?', sub: 'depend on, at night', yes: '짝 그대로', out: '바꾸지 않는다' },
  { q: '움직임이 있나?', sub: '가다, 오다, 떠나다', yes: 'to / from', out: '도착 to, 출발 from' },
  { q: '때를 말하나?', sub: '시각·날·달·연도', yes: 'at / on / in', out: '크기 도식 순서' },
  { q: '곳을 말하나?', sub: '지점·면·안', yes: 'at / on / in', out: '점 at, 면 on, 안 in' },
];

const LW = 150;
const RW = 150;
const RX = 360 - 8 - RW;
const H = 66;
const GAP = 40;

export default function ChooseFlow() {
  const y = (i: number) => 8 + i * (H + GAP);
  const VB_H = y(STEPS.length - 1) + H + 14;
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="전치사를 고르는 순서. 굳은 짝이면 그대로 쓰고, 움직임이면 to나 from, 때면 at, on, in을 크기 순서로, 곳이면 점, 면, 안으로 고른다.">
      <defs>
        <marker id="arChoose" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      {STEPS.map((s, i) => (
        <g key={s.q}>
          <rect className="svg-box" x="8" y={y(i)} width={LW} height={H} rx="8" />
          <text className="t-strong" x="22" y={y(i) + 29}>{s.q}</text>
          <text className="t-sub" x="22" y={y(i) + 50}>{s.sub}</text>
          <line className="svg-flow" x1={8 + LW + 6} y1={y(i) + H / 2} x2={RX - 6} y2={y(i) + H / 2} markerEnd="url(#arChoose)" />
          <text className="t-good" x={(8 + LW + RX) / 2} y={y(i) + H / 2 - 10} textAnchor="middle">예</text>
          <rect className="svg-berg" x={RX} y={y(i)} width={RW} height={H} rx="8" />
          <text className="t-strong" x={RX + 14} y={y(i) + 29}>{s.yes}</text>
          <text className="t-sub" x={RX + 14} y={y(i) + 50}>{s.out}</text>
          {i < STEPS.length - 1 && (
            <g>
              <line className="svg-flow" x1={8 + LW / 2} y1={y(i) + H + 6} x2={8 + LW / 2} y2={y(i) + H + GAP - 6} markerEnd="url(#arChoose)" />
              <text className="t-sub" x={8 + LW / 2 + 14} y={y(i) + H + GAP / 2 + 5}>아니오</text>
            </g>
          )}
        </g>
      ))}
    </svg>
  );
}
