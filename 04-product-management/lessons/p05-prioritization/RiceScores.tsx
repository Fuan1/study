/**
 * 출처 값: Intercom RICE 글(McBride 2018)의 세 예시 입력.
 * 점수는 도달 × 영향 × 확신 ÷ 노력으로 계산한다. 둘째 줄은 노력을 모두 1 인월 크게 잡은 민감도 시험이다.
 */
type Project = { name: string; reach: number; impact: number; conf: number; effort: number };
const PROJECTS: Project[] = [
  { name: '프로젝트 1', reach: 450, impact: 3, conf: 1, effort: 2 },
  { name: '프로젝트 2', reach: 2000, impact: 1, conf: 0.8, effort: 4 },
  { name: '프로젝트 3', reach: 800, impact: 2, conf: 0.5, effort: 1 },
];

const score = (p: Project, extraEffort: number) => (p.reach * p.impact * p.conf) / (p.effort + extraEffort);
const ranks = (extra: number) => {
  const s = PROJECTS.map((p) => score(p, extra));
  return s.map((v) => s.filter((o) => o > v).length + 1);
};
const RANK_A = ranks(0);
const RANK_B = ranks(1);

const BX = 84;
const SCALE = 180 / 800;
const BH = 22;
const GROUP = 102;
const TOP = 8;
const fmt = (v: number) => String(Math.round(v));

export default function RiceScores() {
  const lastTop = TOP + 2 * GROUP + 24 + BH + 10;
  const VB_H = lastTop + BH + 1 + 8;
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="RICE 점수 세 예시. 노력을 1 인월씩 크게 잡으면 1위가 프로젝트 3에서 프로젝트 1로 바뀐다.">
      {PROJECTS.map((p, i) => {
        const y0 = TOP + i * GROUP;
        const rows = [
          { label: '원 입력', extra: 0, rank: RANK_A[i], cls: 'svg-berg' },
          { label: '노력 +1', extra: 1, rank: RANK_B[i], cls: 'svg-box' },
        ];
        return (
          <g key={p.name}>
            <text className="t-strong" x="8" y={y0 + 14}>{p.name}</text>
            <text className="t-sub" x="352" y={y0 + 14} textAnchor="end">
              {p.reach} · {p.impact} · {Math.round(p.conf * 100)}% · {p.effort}
            </text>
            {rows.map((r, j) => {
              const top = y0 + 24 + j * (BH + 10);
              const v = score(p, r.extra);
              const w = v * SCALE;
              return (
                <g key={r.label}>
                  <text className="t-sub" x="8" y={top + 16}>{r.label}</text>
                  <rect className={r.cls} x={BX} y={top} width={w} height={BH} rx="4" />
                  <text className={r.rank === 1 ? 't-strong' : 't-sub'} x={BX + w + 8} y={top + 16}>{fmt(v)} · {r.rank}위</text>
                </g>
              );
            })}
          </g>
        );
      })}
    </svg>
  );
}
