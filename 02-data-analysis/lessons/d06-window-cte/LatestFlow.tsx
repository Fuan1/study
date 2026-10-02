/** 윈도우 값은 WHERE 다음에 계산되므로, 번호 붙이기(안쪽)와 거르기(바깥)를 두 층으로 나눈다. */
type Step = { title: string; sub: string };

const INNER: Step[] = [
  { title: '1. FROM, WHERE, GROUP BY', sub: '일반 조건으로 행을 먼저 거른다' },
  { title: '2. 윈도우 계산', sub: 'ROW_NUMBER() 로 rn 열을 붙인다' },
];
const OUTER: Step = { title: '3. 바깥 WHERE rn = 1', sub: '붙은 번호를 보고 거른다' };

const BX = 24; // 상자 x
const BW = 312; // 상자 폭
const BH = 66; // 두 줄 상자
const FRAME_PAD = 16;
const ARROW_GAP = 28;
const OUT_GAP = 44;

export default function LatestFlow() {
  const frameTop = 8;
  const labelY = frameTop + 26;
  const boxTop = (i: number) => labelY + 16 + i * (BH + ARROW_GAP);
  const lastInnerBottom = boxTop(INNER.length - 1) + BH;
  const frameBottom = lastInnerBottom + FRAME_PAD;
  const outTop = frameBottom + OUT_GAP;
  const outBottom = outTop + BH;
  const H = Math.ceil(outBottom + 0.75 + 12);
  return (
    <svg viewBox={`0 0 360 ${H}`} role="img" aria-label="최신 1건을 뽑는 순서. 안쪽 쿼리에서 먼저 행을 거르고 ROW_NUMBER 로 번호를 붙이고, 바깥 쿼리의 WHERE 에서 rn 이 1인 행만 남긴다.">
      <defs>
        <marker id="d06-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      <rect x="8" y={frameTop} width="344" height={frameBottom - frameTop} rx="12" fill="none" stroke="var(--line)" strokeWidth="1.5" strokeDasharray="5 3" />
      <text className="t-sub" x="24" y={labelY}>안쪽 쿼리 (서브쿼리나 CTE)</text>
      {INNER.map((s, i) => {
        const y = boxTop(i);
        return (
          <g key={s.title}>
            <rect className="svg-box" x={BX} y={y} width={BW} height={BH} rx="8" />
            <text className="t-strong" x={BX + 14} y={y + 29}>{s.title}</text>
            <text className="t-sub" x={BX + 14} y={y + 50}>{s.sub}</text>
            {i < INNER.length - 1 && (
              <line className="svg-flow" x1="180" y1={y + BH + 4} x2="180" y2={y + BH + ARROW_GAP - 4} markerEnd="url(#d06-arrow)" />
            )}
          </g>
        );
      })}
      <line className="svg-flow" x1="180" y1={frameBottom + 4} x2="180" y2={outTop - 4} markerEnd="url(#d06-arrow)" />
      <text className="t-sub" x="194" y={frameBottom + OUT_GAP / 2 + 5}>rn 열이 붙은 결과</text>
      <rect className="svg-box-key" x={BX} y={outTop} width={BW} height={BH} rx="8" />
      <text className="t-strong" x={BX + 14} y={outTop + 29}>{OUTER.title}</text>
      <text className="t-sub" x={BX + 14} y={outTop + 50}>{OUTER.sub}</text>
    </svg>
  );
}
