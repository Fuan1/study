/**
 * 출처 값(Nation 2006 표 6·13·8, Webb & Rodgers 2009 초록).
 * 각 점은 "그 수의 word family 를 알 때 글의 몇 %를 아는가". 2천 점은 고유명사를 모르는 말로 센 값, 나머지는 이름을 아는 것으로 센 값.
 */
type Pt = { n: string; v: number };
type Row = { title: string; pts: Pt[] };

const ROWS: Row[] = [
  { title: '소설 5편 합본', pts: [{ n: '2천', v: 87.83 }, { n: '4천', v: 94.8 }, { n: '9천', v: 98.24 }] },
  { title: '일상 대화(말뭉치)', pts: [{ n: '2천', v: 89.35 }, { n: '3천', v: 96.03 }, { n: '6천', v: 97.67 }] },
  { title: '영화 318편', pts: [{ n: '3천', v: 95.76 }, { n: '6천', v: 98.15 }] },
  { title: '쉬운 읽기 책 1권', pts: [{ n: '2천', v: 91.2 }, { n: '3천', v: 98.86 }] },
];

const AX0 = 16;
const AX1 = 344;
const LO = 85;
const HI = 100;
const x = (v: number) => AX0 + ((v - LO) * (AX1 - AX0)) / (HI - LO);
const PITCH = 92;
const TOP = 20;

export default function CoverageDots() {
  const lastY = TOP + (ROWS.length - 1) * PITCH;
  const axisY = lastY + 62 + 28;
  const VB_H = axisY + 10;
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="알고 있는 단어 수에 따른 글 이해 비율. 소설은 9천, 대화는 6천 이상, 영화는 6천, 쉬운 읽기 책은 3천에서 98퍼센트에 닿는다.">
      {ROWS.map((r, i) => {
        const y0 = TOP + i * PITCH;
        const cy = y0 + 38;
        return (
          <g key={r.title}>
            <text className="t-strong" x="8" y={y0 - 4}>{r.title}</text>
            <line x1={AX0} y1={cy} x2={AX1} y2={cy} style={{ stroke: 'var(--line)', strokeWidth: 1.5 }} />
            {[95, 98].map((t) => (
              <line key={t} x1={x(t)} y1={cy - 6} x2={x(t)} y2={cy + 6} style={{ stroke: 'var(--muted)', strokeWidth: 1.5 }} />
            ))}
            {r.pts.map((p) => (
              <g key={p.n}>
                <text className={p.v >= 98 ? 't-good' : 't-sub'} x={x(p.v)} y={y0 + 24} textAnchor="middle">{p.n}</text>
                <circle className="svg-berg" cx={x(p.v)} cy={cy} r="6" />
                <text className="t-sub" x={x(p.v)} y={cy + 24} textAnchor="middle">{(Math.round(p.v * 10 + 1e-6) / 10).toFixed(1)}</text>
              </g>
            ))}
          </g>
        );
      })}
      <text className="t-sub" x="8" y={axisY}>85%</text>
      <text className="t-sub" x={x(95)} y={axisY} textAnchor="middle">95%</text>
      <text className="t-sub" x={x(98)} y={axisY} textAnchor="middle">98%</text>
    </svg>
  );
}
