/** 월 매출을 곱셈으로 분해한 지표 트리. 숫자는 모두 가정이며 코드에서 계산한다. */
const visitors = 50000;
const cvr = 0.03;
const buyers = visitors * cvr; // 1,500
const ordersPerBuyer = 1.4;
const aov = 35000;
const revPerBuyer = ordersPerBuyer * aov; // 49,000
const revenue = buyers * revPerBuyer; // 73,500,000
const n = (v: number) => v.toLocaleString('en-US');

type Row = { label: string; value: string; formula?: string; level: 0 | 1 | 2; gap: number; key?: boolean };

// gap: 바로 위 상자와의 간격. 다른 묶음으로 넘어갈 때는 24 이상.
const ROWS: Row[] = [
  { label: '월 매출', value: `${n(revenue)}원`, formula: '= 구매자 수 × 구매자당 매출', level: 0, gap: 0, key: true },
  { label: '구매자 수', value: `${n(buyers)}명`, formula: '= 방문자 × 전환율', level: 1, gap: 24 },
  { label: '방문자', value: `${n(visitors)}명`, level: 2, gap: 16 },
  { label: '전환율', value: `${(cvr * 100).toFixed(1)}%`, level: 2, gap: 12 },
  { label: '구매자당 매출', value: `${n(revPerBuyer)}원`, formula: '= 주문 수 × 주문당 금액', level: 1, gap: 24 },
  { label: '구매자당 주문 수', value: `${ordersPerBuyer}건`, level: 2, gap: 16 },
  { label: '주문당 금액', value: `${n(aov)}원`, level: 2, gap: 12 },
];

const RIGHT = 352;
const INDENT = 30;
const heightOf = (r: Row) => (r.formula ? 68 : 38);

const layout = (() => {
  let y = 8;
  return ROWS.map((r) => {
    y += r.gap;
    const top = y;
    y += heightOf(r);
    const x = 8 + r.level * INDENT;
    return { ...r, top, h: heightOf(r), x, w: RIGHT - x };
  });
})();
const LAST = layout[layout.length - 1];
const VB_H = LAST.top + LAST.h + 1 + 8;

export default function MetricTree() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="월 매출을 구매자 수와 구매자당 매출의 곱으로 나누고, 다시 방문자, 전환율, 주문 수, 주문당 금액으로 나눈 지표 트리. 가정한 수치로 계산했다.">
      {layout.map((parent, pi) => {
        const kids: typeof layout = [];
        for (let j = pi + 1; j < layout.length && layout[j].level > parent.level; j += 1) {
          if (layout[j].level === parent.level + 1) kids.push(layout[j]);
        }
        if (kids.length === 0) return null;
        const lx = parent.x + 14;
        const mid = (k: (typeof layout)[number]) => k.top + k.h / 2;
        return (
          <g key={`c${parent.label}`}>
            <line className="svg-flow" x1={lx} y1={parent.top + parent.h} x2={lx} y2={mid(kids[kids.length - 1])} />
            {kids.map((k) => (
              <line key={k.label} className="svg-flow" x1={lx} y1={mid(k)} x2={k.x} y2={mid(k)} />
            ))}
          </g>
        );
      })}
      {layout.map((r) => (
        <g key={r.label}>
          <rect className={r.key ? 'svg-box-key' : r.level === 1 ? 'svg-berg' : 'svg-box'} x={r.x} y={r.top} width={r.w} height={r.h} rx="8" />
          <text className="t-strong" x={r.x + 14} y={r.top + (r.formula ? 29 : 24)}>{r.label}</text>
          <text className="t-strong" x={RIGHT - 14} y={r.top + (r.formula ? 29 : 24)} textAnchor="end">{r.value}</text>
          {r.formula && <text className="t-sub" x={r.x + 14} y={r.top + 50}>{r.formula}</text>}
        </g>
      ))}
    </svg>
  );
}
