/** 단수·복수·셀 수 없는 명사에 붙일 수 있는 말. British Council 문법 설명의 규칙을 표로 정리했다. */
const COLS = ['a / an', 'some', 'many', 'much', '-s'];
const ROWS: { l1: string; l2: string; ok: boolean[] }[] = [
  { l1: '단수', l2: 'a dog', ok: [true, false, false, false, false] },
  { l1: '복수', l2: 'dogs', ok: [false, true, true, false, true] },
  { l1: '셀 수 없는', l2: 'water', ok: [false, true, false, true, false] },
];

const X0 = 124; // 첫 열 중심
const STEP = 46;
const RH = 64;
const TOP = 40;

export default function CountGrid() {
  const VB_H = TOP + ROWS.length * (RH + 8) + 8;
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="붙일 수 있는 말 표. 단수는 a 또는 an. 복수는 some, many, s. 셀 수 없는 명사는 some, much. 셀 수 없는 명사에는 a와 s를 쓰지 않는다.">
      {COLS.map((c, j) => (
        <text key={c} className="t-strong" x={X0 + j * STEP} y="24" textAnchor="middle">{c}</text>
      ))}
      {ROWS.map((r, i) => {
        const y = TOP + i * (RH + 8);
        return (
          <g key={r.l1}>
            <rect className="svg-box" x="8" y={y} width="344" height={RH} rx="8" />
            <text className="t-strong" x="20" y={y + 28}>{r.l1}</text>
            <text className="t-sub" x="20" y={y + 48}>{r.l2}</text>
            {r.ok.map((ok, j) => (
              <text key={j} className={ok ? 't-good' : 't-bad'} x={X0 + j * STEP} y={y + 37} textAnchor="middle">{ok ? 'O' : 'X'}</text>
            ))}
          </g>
        );
      })}
    </svg>
  );
}
