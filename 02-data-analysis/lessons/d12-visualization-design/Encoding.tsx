/** 같은 다섯 값(가정)을 파이와 정렬한 가로 막대로 그린다. 각도와 길이는 값에서 계산한다. */
const DATA = [
  { n: '검색', v: 24 },
  { n: '광고', v: 22 },
  { n: '추천', v: 21 },
  { n: 'SNS', v: 18 },
  { n: '메일', v: 15 },
];
const SUM = DATA.reduce((a, d) => a + d.v, 0);
const MAX = Math.max(...DATA.map((d) => d.v));

const CX = 98;
const R = 36;
const ROW0 = 100; // 막대 첫 행 y
const PITCH = 34;
const BH = 22;
const CY = ROW0 + (4 * PITCH + BH) / 2; // 파이 중심을 막대 묶음 세로 가운데에 맞춘다

const pt = (deg: number, r: number) => {
  const a = (deg * Math.PI) / 180;
  return [CX + r * Math.sin(a), CY - r * Math.cos(a)] as const;
};

export default function Encoding() {
  let acc = 0;
  const bx = 244;
  const bmax = 84;
  const bottom = ROW0 + 4 * PITCH + BH;
  const vbH = bottom + 6 + 1 + 12; // 세로 기준선이 아래로 6 더 나온다
  return (
    <svg viewBox={`0 0 360 ${vbH}`} role="img" aria-label="같은 다섯 값을 파이와 가로 막대로 그린 그림. 파이는 22, 21처럼 가까운 조각의 순서가 보이지 않고, 정렬한 막대는 순서와 차이가 길이로 읽힌다.">
      <text className="t-bad" x="8" y="20">나쁜 차트</text>
      <text className="t-strong" x="8" y="42">파이: 순위가 안 읽힌다</text>
      <text className="t-good" x="204" y="20">고친 차트</text>
      <text className="t-strong" x="204" y="42">막대: 길이로 읽힌다</text>
      <text className="t-sub" x="8" y="72">가입 채널별 비중(%), 가정 데이터</text>
      {DATA.map((d, i) => {
        const a0 = (acc / SUM) * 360;
        acc += d.v;
        const a1 = (acc / SUM) * 360;
        const mid = (a0 + a1) / 2;
        const [x0, y0] = pt(a0, R);
        const [x1, y1] = pt(a1, R);
        const [lx, ly] = pt(mid, R + 8);
        const right = lx >= CX;
        const fill = i === 0 ? 'var(--warm)' : 'var(--muted)';
        return (
          <g key={d.n}>
            <path d={`M${CX},${CY} L${x0.toFixed(1)},${y0.toFixed(1)} A${R},${R} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${x1.toFixed(1)},${y1.toFixed(1)} Z`} fill={fill} stroke="var(--bg)" strokeWidth="2" />
            <text className="t-sub" x={lx} y={ly + 4} textAnchor={right ? 'start' : 'end'}>{d.n} {d.v}</text>
            <text className="t-sub" x={204} y={ROW0 + i * PITCH + 16}>{d.n}</text>
            <rect x={bx} y={ROW0 + i * PITCH} width={(d.v / MAX) * bmax} height={BH} fill={fill} />
            <text className="t-sub" x={bx + (d.v / MAX) * bmax + 6} y={ROW0 + i * PITCH + 16}>{d.v}</text>
          </g>
        );
      })}
      <line x1={bx} y1={ROW0 - 6} x2={bx} y2={bottom + 6} stroke="var(--ink)" strokeWidth="1.5" />
    </svg>
  );
}
