/** 부정문 세 가지 틀. 열을 맞춰 not 의 자리와 동사 형태를 비교한다. */
type Cell = { t: string; cls: string };
type Row = { label: string; cells: Cell[]; note: string };

const BOX = 'svg-box';
const KEY = 'svg-berg';

const ROWS: Row[] = [
  { label: 'be 문장', cells: [{ t: 'She', cls: BOX }, { t: 'is', cls: KEY }, { t: 'not', cls: KEY }, { t: 'late', cls: BOX }], note: 'isn\'t 로 줄여도 된다' },
  { label: '일반동사 현재', cells: [{ t: 'She', cls: BOX }, { t: 'does', cls: KEY }, { t: 'not', cls: KEY }, { t: 'work', cls: BOX }], note: 'doesn\'t + 원형 (works 아님)' },
  { label: '일반동사 과거', cells: [{ t: 'She', cls: BOX }, { t: 'did', cls: KEY }, { t: 'not', cls: KEY }, { t: 'work', cls: BOX }], note: 'didn\'t + 원형 (worked 아님)' },
];

const COLS = [
  { x: 24, w: 64 },
  { x: 94, w: 72 },
  { x: 172, w: 56 },
  { x: 234, w: 96 },
];
const BH = 40;
const PITCH = 110;
const TOP = 20;

export default function NegativeForms() {
  const VB_H = TOP + 2 * PITCH + 12 + BH + 22 + 10;
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="부정문 세 가지. be 문장은 be 뒤에 not. 일반동사 현재는 does not 과 원형 동사. 과거는 did not 과 원형 동사.">
      {ROWS.map((r, i) => {
        const y0 = TOP + i * PITCH;
        return (
          <g key={r.label}>
            <text className="t-strong" x="8" y={y0}>{r.label}</text>
            {r.cells.map((c, j) => (
              <g key={j}>
                <rect className={c.cls} x={COLS[j].x} y={y0 + 12} width={COLS[j].w} height={BH} rx="6" />
                <text className="t-strong" x={COLS[j].x + COLS[j].w / 2} y={y0 + 12 + 25} textAnchor="middle">{c.t}</text>
              </g>
            ))}
            <text className="t-sub" x="8" y={y0 + 12 + BH + 22}>{r.note}</text>
          </g>
        );
      })}
    </svg>
  );
}
