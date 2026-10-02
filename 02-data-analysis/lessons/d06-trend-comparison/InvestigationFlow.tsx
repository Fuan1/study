type Step = { q: string; sub: string; out: string; outSub: string };

const STEPS: Step[] = [
  { q: '1. 진짜 변화인가', sub: '정의·집계·달력부터 확인', out: '진위 판정', outSub: '확정 또는 기각' },
  { q: '2. 어디서 변했나', sub: '채널·기기·신규 대 기존', out: '변화 분해 표', outSub: '구간별 기여' },
  { q: '3. 무엇 때문인가', sub: '배포·캠페인·구성 변화', out: '원인 후보 목록', outSub: '확인 방법 포함' },
];

const LW = 180; // 질문 상자 폭
const RW = 124; // 결과 상자 폭
const RX = 360 - 8 - RW;
const H = 68;
const GAP = 48;
const TOP = 36; // 열 제목 아래

export default function InvestigationFlow() {
  const y = (i: number) => TOP + i * (H + GAP);
  const total = y(STEPS.length - 1) + H + 12;
  return (
    <svg viewBox={`0 0 360 ${total}`} role="img" aria-label="지표가 변했다는 보고를 받았을 때의 조사 순서. 진짜 변화인지 확인해 진위 판정을 내고, 어디서 변했는지 나눠 변화 분해 표를 만들고, 무엇 때문인지 원인 후보 목록을 만든다.">
      <defs>
        <marker id="d06ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      <text className="t-sub" x="8" y="18">질문과 볼 데이터</text>
      <text className="t-sub" x={RX} y="18">나오는 결과물</text>
      {STEPS.map((s, i) => (
        <g key={s.q}>
          <rect className="svg-box" x="8" y={y(i)} width={LW} height={H} rx="8" />
          <text className="t-strong" x="22" y={y(i) + 29}>{s.q}</text>
          <text className="t-sub" x="22" y={y(i) + 50}>{s.sub}</text>
          <line className="svg-flow" x1={8 + LW + 6} y1={y(i) + H / 2} x2={RX - 6} y2={y(i) + H / 2} markerEnd="url(#d06ar)" />
          <rect className="svg-berg" x={RX} y={y(i)} width={RW} height={H} rx="8" />
          <text className="t-strong" x={RX + 14} y={y(i) + 29}>{s.out}</text>
          <text className="t-sub" x={RX + 14} y={y(i) + 50}>{s.outSub}</text>
          {i < STEPS.length - 1 && (
            <g>
              <line className="svg-flow" x1={8 + LW / 2} y1={y(i) + H + 6} x2={8 + LW / 2} y2={y(i) + H + GAP - 6} markerEnd="url(#d06ar)" />
              <text className="t-sub" x={8 + LW / 2 + 14} y={y(i) + H + GAP / 2 + 5}>{i === 0 ? '진짜일 때만' : '큰 구간부터'}</text>
            </g>
          )}
        </g>
      ))}
    </svg>
  );
}
