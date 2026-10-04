/**
 * 끝 e 가 앞 모음 소리를 바꾼다. 단어와 영국식 발음 기호는 Cambridge Dictionary 항목에서 확인한 값.
 * 모음 글자 이름 소리: a /eɪ/, i /aɪ/, o /əʊ/, u /juː/.
 */
type Row = { letter: string; a: string; aIpa: string; b: string; bIpa: string };
const ROWS: Row[] = [
  { letter: 'a', a: 'cap', aIpa: '/kæp/', b: 'cape', bIpa: '/keɪp/' },
  { letter: 'i', a: 'kit', aIpa: '/kɪt/', b: 'kite', bIpa: '/kaɪt/' },
  { letter: 'o', a: 'hop', aIpa: '/hɒp/', b: 'hope', bIpa: '/həʊp/' },
  { letter: 'u', a: 'cut', aIpa: '/kʌt/', b: 'cute', bIpa: '/kjuːt/' },
];

const BH = 66;
const GAP = 14;
const TOP = 40;
const X1 = 44;
const W1 = 124;
const X2 = 212;
const W2 = 140;

export default function SilentE() {
  const VB_H = TOP + ROWS.length * BH + (ROWS.length - 1) * GAP + 12;
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="끝에 e 가 붙으면 앞 모음 소리가 바뀐다. cap 과 cape, kit 과 kite, hop 과 hope, cut 과 cute.">
      <defs>
        <marker id="ar-e02-silent" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      <text className="t-sub" x={X1} y="22">끝에 e 없음</text>
      <text className="t-sub" x={X2} y="22">끝에 e 있음</text>
      {ROWS.map((r, i) => {
        const y = TOP + i * (BH + GAP);
        const mid = y + BH / 2;
        return (
          <g key={r.letter}>
            <text className="t-strong" x="14" y={mid + 5} textAnchor="middle">{r.letter}</text>
            <rect className="svg-box" x={X1} y={y} width={W1} height={BH} rx="8" />
            <text className="t-strong" x={X1 + 14} y={y + 28}>{r.a}</text>
            <text className="t-sub" x={X1 + 14} y={y + 50}>{r.aIpa}</text>
            <line className="svg-flow" x1={X1 + W1 + 8} y1={mid} x2={X2 - 8} y2={mid} markerEnd="url(#ar-e02-silent)" />
            <rect className="svg-berg" x={X2} y={y} width={W2} height={BH} rx="8" />
            <text className="t-strong" x={X2 + 14} y={y + 28}>{r.b}</text>
            <text className="t-sub" x={X2 + 14} y={y + 50}>{r.bIpa}</text>
          </g>
        );
      })}
    </svg>
  );
}
