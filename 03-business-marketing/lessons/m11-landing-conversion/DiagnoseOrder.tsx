/** 전환 진단 순서: 앞 단계가 막혀 있으면 뒤 단계를 고치지 않는다. */
const STEPS = [
  { title: '1. 트래픽 질', sub: '소스·키워드·소재별 전환율' },
  { title: '2. 메시지 일치', sub: '광고 문구 대 헤드라인 대조' },
  { title: '3. 첫 화면 이해', sub: 'CTA 클릭률, 스크롤 도달' },
  { title: '4. 폼 마찰', sub: '폼 시작 대비 제출, 필드 이탈' },
  { title: '5. 속도·오류', sub: 'LCP·INP·CLS, 제출 실패' },
  { title: '6. 신뢰', sub: '입력 직전 이탈, 문의 내용' },
];

// 여백 기준: 두 줄 상자 높이 66, 상자 사이 30, 화살표 라벨은 선에서 14px.
const X = 8;
const W = 344;
const H = 66;
const GAP = 30;
const TOP = 8;
const STROKE = 1.5;
const y = (i: number) => TOP + i * (H + GAP);
const VB_H = Math.ceil(y(STEPS.length - 1) + H + STROKE / 2 + 8);

export default function DiagnoseOrder() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="전환이 낮을 때 보는 순서. 트래픽 질, 메시지 일치, 첫 화면 이해, 폼 마찰, 속도와 오류, 신뢰 순으로 데이터를 보고 이상이 없으면 다음으로 넘어간다.">
      <defs>
        <marker id="dg-ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      {STEPS.map((s, i) => (
        <g key={s.title}>
          <rect className={i === 0 ? 'svg-box-key' : 'svg-box'} x={X} y={y(i)} width={W} height={H} rx="8" />
          <text className="t-strong" x={X + 14} y={y(i) + 28}>{s.title}</text>
          <text className="t-sub" x={X + 14} y={y(i) + 50}>{s.sub}</text>
          {i < STEPS.length - 1 && (
            <g>
              <line className="svg-flow" x1={X + W / 2} y1={y(i) + H + 6} x2={X + W / 2} y2={y(i) + H + GAP - 6} markerEnd="url(#dg-ar)" />
              <text className="t-sub" x={X + W / 2 + 14} y={y(i) + H + GAP / 2 + 5}>이상 없으면 다음</text>
            </g>
          )}
        </g>
      ))}
    </svg>
  );
}
