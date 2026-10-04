type Step = { q: string; sub: string; yes: string; fix: string };

const STEPS: Step[] = [
  { q: '문장에 be 가 있나?', sub: 'am is are was were', yes: 'be 문장', fix: 'not · 자리 바꿈' },
  { q: 'can, will 이 있나?', sub: '조동사는 e09 에서', yes: '조동사 문장', fix: '조동사가 이동' },
];

const LW = 192;
const RW = 124;
const RX = 360 - 8 - RW;
const H = 68;
const GAP = 48;

export default function PickFlow() {
  const y = (i: number) => 8 + i * (H + GAP);
  const last = STEPS.length;
  return (
    <svg viewBox="0 0 360 320" role="img" aria-label="문장 만드는 판단 순서. be 가 있으면 be 문장으로 not 을 붙이거나 자리를 바꾼다. 조동사가 있으면 조동사가 움직인다. 둘 다 없으면 do, does, did 를 넣고 동사는 원형으로 쓴다.">
      <defs>
        <marker id="arPick" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      {STEPS.map((s, i) => (
        <g key={s.q}>
          <rect className="svg-box" x="8" y={y(i)} width={LW} height={H} rx="8" />
          <text className="t-strong" x="22" y={y(i) + 29}>{s.q}</text>
          <text className="t-sub" x="22" y={y(i) + 50}>{s.sub}</text>
          <line className="svg-flow" x1={8 + LW + 6} y1={y(i) + H / 2} x2={RX - 6} y2={y(i) + H / 2} markerEnd="url(#arPick)" />
          <text className="t-good" x={(8 + LW + RX) / 2} y={y(i) + H / 2 - 10} textAnchor="middle">예</text>
          <rect className="svg-berg" x={RX} y={y(i)} width={RW} height={H} rx="8" />
          <text className="t-strong" x={RX + 14} y={y(i) + 29}>{s.yes}</text>
          <text className="t-sub" x={RX + 14} y={y(i) + 50}>{s.fix}</text>
          <line className="svg-flow" x1={8 + LW / 2} y1={y(i) + H + 6} x2={8 + LW / 2} y2={y(i) + H + GAP - 6} markerEnd="url(#arPick)" />
          <text className="t-sub" x={8 + LW / 2 + 14} y={y(i) + H + GAP / 2 + 5}>아니오</text>
        </g>
      ))}
      <rect className="svg-box-key" x="8" y={y(last)} width="344" height={H} rx="8" />
      <text className="t-strong" x="22" y={y(last) + 29}>do / does / did 를 넣는다</text>
      <text className="t-sub" x="22" y={y(last) + 50}>일반동사 문장 · 동사는 원형으로</text>
    </svg>
  );
}
