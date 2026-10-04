/**
 * 같은 철자 묶음 ough 가 내는 소리. 단어와 영국식 발음 기호는 Cambridge Dictionary 항목에서 확인한 값.
 * 미국식은 though /ðoʊ/, cough /kɑːf/ 로 모음 기호가 다르다.
 */
const WORDS: { word: string; ipa: string }[] = [
  { word: 'through', ipa: '/θruː/' },
  { word: 'though', ipa: '/ðəʊ/' },
  { word: 'tough', ipa: '/tʌf/' },
  { word: 'cough', ipa: '/kɒf/' },
];

const BH = 44;
const GAP = 10;
const TOP = 36;
const IPA_X = 190;

export default function OughSounds() {
  const VB_H = TOP + WORDS.length * BH + (WORDS.length - 1) * GAP + 12;
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="같은 철자 ough 가 단어마다 다른 소리를 낸다. through 는 uː, though 는 əʊ, tough 는 ʌf, cough 는 ɒf.">
      <text className="t-sub" x="22" y="20">철자</text>
      <text className="t-sub" x={IPA_X} y="20">소리(영국식)</text>
      {WORDS.map((w, i) => {
        const y = TOP + i * (BH + GAP);
        return (
          <g key={w.word}>
            <rect className="svg-box" x="8" y={y} width="344" height={BH} rx="8" />
            <text className="t-strong" x="22" y={y + BH / 2 + 5}>{w.word}</text>
            <text className="t-strong" x={IPA_X} y={y + BH / 2 + 5}>{w.ipa}</text>
          </g>
        );
      })}
    </svg>
  );
}
