/**
 * 두 글자가 한 소리를 내는 묶음. 단어와 영국식 발음 기호는 Cambridge Dictionary 항목에서 확인한 값.
 * ph 는 첫 소리만 보인다(phone 은 영국식과 미국식의 모음 기호가 다르다).
 */
type Card = { letters: string; word: string; sound: string };
const CARDS: Card[] = [
  { letters: 'sh', word: 'ship', sound: '/ʃɪp/' },
  { letters: 'ch', word: 'chin', sound: '/tʃɪn/' },
  { letters: 'th', word: 'thin', sound: '/θɪn/' },
  { letters: 'th', word: 'this', sound: '/ðɪs/' },
  { letters: 'ph', word: 'phone', sound: '첫 소리 /f/' },
  { letters: 'ng', word: 'thing', sound: '/θɪŋ/' },
];

const CW = 168;
const BH = 66;
const GX = 8;
const GY = 14;

export default function Digraphs() {
  const rows = Math.ceil(CARDS.length / 2);
  const VB_H = 8 + rows * BH + (rows - 1) * GY + 8;
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="두 글자가 한 소리를 내는 묶음. sh 는 ship, ch 는 chin, th 는 thin 과 this 에서 서로 다른 소리, ph 는 phone, ng 는 thing.">
      {CARDS.map((c, i) => {
        const x = 8 + (i % 2) * (CW + GX);
        const y = 8 + Math.floor(i / 2) * (BH + GY);
        return (
          <g key={`${c.letters}-${c.word}`}>
            <rect className="svg-box" x={x} y={y} width={CW} height={BH} rx="8" />
            <text className="t-strong" x={x + 14} y={y + 28}>{c.letters} → {c.word}</text>
            <text className="t-sub" x={x + 14} y={y + 50}>{c.sound}</text>
          </g>
        );
      })}
    </svg>
  );
}
