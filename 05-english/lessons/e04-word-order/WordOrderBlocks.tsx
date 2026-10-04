/**
 * 같은 뜻의 문장을 한국어 순서와 영어 순서로 놓았다. 형태 예시(이 글이 만든 문장).
 * 한국어: 나는 공원에서 친구를 만났다. 영어: I met my friend in the park.
 */
type Role = '주어' | '동사' | '목적어' | '장소';
type Block = { word: string; role: Role };

const KO: Block[] = [
  { word: '나는', role: '주어' },
  { word: '공원에서', role: '장소' },
  { word: '친구를', role: '목적어' },
  { word: '만났다', role: '동사' },
];
const EN: Block[] = [
  { word: 'I', role: '주어' },
  { word: 'met', role: '동사' },
  { word: 'my friend', role: '목적어' },
  { word: 'in the park', role: '장소' },
];

const BW = 148;
const BH = 40;
const PITCH = 60;
const TOP = 40;
const XL = 8;
const XR = 360 - 8 - BW;
const VB_H = TOP + 3 * PITCH + BH + 8 + 4;
const cy = (i: number) => TOP + i * PITCH + BH / 2;

export default function WordOrderBlocks() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="한국어는 주어, 장소, 목적어, 동사 순서이고 영어는 주어, 동사, 목적어, 장소 순서다. 동사가 맨 끝에서 주어 바로 뒤로 옮겨 간다.">
      <text className="t-strong" x={XL} y="22">한국어 순서</text>
      <text className="t-strong" x={XR} y="22">영어 순서</text>
      {EN.map((e, j) => {
        const i = KO.findIndex((k) => k.role === e.role);
        return <line key={e.role} className="svg-flow" x1={XL + BW + 8} y1={cy(i)} x2={XR - 8} y2={cy(j)} />;
      })}
      {[KO, EN].map((col, c) =>
        col.map((b, i) => {
          const x = c === 0 ? XL : XR;
          const y = TOP + i * PITCH;
          return (
            <g key={`${c}-${b.word}`}>
              <rect className={b.role === '동사' ? 'svg-berg' : 'svg-box'} x={x} y={y} width={BW} height={BH} rx="6" />
              <text className="t-strong" x={x + 12} y={y + 25}>{b.word}</text>
              <text className="t-sub" x={x + BW - 12} y={y + 25} textAnchor="end">{b.role}</text>
            </g>
          );
        }),
      )}
    </svg>
  );
}
