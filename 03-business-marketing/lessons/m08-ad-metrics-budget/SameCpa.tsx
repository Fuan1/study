/** 같은 CPA 66,667원이 세 가지 다른 원인에서 나온다. CPA = CPM ÷ (1000 × CTR × CVR). 값은 가정. */
type Params = { cpm: number; ctr: number; cvr: number };
const BASE: Params = { cpm: 10_000, ctr: 0.01, cvr: 0.03 };
const cpaOf = (p: Params) => p.cpm / (1000 * p.ctr * p.cvr);
const fmt = (n: number) => n.toLocaleString('en-US');
const ratio = (n: number) => (Math.round(n * 10) / 10).toString();

const CASES: { title: string; p: Params; off: 'cpm' | 'ctr' | 'cvr' }[] = [
  { title: 'A. CTR 절반 → 소재·타깃 의심', p: { ...BASE, ctr: BASE.ctr / 2 }, off: 'ctr' },
  { title: 'B. CVR 절반 → 랜딩·제안 의심', p: { ...BASE, cvr: BASE.cvr / 2 }, off: 'cvr' },
  { title: 'C. CPM 두 배 → 타깃·시기 의심', p: { ...BASE, cpm: BASE.cpm * 2 }, off: 'cpm' },
];

const BW = 108;
const BG = 10;
const BH = 66;
const TOP = 40;
const ROW_H = 24 + BH; // 제목 baseline 14 + 상자 시작 24
const PITCH = ROW_H + 24; // 묶음 사이 24px
const rowY = (i: number) => TOP + i * PITCH;
const LAST_BOTTOM = rowY(CASES.length - 1) + 24 + BH;
const VB_H = LAST_BOTTOM + 1 + 16;

export default function SameCpa() {
  const base = Math.round(cpaOf(BASE));
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label={`CPA가 ${fmt(Math.round(cpaOf(CASES[0].p)))}원으로 같아도 A는 CTR, B는 CVR, C는 CPM이 기준에서 어긋난 경우다. 기준 CPA는 ${fmt(base)}원이다.`}>
      <text className="t-strong" x="8" y="18">세 경우 모두 CPA {fmt(Math.round(cpaOf(CASES[0].p)))}원 (기준 {fmt(base)}원)</text>
      {CASES.map((c, i) => {
        const y = rowY(i);
        const items = [
          { key: 'cpm' as const, name: 'CPM', val: `${fmt(c.p.cpm)}원`, r: c.p.cpm / BASE.cpm },
          { key: 'ctr' as const, name: 'CTR', val: `${(c.p.ctr * 100).toFixed(1)}%`, r: c.p.ctr / BASE.ctr },
          { key: 'cvr' as const, name: 'CVR', val: `${(c.p.cvr * 100).toFixed(1)}%`, r: c.p.cvr / BASE.cvr },
        ];
        return (
          <g key={c.title}>
            <text className="t-strong" x="8" y={y + 14}>{c.title}</text>
            {items.map((it, j) => {
              const x = 8 + j * (BW + BG);
              const off = it.key === c.off;
              return (
                <g key={it.key}>
                  <rect className={off ? 'svg-tip' : 'svg-box'} x={x} y={y + 24} width={BW} height={BH} rx="8" />
                  <text className="t-sub" x={x + 14} y={y + 24 + 26}>{it.name} {ratio(it.r)}배</text>
                  <text className={off ? 't-warm' : 't-strong'} x={x + 14} y={y + 24 + 48}>{it.val}</text>
                </g>
              );
            })}
          </g>
        );
      })}
    </svg>
  );
}
