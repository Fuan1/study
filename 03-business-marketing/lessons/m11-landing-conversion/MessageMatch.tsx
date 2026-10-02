/** 메시지 일치: 광고 문구가 한 약속을 페이지 헤드라인이 이어 가는가. 가정한 문구다. */
type Pair = { tag: string; tagClass: string; boxClass: string; ad: string; page: string; pageSub: string };

const PAIRS: Pair[] = [
  { tag: '나쁜 예: 약속이 끊긴다', tagClass: 't-bad', boxClass: 'svg-box-bad', ad: '이사 청소 견적, 바로 확인', page: '믿을 수 있는 청소 파트너', pageSub: '랜딩 헤드라인: 견적도 행동도 없다' },
  { tag: '고친 예: 같은 약속을 잇는다', tagClass: 't-good', boxClass: 'svg-box-good', ad: '이사 청소 견적, 바로 확인', page: '이사 청소 견적, 바로 확인', pageSub: '랜딩 헤드라인: 같은 약속' },
];

// 여백 기준: 두 줄 상자 높이 66, 상자 사이 화살표 30, 두 묶음 사이 36, 라벨은 상자와 12px.
const X = 8;
const W = 344;
const H = 66;
const GAP = 30;
const LABEL = 12;
const GROUP_GAP = 36;
const STROKE = 2;
const TOP = 8;
const groupH = 14 + LABEL + H + GAP + H; // 라벨 baseline 높이 14
const gy = (i: number) => TOP + i * (groupH + GROUP_GAP);
const VB_H = Math.ceil(gy(PAIRS.length - 1) + groupH + STROKE / 2 + 8);

export default function MessageMatch() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="광고 문구와 랜딩 헤드라인 비교. 나쁜 예는 광고가 이사 청소 견적을 바로 확인한다고 했는데 헤드라인이 믿을 수 있는 청소 파트너라 약속이 끊긴다. 고친 예는 헤드라인이 같은 약속을 잇는다.">
      <defs>
        <marker id="mm-ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      {PAIRS.map((p, i) => {
        const y0 = gy(i);
        const b1 = y0 + 14 + LABEL;
        const b2 = b1 + H + GAP;
        return (
          <g key={p.tag}>
            <text className={p.tagClass} x={X} y={y0 + 14}>{p.tag}</text>
            <rect className="svg-box" x={X} y={b1} width={W} height={H} rx="8" />
            <text className="t-sub" x={X + 14} y={b1 + 26}>검색 광고 문구</text>
            <text className="t-strong" x={X + 14} y={b1 + 48}>{p.ad}</text>
            <line className="svg-flow" x1={X + W / 2} y1={b1 + H + 6} x2={X + W / 2} y2={b2 - 6} markerEnd="url(#mm-ar)" />
            <text className="t-sub" x={X + W / 2 + 14} y={b1 + H + GAP / 2 + 5}>클릭</text>
            <rect className={p.boxClass} x={X} y={b2} width={W} height={H} rx="8" />
            <text className="t-sub" x={X + 14} y={b2 + 26}>{p.pageSub}</text>
            <text className="t-strong" x={X + 14} y={b2 + 48}>{p.page}</text>
          </g>
        );
      })}
    </svg>
  );
}
