type Step = { t: string; need: string; out: string };

const STEPS: Step[] = [
  { t: '1. 질문과 개입 정하기', need: '필요: 바꿀 수 있는 것, 결과 지표', out: '결과물: 비교 한 문장' },
  { t: '2. 구조 그리기', need: '필요: 변수 목록, 수집 경위', out: '결과물: 인과 구조도' },
  { t: '3. 방법 고르기', need: '필요: 누가 처리를 받았나, 시점', out: '결과물: 방법과 가정 목록' },
  { t: '4. 추정하고 가정 점검', need: '필요: 처리 전후 기록, 대조', out: '결과물: 추정치, 구간, 점검표' },
  { t: '5. 문장 수위와 결정', need: '필요: 되돌림 비용, 근거 강도', out: '결과물: 수위에 맞춘 문장' },
];

// 여백 기준: 상자 안 12px 이상, 세 줄 상자 높이 86, 같은 묶음 줄 간격 20, 단계 사이 28.
const H = 86;
const GAP = 28;
const TOP = 8;

export default function CausalFlow() {
  const y = (i: number) => TOP + i * (H + GAP);
  const bottom = y(STEPS.length - 1) + H; // 마지막 상자 아랫변
  return (
    <svg viewBox={`0 0 360 ${bottom + 8}`} role="img" aria-label="인과 질문의 흐름. 질문과 개입 정하기, 구조 그리기, 방법 고르기, 추정하고 가정 점검, 문장 수위와 결정 순서이고 단계마다 필요한 것과 나오는 결과물이 적혀 있다.">
      <defs>
        <marker id="cf-ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      {STEPS.map((s, i) => (
        <g key={s.t}>
          <rect className={i === STEPS.length - 1 ? 'svg-box-key' : 'svg-box'} x="8" y={y(i)} width="344" height={H} rx="8" />
          <text className="t-strong" x="22" y={y(i) + 28}>{s.t}</text>
          <text className="t-sub" x="22" y={y(i) + 50}>{s.need}</text>
          <text className="t-accent" x="22" y={y(i) + 70}>{s.out}</text>
          {i < STEPS.length - 1 && (
            <line className="svg-flow" x1="180" y1={y(i) + H + 4} x2="180" y2={y(i) + H + GAP - 4} markerEnd="url(#cf-ar)" />
          )}
        </g>
      ))}
    </svg>
  );
}
