/**
 * 출처 값: Flyvbjerg(2006)가 소개한 영국 교통부 2004 절차의 비용 초과 보정치(건설비, 불변가격).
 * 도로는 완료된 비슷한 사업 172건의 분포에서 나온 값이다. 확신 수준은 "초과 위험"의 보수:
 * 50% 확신 = 초과 위험 50% 감수, 80% 확신 = 위험 20%, 90% 확신 = 위험 10%.
 * 철도 80% 값은 확인한 문장이 없어 싣지 않았다.
 */
type Group = { head: string; rows: { label: string; v: number }[] };

const GROUPS: Group[] = [
  { head: '도로 (완료 사업 172건 기준)', rows: [{ label: '50% 확신', v: 15 }, { label: '80% 확신', v: 32 }, { label: '90% 확신', v: 45 }] },
  { head: '철도', rows: [{ label: '50% 확신', v: 40 }, { label: '90% 확신', v: 68 }] },
];

const BX = 96;
const MAX = 68;
const SCALE = 200 / MAX;
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

export default function UpliftBars() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="영국 교통부 절차의 비용 보정치. 도로는 50% 확신에 15%, 80% 확신에 32%, 90% 확신에 45%를 더하고, 철도는 50% 확신에 40%, 90% 확신에 68%를 더한다. 확신을 높일수록 더해야 할 여유가 커진다.">
      {layout.map((g) => (
        <g key={g.head}>
          <text className="t-strong" x="8" y={g.headY}>{g.head}</text>
          {g.rows.map((r) => (
            <g key={r.label}>
              <text className="t-sub" x="8" y={r.top + 16}>{r.label}</text>
              <rect className="svg-berg" x={BX} y={r.top} width={r.v * SCALE} height={BH} rx="4" />
              <text className="t-sub" x={BX + r.v * SCALE + 8} y={r.top + 16}>+{r.v}%</text>
            </g>
          ))}
        </g>
      ))}
    </svg>
  );
}
