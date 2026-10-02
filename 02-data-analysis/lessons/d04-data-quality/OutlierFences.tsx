/** NIST e-Handbook 7.1.6 의 예시 자료(관측값 90개)로 사분위수와 울타리를 계산해 그린다. */
const DATA = [
  30, 171, 184, 201, 212, 250, 265, 270, 272, 289, 305, 306, 322, 322, 336, 346, 351, 370, 390, 404, 409, 411,
  436, 437, 439, 441, 444, 448, 451, 453, 470, 480, 482, 487, 494, 495, 499, 503, 514, 521, 522, 527, 548, 550,
  559, 560, 570, 572, 574, 578, 585, 592, 592, 607, 616, 618, 621, 629, 637, 638, 640, 656, 668, 707, 709, 719,
  737, 739, 752, 758, 766, 792, 792, 794, 802, 818, 830, 832, 843, 858, 860, 869, 918, 925, 953, 991, 1000,
  1005, 1068, 1441,
];

// NIST 방식: p 분위수는 정렬한 (N+1)p 번째 값(사이는 직선으로 채운다).
const s = [...DATA].sort((a, b) => a - b);
const n = s.length;
const quant = (p: number) => {
  const pos = p * (n + 1);
  const k = Math.floor(pos);
  return s[k - 1] + (pos - k) * (s[k] - s[k - 1]);
};
const q1 = quant(0.25);
const q3 = quant(0.75);
const med = (s[n / 2 - 1] + s[n / 2]) / 2;
const iq = q3 - q1;
const inLo = q1 - 1.5 * iq;
const inHi = q3 + 1.5 * iq;
const outLo = q1 - 3 * iq;
const outHi = q3 + 3 * iq;
const mild = s.filter((v) => (v < inLo && v >= outLo) || (v > inHi && v <= outHi));

// 가로 눈금: -100 에서 1700.
const MIN = -100;
const MAX = 1700;
const X0 = 16;
const X1 = 344;
const x = (v: number) => X0 + ((v - MIN) / (MAX - MIN)) * (X1 - X0);

// 점 쌓기: 폭 50 구간마다 위로 쌓는다.
const BIN = 50;
const R = 3.2;
const PITCH = 7;
const BASE = 150; // 맨 아래 점 중심
const AXIS = 158;
const bins = new Map<number, number>();
const dots = s.map((v) => {
  const b = Math.floor(v / BIN);
  const c = bins.get(b) ?? 0;
  bins.set(b, c + 1);
  return { v, cx: x(b * BIN + BIN / 2), cy: BASE - c * PITCH };
});
const BOX_Y = 198;
const BOX_H = 22;
const TXT1 = BOX_Y + BOX_H + 34;
const TXT2 = TXT1 + 22;
const VH = TXT2 + 4 + 8;
const fmt = (v: number) => String(Math.round(v * 100) / 100);

export default function OutlierFences() {
  const flag = dots.filter((d) => mild.includes(d.v));
  return (
    <svg viewBox={`0 0 360 ${VH}`} role="img" aria-label={`NIST 예시 자료 90개의 분포. 사분위수 ${fmt(q1)}와 ${fmt(q3)}, 안쪽 울타리 ${fmt(inHi)}, 바깥 울타리 ${fmt(outHi)}. ${fmt(mild[0])} 하나가 안쪽 울타리를 넘는다.`}>
      <text className="t-sub" x="8" y="20">{`바깥 ${fmt(outLo)}은 왼쪽 밖`}</text>
      <text className="t-sub" x="352" y="20" textAnchor="end">{`바깥 ${fmt(outHi)}`}</text>
      <text className="t-sub" x={x(inLo)} y="44">{`안쪽 ${fmt(inLo)}`}</text>
      <text className="t-sub" x={x(inHi)} y="44" textAnchor="middle">{`안쪽 ${fmt(inHi)}`}</text>
      {[inLo, inHi, outHi].map((v) => (
        <line key={v} x1={x(v)} y1={v === outHi ? 28 : 52} x2={x(v)} y2={AXIS} stroke="var(--muted)" strokeWidth="1.5" strokeDasharray="4 3" />
      ))}
      {dots.map((d, i) => (
        <circle key={i} cx={d.cx} cy={d.cy} r={R} fill={mild.includes(d.v) ? 'var(--bad)' : 'var(--accent)'} fillOpacity={mild.includes(d.v) ? 1 : 0.55} />
      ))}
      {flag.map((d) => (
        <text key={d.v} className="t-bad" x={d.cx} y={d.cy - 12} textAnchor="middle">{d.v}</text>
      ))}
      <line x1={X0} y1={AXIS} x2={X1} y2={AXIS} stroke="var(--line)" strokeWidth="1.5" />
      {[0, 500, 1000, 1500].map((t) => (
        <g key={t}>
          <line x1={x(t)} y1={AXIS} x2={x(t)} y2={AXIS + 5} stroke="var(--line)" strokeWidth="1.5" />
          <text className="t-sub" x={x(t)} y={AXIS + 22} textAnchor="middle">{t}</text>
        </g>
      ))}
      <rect className="svg-berg" x={x(q1)} y={BOX_Y} width={x(q3) - x(q1)} height={BOX_H} rx="4" />
      <line x1={x(med)} y1={BOX_Y} x2={x(med)} y2={BOX_Y + BOX_H} stroke="var(--strong)" strokeWidth="2" />
      <text className="t-sub" x="8" y={TXT1}>{`Q1 ${fmt(q1)} · 중앙값 ${fmt(med)} · Q3 ${fmt(q3)}`}</text>
      <text className="t-sub" x="8" y={TXT2}>{`IQ ${fmt(iq)} · 점 하나는 값 하나(폭 ${BIN} 구간)`}</text>
    </svg>
  );
}
