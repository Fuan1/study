/**
 * 출처 값: McConnell(Construx) 불확실성 원뿔 설명. 초기 개념 단계는 4배 높거나 4배 낮게(0.25배), 높은 값 대 낮은 값 16배.
 * 제품 정의 승인 단계는 높은 값 대 낮은 값 4배, UI 설계 완료 단계는 1.6배(같은 글의 반복 개발 절).
 * 양 끝 값은 중심 1배를 기준으로 양쪽에 같은 비율로 나눈 이 글의 계산이다(제곱근).
 * 막대 폭은 비율의 로그(밑 2)에 비례한다.
 */
type Row = { label: string; ratio: number };

const ROWS: Row[] = [
  { label: '초기 개념', ratio: 16 },
  { label: '제품 정의 승인', ratio: 4 },
  { label: 'UI 설계 완료', ratio: 1.6 },
];

const CX = 180;
const PER_DOUBLING = 60; // 비율이 2배가 될 때 막대가 길어지는 만큼(px): 한쪽으로는 30px
const TOP = 8;
const PITCH = 72;
const BAR_DY = 26;
const BAR_H = 22;
const fmt = (n: number) => (Number.isInteger(n) ? `${n}` : `${+n.toFixed(2)}`);
const rowY = (i: number) => TOP + i * PITCH;
const lastBottom = rowY(ROWS.length - 1) + BAR_DY + BAR_H;
const LEGEND_Y = lastBottom + 28;
const VB_H = LEGEND_Y + 4 + 8;

export default function ConeBars() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="최선의 경우 추정의 폭. 초기 개념에서는 높은 값과 낮은 값의 비율이 16배, 제품 정의 승인에서는 4배, UI 설계 완료에서는 1.6배로 줄어든다.">
      {ROWS.map((r, i) => {
        const y = rowY(i);
        const w = Math.log2(r.ratio) * PER_DOUBLING;
        const half = Math.sqrt(r.ratio);
        return (
          <g key={r.label}>
            <text className="t-strong" x="8" y={y + 14}>{r.label}</text>
            <text className="t-sub" x="352" y={y + 14} textAnchor="end">높은 값 대 낮은 값 {fmt(r.ratio)}배</text>
            <rect className="svg-berg" x={CX - w / 2} y={y + BAR_DY} width={w} height={BAR_H} rx="4" />
            <line x1={CX} y1={y + BAR_DY - 4} x2={CX} y2={y + BAR_DY + BAR_H + 4} stroke="var(--warm)" strokeWidth="1.5" />
            <text className="t-sub" x={CX - w / 2 - 8} y={y + BAR_DY + 16} textAnchor="end">{fmt(1 / half)}배</text>
            <text className="t-sub" x={CX + w / 2 + 8} y={y + BAR_DY + 16}>{fmt(half)}배</text>
          </g>
        );
      })}
      <text className="t-sub" x={CX} y={LEGEND_Y} textAnchor="middle">가운데 선이 추정 중심(1배)</text>
    </svg>
  );
}
