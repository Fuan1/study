/** 확인된 가이드라인의 항목 수 범위를 1-8칸 눈금 위에 계산해서 그린다. */
const X0 = 16;
const STEP = 41; // 칸 하나의 폭, 8칸 = 328
const COUNTS = Array.from({ length: 8 }, (_, i) => i + 1);

const ROWS = [
  { label: 'Material 하단 바: 3개에서 5개', lo: 3, hi: 5 },
  { label: 'NN/g 모바일 탭 바: 5개 이하', lo: 1, hi: 5 },
  { label: 'NN/g 최상위 메뉴: 4개 이하면 노출', lo: 1, hi: 4 },
];

export default function NavCount() {
  const axisY = 36 + ROWS.length * 58;
  return (
    <svg viewBox="0 0 360 262" role="img" aria-label="항목 수 1개에서 8개 눈금 위에 세 가이드라인의 범위를 표시했다. Material 하단 바는 3개에서 5개, NN/g 탭 바는 5개 이하, NN/g 모바일 최상위 메뉴는 4개 이하일 때 노출한다. 6개 이상은 묶거나 다른 패턴을 쓴다.">
      {ROWS.map((r, i) => {
        const y = 8 + i * 58;
        return (
          <g key={r.label}>
            <text className="t-strong" x={X0} y={y + 14}>{r.label}</text>
            <rect x={X0} y={y + 24} width={8 * STEP} height="22" rx="4" className="svg-box" />
            <rect x={X0 + (r.lo - 1) * STEP} y={y + 24} width={(r.hi - r.lo + 1) * STEP} height="22" rx="4" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1.5" />
          </g>
        );
      })}
      {COUNTS.map((c) => (
        <text key={c} className={c > 5 ? 't-bad' : 't-sub'} x={X0 + (c - 0.5) * STEP} y={axisY} textAnchor="middle">{c}</text>
      ))}
      <text className="t-sub" x={X0} y={axisY + 22}>항목 수</text>
      <text className="t-bad" x={X0} y={axisY + 42}>6개 이상: 묶거나 다른 패턴</text>
    </svg>
  );
}
