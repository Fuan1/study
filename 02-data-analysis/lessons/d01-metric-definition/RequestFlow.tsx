/** 요청을 질문, 결정, 지표, 데이터 순서로 바꾸는 절차. 예시 문장은 가정이다. */
type Step = { title: string; sub: string; cls: string };

const STEPS: Step[] = [
  { title: '요청: 전환율 좀 뽑아 주세요', sub: '여기서 바로 쿼리를 짜지 않는다', cls: 'svg-box-bad' },
  { title: '1 질문: 결제 이탈이 늘었나', sub: '예·아니오나 숫자로 답이 나온다', cls: 'svg-box' },
  { title: '2 결정: 늘었으면 결제 화면 수정', sub: '아니면 보류. 결과마다 할 일이 다르다', cls: 'svg-box' },
  { title: '3 지표: 결제 전환율, 취소율', sub: '정의서로 고정한다', cls: 'svg-box' },
  { title: '4 데이터: visits, orders', sub: '지표를 만들 수 있는 테이블만 고른다', cls: 'svg-box-key' },
];

// 여백 기준: 상자 높이 68(두 줄), 글자는 위 29 / 아래 50 baseline, 상자 사이 28(화살표).
const X = 8;
const W = 344;
const H = 68;
const GAP = 28;
const y = (i: number) => 8 + i * (H + GAP);
const LAST_BOTTOM = y(STEPS.length - 1) + H; // 아랫변
const VB_H = LAST_BOTTOM + 1 + 8; // 선 두께 절반 + 아래 여백

export default function RequestFlow() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="분석 요청을 받으면 질문, 결정, 지표, 데이터 순서로 바꾼다. 요청을 바로 쿼리로 옮기지 않는다.">
      <defs>
        <marker id="arD1" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      {STEPS.map((s, i) => (
        <g key={s.title}>
          <rect className={s.cls} x={X} y={y(i)} width={W} height={H} rx="8" />
          <text className="t-strong" x={X + 14} y={y(i) + 29}>{s.title}</text>
          <text className="t-sub" x={X + 14} y={y(i) + 50}>{s.sub}</text>
          {i < STEPS.length - 1 && (
            <line className="svg-flow" x1={X + W / 2} y1={y(i) + H + 5} x2={X + W / 2} y2={y(i + 1) - 5} markerEnd="url(#arD1)" />
          )}
        </g>
      ))}
    </svg>
  );
}
