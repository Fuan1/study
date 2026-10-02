/** 가상 데이터 4벌(python random seed 11 로 생성, 소수 첫째 자리 반올림). r(Pearson)과 ρ(Spearman)은 아래에서 직접 계산한다. */
type Pt = [number, number];

const B: Pt[] = [[2.7, 5.1], [3.4, 3.1], [5.5, 3.8], [2.8, 3.0], [3.0, 4.0], [3.5, 2.7], [1.1, 1.7], [3.1, 6.0], [3.8, 6.0], [4.8, 5.0], [0.6, 4.2], [1.8, 1.9], [0.5, 1.4], [4.9, 1.7], [4.2, 0.4], [0.3, 4.6], [5.9, 2.4], [5.8, 5.1], [3.9, 2.3], [3.7, 5.7], [0.9, 5.1], [0.1, 0.0], [3.2, 1.3], [0.4, 5.5], [1.1, 2.8], [1.5, 5.9], [0.2, 2.4], [2.8, 0.4], [2.6, 3.8], [14.0, 14.0]];
const C: Pt[] = [[1.7, 4.4], [-1.4, 3.0], [-2.5, 6.4], [-1.0, 1.5], [2.8, 7.9], [1.5, 1.7], [-2.3, 5.2], [-1.5, 2.5], [-2.4, 6.4], [-2.6, 7.2], [1.8, 3.3], [-1.9, 4.4], [0.4, -0.3], [-0.3, 0.6], [-1.9, 4.3], [1.4, 1.8], [-2.2, 3.8], [0.9, 0.3], [-2.3, 5.4], [-0.5, 0.6], [-1.7, 3.8], [-1.4, 1.4], [2.8, 7.8], [1.8, 3.6], [-1.2, 1.3], [2.3, 3.9], [-1.7, 3.4], [-0.6, 1.7], [2.1, 5.0], [0.9, 0.3]];
const D: Pt[] = [[4.2, 7.0], [1.0, 1.4], [0.4, -2.8], [9.6, 10.0], [2.4, -0.8], [7.0, 14.0], [2.6, 4.8], [8.2, 9.3], [6.0, 5.6], [2.9, -1.4], [1.8, 1.5], [7.2, 4.1], [0.7, 1.9], [2.3, -2.0], [5.6, 3.8], [8.5, 10.9], [6.1, 9.4], [2.8, 0.4], [9.2, 6.1], [2.0, 3.8], [0.2, 1.9], [2.7, 0.7], [4.5, 3.1], [0.6, -0.8], [1.8, -0.6], [3.7, 2.3], [5.7, 8.2], [1.3, 2.7], [3.6, 7.7], [8.9, 8.7], [9.8, 9.5], [6.6, 4.6], [6.9, 6.7], [5.8, 3.2], [1.4, -2.2], [0.4, 1.8], [0.2, 3.1], [9.1, 10.8], [7.0, 9.7], [9.6, 10.1]];
const E: Pt[] = [[2.9, 14.7], [1.4, 4.2], [4.2, 39.9], [3.0, 12.9], [3.7, 27.4], [5.5, 128.5], [1.5, 3.4], [0.1, 1.1], [1.8, 5.3], [4.1, 39.9], [1.2, 2.7], [1.0, 2.8], [5.4, 153.9], [4.0, 35.9], [2.7, 9.4], [5.4, 104.8], [2.0, 7.0], [4.0, 29.9], [1.2, 3.2], [2.6, 10.7], [4.8, 69.4], [5.5, 157.6], [5.3, 95.2], [2.3, 6.8], [3.5, 22.9], [1.9, 4.5], [0.8, 2.3], [3.0, 13.3], [5.0, 77.1], [5.1, 80.6]];

const WIN: [number, number] = [3.5, 6.5]; // 구간 제한 패널에서 남기는 x 범위

