type Fill = { en: string; ko: string };

const FILLS: Fill[] = [
  { en: 'some rice?', ko: '밥 좀 드실래요?' },
  { en: 'a biscuit?', ko: '비스킷 드실래요?' },
  { en: 'to dance?', ko: '춤추실래요?' },
];

// 여백 기준: 두 줄 상자 높이 66, 머리말과 첫 상자 사이 24 이상, 상자 사이 12.
const BX = 140;
const BW = 360 - 8 - BX;
const H = 66;
const GAP = 12;
const TOP = 48;

export default function SlotTemplate() {
  const y = (i: number) => TOP + i * (H + GAP);
  const VB_H = y(FILLS.length - 1) + H + 12;
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="Would you like 는 고정하고 뒤의 칸만 바꾼다. some rice, another coffee, to dance 를 넣는다.">
      <text className="t-sub" x="8" y="22">그대로 외운다</text>
      <text className="t-sub" x={BX} y="22">바꾸는 칸</text>
      {FILLS.map((f, i) => (
        <g key={f.en}>
          <text className="t-strong" x="8" y={y(i) + H / 2 + 5}>Would you like</text>
          <rect className="svg-box-key" x={BX} y={y(i)} width={BW} height={H} rx="8" />
          <text className="t-strong" x={BX + 14} y={y(i) + 29}>{f.en}</text>
          <text className="t-sub" x={BX + 14} y={y(i) + 50}>{f.ko}</text>
        </g>
      ))}
    </svg>
  );
}
