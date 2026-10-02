/** 구글의 트래픽 하락 진단 안내를 네 가지 모양으로 줄였다. 순위 예(2위에서 4위, 10위권에서 29위)는 공식 문서의 예다. */
type Row = { q: string; sub: string; a: string; asub: string };

const ROWS: Row[] = [
  { q: '노출과 클릭 감소', sub: '사이트 전체인가', a: '원인 후보 점검', asub: '기술·보안·스팸 등' },
  { q: '노출 유지, 클릭 감소', sub: '제목·스니펫 약함', a: '제목·설명 점검', asub: '경쟁 결과 비교' },
  { q: '순위 소폭 하락', sub: '2위에서 4위 같은 변화', a: '급히 바꾸지 않음', asub: '관찰 뒤 판단' },
  { q: '순위 큰 폭 하락', sub: '10위권에서 29위 등', a: '콘텐츠 점검', asub: '자체 평가 질문' },
];

// 여백 기준: 상자 안 14px, 두 줄 상자 높이 66, 상자 사이 24px.
const LW = 164;
const RW = 148;
const RX = 360 - 8 - RW;
const H = 66;
const GAP = 24;
const y = (i: number) => 8 + i * (H + GAP);
const VB_H = y(ROWS.length - 1) + H + 1 + 8;

export default function TrafficReading() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="트래픽 변화 네 모양과 다음 확인. 노출과 클릭이 함께 줄면 원인 후보를 점검하고, 노출은 유지되는데 클릭만 줄면 제목과 설명을 점검한다. 순위가 조금 떨어지면 급히 바꾸지 않고, 크게 떨어지면 콘텐츠를 점검한다.">
      <defs>
        <marker id="ar-m09t" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      {ROWS.map((r, i) => (
        <g key={r.q}>
          <rect className="svg-box" x="8" y={y(i)} width={LW} height={H} rx="8" />
          <text className="t-strong" x="22" y={y(i) + 29}>{r.q}</text>
          <text className="t-sub" x="22" y={y(i) + 50}>{r.sub}</text>
          <line className="svg-flow" x1={8 + LW + 6} y1={y(i) + H / 2} x2={RX - 6} y2={y(i) + H / 2} markerEnd="url(#ar-m09t)" />
          <rect className="svg-berg" x={RX} y={y(i)} width={RW} height={H} rx="8" />
          <text className="t-strong" x={RX + 14} y={y(i) + 29}>{r.a}</text>
          <text className="t-sub" x={RX + 14} y={y(i) + 50}>{r.asub}</text>
        </g>
      ))}
    </svg>
  );
}
