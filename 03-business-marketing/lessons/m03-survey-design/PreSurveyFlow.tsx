/** 설문을 만들기 전 세 질문. 하나라도 아니오이면 문항 설계로 넘어가지 않는다. 판단 흐름이며 수치는 없다. */
type Step = { q: string; sub: string; no: string; fix: string };

const STEPS: Step[] = [
  { q: '기록으로 못 푸나?', sub: '행동은 로그가 먼저', no: '기록 조회', fix: '설문 안 함' },
  { q: '답이 결정을 바꾸나?', sub: '어느 답이든 같으면 삭제', no: '문항 삭제', fix: '묻지 않음' },
  { q: '대상에게 닿나?', sub: '대상 집단과 모집 경로', no: '방법 변경', fix: '대상 재정의' },
];

// 여백 기준: 상자 안 14px, 라벨은 선과 8px 이상, 단계 사이 48px.
const LW = 186;
const RW = 100;
const RX = 360 - 8 - RW;
const H = 68;
const GAP = 48;
const STROKE = 2;
const y = (i: number) => 8 + i * (H + GAP);
const LAST = STEPS.length;
const VB_H = Math.ceil(y(LAST) + H + STROKE / 2 + 8);

export default function PreSurveyFlow() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="설문 전 세 질문. 기록으로 풀 수 있으면 설문하지 않고 기록을 본다. 답이 결정을 바꾸지 않으면 문항을 삭제한다. 대상에게 닿을 수 없으면 방법을 바꾼다. 모두 통과하면 문항 설계로 넘어간다.">
      <defs>
        <marker id="m03ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      {STEPS.map((s, i) => (
        <g key={s.q}>
          <rect className="svg-box" x="8" y={y(i)} width={LW} height={H} rx="8" />
          <text className="t-strong" x="22" y={y(i) + 29}>{s.q}</text>
          <text className="t-sub" x="22" y={y(i) + 50}>{s.sub}</text>
          <line className="svg-flow" x1={8 + LW + 6} y1={y(i) + H / 2} x2={RX - 6} y2={y(i) + H / 2} markerEnd="url(#m03ar)" />
          <text className="t-bad" x={(8 + LW + RX) / 2} y={y(i) + H / 2 - 10} textAnchor="middle">아니오</text>
          <rect className="svg-box-bad" x={RX} y={y(i)} width={RW} height={H} rx="8" />
          <text className="t-strong" x={RX + 14} y={y(i) + 29}>{s.no}</text>
          <text className="t-sub" x={RX + 14} y={y(i) + 50}>{s.fix}</text>
          <line className="svg-flow" x1={8 + LW / 2} y1={y(i) + H + 6} x2={8 + LW / 2} y2={y(i) + H + GAP - 6} markerEnd="url(#m03ar)" />
          <text className="t-good" x={8 + LW / 2 + 14} y={y(i) + H + GAP / 2 + 5}>예</text>
        </g>
      ))}
      <rect className="svg-box-key" x="8" y={y(LAST)} width={LW} height={H} rx="8" />
      <text className="t-strong" x="22" y={y(LAST) + 29}>문항 설계</text>
      <text className="t-sub" x="22" y={y(LAST) + 50}>아래 규칙을 적용</text>
    </svg>
  );
}
