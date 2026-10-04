/**
 * 이 글의 정리. 카드 한 장에는 뜻 하나와 그 뜻의 예문 한 줄만 둔다.
 * 예문은 직접 작성했고 Oxford Learner's Dictionary 의 book 항목(명사 책, 동사 예약하다)으로 용법을 확인했다.
 */
type Card = { cls: string; l1: string; l1cls: string; l2: string; l3: string; l3cls: string };
const CARDS: Card[] = [
  { cls: 'svg-box-bad', l1: '나쁜 카드 1장 · 앞: book', l1cls: 't-strong', l2: '뒤: 책 / 예약하다', l3: '뜻 둘이 한 장에 있다', l3cls: 't-bad' },
  { cls: 'svg-box-good', l1: '카드 1 · 앞: book', l1cls: 't-strong', l2: '뒤: 책 · I read a book every week.', l3: '뜻 하나, 예문 한 줄', l3cls: 't-good' },
  { cls: 'svg-box-good', l1: '카드 2 · 앞: book', l1cls: 't-strong', l2: '뒤: 예약하다 · I booked a table for two.', l3: '뜻 하나, 예문 한 줄', l3cls: 't-good' },
];

const H = 86;
const BX = 8;
const BW = 344;
const TOPS = [8, 148, 250];

export default function CardDesign() {
  const VB_H = TOPS[2] + H + 12;
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="나쁜 카드는 book 한 장에 뜻 둘을 담는다. 고친 카드는 책과 예약하다를 각각 다른 카드에 예문 한 줄과 함께 둔다.">
      <defs>
        <marker id="card-ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      {CARDS.map((c, i) => (
        <g key={c.l1}>
          <rect className={c.cls} x={BX} y={TOPS[i]} width={BW} height={H} rx="8" />
          <text className={c.l1cls} x={BX + 14} y={TOPS[i] + 26}>{c.l1}</text>
          <text className="t-sub" x={BX + 14} y={TOPS[i] + 47}>{c.l2}</text>
          <text className={c.l3cls} x={BX + 14} y={TOPS[i] + 68}>{c.l3}</text>
        </g>
      ))}
      <line className="svg-flow" x1="180" y1={TOPS[0] + H + 8} x2="180" y2={TOPS[1] - 8} markerEnd="url(#card-ar)" />
      <text className="t-sub" x="196" y={TOPS[0] + H + 8 + 30}>뜻마다 카드를 나눈다</text>
    </svg>
  );
}
