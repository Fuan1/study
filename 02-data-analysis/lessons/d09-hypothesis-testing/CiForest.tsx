/** 가상의 네 결과(결제 소요 시간 단축, 초, 양수가 개선). 두 집단 크기와 표준편차가 같다고 두고
 *  구간 = 차이 ± t * sd * sqrt(2/n). tcrit 는 python scipy.stats.t.ppf(0.975, 2n-2) 로 계산한 값이다.
 *  의미 있는 최소 단축은 3초로 가정했다. */
type Case = { label: string; n: number; sd: number; diff: number; tcrit: number };

const CASES: Case[] = [
  { label: 'A. 유의하고 의미 있음', n: 300, sd: 18, diff: 6.0, tcrit: 1.96394 },
  { label: 'B. 유의하지만 의미 작음', n: 5000, sd: 18, diff: 1.0, tcrit: 1.96020 },
  { label: 'C. 유의하지 않고 폭 넓음', n: 60, sd: 18, diff: 3.0, tcrit: 1.98027 },
  { label: 'D. 유의하지 않고 폭 좁음', n: 5000, sd: 18, diff: 0.2, tcrit: 1.96020 },
];
const MIN_EFFECT = 3;

const X0 = 16;
const X1 = 344;
const VMIN = -4;
const VMAX = 10;
const xOf = (v: number) => X0 + ((v - VMIN) / (VMAX - VMIN)) * (X1 - X0);
const PITCH = 64;
const T = (i: number) => 10 + i * PITCH; // 행 상단
const IY = (i: number) => T(i) + 40; // 구간 선 y
const CAP = 6;
const LAST_BOTTOM = IY(CASES.length - 1) + CAP;
const GUIDE_BOTTOM = LAST_BOTTOM + 10;
const TEXT_Y = GUIDE_BOTTOM + 20;
const VB_H = TEXT_Y + 14; // 글자 아래 여백

const fmt = (v: number) => v.toFixed(1).replace('-', '−');
const halo = { stroke: 'var(--bg)', strokeWidth: 4, paintOrder: 'stroke' } as const;

export default function CiForest() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="네 가지 가상 결과의 95퍼센트 신뢰구간. A는 구간 전체가 의미 있는 최소 단축 3초보다 오른쪽이다. B는 0보다 오른쪽이지만 3초에 못 미친다. C는 0과 3초와 9초를 모두 포함해 판단할 수 없다. D는 구간이 좁고 3초에 못 미쳐 의미 있는 효과가 없다고 볼 수 있다.">
      <line x1={xOf(0)} y1="8" x2={xOf(0)} y2={GUIDE_BOTTOM} stroke="var(--line)" strokeWidth="1.5" />
      <line x1={xOf(MIN_EFFECT)} y1="8" x2={xOf(MIN_EFFECT)} y2={GUIDE_BOTTOM} stroke="var(--warm)" strokeWidth="1.5" strokeDasharray="5 3" />
      {CASES.map((c, i) => {
        const se = c.sd * Math.sqrt(2 / c.n);
        const lo = c.diff - c.tcrit * se;
        const hi = c.diff + c.tcrit * se;
        return (
          <g key={c.label}>
            <text className="t-strong" x="16" y={T(i) + 14} {...halo}>{c.label}</text>
            <text className="t-sub" x="344" y={T(i) + 14} textAnchor="end" {...halo}>{fmt(lo)} ~ {fmt(hi)}</text>
            <line x1={xOf(lo)} y1={IY(i)} x2={xOf(hi)} y2={IY(i)} stroke="var(--accent)" strokeWidth="2.5" />
            <line x1={xOf(lo)} y1={IY(i) - CAP} x2={xOf(lo)} y2={IY(i) + CAP} stroke="var(--accent)" strokeWidth="2.5" />
            <line x1={xOf(hi)} y1={IY(i) - CAP} x2={xOf(hi)} y2={IY(i) + CAP} stroke="var(--accent)" strokeWidth="2.5" />
            <circle cx={xOf(c.diff)} cy={IY(i)} r="4.5" fill="var(--warm)" />
          </g>
        );
      })}
      <text className="t-sub" x={xOf(0) + 6} y={TEXT_Y} textAnchor="end">0: 차이 없음</text>
      <text className="t-warm" x={xOf(MIN_EFFECT) - 6} y={TEXT_Y}>3초: 최소 기준</text>
    </svg>
  );
}
