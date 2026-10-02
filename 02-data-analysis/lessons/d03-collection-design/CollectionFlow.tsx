type Step = { name: string; sub: string; out: string; outSub: string };

const STEPS: Step[] = [
  { name: '질문 정하기', sub: '결정에서 지표로', out: '지표 정의서', outSub: '무엇을 셀지' },
  { name: '계획서 쓰기', sub: '이벤트·속성·ID·시각', out: '이벤트 명세표', outSub: '무엇을 기록할지' },
  { name: '기록하기', sub: '개인정보는 최소로', out: '원자료', outSub: '이벤트 로그' },
  { name: '검증하기', sub: '테스트와 첫 데이터', out: '수집 점검표', outSub: '통과 기록' },
];

// 여백 기준: 상자 안 12px 이상(두 줄 상자 높이 66), 단계 사이 36px, 화살표 양끝은 상자에서 6px.
const H = 66;
const GAP = 36;
const LW = 176;
const RW = 132;
const RX = 360 - 8 - RW;
const TOP = 8;
const LAST_H = 48;

export default function CollectionFlow() {
  const y = (i: number) => TOP + i * (H + GAP);
  const endY = y(STEPS.length - 1) + H + GAP;
  const vbH = endY + LAST_H + 1 + 8; // 마지막 상자 아랫변 + 선 두께 절반 + 여백
  const cx = 8 + LW / 2;
  return (
    <svg viewBox={`0 0 360 ${vbH}`} role="img" aria-label="수집 설계의 흐름. 질문을 정하면 지표 정의서, 계획서를 쓰면 이벤트 명세표, 기록하면 원자료, 검증하면 수집 점검표가 나오고, 점검을 통과한 데이터를 분석에 넘긴다.">
      <defs>
        <marker id="ar-cf" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      {STEPS.map((s, i) => (
        <g key={s.name}>
          <rect className="svg-box" x="8" y={y(i)} width={LW} height={H} rx="8" />
          <text className="t-strong" x="22" y={y(i) + 29}>{s.name}</text>
          <text className="t-sub" x="22" y={y(i) + 50}>{s.sub}</text>
          <line className="svg-flow" x1={8 + LW + 6} y1={y(i) + H / 2} x2={RX - 6} y2={y(i) + H / 2} markerEnd="url(#ar-cf)" />
          <rect className="svg-berg" x={RX} y={y(i)} width={RW} height={H} rx="8" />
          <text className="t-strong" x={RX + 14} y={y(i) + 29}>{s.out}</text>
          <text className="t-sub" x={RX + 14} y={y(i) + 50}>{s.outSub}</text>
          <line className="svg-flow" x1={cx} y1={y(i) + H + 6} x2={cx} y2={y(i) + H + GAP - 6} markerEnd="url(#ar-cf)" />
        </g>
      ))}
      <rect className="svg-box-key" x="8" y={endY} width={LW} height={LAST_H} rx="8" />
      <text className="t-strong" x="22" y={endY + 29}>분석에 넘기기</text>
    </svg>
  );
}
