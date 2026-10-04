/**
 * 출처 값: Oxford 3000 목록 페이지(2026년 10월 확인)의 항목별 CEFR 등급.
 * happy A1, unhappy A2, happiness B1 / friend A1, friendly A1, friendship B1 / care A2, careful A2, careless B1.
 */
type Item = { w: string; lv: string; tag: string };
const FAMILIES: Item[][] = [
  [{ w: 'happy', lv: 'A1', tag: '줄기' }, { w: 'unhappy', lv: 'A2', tag: 'un-' }, { w: 'happiness', lv: 'B1', tag: '-ness' }],
  [{ w: 'friend', lv: 'A1', tag: '줄기' }, { w: 'friendly', lv: 'A1', tag: '-ly' }, { w: 'friendship', lv: 'B1', tag: '-ship' }],
  [{ w: 'care', lv: 'A2', tag: '줄기' }, { w: 'careful', lv: 'A2', tag: '-ful' }, { w: 'careless', lv: 'B1', tag: '-less' }],
];

const cls = (lv: string) => (lv === 'A1' ? 'svg-berg' : lv === 'A2' ? 'svg-box' : 'svg-tip');
const BW = 104;
const BH = 66;
const CG = 16;
const RG = 22;

export default function FamilyBundle() {
  const VB_H = 8 + 3 * BH + 2 * RG + 8;
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="줄기 단어와 파생어를 한 묶음으로 본다. happy 는 A1, unhappy 는 A2, happiness 는 B1 처럼 파생할수록 등급이 올라가는 경우가 많다.">
      {FAMILIES.map((fam, c) => {
        const cx = 8 + c * (BW + CG);
        return (
          <g key={fam[0].w}>
            {fam.map((it, r) => {
              const y = 8 + r * (BH + RG);
              return (
                <g key={it.w}>
                  {r > 0 && <line className="svg-flow" x1={cx + BW / 2} y1={y - RG + 0} x2={cx + BW / 2} y2={y} />}
                  <rect className={cls(it.lv)} x={cx} y={y} width={BW} height={BH} rx="8" />
                  <text className="t-strong" x={cx + BW / 2} y={y + 28} textAnchor="middle">{it.w}</text>
                  <text className="t-sub" x={cx + BW / 2} y={y + 48} textAnchor="middle">{it.lv} · {it.tag}</text>
                </g>
              );
            })}
          </g>
        );
      })}
    </svg>
  );
}
