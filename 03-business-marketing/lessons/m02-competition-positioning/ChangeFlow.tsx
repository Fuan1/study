type Step = { q: string; sub: string };

const STEPS: Step[] = [
  { q: '변경을 발견한다', sub: '가격, 광고, 후기, 공시' },
  { q: '사실을 먼저 적는다', sub: '이전과 이후, 출처' },
  { q: '고객 기준 행에 영향?', sub: '비교표의 행과 대조' },
];

// 여백 기준: 상자 안 14px, 두 줄 상자 높이 66, 단계 사이 34.
const LW = 170;
const RW = 126;
const RX = 360 - 8 - RW;
const H = 66;
const GAP = 34;
const y = (i: number) => 8 + i * (H + GAP);
const LAST = STEPS.length;
const VB_H = Math.ceil(y(LAST) + H + 0.75 + 8);

export default function ChangeFlow() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="경쟁 변경 처리 순서. 변경을 발견하면 사실을 먼저 적고, 고객 기준 행에 영향이 있으면 비교표를 갱신하고, 없으면 기록만 하고 대응하지 않는다.">
      <defs>
        <marker id="m02cf" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      {STEPS.map((s, i) => (
        <g key={s.q}>
          <rect className={i === 2 ? 'svg-box-key' : 'svg-box'} x="8" y={y(i)} width={LW} height={H} rx="8" />
          <text className="t-strong" x="22" y={y(i) + 28}>{s.q}</text>
          <text className="t-sub" x="22" y={y(i) + 49}>{s.sub}</text>
          <line className="svg-flow" x1={8 + LW / 2} y1={y(i) + H + 5} x2={8 + LW / 2} y2={y(i) + H + GAP - 5} markerEnd="url(#m02cf)" />
        </g>
      ))}
      <text className="t-bad" x={8 + LW / 2 + 14} y={y(2) + H + GAP / 2 + 5}>아니오</text>
      <line className="svg-flow" x1={8 + LW + 6} y1={y(2) + H / 2} x2={RX - 6} y2={y(2) + H / 2} markerEnd="url(#m02cf)" />
      <text className="t-good" x={(8 + LW + RX) / 2} y={y(2) + H / 2 - 10} textAnchor="middle">예</text>
      <rect className="svg-berg" x={RX} y={y(2)} width={RW} height={H} rx="8" />
      <text className="t-strong" x={RX + 14} y={y(2) + 28}>비교표 갱신</text>
      <text className="t-sub" x={RX + 14} y={y(2) + 49}>필요하면 문장도</text>
      <rect className="svg-box" x="8" y={y(LAST)} width={LW} height={H} rx="8" />
      <text className="t-strong" x="22" y={y(LAST) + 28}>기록만 한다</text>
      <text className="t-sub" x="22" y={y(LAST) + 49}>대응하지 않는다</text>
    </svg>
  );
}
