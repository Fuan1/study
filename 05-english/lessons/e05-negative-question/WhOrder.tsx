/** 의문사 질문의 어순: 질문어 + do/be + 주어 + 동사. 질문어가 주어이면 do 와 주어 자리가 비는 것이 다르다. */
type Cell = { t: string; cls: string };

const ROWS: Cell[][] = [
  [{ t: 'Where', cls: 'svg-berg' }, { t: 'do', cls: 'svg-box-key' }, { t: 'you', cls: 'svg-box' }, { t: 'work?', cls: 'svg-box' }],
  [{ t: 'What', cls: 'svg-berg' }, { t: 'does', cls: 'svg-box-key' }, { t: 'she', cls: 'svg-box' }, { t: 'want?', cls: 'svg-box' }],
  [{ t: 'Why', cls: 'svg-berg' }, { t: 'are', cls: 'svg-box-key' }, { t: 'you', cls: 'svg-box' }, { t: 'late?', cls: 'svg-box' }],
  [{ t: 'Who', cls: 'svg-berg' }, { t: '없음', cls: 'svg-box' }, { t: '없음', cls: 'svg-box' }, { t: 'works here?', cls: 'svg-box-key' }],
];

const COLS = [
  { x: 8, w: 78, head: '질문어' },
  { x: 92, w: 66, head: 'do · be' },
  { x: 164, w: 58, head: '주어' },
  { x: 228, w: 124, head: '동사 …' },
];
const BH = 40;
const PITCH = 52;
const TOP = 30;

export default function WhOrder() {
  const VB_H = TOP + 3 * PITCH + BH + 8 + 2;
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="의문사 질문의 어순. 질문어, do 또는 be, 주어, 동사 순서다. Who works here 처럼 질문어가 주어이면 do 와 주어 자리가 비고 동사가 바로 온다.">
      {COLS.map((c) => (
        <text key={c.head} className="t-sub" x={c.x + c.w / 2} y="16" textAnchor="middle">{c.head}</text>
      ))}
      {ROWS.map((row, i) => (
        <g key={i}>
          {row.map((c, j) => (
            <g key={j}>
              <rect className={c.cls} x={COLS[j].x} y={TOP + i * PITCH} width={COLS[j].w} height={BH} rx="6" />
              <text className={c.t === '없음' ? 't-sub' : 't-strong'} x={COLS[j].x + COLS[j].w / 2} y={TOP + i * PITCH + 25} textAnchor="middle">{c.t}</text>
            </g>
          ))}
        </g>
      ))}
    </svg>
  );
}