function pearson(p: Pt[]) {
  const n = p.length;
  const mx = p.reduce((s, q) => s + q[0], 0) / n;
  const my = p.reduce((s, q) => s + q[1], 0) / n;
  let sxy = 0, sxx = 0, syy = 0;
  for (const [x, y] of p) { sxy += (x - mx) * (y - my); sxx += (x - mx) ** 2; syy += (y - my) ** 2; }
  return sxy / Math.sqrt(sxx * syy);
}
function ranks(v: number[]) {
  const idx = v.map((_, i) => i).sort((a, b) => v[a] - v[b]);
  const r = new Array<number>(v.length);
  let i = 0;
  while (i < idx.length) {
    let j = i;
    while (j + 1 < idx.length && v[idx[j + 1]] === v[idx[i]]) j++;
    for (let k = i; k <= j; k++) r[idx[k]] = (i + j) / 2 + 1; // 동점은 평균 순위
    i = j + 1;
  }
  return r;
}
const spearman = (p: Pt[]) => {
  const rx = ranks(p.map((q) => q[0]));
  const ry = ranks(p.map((q) => q[1]));
  return pearson(rx.map((v, i) => [v, ry[i]] as Pt));
};
const f2 = (v: number) => v.toFixed(2).replace('-', '−');

const PW = 164;
const PH = 110;
const PAD = 12;
const ROW = 182; // 패널 한 줄의 높이(제목 + 상자 + 글 두 줄)
const RGAP = 28;

type Panel = { title: string; pts: Pt[]; note: string; stat: string; mark: (p: Pt) => boolean; win?: boolean };

export default function CorrShapes() {
  const inWin = (p: Pt) => p[0] >= WIN[0] && p[0] <= WIN[1];
  const dWin = D.filter(inWin);
  const panels: Panel[] = [
    { title: '이상치 한 점', pts: B, note: '한 점이 r 을 키운다', stat: `r ${f2(pearson(B))} · ρ ${f2(spearman(B))}`, mark: (p) => p[0] === 14 },
    { title: 'U자 곡선', pts: C, note: '관계가 있어도 0 근처', stat: `r ${f2(pearson(C))} · ρ ${f2(spearman(C))}`, mark: () => false },
    { title: '구간 제한', pts: D, note: '좁히면 r 이 줄어든다', stat: `r ${f2(pearson(D))} → ${f2(pearson(dWin))}`, mark: inWin, win: true },
    { title: '단조 곡선', pts: E, note: '순위는 거의 일치한다', stat: `r ${f2(pearson(E))} · ρ ${f2(spearman(E))}`, mark: () => false },
  ];
  const H = 8 + 2 * ROW + RGAP + 8;
  return (
    <svg viewBox={`0 0 360 ${H}`} role="img" aria-label="가상 데이터 산점도 네 장. 이상치 한 점이 상관계수를 키우고, U자 곡선은 관계가 있어도 상관계수가 0에 가깝고, 구간을 좁히면 상관계수가 줄고, 단조 곡선은 피어슨보다 스피어먼이 높다.">
      {panels.map((p, i) => {
        const x0 = 8 + (i % 2) * (PW + 16);
        const y0 = 8 + Math.floor(i / 2) * (ROW + RGAP);
        const bx = x0;
        const by = y0 + 26;
        const xs = p.pts.map((q) => q[0]);
        const ys = p.pts.map((q) => q[1]);
        const xmin = Math.min(...xs), xmax = Math.max(...xs), ymin = Math.min(...ys), ymax = Math.max(...ys);
        const sx = (v: number) => bx + PAD + ((v - xmin) / (xmax - xmin)) * (PW - 2 * PAD);
        const sy = (v: number) => by + PH - PAD - ((v - ymin) / (ymax - ymin)) * (PH - 2 * PAD);
        return (
          <g key={p.title}>
            <text className="t-strong" x={x0} y={y0 + 14}>{p.title}</text>
            <rect className="svg-box" x={bx} y={by} width={PW} height={PH} rx="8" />
            {p.win && <rect x={sx(WIN[0])} y={by + 1} width={sx(WIN[1]) - sx(WIN[0])} height={PH - 2} fill="var(--accent-soft)" />}
            {p.pts.map((q, k) => (
              <circle key={k} cx={sx(q[0])} cy={sy(q[1])} r={p.mark(q) ? 3.2 : 2.6} fill={p.mark(q) ? 'var(--warm)' : 'var(--muted)'} />
            ))}
            <text className="t-strong" x={x0} y={by + PH + 22}>{p.stat}</text>
            <text className="t-sub" x={x0} y={by + PH + 42}>{p.note}</text>
          </g>
        );
      })}
    </svg>
  );
}
