/** 플랫폼이 보고한 전환의 합과 실제 주문 수(가정, 한 달). 합 = 실제의 1.41배. */
const ACTUAL = 1000;
const PARTS = [
  { name: 'Meta', n: 480, op: 0.95 },
  { name: 'Google Ads', n: 520, op: 0.7 },
  { name: '이메일 도구', n: 260, op: 0.5 },
  { name: '제휴 링크', n: 150, op: 0.32 },
];
const SUM = PARTS.reduce((a, p) => a + p.n, 0);
const EXCESS = SUM - ACTUAL;

const X0 = 12;
const W = 336; // 합계 막대 전체 폭
const px = (n: number) => (n / SUM) * W;
const BH = 36;
const A_Y = 28; // 실제 주문 막대 y
const B_Y = A_Y + BH + 56; // 합계 막대 y
const B_END = B_Y + BH;
const BRACKET_Y = B_END + 12;
const NOTE_Y = BRACKET_Y + 24;
const LEG_Y = NOTE_Y + 36; // 범례 첫 줄
const LEG_STEP = 24;
const STROKE = 1.5;
const VB_H = Math.ceil(LEG_Y + LEG_STEP + 12);

const fmt = (n: number) => n.toLocaleString('en-US');

export default function PlatformSum() {
  let acc = 0;
  const xActual = X0 + px(ACTUAL);
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label={`실제 주문은 ${fmt(ACTUAL)}건인데 플랫폼이 보고한 전환의 합은 ${fmt(SUM)}건으로 실제의 ${(SUM / ACTUAL).toFixed(2)}배다. ${EXCESS}건이 중복 귀속이다.`}>
      <text className="t-strong" x={X0} y="18">실제 주문 {fmt(ACTUAL)}건</text>
      <rect className="svg-box-key" x={X0} y={A_Y} width={px(ACTUAL)} height={BH} rx="4" />
      <text className="t-strong" x={X0} y={B_Y - 12}>플랫폼 보고 합계 {fmt(SUM)}건</text>
      {PARTS.map((p) => {
        const x = X0 + px(acc);
        acc += p.n;
        return <rect key={p.name} x={x} y={B_Y} width={px(p.n)} height={BH} fill="var(--accent)" fillOpacity={p.op} stroke="var(--bg)" strokeWidth="2" />;
      })}
      <line x1={xActual} y1={A_Y + BH + 4} x2={xActual} y2={B_END + 6} stroke="var(--bad)" strokeWidth={STROKE} strokeDasharray="4 3" />
      <line x1={xActual} y1={BRACKET_Y} x2={X0 + W} y2={BRACKET_Y} stroke="var(--bad)" strokeWidth={STROKE} />
      <text className="t-bad" x={X0 + W} y={NOTE_Y} textAnchor="end">초과 {fmt(EXCESS)}건 = 중복 귀속</text>
      {PARTS.map((p, i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const x = col === 0 ? X0 : 186;
        const y = LEG_Y + row * LEG_STEP;
        return (
          <g key={p.name}>
            <rect x={x} y={y - 11} width="12" height="12" rx="2" fill="var(--accent)" fillOpacity={p.op} />
            <text className="t-sub" x={x + 20} y={y}>{p.name} {fmt(p.n)}건</text>
          </g>
        );
      })}
    </svg>
  );
}
