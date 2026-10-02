/** 모바일 한 화면 대시보드 뼈대. 질문 하나(주문이 늘고 있나)에 필터, 핵심 지표, 차트 하나, 순위 하나. 값은 가정이다. */
const SX = 8;
const SW = 216; // 화면 폭
const IX = SX + 12; // 안쪽 시작 x
const IW = SW - 24; // 안쪽 폭

const TREND = [62, 58, 66, 70, 64, 75, 80, 78, 84, 90, 86, 95, 99, 104];
const RANK = [
  { n: '검색', v: 5200 },
  { n: '광고', v: 4100 },
  { n: '추천', v: 3180 },
];

const FY = 20; // 필터 칩
const FH = 38;
const KY = 72; // 핵심 지표
const KH = 76;
const TY = 162; // 추이
const TH = 112;
const RY = 288; // 순위
const RH = 104;
const SB = RY + RH + 12; // 화면 아랫변

export default function Dashboard() {
  const tmin = Math.min(...TREND);
  const tmax = Math.max(...TREND);
  const lx0 = IX + 12;
  const lx1 = IX + IW - 12;
  const ly0 = TY + 46;
  const ly1 = TY + TH - 14;
  const pts = TREND.map((v, i) => `${(lx0 + (i / (TREND.length - 1)) * (lx1 - lx0)).toFixed(1)},${(ly1 - ((v - tmin) / (tmax - tmin)) * (ly1 - ly0)).toFixed(1)}`).join(' ');
  const rmax = Math.max(...RANK.map((r) => r.v));
  const notes = [
    { cy: FY + FH / 2, a: '필터', b: '기본값이 보이게' },
    { cy: KY + KH / 2, a: '핵심 지표', b: '맨 위, 2~3개' },
    { cy: TY + TH / 2, a: '추이', b: '한 질문에 하나' },
    { cy: RY + RH / 2, a: '순위', b: '값 순 정렬' },
  ];
  const vbH = Math.ceil(SB + 1 + 8);
  return (
    <svg viewBox={`0 0 360 ${vbH}`} role="img" aria-label="모바일 한 화면 대시보드. 위에서부터 기본값이 보이는 필터, 핵심 지표, 추이 차트 하나, 값 순으로 정렬한 순위.">
      <rect className="svg-box" x={SX} y="8" width={SW} height={SB - 8} rx="16" />
      <rect className="svg-box-key" x={IX} y={FY} width="82" height={FH} rx="19" />
      <text className="t-sub" x={IX + 12} y={FY + 22}>최근 28일</text>
      <rect className="svg-box" x={IX + 90} y={FY} width="52" height={FH} rx="19" />
      <text className="t-sub" x={IX + 102} y={FY + 22}>전체</text>
      <rect className="svg-berg" x={IX} y={KY} width={IW} height={KH} rx="8" />
      <text className="t-sub" x={IX + 14} y={KY + 26}>주문 수, 최근 28일</text>
      <text className="t-strong" style={{ fontSize: 20 }} x={IX + 14} y={KY + 58}>12,480 <tspan fill="var(--good)">▲6%</tspan></text>
      <rect className="svg-box" x={IX} y={TY} width={IW} height={TH} rx="8" />
      <text className="t-sub" x={IX + 14} y={TY + 26}>일별 주문 수</text>
      <polyline points={pts} fill="none" stroke="var(--warm)" strokeWidth="2.5" strokeLinejoin="round" />
      <rect className="svg-box" x={IX} y={RY} width={IW} height={RH} rx="8" />
      {RANK.map((r, i) => (
        <g key={r.n}>
          <text className="t-sub" x={IX + 14} y={RY + 26 + i * 30}>{r.n}</text>
          <rect x={IX + 52} y={RY + 16 + i * 30} width={(r.v / rmax) * 78} height="10" fill={i === 0 ? 'var(--warm)' : 'var(--muted)'} />
          <text className="t-sub" x={IX + 52 + (r.v / rmax) * 78 + 8} y={RY + 26 + i * 30}>{r.v.toLocaleString('en-US')}</text>
        </g>
      ))}
      {notes.map((n) => (
        <g key={n.a}>
          <text className="t-strong" x="240" y={n.cy - 4}>{n.a}</text>
          <text className="t-sub" x="240" y={n.cy + 16}>{n.b}</text>
        </g>
      ))}
    </svg>
  );
}
