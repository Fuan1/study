/** ROI = ROAS × 공헌이익률 − 1. 공헌이익률별로 ROI 가 0이 되는 ROAS 를 코드로 계산해 그린다. */
const MARGINS = [0.6, 0.4, 0.2];
const X0 = 62;
const X1 = 300;
const ROAS_MAX = 6;
const ROI_MIN = -1;
const ROI_MAX = 2.6;
const YT = 36;
const YB = 36 + 180;
const xOf = (r: number) => X0 + (r / ROAS_MAX) * (X1 - X0);
const yOf = (roi: number) => YT + ((ROI_MAX - roi) / (ROI_MAX - ROI_MIN)) * (YB - YT);
const roi = (roas: number, m: number) => roas * m - 1;
const pct = (v: number) => `${v < 0 ? '−' : ''}${Math.abs(Math.round(v * 100))}%`;
const YTICKS = [-1, 0, 1, 2];
const XTICKS = [0, 1, 2, 3, 4, 5, 6];
const NOTE_Y = YB + 46;
const VB_H = NOTE_Y + 12;

export default function RoiLines() {
  const zeros = MARGINS.map((m) => `${Math.round(m * 100)}% ${(1 / m).toFixed(2)}`).join(' · ');
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label={`ROAS가 같아도 공헌이익률에 따라 ROI가 다르다. ROI가 0이 되는 ROAS는 ${zeros}이다.`}>
      <text className="t-sub" x="8" y="18">세로: ROI, 가로: ROAS, 선: 공헌이익률</text>
      {YTICKS.map((v) => (
        <g key={v}>
          <line x1={X0} y1={yOf(v)} x2={X1} y2={yOf(v)} stroke={v === 0 ? 'var(--strong)' : 'var(--line)'} strokeWidth={v === 0 ? 1.5 : 1} />
          <text className="t-sub" x={X0 - 8} y={yOf(v) + 4} textAnchor="end">{pct(v)}</text>
        </g>
      ))}
      {XTICKS.map((r) => (
        <text key={r} className="t-sub" x={xOf(r)} y={YB + 20} textAnchor="middle">{r}</text>
      ))}
      {MARGINS.map((m) => {
        const focus = m === 0.4;
        return (
          <g key={m}>
            <line x1={xOf(0)} y1={yOf(roi(0, m))} x2={xOf(ROAS_MAX)} y2={yOf(roi(ROAS_MAX, m))} stroke={focus ? 'var(--accent)' : 'var(--muted)'} strokeWidth={focus ? 2.5 : 1.5} />
            <text className={focus ? 't-accent' : 't-sub'} x={X1 + 8} y={yOf(roi(ROAS_MAX, m)) + 4}>{Math.round(m * 100)}%</text>
            <circle cx={xOf(1 / m)} cy={yOf(0)} r="4" fill="var(--warm)" />
          </g>
        );
      })}
      <text className="t-sub" x="8" y={NOTE_Y}>ROI 0이 되는 ROAS: {zeros}</text>
    </svg>
  );
}
