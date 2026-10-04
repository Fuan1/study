/**
 * 출처: Yoshida, The Consonants of American English(UCI OpenCourseWare)의 조음 위치 설명.
 * 입 앞쪽에서 안쪽 순서로 p b, f v, th, l, r 의 자리를 놓았다.
 */
type Row = { sound: string; l1: string; l2: string; focus: boolean };

const ROWS: Row[] = [
  { sound: 'p  b', l1: '두 입술이 붙었다가', l2: '터지듯 열린다', focus: false },
  { sound: 'f  v', l1: '윗니가 아랫입술에 살짝 닿는다', l2: '입술은 닫지 않는다', focus: true },
  { sound: 'θ  ð', l1: '혀끝이 윗니에 닿는다', l2: '혀는 조금만 보인다', focus: true },
  { sound: 'l', l1: '혀끝이 윗잇몸에 닿는다', l2: '바람은 혀 양옆으로 샌다', focus: true },
  { sound: 'r', l1: '혀끝이 어디에도 닿지 않는다', l2: '입술이 조금 둥글다', focus: true },
];

const TOP = 36;
const PITCH = 62;
const BH = 46;

export default function PlaceStrip() {
  const VB_H = TOP + (ROWS.length - 1) * PITCH + BH + 1 + 10;
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="입 앞쪽에서 안쪽 순서의 소리 자리. p b는 두 입술, f v는 윗니와 아랫입술, th는 혀끝과 윗니, l은 혀끝과 윗잇몸, r은 혀끝이 닿지 않는 자리.">
      <defs>
        <marker id="ar-e03-place" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      <text className="t-sub" x="8" y="16">입 앞쪽에서 안쪽으로</text>
      <line className="svg-flow" x1="20" y1="26" x2="20" y2={VB_H - 6} markerEnd="url(#ar-e03-place)" />
      {ROWS.map((r, i) => {
        const y = TOP + i * PITCH;
        return (
          <g key={r.sound}>
            <rect className={r.focus ? 'svg-berg' : 'svg-box'} x="40" y={y} width="72" height={BH} rx="6" />
            <text className="t-strong" x="76" y={y + 28} textAnchor="middle">{r.sound}</text>
            <text className="t-sub" x="128" y={y + 19}>{r.l1}</text>
            <text className="t-sub" x="128" y={y + 39}>{r.l2}</text>
          </g>
        );
      })}
    </svg>
  );
}
