/** 소재 A/B 의 군당 필요 전환 수. 기준 CVR 3%(가정), 양측 5%, 검정력 80%, 두 군 같은 크기. */
const Z_A = 1.959964; // z(0.975)
const Z_B = 0.841621; // z(0.80)
const P1 = 0.03;
const REL = [0.1, 0.2, 0.3, 0.5, 1.0];
const clicksPerArm = (rel: number) => {
  const p2 = P1 * (1 + rel);
  const pb = (P1 + p2) / 2;
  return Math.ceil((2 * pb * (1 - pb) * (Z_A + Z_B) ** 2) / (p2 - P1) ** 2);
};
const convPerArm = (rel: number) => Math.round(clicksPerArm(rel) * P1); // 기준 소재의 전환 수
const fmt = (n: number) => n.toLocaleString('en-US');

const LX = 8;
const BX = 76;
const SCALE = 190 / convPerArm(REL[0]);
const BAR_H = 24;
const PITCH = 36;
const TOP = 34;
const rowY = (i: number) => TOP + i * PITCH;
const LAST_BOTTOM = rowY(REL.length - 1) + BAR_H;
const VB_H = LAST_BOTTOM + 1 + 16;

export default function TestSample() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label={`CVR 3퍼센트 소재에서 상대 차이별 군당 필요 전환 수. ${REL.map((r) => `${Math.round(r * 100)}퍼센트 ${fmt(convPerArm(r))}건`).join(', ')}. 찾으려는 차이가 작을수록 필요한 전환 수가 급격히 늘어난다.`}>
      <text className="t-sub" x={LX} y="18">상대 차이별 군당 필요 전환 수 (CVR 3%)</text>
      {REL.map((r, i) => {
        const y = rowY(i);
        const w = convPerArm(r) * SCALE;
        return (
          <g key={r}>
            <text className="t-sub" x={LX} y={y + 17}>차이 +{Math.round(r * 100)}%</text>
            <rect className={r === 0.2 ? 'svg-tip' : 'svg-berg'} x={BX} y={y} width={w} height={BAR_H} rx="4" />
            <text className={r === 0.2 ? 't-warm' : 't-strong'} x={BX + w + 8} y={y + 18}>{fmt(convPerArm(r))}건</text>
          </g>
        );
      })}
    </svg>
  );
}
