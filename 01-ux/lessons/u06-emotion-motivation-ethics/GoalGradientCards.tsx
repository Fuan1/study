/** 숫자는 Kivetz, Urminsky, Zheng (2006)의 현장 실험 보고값이다. 카드 모양과 비율 계산은 단순화한 도식이다. */
const REQUIRED = 10; // 두 카드 모두 필요한 구매 횟수
const DAYS_A = 15.6;
const DAYS_B = 12.7;
const FASTER = Math.round((1 - DAYS_B / DAYS_A) * 100);

function Card({ y, title, slots, pre }: { y: number; title: string; slots: number; pre: number }) {
  const remaining = slots - pre; // 아직 채워야 할 칸 = 필요한 구매 횟수
  const ratio = remaining / slots;
  const gap = 27;
  return (
    <g transform={`translate(0 ${y})`}>
      <text className="t-strong" x="8" y="16">{title}</text>
      {Array.from({ length: slots }).map((_, i) => {
        const cx = 20 + i * gap;
        return i < pre ? (
          <circle key={i} cx={cx} cy="40" r="10" fill="var(--accent)" stroke="var(--accent)" strokeWidth="1.5" />
        ) : (
          <circle key={i} className="svg-box" cx={cx} cy="40" r="10" />
        );
      })}
      <text className="t-sub" x="8" y="68">채울 칸 {remaining}개, 남은 거리 비율 {remaining}/{slots} = {ratio.toFixed(2)}</text>
    </g>
  );
}

export default function GoalGradientCards() {
  const maxW = 200;
  const wA = maxW;
  const wB = (DAYS_B / DAYS_A) * maxW;
  return (
    <svg viewBox="0 0 360 330" role="img" aria-label={`커피 적립 카드 두 종류. 10칸 카드와, 2칸이 미리 찍힌 12칸 카드는 모두 구매 ${REQUIRED}번이 필요하다. 평균 완료 일수는 각각 ${DAYS_A}일과 ${DAYS_B}일이다.`}>
      <Card y={0} title="일반 10칸 카드" slots={10} pre={0} />
      <Card y={84} title="12칸 카드, 2칸 미리 찍힘" slots={12} pre={2} />
      <text className="t-strong" x="8" y="188">구매 {REQUIRED}번을 채우는 데 걸린 평균 일수</text>
      <rect x="8" y="200" width={wA} height="24" rx="4" className="svg-box" />
      <text className="t-sub" x={wA + 16} y="217">{DAYS_A}일</text>
      <rect x="8" y="236" width={wB} height="24" rx="4" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1.5" />
      <text className="t-accent" x={wB + 16} y="253">{DAYS_B}일</text>
      <text className="t-good" x="8" y="288">약 {FASTER}% 빨랐다(참가자 108명, 대학 카페 현장 실험)</text>
      <text className="t-sub" x="8" y="308">카드 모양은 단순화한 도식이다</text>
    </svg>
  );
}
