/** 개념도. 막대 길이는 비율을 보여 주기 위한 가정값이며 측정값이 아니다. */
const CAP = 220; // 작업 기억 용량(가정 단위)
const X0 = 8;

const ROWS = [
  { label: 'A · 정돈된 화면', intrinsic: 120, extraneous: 40 },
  { label: 'B · 어수선한 화면', intrinsic: 120, extraneous: 150 },
];

export default function CognitiveLoad() {
  const scale = 344 / 330;
  const capX = X0 + CAP * scale;
  return (
    <svg viewBox="0 0 360 246" role="img" aria-label="같은 과제를 두 화면에서 할 때의 인지 부하 비교. 과제 자체의 부하(내재적)는 같고, 화면이 어수선하면 불필요한 부하(외재적)가 더해져 작업 기억 용량을 넘는다.">
      {ROWS.map((r, i) => {
        const y = 38 + i * 84;
        const wi = r.intrinsic * scale;
        const we = r.extraneous * scale;
        const over = r.intrinsic + r.extraneous > CAP;
        const fitW = Math.max(0, Math.min(we, capX - (X0 + wi)));
        return (
          <g key={r.label}>
            <text className="t-strong" x={X0} y={y - 8}>{r.label}</text>
            <rect x={X0} y={y} width={wi} height="30" rx="4" style={{ fill: 'var(--accent-soft)', stroke: 'var(--accent)', strokeWidth: 1.2 }} />
            <text className="t-accent" x={X0 + 8} y={y + 20}>내재적</text>
            <rect x={X0 + wi} y={y} width={fitW} height="30" style={{ fill: 'var(--warm-soft)', stroke: 'var(--warm)', strokeWidth: 1.2 }} />
            {over && (
              <rect x={X0 + wi + fitW} y={y} width={we - fitW} height="30" rx="4" style={{ fill: 'var(--bg)', stroke: 'var(--bad)', strokeWidth: 2, strokeDasharray: '5 3' }} />
            )}
            {fitW > 44 && <text className="t-warm" x={X0 + wi + 8} y={y + 20} style={{ fontSize: 12.5 }}>외재적</text>}
            {over && <text className="t-bad" x={X0 + wi + fitW + 8} y={y + 20}>넘침</text>}
            <text className={over ? 't-bad' : 't-good'} x={X0} y={y + 50}>{over ? '용량 초과: 놓치거나 포기한다' : '용량 안: 과제에 집중할 수 있다'}</text>
          </g>
        );
      })}
      <line x1={capX} y1="18" x2={capX} y2="204" style={{ stroke: 'var(--strong)', strokeWidth: 1.5, strokeDasharray: '4 3' }} />
      <text className="t-sub" x={capX - 4} y="13" textAnchor="end">작업 기억 용량</text>
      <text className="t-sub" x={X0} y="224">내재적 = 과제 자체의 어려움</text>
      <text className="t-sub" x={X0} y="241">외재적 = 설계가 얹은 불필요한 처리</text>
    </svg>
  );
}
