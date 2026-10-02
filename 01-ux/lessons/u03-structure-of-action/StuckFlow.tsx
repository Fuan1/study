/** 막힌 지점 판단 순서. 행 위치는 코드로 계산한다. */
const ROWS = [
  { stage: '2 계획', q: '할 수 있는 일이 보이나?', cls: 'pl-ux' },
  { stage: '3 명세', q: '어느 것을 누를지 정해지나?', cls: 'pl-ux' },
  { stage: '4 수행', q: '정확히 조작할 수 있나?', cls: 'pl-ux' },
  { stage: '5 지각', q: '누른 직후 반응이 보이나?', cls: 'pl-ui' },
  { stage: '6 해석', q: '반응의 뜻을 아나?', cls: 'pl-ui' },
  { stage: '7 비교', q: '끝났는지 아나?', cls: 'pl-ui' },
];

const TOP = 8;
const H = 44; // 상자 안 위아래 13.5px
const GAP = 24;
const rowY = (i: number) => TOP + i * (H + GAP);

export default function StuckFlow() {
  const bottom = rowY(ROWS.length - 1) + H;
  return (
    <svg viewBox="0 0 360 440" role="img" aria-label="막힌 지점을 찾는 질문 여섯 개. 위에서부터 차례로 묻고, 처음으로 아니오가 나오는 단계를 고친다. 앞의 세 질문은 실행 쪽, 뒤의 세 질문은 평가 쪽이다.">
      <defs>
        <marker id="ar-u03-flow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      {ROWS.map((r, i) => (
        <g key={r.stage}>
          <rect className={r.cls} x="8" y={rowY(i)} width="344" height={H} rx="8" />
          <text className="t-strong" x="22" y={rowY(i) + 27}>{r.stage}</text>
          <text x="92" y={rowY(i) + 27} fontSize="14" style={{ fill: 'var(--ink)' }}>{r.q}</text>
          {i < ROWS.length - 1 && (
            <path className="svg-flow" d={`M180 ${rowY(i) + H} L180 ${rowY(i + 1)}`} markerEnd="url(#ar-u03-flow)" />
          )}
        </g>
      ))}
      <rect className="pl-ux" x="8" y={bottom + 24} width="14" height="14" rx="3" />
      <text className="t-accent" x="28" y={bottom + 36}>실행: 무엇을 어떻게 할지</text>
      <rect className="pl-ui" x="196" y={bottom + 24} width="14" height="14" rx="3" />
      <text className="t-warm" x="216" y={bottom + 36}>평가: 무슨 일인지</text>
    </svg>
  );
}
