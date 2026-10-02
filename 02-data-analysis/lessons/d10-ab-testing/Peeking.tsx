/** Evan Miller(2010)의 표. 실제 유의수준 5%를 지키려면 엿본 횟수에 따라 화면에 보이는 유의수준이 얼마여야 하는지. */
const ROWS: { label: string; v: number }[] = [
  { label: '엿보지 않음', v: 5.0 },
  { label: '1번 엿봄', v: 2.9 },
  { label: '2번', v: 2.2 },
  { label: '3번', v: 1.8 },
  { label: '5번', v: 1.4 },
  { label: '10번', v: 1.0 },
];

const BX = 104;
const PER = 38; // 1% 당 폭
const PITCH = 40;
const BH = 22;
const lastBottom = 8 + (ROWS.length - 1) * PITCH + 4 + BH;
const DIV = lastBottom + 24;
const VB_H = DIV + 24 + 20 + 12;

export default function Peeking() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="엿보는 횟수가 늘수록 실제 유의수준 5퍼센트를 지키려면 화면에 보이는 유의수준이 5.0, 2.9, 2.2, 1.8, 1.4, 1.0퍼센트로 낮아져야 한다.">
      {ROWS.map((r, i) => {
        const y = 8 + i * PITCH;
        return (
          <g key={r.label}>
            <text className="t-sub" x="16" y={y + 4 + BH / 2 + 5}>{r.label}</text>
            <rect x={BX} y={y + 4} width={r.v * PER} height={BH} rx="3" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1.5" />
            <text className="t-strong" x={BX + r.v * PER + 10} y={y + 4 + BH / 2 + 5}>{r.v.toFixed(1)}%</text>
          </g>
        );
      })}
      <line x1="8" y1={DIV} x2="352" y2={DIV} stroke="var(--line)" />
      <text className="t-sub" x="16" y={DIV + 24}>막대: 화면에 떠야 하는 유의수준</text>
      <text className="t-bad" x="16" y={DIV + 44}>매 관찰마다 확인하면 오탐 26.1%(최악)</text>
    </svg>
  );
}
