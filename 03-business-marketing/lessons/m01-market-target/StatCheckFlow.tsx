// 통계 하나를 식에 넣기 전의 점검 순서. 숫자 없음.
const STEPS = [
  { name: '1 분류 기준', sub: '어느 표준분류의 몇 차 기준인가' },
  { name: '2 기준 시점', sub: '조사 기준일과 갱신 주기' },
  { name: '3 범위와 단위', sub: '전수·표본, 용어 정의, 단위' },
  { name: '4 출처 기록', sub: '통계표명, 참조일자, URL 등 6항목' },
  { name: '못 채운 칸', sub: '확인 필요로 표시하고 가정으로 취급' },
];

const H = 66;
const GAP = 30;
const y = (i: number) => 8 + i * (H + GAP);
// 마지막 상자 아랫변 + 선 두께 절반 + 아래 여백 8
const VB_H = Math.ceil(y(STEPS.length - 1) + H + 0.75 + 8);

export default function StatCheckFlow() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="통계를 식에 넣기 전 점검 순서. 분류 기준, 기준 시점, 범위와 단위를 확인하고 출처를 기록한다. 못 채운 칸은 확인 필요로 표시하고 가정으로 취급한다.">
      <defs>
        <marker id="sc-ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      {STEPS.map((s, i) => (
        <g key={s.name}>
          <rect className={i === STEPS.length - 1 ? 'svg-tip' : 'svg-box'} x="8" y={y(i)} width="344" height={H} rx="8" />
          <text className="t-strong" x="22" y={y(i) + 29}>{s.name}</text>
          <text className="t-sub" x="22" y={y(i) + 50}>{s.sub}</text>
          {i < STEPS.length - 1 && (
            <line className="svg-flow" x1="180" y1={y(i) + H + 5} x2="180" y2={y(i + 1) - 5} markerEnd="url(#sc-ar)" />
          )}
        </g>
      ))}
    </svg>
  );
}
