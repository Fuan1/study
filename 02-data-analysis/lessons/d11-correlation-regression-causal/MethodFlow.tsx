type Step = { q: string; yes: string };

const STEPS: Step[] = [
  { q: '무작위로 나눌 수 있나?', yes: '무작위 실험' },
  { q: '개입 전후 자료와 비교군이 있나?', yes: '차이의 차이(DiD)' },
  { q: '비교군 없이 개입 전 시계열이 긴가?', yes: '시계열 개입 분석' },
  { q: '교란 변수를 거의 다 쟀나?', yes: '회귀 조정, 매칭' },
  { q: '쓸 만한 도구변수가 있나?', yes: '도구변수' },
];

// 여백 기준: 상자 높이 66(두 줄), 상자 사이 34, 첫 baseline 은 위 가장자리에서 28.
const W = 344;
const H = 66;
const GAP = 34;
const y = (i: number) => 8 + i * (H + GAP);

export default function MethodFlow() {
  const last = STEPS.length;
  const total = y(last) + H + 1 + 8; // 마지막 상자 아랫변 + 선 두께 절반 + 아래 여백
  return (
    <svg viewBox={`0 0 360 ${total}`} role="img" aria-label="인과 추정 방법을 고르는 순서. 무작위 배정이 가능하면 실험, 아니면 비교군과 전후 자료가 있으면 차이의 차이, 비교군 없이 긴 시계열이면 시계열 개입 분석, 교란 변수를 거의 다 쟀으면 회귀 조정이나 매칭, 쓸 만한 도구변수가 있으면 도구변수, 모두 아니면 연관까지만 말한다.">
      <defs>
        <marker id="ar-d11" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      {STEPS.map((s, i) => (
        <g key={s.q}>
          <rect className="svg-box" x="8" y={y(i)} width={W} height={H} rx="8" />
          <text className="t-strong" x="22" y={y(i) + 28}>{s.q}</text>
          <text className="t-good" x="22" y={y(i) + 50}>예</text>
          <text className="t-strong" x="46" y={y(i) + 50}>{s.yes}</text>
          <line className="svg-flow" x1="180" y1={y(i) + H + 6} x2="180" y2={y(i) + H + GAP - 6} markerEnd="url(#ar-d11)" />
          <text className="t-sub" x="194" y={y(i) + H + GAP / 2 + 5}>아니오</text>
        </g>
      ))}
      <rect className="svg-box-key" x="8" y={y(last)} width={W} height={H} rx="8" />
      <text className="t-strong" x="22" y={y(last) + 28}>연관까지만 말한다</text>
      <text className="t-sub" x="22" y={y(last) + 50}>원인을 뜻하는 동사는 쓰지 않는다</text>
    </svg>
  );
}
