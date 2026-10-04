const ROWS = [
  { en: 'I saw a cat.', ko: '고양이를 한 마리 봤어요.', art: 'a', why: '처음 말함' },
  { en: 'The cat was black.', ko: '그 고양이는 검었어요.', art: 'the', why: '방금 말한 것' },
  { en: 'Close the door, please.', ko: '문 좀 닫아 주세요.', art: 'the', why: '둘 다 아는 문' },
  { en: 'This is the best cake.', ko: '이게 제일 맛있는 케이크예요.', art: 'the', why: '최상급' },
];

const RH = 62;
const STEP = 70;

export default function FirstThen() {
  const VB_H = 8 + (ROWS.length - 1) * STEP + RH + 8;
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="처음 말하는 고양이에는 a, 이미 말한 고양이와 둘 다 아는 문과 최상급에는 the를 쓴다.">
      {ROWS.map((r, i) => {
        const y = 8 + i * STEP;
        return (
          <g key={r.en}>
            <rect className="svg-box" x="8" y={y} width="344" height={RH} rx="8" />
            <text className="t-strong" x="22" y={y + 26}>{r.en}</text>
            <text className="t-sub" x="22" y={y + 46}>{r.ko}</text>
            <text className="t-strong" x="262" y={y + 26}>{r.art}</text>
            <text className="t-sub" x="262" y={y + 46}>{r.why}</text>
          </g>
        );
      })}
    </svg>
  );
}
