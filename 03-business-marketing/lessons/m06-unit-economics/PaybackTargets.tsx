/**
 * 출처 값: 회수 기간 목표(개월). Skok 정의 페이지(12개월 미만, 엔터프라이즈 land-and-expand 는 20개월까지)와
 * Bessemer (2021) Scaling to $100 Million(SMB 12, 중견 18, 엔터프라이즈 24개월 미만). 모두 SaaS 기준이다.
 */
type Row = { label: string; months: number; text: string; src: 'skok' | 'bvp' };
const GROUPS: { head: string; rows: Row[] }[] = [
  {
    head: 'Skok 정의 페이지',
    rows: [
      { label: '일반', months: 12, text: '12개월 미만', src: 'skok' },
      { label: '엔터프라이즈', months: 20, text: '최대 20개월', src: 'skok' },
    ],
  },
  {
    head: 'Bessemer 2021 보고서',
    rows: [
      { label: 'SMB 대상', months: 12, text: '12개월 미만', src: 'bvp' },
      { label: '중견 대상', months: 18, text: '18개월 미만', src: 'bvp' },
      { label: '엔터프라이즈 대상', months: 24, text: '24개월 미만', src: 'bvp' },
    ],
  },
];

const BX = 132;
const SCALE = 130 / 24;
const BH = 22;
const PITCH = 36;
const HEAD_GAP = 24;

let y = 8;
const layout = GROUPS.map((g) => {
  const headY = y + 14;
  y += 14 + 12;
  const rows = g.rows.map((r) => {
    const top = y;
    y += PITCH;
    return { ...r, top };
  });
  y += HEAD_GAP - (PITCH - BH);
  return { head: g.head, headY, rows };
});
const lastBottom = layout[layout.length - 1].rows.slice(-1)[0].top + BH;
const VB_H = lastBottom + 12;

export default function PaybackTargets() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="CAC 회수 기간 목표는 Skok 가 12개월 미만(엔터프라이즈는 20개월까지), Bessemer 가 SMB 12개월, 중견 18개월, 엔터프라이즈 24개월 미만으로 판매 방식에 따라 다르다.">
      {layout.map((g) => (
        <g key={g.head}>
          <text className="t-strong" x="8" y={g.headY}>{g.head}</text>
          {g.rows.map((r) => (
            <g key={r.label}>
              <text className="t-sub" x="8" y={r.top + 16}>{r.label}</text>
              <rect className={r.src === 'bvp' ? 'svg-berg' : 'svg-box'} x={BX} y={r.top} width={r.months * SCALE} height={BH} rx="4" />
              <text className="t-sub" x={BX + r.months * SCALE + 8} y={r.top + 16}>{r.text}</text>
            </g>
          ))}
        </g>
      ))}
    </svg>
  );
}
