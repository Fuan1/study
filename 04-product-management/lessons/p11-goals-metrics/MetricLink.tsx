// 지표 체계와 OKR 의 연결. 북극성 지표와 입력 지표 3~5개는 Amplitude 가이드, 가드레일은 02 d01 글의 구분이다.
// 입력 지표를 분기 목표와 핵심 결과로 잇는 두 칸은 이 글의 정리다.
type Node = { t: string; s: string; cls: string };

const NODES: Node[] = [
  { t: '북극성 · 목표 지표', s: '고객이 얻는 가치를 담은 지표 하나', cls: 'svg-box-key' },
  { t: '입력(동인) 지표 3~5개', s: '제품팀이 직접 움직일 수 있는 것', cls: 'svg-box' },
  { t: '분기 목표 (O)', s: '이번 분기에 올릴 입력을 방향으로 쓴다', cls: 'svg-box' },
  { t: '핵심 결과 (KR)', s: '입력 지표의 시작값에서 목표값까지', cls: 'svg-box' },
];

const H = 66;
const GAP = 34;
const y = (i: number) => 8 + i * (H + GAP);
const GUARD_Y = y(NODES.length - 1) + H + GAP;
// 마지막 상자 아랫변 + 선 두께 절반(점선 2px 이므로 1) + 아래 여백 8
const VB_H = GUARD_Y + H + 1 + 8;

export default function MetricLink() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="지표와 목표의 연결. 북극성 지표 아래에 입력 지표 3개에서 5개가 있고, 이번 분기에 올릴 입력 지표를 분기 목표와 핵심 결과로 쓴다. 핵심 결과 옆에는 가드레일 지표를 함께 둔다.">
      <defs>
        <marker id="ml-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      {NODES.map((n, i) => (
        <g key={n.t}>
          <rect className={n.cls} x="8" y={y(i)} width="344" height={H} rx="8" />
          <text className="t-strong" x="22" y={y(i) + 29}>{n.t}</text>
          <text className="t-sub" x="22" y={y(i) + 50}>{n.s}</text>
          {i < NODES.length - 1 && (
            <line className="svg-flow" x1="44" y1={y(i) + H + 6} x2="44" y2={y(i) + H + GAP - 6} markerEnd="url(#ml-arrow)" />
          )}
        </g>
      ))}
      <line className="svg-flow" x1="44" y1={y(NODES.length - 1) + H + 6} x2="44" y2={GUARD_Y - 6} />
      <text className="t-sub" x="60" y={y(NODES.length - 1) + H + GAP / 2 + 5}>옆에 함께 둔다</text>
      <rect className="svg-box-good" x="8" y={GUARD_Y} width="344" height={H} rx="8" />
      <text className="t-strong" x="22" y={GUARD_Y + 29}>가드레일 지표</text>
      <text className="t-sub" x="22" y={GUARD_Y + 50}>나빠지면 KR 이 올라도 멈춘다</text>
    </svg>
  );
}
