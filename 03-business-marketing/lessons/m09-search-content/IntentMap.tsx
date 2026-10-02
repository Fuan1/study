/** 검색 의도 4분류와 맞는 페이지 유형을 잇는다. 가상 의자 쇼핑몰 예. */
type Row = { intent: string; q: string; page: string; note: string };

const ROWS: Row[] = [
  { intent: '정보', q: '허리 아플 때', page: '가이드 글', note: '답과 다음 길 제시' },
  { intent: '탐색', q: '의자 추천', page: '비교·목록 페이지', note: '후보와 기준 제시' },
  { intent: '거래', q: 'A200 후기', page: '상품·가입 페이지', note: '가격, 구매 버튼' },
  { intent: '브랜드 찾기', q: '브랜드명 검색', page: '홈·브랜드 페이지', note: '찾는 곳이 바로 보임' },
];

// 여백: 상자 안 14px, 두 줄 상자 높이 66, 행 사이 24px.
const LX = 8;
const LW = 136;
const RW = 168;
const RX = 360 - 8 - RW;
const H = 66;
const GAP = 24;
const TOP = 8;
const STROKE = 1.5;
const rowY = (i: number) => TOP + i * (H + GAP);
const VB_H = Math.ceil(rowY(ROWS.length - 1) + H + STROKE / 2 + 8);

export default function IntentMap() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="검색 의도와 맞는 페이지 유형. 정보 의도는 가이드 글, 탐색 의도는 비교·목록 페이지, 거래 의도는 상품·가입 페이지, 브랜드 찾기 의도는 홈·브랜드 페이지로 받는다.">
      <defs>
        <marker id="ar-m09a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      {ROWS.map((r, i) => (
        <g key={r.intent}>
          <rect className="svg-box" x={LX} y={rowY(i)} width={LW} height={H} rx="8" />
          <text className="t-strong" x={LX + 14} y={rowY(i) + 28}>{r.intent}</text>
          <text className="t-sub" x={LX + 14} y={rowY(i) + 50}>{r.q}</text>
          <line className="svg-flow" x1={LX + LW + 6} y1={rowY(i) + H / 2} x2={RX - 6} y2={rowY(i) + H / 2} markerEnd="url(#ar-m09a)" />
          <rect className="svg-berg" x={RX} y={rowY(i)} width={RW} height={H} rx="8" />
          <text className="t-strong" x={RX + 14} y={rowY(i) + 28}>{r.page}</text>
          <text className="t-sub" x={RX + 14} y={rowY(i) + 50}>{r.note}</text>
        </g>
      ))}
    </svg>
  );
}
