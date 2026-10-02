/** 모든 항목을 강조하면 강조가 사라진다. 가정한 목록 예시이며 특정 서비스 화면이 아니다. */
const ROWS = ['주문 내역', '쿠폰함', '배송지 관리', '고객센터'];
const ROW_H = 44;
const ROW_PITCH = 56; // 행 사이 12
const TOP = 44;

function List({ x, marked }: { x: number; marked: number[] }) {
  return (
    <g>
      {ROWS.map((t, i) => {
        const y = TOP + i * ROW_PITCH;
        const on = marked.includes(i);
        return (
          <g key={t}>
            <rect className="svg-box" x={x} y={y} width="164" height={ROW_H} rx="8" />
            <text x={x + 14} y={y + 27} fontSize="13">{t}</text>
            {on && (
              <text className="t-warm" x={x + 150} y={y + 27} textAnchor="end" fontSize="12.5">NEW</text>
            )}
          </g>
        );
      })}
    </g>
  );
}

export default function OneEmphasis() {
  return (
    <svg viewBox="0 0 360 304" role="img" aria-label="네 항목 목록에서 모두에 NEW 표시를 달면 어느 것도 눈에 띄지 않고, 하나에만 달면 그 항목이 바로 눈에 띈다.">
      <text className="t-strong" x="8" y="22">Before · 넷 모두 강조</text>
      <text className="t-strong" x="188" y="22">After · 하나만 강조</text>
      <List x={8} marked={[0, 1, 2, 3]} />
      <List x={188} marked={[1]} />
      <text className="t-bad" x="8" y="292">어느 것도 튀지 않는다</text>
      <text className="t-good" x="188" y="292">쿠폰함이 먼저 보인다</text>
    </svg>
  );
}
