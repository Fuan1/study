/** 세그먼트 가중 총점(100점 환산). 점수와 가중치는 가정. 두 가중치 세트에서 순위가 유지되는지 본다. */
const W_BASE = [20, 25, 25, 10, 20]; // 크기, 접근, 지불 의사, 경쟁 약함, 적합
const W_SIZE = [35, 15, 20, 10, 20]; // 크기를 중시한 세트
const total = (s: number[], w: number[]) => s.reduce((a, x, i) => a + x * w[i], 0) / 5;

const SEGS = [
  { name: 'C 헬스장 회원 직장인', s: [3, 4, 5, 4, 4], out: false },
  { name: 'A IT 기업 밀집 사무실', s: [2, 5, 4, 3, 5], out: false },
  { name: 'B 일반 사무실 직장인', s: [5, 3, 3, 2, 3], out: false },
  { name: 'D 20대 다이어트 중인 사람', s: [4, 2, 3, 1, 2], out: true },
].map((g) => ({ ...g, a: total(g.s, W_BASE), b: total(g.s, W_SIZE) }));

const X0 = 8;
const SC = 2.5; // 100점 = 250px
const BAR_H = 16;
const TOP = 44;
const PITCH = 80;
const gy = (i: number) => TOP + i * PITCH;
const VB_H = Math.ceil(gy(SEGS.length - 1) + 22 + BAR_H + 4 + BAR_H + 1 + 12);

export default function SegmentScore() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label={`세그먼트 가중 총점. ${SEGS.map((g) => `${g.name} 기본 ${g.a}점, 크기 중시 ${g.b}점${g.out ? ', 접근 용이성 하한 미달로 탈락' : ''}`).join('. ')}.`}>
      <rect className="svg-berg" x={X0} y="6" width="12" height="12" rx="2" />
      <text className="t-sub" x="26" y="17">기본 가중치</text>
      <rect className="svg-tip" x="140" y="6" width="12" height="12" rx="2" />
      <text className="t-sub" x="158" y="17">크기 중시 가중치</text>
      {SEGS.map((g, i) => (
        <g key={g.name}>
          <text className="t-strong" x={X0} y={gy(i) + 14}>{g.name}</text>
          <rect className="svg-berg" x={X0} y={gy(i) + 22} width={g.a * SC} height={BAR_H} rx="3" />
          <text className="t-sub" x={X0 + g.a * SC + 6} y={gy(i) + 35}>{g.a}</text>
          <rect className="svg-tip" x={X0} y={gy(i) + 22 + BAR_H + 4} width={g.b * SC} height={BAR_H} rx="3" />
          <text className="t-sub" x={X0 + g.b * SC + 6} y={gy(i) + 22 + BAR_H + 4 + 13}>{g.b}</text>
          {g.out && <text className="t-bad" x="352" y={gy(i) + 14} textAnchor="end">접근 2점 탈락</text>}
        </g>
      ))}
    </svg>
  );
}
