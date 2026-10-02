type Step = { title: string; sub: string };

const STEPS: Step[] = [
  { title: '입력', sub: '과거 이력, 계절, 이벤트, 외부 가정' },
  { title: '기준선', sub: '직전 값, 계절 순진, 평균' },
  { title: '검증', sub: '과거를 가려 놓고 시간 순서로 맞혀 본다' },
];

const OUTPUTS = ['정확도 비교표', '예측 구간 차트', '가정 목록', '시나리오 표'];

// 여백 기준: 두 줄 상자 높이 66, 글자는 가장자리에서 14px, 단계 사이 화살표 30px.
const W = 344;
const H = 66;
const GAP = 30;
const OW = 167; // 결과물 상자 폭
const OH = 44; // 한 줄 상자 높이
const OGAP = 10;

export default function ForecastFlow() {
  const y = (i: number) => 8 + i * (H + GAP);
  const yOut = y(STEPS.length);
  const bottom = yOut + 2 * OH + OGAP; // 마지막 상자 아랫변
  return (
    <svg viewBox={`0 0 360 ${bottom + 8}`} role="img" aria-label="예측 흐름. 입력을 모으고, 기준선을 먼저 만들고, 과거를 가려 놓고 검증한 뒤, 정확도 비교표, 예측 구간 차트, 가정 목록, 시나리오 표를 낸다.">
      <defs>
        <marker id="fcFlowAr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      {STEPS.map((s, i) => (
        <g key={s.title}>
          <rect className="svg-box" x="8" y={y(i)} width={W} height={H} rx="8" />
          <text className="t-strong" x="22" y={y(i) + 29}>{s.title}</text>
          <text className="t-sub" x="22" y={y(i) + 50}>{s.sub}</text>
          <line className="svg-flow" x1="180" y1={y(i) + H + 6} x2="180" y2={y(i) + H + GAP - 6} markerEnd="url(#fcFlowAr)" />
        </g>
      ))}
      {OUTPUTS.map((t, i) => {
        const x = 8 + (i % 2) * (OW + 10);
        const yy = yOut + Math.floor(i / 2) * (OH + OGAP);
        return (
          <g key={t}>
            <rect className="svg-berg" x={x} y={yy} width={OW} height={OH} rx="8" />
            <text className="t-strong" x={x + OW / 2} y={yy + 27} textAnchor="middle">{t}</text>
          </g>
        );
      })}
    </svg>
  );
}
