// 사용자 1명이 새 문제를 찾는 비율 L = 0.31 일 때, n명이 찾는 비율 = 1 - (1 - L)^n
const L = 0.31;
const NS = [1, 2, 3, 5, 8, 12];

export default function FiveUsers() {
  const x0 = 56;
  const full = 240;
  return (
    <svg viewBox="0 0 360 230" role="img" aria-label="사용자 수별로 찾는 사용성 문제의 비율. 1명 31퍼센트, 2명 52퍼센트, 3명 67퍼센트, 5명 84퍼센트, 8명 95퍼센트, 12명 99퍼센트.">
      <text className="t-sub" x="8" y="18">사용자 한 명이 새 문제를 찾는 비율을 31퍼센트로 둔 계산</text>
      {NS.map((n, i) => {
        const p = 1 - Math.pow(1 - L, n);
        const y = 32 + i * 32;
        return (
          <g key={n}>
            <text className="t-strong" x="8" y={y + 18}>{n}명</text>
            <rect className={n === 5 ? 'svg-box-key' : 'svg-box'} x={x0} y={y} width={full * p} height="24" rx="5" />
            <text className="t-sub" x={x0 + full * p + 6} y={y + 18}>{Math.round(p * 100)}%</text>
          </g>
        );
      })}
    </svg>
  );
}
