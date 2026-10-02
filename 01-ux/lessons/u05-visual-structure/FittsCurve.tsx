/**
 * Shannon 형식 MT = a + b * log2(D/W + 1) 로 직접 계산해 그린다.
 * a, b 는 장치와 사람마다 실험으로 구하는 상수이며, 여기서는 곡선 모양을 보이려고 가정한 값이다(a 0.1초, b 0.15초/bit).
 */
const A = 0.1;
const B = 0.15;
const mt = (d: number, w: number) => A + B * Math.log2(d / w + 1);

const X0 = 44;
const X1 = 292;
const Y0 = 220; // MT 0초
const Y1 = 36; // MT 0.8초
const DMAX = 400;
const MTMAX = 0.8;
const px = (d: number) => X0 + (d / DMAX) * (X1 - X0);
const py = (t: number) => Y0 - (t / MTMAX) * (Y0 - Y1);

const CURVES = [
  { w: 24, cls: 't-bad', stroke: 'var(--bad)' },
  { w: 48, cls: 't-accent', stroke: 'var(--accent)' },
  { w: 96, cls: 't-good', stroke: 'var(--good)' },
];

export default function FittsCurve() {
  const ds = Array.from({ length: 41 }, (_, i) => i * 10);
  return (
    <svg viewBox="0 0 360 312" role="img" aria-label="타깃까지의 거리가 늘수록 이동 시간은 완만하게 늘고, 타깃 너비가 클수록 곡선 전체가 아래로 내려간다. 너비 24, 48, 96 세 곡선을 Shannon 형식 공식으로 계산했다.">
      <text className="t-sub" x="8" y="20">이동 시간 MT(초)</text>
      {[0, 0.2, 0.4, 0.6, 0.8].map((t) => (
        <g key={t}>
          <line x1={X0} y1={py(t)} x2={X1} y2={py(t)} stroke="var(--line)" />
          <text className="t-sub" x={X0 - 6} y={py(t) + 4} textAnchor="end">{t.toFixed(1)}</text>
        </g>
      ))}
      {[0, 100, 200, 300, 400].map((d) => (
        <text key={d} className="t-sub" x={px(d)} y={Y0 + 20} textAnchor="middle">{d}</text>
      ))}
      <text className="t-sub" x={(X0 + X1) / 2} y={Y0 + 40} textAnchor="middle">타깃까지 거리 D (px)</text>
      {CURVES.map((c) => (
        <g key={c.w}>
          <polyline fill="none" stroke={c.stroke} strokeWidth="2.5" points={ds.map((d) => `${px(d).toFixed(1)},${py(mt(d, c.w)).toFixed(1)}`).join(' ')} />
          <text className={c.cls} x={X1 + 8} y={py(mt(DMAX, c.w)) + 4}>W {c.w}</text>
        </g>
      ))}
      <text className="t-sub" x="8" y="278">공식: MT = a + b · log2(D/W + 1)</text>
      <text className="t-sub" x="8" y="298">a = 0.1초, b = 0.15초/bit는 가정값</text>
    </svg>
  );
}
