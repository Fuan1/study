type Row = { name: string; tag: string; sub: string };

const ROWS: Row[] = [
  { name: '고객 인터뷰', tag: '말', sub: '과거 행동과 맥락을 듣는다' },
  { name: '프로토타입 테스트', tag: '관찰', sub: '모형을 쓰는 행동을 본다' },
  { name: '가짜 문·랜딩', tag: '관심', sub: '누르고 신청하는 비율을 잰다' },
  { name: '컨시어지', tag: '실사용', sub: '사람이 직접 제공, 재사용 확인' },
  { name: '무작위 A/B', tag: '인과', sub: '두 집단 비교로 원인을 가린다' },
];

const BX = 36;
const BW = 352 - BX;
const H = 66;
const GAP = 24;
const Y0 = 34;
const y = (i: number) => Y0 + i * (H + GAP);
const lastBottom = y(ROWS.length - 1) + H;
// 마지막 상자 아랫변 + 선 두께 절반 + 아래 여백 8
const VB_H = lastBottom + 1 + 8;

export default function MethodLadder() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="검증 방법 다섯 가지를 위에서 아래로 늘어놓은 순서. 고객 인터뷰, 프로토타입 테스트, 가짜 문과 랜딩, 컨시어지, 무작위 A/B 순이며 아래로 갈수록 비용과 준비가 늘고 증거가 강해진다.">
      <defs>
        <marker id="p03ladder" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      <text className="t-sub" x="8" y="18">아래로 갈수록 비용·준비가 늘고 증거가 강해진다</text>
      <line className="svg-flow" x1="18" y1={Y0 + 6} x2="18" y2={lastBottom - 2} markerEnd="url(#p03ladder)" />
      {ROWS.map((r, i) => (
        <g key={r.name}>
          <rect className={i === 4 ? 'svg-box-key' : 'svg-box'} x={BX} y={y(i)} width={BW} height={H} rx="8" />
          <text className="t-strong" x={BX + 14} y={y(i) + 29}>{r.name}</text>
          <text className="t-accent" x={352 - 14} y={y(i) + 29} textAnchor="end">{r.tag}</text>
          <text className="t-sub" x={BX + 14} y={y(i) + 50}>{r.sub}</text>
        </g>
      ))}
    </svg>
  );
}
