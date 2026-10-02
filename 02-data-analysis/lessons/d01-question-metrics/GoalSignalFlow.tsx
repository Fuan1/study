// 목표 -> 신호 -> 지표 -> 데이터 -> 결과물. 1~3 은 HEART 논문의 Gmail 사례, 4~5 는 이 글이 덧붙인 해석이다.
type Stage = { t: string; s: string; cls: string };

const STAGES: Stage[] = [
  { t: '1 목표 · 무엇을 이루나', s: '메일을 일상처럼 규칙적으로 확인한다', cls: 'svg-box' },
  { t: '2 신호 · 행동에 어떻게 나타나나', s: '한 주에 여러 날 들어와 본다', cls: 'svg-box' },
  { t: '3 지표 · 숫자로 어떻게 세나', s: '주 5일 이상 방문한 활성 사용자 비율', cls: 'svg-box-key' },
  { t: '4 필요한 데이터 · 무엇을 기록하나', s: '사용자별 방문 날짜 기록', cls: 'svg-berg' },
  { t: '5 분석과 결과물 · 무엇이 나오나', s: '주별 비율 추이 차트', cls: 'svg-berg' },
];

const H = 66;
const GAP = 36;
const y = (i: number) => 8 + i * (H + GAP);
const VB_H = y(STAGES.length - 1) + H + 12; // 마지막 아랫변 + 선 두께 절반 + 여백

export default function GoalSignalFlow() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="목표에서 숫자까지 내려가는 순서. 목표는 메일을 규칙적으로 확인하는 습관, 신호는 한 주에 여러 날 방문, 지표는 주 5일 이상 방문한 활성 사용자 비율, 필요한 데이터는 사용자별 방문 날짜 기록, 결과물은 주별 비율 추이 차트.">
      <defs>
        <marker id="d01-ar1" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      {STAGES.map((st, i) => (
        <g key={st.t}>
          <rect className={st.cls} x="8" y={y(i)} width="344" height={H} rx="8" />
          <text className="t-strong" x="22" y={y(i) + 29}>{st.t}</text>
          <text className="t-sub" x="22" y={y(i) + 51}>{st.s}</text>
          {i < STAGES.length - 1 && (
            <line className="svg-flow" x1="180" y1={y(i) + H + 6} x2="180" y2={y(i) + H + GAP - 6} markerEnd="url(#d01-ar1)" />
          )}
        </g>
      ))}
    </svg>
  );
}
