/** 가정 예시: 가상의 11자리 번호. 같은 숫자를 낱개로 볼 때와 묶어서 볼 때를 비교한다. */
const DIGITS = '01012345678';
const GROUPS = [3, 4, 4];

export default function Chunking() {
  // 낱개 칸은 의도적으로 작은 격자: 칸 사이 6px
  const cell = 25;
  const cellH = 36;
  const gap = 6;
  const x0 = 8;
  const rowA = 46;
  // 묶음 상자: 글자(4자리 약 44px) 좌우 12px 이상 → 폭 72, 높이 48
  const gw = 72;
  const gh = 48;
  const ggap = 12;
  const rowB = 178;
  return (
    <svg viewBox="0 0 360 272" role="img" aria-label="같은 11자리 숫자를 낱개 11개로 외울 때와 3, 4, 4로 묶어 3개로 외울 때를 비교한 도식.">
      <text className="t-strong" x={x0} y="22">낱개로 본다: 11개</text>
      {DIGITS.split('').map((d, i) => (
        <g key={i}>
          <rect className="svg-box" x={x0 + i * (cell + gap)} y={rowA} width={cell} height={cellH} rx="4" />
          <text x={x0 + i * (cell + gap) + cell / 2} y={rowA + 23} textAnchor="middle" style={{ fontSize: 15 }}>{d}</text>
        </g>
      ))}
      <text className="t-bad" x={x0} y={rowA + cellH + 29}>용량 4개 안팎이면 넘친다</text>
      <line x1="8" y1="130" x2="352" y2="130" stroke="var(--line)" />
      <text className="t-strong" x={x0} y={rowB - 24}>묶어서 본다: 3개</text>
      {GROUPS.map((g, gi) => {
        const start = GROUPS.slice(0, gi).reduce((a, b) => a + b, 0);
        const x = x0 + gi * (gw + ggap);
        const txt = DIGITS.slice(start, start + g);
        return (
          <g key={gi}>
            <rect className="svg-box-key" x={x} y={rowB} width={gw} height={gh} rx="6" />
            <text x={x + gw / 2 + 1} y={rowB + 29.5} textAnchor="middle" style={{ fontSize: 15, letterSpacing: 2 }}>{txt}</text>
          </g>
        );
      })}
      <text className="t-good" x={x0} y={rowB + gh + 29}>용량 안에 들어온다</text>
    </svg>
  );
}
