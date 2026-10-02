/** 형태 예시(가상 값). 후보 세그먼트의 기준별 점수(1-5)와 가중 총점(100점 환산). 접근·지불이 2점 이하면 탈락. */
const CRITERIA = ['크기', '접근', '지불', '경쟁', '적합'];
const WEIGHTS = [20, 25, 25, 10, 20];
const total = (s: number[]) => s.reduce((a, v, i) => a + v * WEIGHTS[i], 0) / 5;

const SEGS = [
  { name: 'C 헬스장 회원 직장인', s: [3, 4, 5, 4, 4] },
  { name: 'A IT 기업 밀집 사무실', s: [2, 5, 4, 3, 5] },
  { name: 'B 일반 사무실 직장인', s: [5, 3, 3, 2, 3] },
  { name: 'D 20대 다이어트 중인 사람', s: [4, 2, 3, 1, 2] },
].map((g) => ({ ...g, t: total(g.s), out: g.s[1] <= 2 || g.s[2] <= 2 }));
const BEST = Math.max(...SEGS.filter((g) => !g.out).map((g) => g.t));

const CW = 50;
const CG = 6;
const CH = 44;
const X0 = 8;
const TX = X0 + 5 * CW + 4 * CG + 12; // 총점 상자 x
const TW = 352 - TX;
const HEAD = 16; // 기준 이름 baseline
const BLOCK0 = 68;
const PITCH = 92;
const by = (i: number) => BLOCK0 + i * PITCH; // 이름 baseline 은 by, 칸은 by+10
const cellY = (i: number) => by(i) + 10;
// 마지막 칸 아랫변 + 선 두께 절반 + 아래 여백 8
const VB_H = Math.ceil(cellY(SEGS.length - 1) + CH + 1 + 8);

export default function TargetGrid() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label={`세그먼트 선정표. ${SEGS.map((g) => `${g.name} 총점 ${g.t}점${g.out ? ', 접근 또는 지불이 2점 이하라 탈락' : ''}`).join('. ')}.`}>
      {CRITERIA.map((c, k) => {
        const cx = X0 + k * (CW + CG) + CW / 2;
        return (
          <g key={c}>
            <text className="t-strong" x={cx} y={HEAD} textAnchor="middle">{c}</text>
            <text className="t-sub" x={cx} y={HEAD + 20} textAnchor="middle">{WEIGHTS[k]}</text>
          </g>
        );
      })}
      <text className="t-strong" x={TX + TW / 2} y={HEAD} textAnchor="middle">총점</text>
      {SEGS.map((g, i) => (
        <g key={g.name}>
          <text className="t-strong" x={X0} y={by(i)}>{g.name}</text>
          {g.out && <text className="t-bad" x="352" y={by(i)} textAnchor="end">탈락</text>}
          {g.s.map((v, k) => {
            const bad = g.out && (k === 1 || k === 2) && v <= 2;
            return (
              <g key={k}>
                <rect className={bad ? 'svg-box-bad' : 'svg-box'} x={X0 + k * (CW + CG)} y={cellY(i)} width={CW} height={CH} rx="6" />
                {!bad && <rect x={X0 + k * (CW + CG) + 1} y={cellY(i) + 1} width={CW - 2} height={CH - 2} rx="5" fill="var(--accent-soft)" fillOpacity={v / 5} />}
                <text className={bad ? 't-bad' : 't-strong'} x={X0 + k * (CW + CG) + CW / 2} y={cellY(i) + 27} textAnchor="middle">{v}</text>
              </g>
            );
          })}
          <rect className={g.t === BEST && !g.out ? 'svg-box-key' : 'svg-box'} x={TX} y={cellY(i)} width={TW} height={CH} rx="6" />
          <text className="t-strong" x={TX + TW / 2} y={cellY(i) + 27} textAnchor="middle">{g.t}</text>
        </g>
      ))}
    </svg>
  );
}
