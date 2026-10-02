const STEPS: { n: number; t: string; q: string }[] = [
  { n: 1, t: '출처·기간·단위', q: '설명서와 맞나' },
  { n: 2, t: '행 수와 기간', q: '빠진 날은 없나' },
  { n: 3, t: '빠짐', q: '비어 있나' },
  { n: 4, t: '중복', q: '겹쳐 있나' },
  { n: 5, t: '값 범위', q: '말이 되나' },
  { n: 6, t: '정의 일치', q: '같은 뜻인가' },
];
const OUT = [
  { t: '점검표', s: '차원별 결과' },
  { t: '이슈 로그', s: '발견한 문제' },
  { t: '결정 기록', s: '처리와 이유' },
];

// 여백 기준: 상자 안 글자는 가장자리에서 12px 이상, 두 줄 상자 높이 66, 화살표 구간 32px.
const H = 66;
const GAP = 32;
const Y1 = 8; // 받은 것
const Y2 = Y1 + H + GAP; // 점검 6단계
const BOX2_H = 30 + 28 + (STEPS.length - 1) * 24 + 16; // 제목 baseline 30, 첫 줄 58, 줄 간격 24, 아래 16
const Y3 = Y2 + BOX2_H + GAP; // 결과물 3개
const Y4 = Y3 + H + GAP; // 결정
const VH = Y4 + H + 1 + 8; // 마지막 아랫변 + 선 두께 절반 + 여백

export default function QualityFlow() {
  const bw = 109;
  const arrow = (y: number, label: string) => (
    <g>
      <line className="svg-flow" x1="180" y1={y + 4} x2="180" y2={y + GAP - 4} markerEnd="url(#qf-ar)" />
      <text className="t-sub" x="192" y={y + GAP / 2 + 4}>{label}</text>
    </g>
  );
  return (
    <svg viewBox={`0 0 360 ${VH}`} role="img" aria-label="받은 원본 데이터와 정의서, 원천 합계를 6단계로 점검한다. 출처·기간·단위, 행 수와 기간, 빠짐, 중복, 값 범위, 정의 일치 순서다. 점검표, 이슈 로그, 결정 기록이 남고, 이를 근거로 쓴다, 조건부로 쓴다, 보류한다 중 하나를 정한다.">
      <defs>
        <marker id="qf-ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>

      <rect className="svg-box" x="8" y={Y1} width="344" height={H} rx="8" />
      <text className="t-strong" x="22" y={Y1 + 29}>받은 것</text>
      <text className="t-sub" x="22" y={Y1 + 50}>원본 데이터 · 정의서 · 원천 시스템 합계</text>
      {arrow(Y1 + H, '점검한다')}

      <rect className="svg-box-key" x="8" y={Y2} width="344" height={BOX2_H} rx="8" />
      <text className="t-strong" x="22" y={Y2 + 30}>점검 6단계</text>
      {STEPS.map((s, i) => {
        const y = Y2 + 58 + i * 24;
        return (
          <g key={s.n}>
            <text className="t-accent" x="22" y={y}>{s.n}</text>
            <text x="42" y={y} fontSize="13.5">{s.t}</text>
            <text className="t-sub" x="338" y={y} textAnchor="end">{s.q}</text>
          </g>
        );
      })}
      {arrow(Y2 + BOX2_H, '남긴다')}

      {OUT.map((o, i) => (
        <g key={o.t}>
          <rect className="svg-berg" x={8 + i * (bw + 8)} y={Y3} width={bw} height={H} rx="8" />
          <text className="t-strong" x={8 + i * (bw + 8) + bw / 2} y={Y3 + 29} textAnchor="middle">{o.t}</text>
          <text className="t-sub" x={8 + i * (bw + 8) + bw / 2} y={Y3 + 50} textAnchor="middle">{o.s}</text>
        </g>
      ))}
      {arrow(Y3 + H, '판단한다')}

      <rect className="svg-box-key" x="8" y={Y4} width="344" height={H} rx="8" />
      <text className="t-strong" x="22" y={Y4 + 29}>결정</text>
      <text className="t-sub" x="22" y={Y4 + 50}>쓴다 · 조건부로 쓴다 · 보류한다</text>
    </svg>
  );
}
