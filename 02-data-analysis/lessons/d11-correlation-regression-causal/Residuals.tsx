/** 가상 데이터 2벌(python random seed 31). 직선을 최소제곱으로 적합한 뒤 잔차를 계산해 적합값 대비로 그린다. */
type Pt = [number, number];

const A: Pt[] = [[0.1, 7.5], [1.1, 2.3], [3.9, 11.4], [6.8, 12.1], [1.4, 3.7], [1.1, 4.8], [2.3, 3.7], [7.6, 11.6], [1.5, 3.8], [7.4, 12.3], [6.6, 13.5], [1.4, 8.3], [5.4, 7.6], [4.5, 6.9], [4.1, 9.8], [10.0, 18.1], [0.9, 5.8], [0.2, 0.8], [9.4, 17.4], [4.0, 7.9], [2.0, 1.6], [3.3, 8.0], [3.6, 4.1], [9.6, 17.6], [2.1, 4.2], [2.2, 4.9], [5.8, 15.3], [5.5, 13.6], [9.5, 17.2], [8.4, 15.5], [3.6, 5.8], [2.0, 7.7], [8.4, 16.0], [9.9, 15.0], [0.3, -1.1], [7.4, 13.1], [8.7, 14.7], [6.5, 13.7], [2.2, 3.1], [8.0, 12.1], [7.3, 13.9], [1.9, 5.1], [6.4, 13.7], [2.2, 7.7], [0.4, 0.7], [3.4, 2.1], [3.3, 7.1], [4.0, 6.5], [6.5, 12.3], [8.4, 8.8]];
const B: Pt[] = [[3.5, 5.7], [0.1, 4.1], [3.8, 4.8], [2.8, 4.9], [1.8, 3.3], [0.5, 1.0], [1.2, 2.6], [8.7, 21.7], [0.5, 1.0], [6.1, 12.8], [2.1, 1.7], [1.9, 4.4], [8.2, 19.6], [3.0, 4.6], [1.8, 1.8], [4.5, 6.1], [6.9, 11.1], [5.2, 8.8], [8.6, 20.4], [4.0, 6.7], [5.2, 10.1], [7.2, 15.2], [4.6, 6.9], [7.2, 16.3], [4.7, 7.5], [1.3, 2.4], [1.2, 0.9], [7.8, 18.6], [7.4, 14.9], [9.4, 26.6], [6.9, 12.8], [5.8, 9.8], [1.7, 2.9], [8.5, 19.2], [1.2, 0.5], [4.2, 5.0], [1.4, 1.5], [3.8, 5.3], [3.1, 5.7], [4.3, 7.5], [7.1, 15.0], [5.4, 10.4], [2.4, 0.7], [7.8, 16.5], [7.4, 15.0], [8.3, 17.9], [0.3, 2.7], [6.1, 10.5], [9.0, 20.9], [2.6, 4.9]];

function fit(p: Pt[]) {
  const n = p.length;
  const mx = p.reduce((s, q) => s + q[0], 0) / n;
  const my = p.reduce((s, q) => s + q[1], 0) / n;
  let sxy = 0, sxx = 0, tss = 0;
  for (const [x, y] of p) { sxy += (x - mx) * (y - my); sxx += (x - mx) ** 2; tss += (y - my) ** 2; }
  const b1 = sxy / sxx;
  const b0 = my - b1 * mx;
  const pts = p.map(([x, y]) => ({ f: b0 + b1 * x, e: y - (b0 + b1 * x) }));
  const rss = pts.reduce((s, q) => s + q.e * q.e, 0);
  return { pts, r2: 1 - rss / tss };
}

const PW = 164;
const PH = 130;
const PAD = 12;

export default function Residuals() {
  const panels = [
    { title: '관계가 직선일 때', note: '잔차에 모양이 없다', ...fit(A) },
    { title: '관계가 곡선일 때', note: '잔차가 U자로 남는다', ...fit(B) },
  ];
  const all = panels.flatMap((p) => p.pts);
  const emax = Math.max(...all.map((q) => Math.abs(q.e))) * 1.02; // 두 패널이 같은 눈금
  const by = 8 + 26;
  const H = by + PH + 42 + 4 + 8;
  return (
    <svg viewBox={`0 0 360 ${H}`} role="img" aria-label="적합값 대비 잔차 그림 두 장. 관계가 직선이면 잔차가 0 주변에 고르게 흩어지고, 관계가 곡선인데 직선을 적합하면 R제곱이 더 높아도 잔차가 U자로 남는다.">
      {panels.map((p, i) => {
        const bx = 8 + i * (PW + 16);
        const fs = p.pts.map((q) => q.f);
        const fmin = Math.min(...fs), fmax = Math.max(...fs);
        const sx = (v: number) => bx + PAD + ((v - fmin) / (fmax - fmin)) * (PW - 2 * PAD);
        const sy = (v: number) => by + PH / 2 - (v / emax) * (PH / 2 - PAD);
        return (
          <g key={p.title}>
            <text className="t-strong" x={bx} y={8 + 14}>{p.title}</text>
            <rect className="svg-box" x={bx} y={by} width={PW} height={PH} rx="8" />
            <line x1={bx + 6} y1={sy(0)} x2={bx + PW - 6} y2={sy(0)} stroke="var(--muted)" strokeWidth="1" strokeDasharray="4 3" />
            {p.pts.map((q, k) => (
              <circle key={k} cx={sx(q.f)} cy={sy(q.e)} r="2.6" fill="var(--muted)" />
            ))}
            <text className="t-strong" x={bx} y={by + PH + 22}>{`R² ${p.r2.toFixed(2)}`}</text>
            <text className="t-sub" x={bx} y={by + PH + 42}>{p.note}</text>
          </g>
        );
      })}
    </svg>
  );
}
