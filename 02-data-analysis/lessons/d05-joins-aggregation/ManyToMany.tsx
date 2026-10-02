/** 가상 데이터: 같은 customer_id 로 방문(visits)과 주문(orders)을 조인할 때 고객별 행 수가 곱이 되는 것을 보인다. */
const VISITS: Record<string, string[]> = { c1: ['05-01', '05-02', '05-03'], c2: ['05-01', '05-04'] };
const ORDER_IDS: Record<string, number[]> = { c1: [1, 2], c2: [3] };

// 여백 기준: 칸 100x42(글자 위아래 13px 이상), 칸 간격 6, 고객 묶음 사이 24, 열 제목은 칸 위 8px 이상.
const RX = 8;
const CX = 100;
const CW = 100;
const CH = 42;
const GAP = 6;
const PITCH = CH + GAP;

export default function ManyToMany() {
  const keys = Object.keys(VISITS);
  let y = 8;
  let n = 0;
  const groups = keys.map((k) => {
    const vs = VISITS[k];
    const os = ORDER_IDS[k];
    const g = { k, vs, os, y, start: n };
    n += vs.length * os.length;
    y += 50 + vs.length * PITCH - GAP + 24;
    return g;
  });
  const total = n;
  const nVisits = keys.reduce((a, k) => a + VISITS[k].length, 0);
  const nOrders = keys.reduce((a, k) => a + ORDER_IDS[k].length, 0);
  const noteY = y + 12;
  const H = noteY + 6 + 8;
  return (
    <svg viewBox={`0 0 360 ${H}`} role="img" aria-label={`방문과 주문을 고객 키로만 조인하면 c1 은 ${VISITS.c1.length}×${ORDER_IDS.c1.length}행, c2 는 ${VISITS.c2.length}×${ORDER_IDS.c2.length}행, 합계 ${total}행이 된다.`}>
      {groups.map((g) => (
        <g key={g.k}>
          <text className="t-bad" x="8" y={g.y + 14}>{g.k} · 방문 {g.vs.length} × 주문 {g.os.length} = {g.vs.length * g.os.length}행</text>
          {g.os.map((o, c) => (
            <text key={o} className="t-sub" x={CX + c * (CW + GAP) + CW / 2} y={g.y + 38} textAnchor="middle">주문 {o}</text>
          ))}
          {g.vs.map((v, r) => (
            <g key={v}>
              <text className="t-sub" x={RX} y={g.y + 50 + r * PITCH + 26}>방문 {v}</text>
              {g.os.map((o, c) => (
                <g key={o}>
                  <rect className="svg-box-bad" x={CX + c * (CW + GAP)} y={g.y + 50 + r * PITCH} width={CW} height={CH} rx="6" />
                  <text className="t-strong" x={CX + c * (CW + GAP) + CW / 2} y={g.y + 50 + r * PITCH + 26} textAnchor="middle">행 {g.start + r * g.os.length + c + 1}</text>
                </g>
              ))}
            </g>
          ))}
        </g>
      ))}
      <text className="t-sub" x="8" y={noteY}>합계 {total}행 (원본: 방문 {nVisits}행, 주문 {nOrders}행)</text>
    </svg>
  );
}
