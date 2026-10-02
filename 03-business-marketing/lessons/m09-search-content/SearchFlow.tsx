type Stage = { q: string; sub: string; out: string; kind: string };

const STAGES: Stage[] = [
  { q: '검색 의도', sub: '쿼리·상위 결과 확인', out: '의도 목록', kind: '표' },
  { q: '콘텐츠 기획', sub: '의도당 페이지 하나', out: '기획표', kind: '문서 1장' },
  { q: '페이지 구조', sub: '제목·링크·이미지', out: '점검표', kind: '발행 전 확인' },
  { q: '기술 점검', sub: '색인·속도·모바일', out: '점검 결과', kind: '상태 확인' },
  { q: '측정', sub: '노출·클릭·평균 순위', out: '측정표', kind: '기간 비교' },
];

// 여백 기준: 상자 안 14px, 두 줄 상자 높이 66, 상자 사이 34px.
const LW = 188;
const RW = 120;
const RX = 360 - 8 - RW;
const H = 66;
const GAP = 34;
const y = (i: number) => 8 + i * (H + GAP);
// 마지막 상자 아랫변 + 선 두께 절반 + 아래 여백 8
const VB_H = y(STAGES.length - 1) + H + 1 + 8;

export default function SearchFlow() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="검색 유입을 만드는 5단계. 검색 의도는 의도 목록, 콘텐츠 기획은 기획표, 페이지 구조는 점검표, 기술 점검은 점검 결과, 측정은 측정표를 남긴다.">
      <defs>
        <marker id="ar-m09s" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      {STAGES.map((s, i) => (
        <g key={s.q}>
          <rect className={i === 0 ? 'svg-box-key' : 'svg-box'} x="8" y={y(i)} width={LW} height={H} rx="8" />
          <text className="t-strong" x="22" y={y(i) + 29}>{s.q}</text>
          <text className="t-sub" x="22" y={y(i) + 50}>{s.sub}</text>
          <line className="svg-flow" x1={8 + LW + 6} y1={y(i) + H / 2} x2={RX - 6} y2={y(i) + H / 2} markerEnd="url(#ar-m09s)" />
          <rect className="svg-berg" x={RX} y={y(i)} width={RW} height={H} rx="8" />
          <text className="t-strong" x={RX + 14} y={y(i) + 29}>{s.out}</text>
          <text className="t-sub" x={RX + 14} y={y(i) + 50}>{s.kind}</text>
          {i < STAGES.length - 1 && (
            <line className="svg-flow" x1={8 + LW / 2} y1={y(i) + H + 5} x2={8 + LW / 2} y2={y(i) + H + GAP - 5} markerEnd="url(#ar-m09s)" />
          )}
        </g>
      ))}
    </svg>
  );
}
