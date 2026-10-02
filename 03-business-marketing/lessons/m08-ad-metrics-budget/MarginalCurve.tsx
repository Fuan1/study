/**
 * 형태 예시(가상 값): 일 매출 R(s) = β × s ÷ (s + K), Hill 함수에서 기울기 S = 1 인 형태(Jin 외 2017).
 * β = 6,000,000원, K = 1,000,000원. 평균 ROAS = R ÷ s = β ÷ (s + K), 한계 ROAS = R'(s) = β × K ÷ (s + K)².
 * 공헌이익률 40%(가정)이면 손익분기 ROAS 는 2.5. 두 지점은 식에서 계산한다.
 */
const BETA = 6_000_000;
const K = 1_000_000;
const M = 0.4;
const BE = 1 / M;
const S_MAX = 2_000_000;
const avg = (s: number) => BETA / (s + K);
const marg = (s: number) => (BETA * K) / ((s + K) * (s + K));
const S_MARG = Math.sqrt((BETA * K) / BE) - K; // 한계 ROAS = 손익분기
const S_AVG = BETA / BE - K; // 평균 ROAS = 손익분기

const X0 = 44;
const X1 = 344;
const YB = 210;
const YT = 44;
const ROAS_TOP = 6;
const xOf = (s: number) => X0 + (s / S_MAX) * (X1 - X0);
const yOf = (r: number) => YB - (r / ROAS_TOP) * (YB - YT);
const man = (s: number) => `${Math.round(s / 10_000)}만원`;

const curve = (f: (s: number) => number) => {
  const pts: string[] = [];
  for (let s = 0; s <= S_MAX + 1; s += 20_000) pts.push(`${xOf(s).toFixed(1)},${yOf(f(s)).toFixed(1)}`);
  return pts.join(' ');
};
const XTICKS = [0, 500_000, 1_000_000, 1_500_000, 2_000_000];
const YTICKS = [0, 1, 2, 3, 4, 5, 6];
const NOTE1 = YB + 46;
const NOTE2 = NOTE1 + 22;
const VB_H = NOTE2 + 12;

export default function MarginalCurve() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label={`일 광고비를 올리면 평균 ROAS와 한계 ROAS가 모두 내려간다. 한계 ROAS가 손익분기 ${BE}가 되는 지점은 ${man(S_MARG)}, 평균 ROAS가 ${BE}가 되는 지점은 ${man(S_AVG)}이다. 증액은 한계 ROAS가 손익분기 이상인 구간까지만 한다.`}>
      <text className="t-sub" x="8" y="18">세로: ROAS, 가로: 일 광고비 (가상 곡선)</text>
      {YTICKS.map((v) => (
        <g key={v}>
          <line x1={X0} y1={yOf(v)} x2={X1} y2={yOf(v)} stroke="var(--line)" strokeWidth={v === 0 ? 1.5 : 1} />
          <text className="t-sub" x={X0 - 8} y={yOf(v) + 4} textAnchor="end">{v}</text>
        </g>
      ))}
      {XTICKS.map((s) => (
        <text key={s} className="t-sub" x={xOf(s)} y={YB + 20} textAnchor={s === 0 ? 'start' : s === S_MAX ? 'end' : 'middle'}>{s === 0 ? '0' : `${s / 10_000}만`}</text>
      ))}
      <line x1={X0} y1={yOf(BE)} x2={X1} y2={yOf(BE)} stroke="var(--strong)" strokeWidth="1.5" strokeDasharray="4 3" />
      <text className="t-sub" x={X1} y={yOf(BE) - 8} textAnchor="end">손익분기 {BE}</text>
      <line x1={xOf(S_MARG)} y1={yOf(BE)} x2={xOf(S_MARG)} y2={YB} stroke="var(--line)" strokeDasharray="3 3" />
      <line x1={xOf(S_AVG)} y1={yOf(BE)} x2={xOf(S_AVG)} y2={YB} stroke="var(--line)" strokeDasharray="3 3" />
      <polyline points={curve(avg)} fill="none" stroke="var(--accent)" strokeWidth="2.5" />
      <polyline points={curve(marg)} fill="none" stroke="var(--warm)" strokeWidth="2.5" />
      <circle cx={xOf(S_MARG)} cy={yOf(BE)} r="4.5" fill="var(--warm)" />
      <circle cx={xOf(S_AVG)} cy={yOf(BE)} r="4.5" fill="var(--accent)" />
      <text className="t-accent" x={xOf(500_000)} y={yOf(avg(500_000)) - 12}>평균 ROAS</text>
      <text className="t-warm" x={xOf(1_200_000)} y={yOf(marg(1_200_000)) - 13}>한계 ROAS</text>
      <circle cx="16" cy={NOTE1 - 4} r="4.5" fill="var(--warm)" />
      <text className="t-sub" x="28" y={NOTE1}>한계 ROAS {BE} 지점: {man(S_MARG)}</text>
      <circle cx="16" cy={NOTE2 - 4} r="4.5" fill="var(--accent)" />
      <text className="t-sub" x="28" y={NOTE2}>평균 ROAS {BE} 지점: {man(S_AVG)}</text>
    </svg>
  );
}
