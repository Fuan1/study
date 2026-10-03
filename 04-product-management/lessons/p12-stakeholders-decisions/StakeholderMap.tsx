// 형태 예시(가상 값): 영향력 x 관심 격자에서 칸마다 대응 방식을 정하는 모양. 칸 이름은 위키백과 격자 그림의 라벨(Keep satisfied 등)을 옮긴 것이다.
type Cell = { title: string; action: string; eg: string; key?: boolean };

const CELLS: Cell[][] = [
  [
    { title: '만족 유지', action: '중요한 때 먼저 묻기', eg: '예: 재무, 법무' },
    { title: '밀착 관리', action: '처음부터 같이 정하기', eg: '예: 개발 리드', key: true },
  ],
  [
    { title: '관찰', action: '변화만 지켜보기', eg: '예: 다른 부서' },
    { title: '정보 공유', action: '수시로 알려 주기', eg: '예: 고객지원' },
  ],
];

const GX = 44;
const GAPC = 8;
const CW = 150;
const CH = 92;
const TOP = 8;
const bottom = TOP + CH * 2 + GAPC;
const AXIS_Y = bottom + 24; // 상자 아랫변에서 글자 윗선까지 12px 이상
// 마지막 글자 baseline + 내려쓰기 4 + 아래 여백 8
const VB_H = AXIS_Y + 4 + 8;

export default function StakeholderMap() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="영향력과 관심 두 축의 격자. 영향력이 높고 관심이 높으면 밀착 관리, 영향력만 높으면 만족 유지, 관심만 높으면 정보 공유, 둘 다 낮으면 관찰.">
      {CELLS.map((row, r) =>
        row.map((c, k) => {
          const x = GX + k * (CW + GAPC);
          const y = TOP + r * (CH + GAPC);
          return (
            <g key={c.title}>
              <rect className={c.key ? 'svg-box-key' : 'svg-box'} x={x} y={y} width={CW} height={CH} rx="8" />
              <text className="t-strong" x={x + 14} y={y + 30}>{c.title}</text>
              <text className="t-sub" x={x + 14} y={y + 52}>{c.action}</text>
              <text className="t-sub" x={x + 14} y={y + 74}>{c.eg}</text>
            </g>
          );
        }),
      )}
      <text className="t-sub" transform={`translate(20 ${TOP + CH + GAPC / 2}) rotate(-90)`} textAnchor="middle">영향력 낮음 → 높음</text>
      <text className="t-sub" x={GX + CW + GAPC / 2} y={AXIS_Y} textAnchor="middle">관심 낮음 → 높음</text>
    </svg>
  );
}
