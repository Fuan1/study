/** 질문에서 결정까지 이어지는 다섯 단계. 예시 질문은 가정이며 숫자는 없다. */
const STEPS = [
  { name: '질문', do: '결정에서 질문을 뽑는다', ex: '예: 첫 주에 얼마나 떠나나' },
  { name: '데이터', do: '한 행의 단위를 정해 모은다', ex: '예: 가입 기록, 접속 이벤트' },
  { name: '분석', do: '질문의 모양으로 바꾼다', ex: '예: 가입 주차별로 묶는다' },
  { name: '결과물', do: '읽을 수 있는 표·차트', ex: '예: 주차별 유지 표' },
  { name: '결정', do: '기준과 비교해 행동을 정한다', ex: '예: 온보딩을 고칠지 정한다' },
];

// 여백 기준: 두 줄 상자 높이 66, 글자는 가장자리에서 12px 이상, 단계 사이 28px.
const H = 66;
const GAP = 28;
const TOP = 8;
const DIV = 88; // 이름 칸과 설명 칸 사이 구분선 x

export default function QuestionToDecision() {
  const y = (i: number) => TOP + i * (H + GAP);
  const last = STEPS.length - 1;
  const bottom = y(last) + H;
  return (
    <svg viewBox={`0 0 360 ${bottom + 9}`} role="img" aria-label="질문, 데이터, 분석, 결과물, 결정 순서로 이어지는 다섯 단계. 각 단계의 할 일과 가정한 예시를 보인다.">
      <defs>
        <marker id="ds-ar1" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      {STEPS.map((s, i) => (
        <g key={s.name}>
          <rect className={i === last ? 'svg-box-key' : 'svg-box'} x="8" y={y(i)} width="344" height={H} rx="8" />
          <text className="t-strong" x="22" y={y(i) + 39}>{s.name}</text>
          <line x1={DIV} y1={y(i) + 12} x2={DIV} y2={y(i) + H - 12} stroke="var(--line)" />
          <text x={DIV + 14} y={y(i) + 29} fontSize="13">{s.do}</text>
          <text className="t-sub" x={DIV + 14} y={y(i) + 50}>{s.ex}</text>
          {i < last && <line className="svg-flow" x1="180" y1={y(i) + H + 4} x2="180" y2={y(i) + H + GAP - 4} markerEnd="url(#ds-ar1)" />}
        </g>
      ))}
    </svg>
  );
}
