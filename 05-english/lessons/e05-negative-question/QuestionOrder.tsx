/** 평서문에서 예/아니오 질문으로. 단어를 옮기거나 앞에 do 를 붙인다. */
type Cell = { t: string; w: number; cls?: string };
type Group = { label: string; from: Cell[]; to: Cell[]; arrow: string };

const GROUPS: Group[] = [
  {
    label: 'be 문장: 자리를 바꾼다',
    from: [{ t: 'She', w: 70 }, { t: 'is', w: 60 }, { t: 'late.', w: 84 }],
    to: [{ t: 'Is', w: 60, cls: 'svg-berg' }, { t: 'she', w: 70 }, { t: 'late?', w: 84 }],
    arrow: 'is 와 she 가 자리를 바꾼다',
  },
  {
    label: '일반동사 문장: do 를 앞에 붙인다',
    from: [{ t: 'She', w: 70 }, { t: 'works', w: 90 }, { t: 'here.', w: 80 }],
    to: [{ t: 'Does', w: 70, cls: 'svg-berg' }, { t: 'she', w: 60 }, { t: 'work', w: 76, cls: 'svg-berg' }, { t: 'here?', w: 76 }],
    arrow: 'Does 를 맨 앞에, works 는 work 로',
  },
];

const BH = 40;
const GAP = 8;
const X0 = 16;
const PITCH = 170;
const TOP = 20;

function Row({ cells, y }: { cells: Cell[]; y: number }) {
  let x = X0;
  return (
    <g>
      {cells.map((c) => {
        const cx = x;
        x += c.w + GAP;
        return (
          <g key={c.t}>
            <rect className={c.cls ?? 'svg-box'} x={cx} y={y} width={c.w} height={BH} rx="6" />
            <text className="t-strong" x={cx + c.w / 2} y={y + 25} textAnchor="middle">{c.t}</text>
          </g>
        );
      })}
    </g>
  );
}

export default function QuestionOrder() {
  const VB_H = TOP + PITCH + 12 + 2 * BH + 48 + 10;
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="예 아니오 질문 만들기. She is late 는 Is she late 로 자리를 바꾸고, She works here 는 Does she work here 로 Does 를 앞에 붙이고 동사를 원형으로 쓴다.">
      <defs>
        <marker id="arQ" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      {GROUPS.map((g, i) => {
        const y0 = TOP + i * PITCH;
        const r1 = y0 + 12;
        const r2 = r1 + BH + 48;
        return (
          <g key={g.label}>
            <text className="t-strong" x="8" y={y0}>{g.label}</text>
            <Row cells={g.from} y={r1} />
            <line className="svg-flow" x1={X0 + 24} y1={r1 + BH + 8} x2={X0 + 24} y2={r2 - 8} markerEnd="url(#arQ)" />
            <text className="t-sub" x={X0 + 38} y={r1 + BH + 29}>{g.arrow}</text>
            <Row cells={g.to} y={r2} />
          </g>
        );
      })}
    </svg>
  );
}
