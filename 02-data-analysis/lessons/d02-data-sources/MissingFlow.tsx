/** 필요한 데이터가 없을 때 확인 순서. 확인 비용이 작은 것부터 묻는다. */
type Step = { q: string; sub: string; yes: string; fix: string };

const STEPS: Step[] = [
  { q: '보유 데이터에 있나?', sub: '인벤토리에서 찾는다', yes: '그대로 쓴다', fix: '단위 확인' },
  { q: '대신 볼 지표가 있나?', sub: '질문과 이어지는 값', yes: '대리 지표', fix: '한계를 적는다' },
  { q: '외부·공개 자료가 있나?', sub: '대상·시점을 본다', yes: '외부 자료', fix: '출처를 적는다' },
];

// 여백 기준: 상자 안 14px, 두 줄 상자 높이 66, 단계 사이 44px, 라벨은 선과 8px 이상.
const LW = 186;
const RW = 124;
const RX = 360 - 8 - RW;
const H = 66;
const GAP = 44;

export default function MissingFlow() {
  const y = (i: number) => 8 + i * (H + GAP);
  const last = STEPS.length;
  const cx = 8 + LW / 2;
  return (
    <svg viewBox={`0 0 360 ${y(last) + H + 9}`} role="img" aria-label="필요한 데이터가 없을 때의 확인 순서. 보유 데이터에 있으면 그대로 쓰고, 없으면 대리 지표, 외부 공개 자료 순으로 묻고, 모두 아니면 새로 수집한다.">
      <defs>
        <marker id="ds-ar5" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      {STEPS.map((s, i) => (
        <g key={s.q}>
          <rect className="svg-box" x="8" y={y(i)} width={LW} height={H} rx="8" />
          <text className="t-strong" x="22" y={y(i) + 29}>{s.q}</text>
          <text className="t-sub" x="22" y={y(i) + 50}>{s.sub}</text>
          <line className="svg-flow" x1={8 + LW + 6} y1={y(i) + H / 2} x2={RX - 6} y2={y(i) + H / 2} markerEnd="url(#ds-ar5)" />
          <text className="t-good" x={(8 + LW + RX) / 2} y={y(i) + H / 2 - 12} textAnchor="middle">예</text>
          <rect className="svg-berg" x={RX} y={y(i)} width={RW} height={H} rx="8" />
          <text className="t-strong" x={RX + 14} y={y(i) + 29}>{s.yes}</text>
          <text className="t-sub" x={RX + 14} y={y(i) + 50}>{s.fix}</text>
          <line className="svg-flow" x1={cx} y1={y(i) + H + 6} x2={cx} y2={y(i) + H + GAP - 6} markerEnd="url(#ds-ar5)" />
          <text className="t-sub" x={cx + 14} y={y(i) + H + GAP / 2 + 5}>아니오</text>
        </g>
      ))}
      <rect className="svg-box-key" x="8" y={y(last)} width={LW} height={H} rx="8" />
      <text className="t-strong" x="22" y={y(last) + 29}>새로 수집한다</text>
      <text className="t-sub" x="22" y={y(last) + 50}>단위를 정하고 최소한만</text>
    </svg>
  );
}
