/** 가정 예시: 가상의 11자리 번호. 같은 숫자를 낱개로 볼 때와 묶어서 볼 때를 비교한다. */
const DIGITS = '01012345678';
const GROUPS = [3, 4, 4];

export default function Chunking() {
  const cell = 28;
  const gap = 3;
  const x0 = 8;
  const rowA = 38;
  const rowB = 128;
  let idx = 0;
  return (
    <svg viewBox="0 0 360 192" role="img" aria-label="같은 11자리 숫자를 낱개 11개로 외울 때와 3, 4, 4로 묶어 3개로 외울 때를 비교한 도식.">
      <text className="t-strong" x={x0} y="22">낱개로 본다: 11개</text>
      {DIGITS.split('').map((d, i) => (
        <g key={i}>
          <rect className="svg-box" x={x0 + i * (cell + gap)} y={rowA} width={cell} height={cell + 4} rx="4" />
          <text x={x0 + i * (cell + gap) + cell / 2} y={rowA + 23} textAnchor="middle" style={{ fontSize: 15 }}>{d}</text>
        </g>
      ))}
      <text className="t-bad" x={x0} y={rowA + 56}>용량 4개 안팎이면 넘친다</text>
      <text className="t-strong" x={x0} y={rowB - 16}>묶어서 본다: 3개</text>
      {GROUPS.map((g, gi) => {
        const start = GROUPS.slice(0, gi).reduce((a, b) => a + b, 0);
        const x = x0 + start * (cell + gap) + (gi > 0 ? gi * 4 : 0);
        const w = g * cell + (g - 1) * gap;
        const txt = DIGITS.slice(start, start + g);
        return (
          <g key={gi}>
            <rect className="svg-box-key" x={x} y={rowB} width={w} height={cell + 4} rx="6" />
            <text x={x + w / 2} y={rowB + 23} textAnchor="middle" style={{ fontSize: 15, letterSpacing: 2 }}>{txt}</text>
          </g>
        );
      })}
      <text className="t-good" x={x0} y={rowB + 56}>용량 안에 들어온다</text>
    </svg>
  );
}
