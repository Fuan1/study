/** 같은 주문 데이터를 세 가지 단위로 담은 표의 모양. 값은 모두 가상이다. */
type Block = { title: string; head: string[]; rows: string[][]; widths: number[] };

const BLOCKS: Block[] = [
  {
    title: '사건 단위: 주문 상품 한 줄이 한 행',
    head: ['주문', '상품', '수량'],
    rows: [['A01', '상품 가', '1'], ['A01', '상품 나', '2']],
    widths: [114, 130, 100],
  },
  {
    title: '기간 단위: 고객의 한 달이 한 행',
    head: ['고객', '월', '주문 수'],
    rows: [['고객 1', '1월', '2'], ['고객 1', '2월', '0']],
    widths: [114, 130, 100],
  },
  {
    title: '진행 단위: 주문 하나가 한 행',
    head: ['주문', '결제', '배송', '도착'],
    rows: [['A01', '3/1', '3/2', '3/4'], ['A02', '3/1', '3/3', '비어 있음']],
    widths: [76, 76, 76, 116],
  },
];

// 여백 기준: 표 행 높이 40(글자 위아래 12px 이상), 표 제목은 표 위 8px 이상, 표 사이 24px 이상.
const RH = 40;
const PITCH = 180; // 제목 24 + 표 120 + 표 아래 36(다음 제목 윗변까지 24 이상)
const TOP = 8;
const X0 = 8;

export default function GrainTables() {
  const bottom = TOP + (BLOCKS.length - 1) * PITCH + 24 + 3 * RH;
  return (
    <svg viewBox={`0 0 360 ${bottom + 9}`} role="img" aria-label="같은 주문 데이터를 세 가지 단위로 담은 표. 사건 단위는 주문 상품 한 줄이 한 행이라 같은 주문이 두 행이 된다. 기간 단위는 고객의 한 달이 한 행이라 주문이 없는 달도 행이 있고 값은 0이다. 진행 단위는 주문 하나가 한 행이고 단계 날짜가 칸으로 채워진다.">
      {BLOCKS.map((b, bi) => {
        const y0 = TOP + bi * PITCH;
        const ty = y0 + 24; // 표 윗변
        let cx = X0;
        const xs = b.widths.map((w) => { const s = cx; cx += w; return s; });
        return (
          <g key={b.title}>
            <text className="t-strong" x={X0} y={y0 + 12}>{b.title}</text>
            <rect className="svg-box" x={X0} y={ty} width="344" height={3 * RH} rx="6" />
            <line x1={X0} y1={ty + RH} x2={X0 + 344} y2={ty + RH} stroke="var(--line)" />
            <line x1={X0} y1={ty + 2 * RH} x2={X0 + 344} y2={ty + 2 * RH} stroke="var(--line)" strokeDasharray="2 3" />
            {b.head.map((h, ci) => (
              <text key={h} className="t-sub" x={xs[ci] + 12} y={ty + 25}>{h}</text>
            ))}
            {b.rows.map((row, ri) =>
              row.map((v, ci) => (
                <text key={`${ri}-${ci}`} x={xs[ci] + 12} y={ty + (ri + 1) * RH + 25} fontSize="13">{v}</text>
              )),
            )}
          </g>
        );
      })}
    </svg>
  );
}
