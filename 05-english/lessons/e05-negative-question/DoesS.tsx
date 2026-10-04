/** -s 는 한 번만. 평서문은 동사가, does 질문은 does 가 맡는다. */
type Cell = { t: string; w: number; cls: string };
type Group = { label: string; labelCls: string; cells: Cell[]; note: string };

const GROUPS: Group[] = [
  {
    label: '평서문: -s 는 동사에',
    labelCls: 't-strong',
    cells: [{ t: 'She', w: 70, cls: 'svg-box' }, { t: 'works', w: 90, cls: 'svg-box' }, { t: 'here.', w: 80, cls: 'svg-box' }],
    note: 'works 에 s 가 한 번 있다',
  },
  {
    label: '나쁜 예',
    labelCls: 't-bad',
    cells: [{ t: 'Does', w: 70, cls: 'svg-box' }, { t: 'she', w: 60, cls: 'svg-box' }, { t: 'works', w: 90, cls: 'svg-box-bad' }, { t: 'here?', w: 76, cls: 'svg-box' }],
    note: 'Does 와 works 둘 다 s 를 가진다',
  },
  {
    label: '고친 예',
    labelCls: 't-good',
    cells: [{ t: 'Does', w: 70, cls: 'svg-berg' }, { t: 'she', w: 60, cls: 'svg-box' }, { t: 'work', w: 90, cls: 'svg-box-good' }, { t: 'here?', w: 76, cls: 'svg-box' }],
    note: 's 는 Does 가 맡고 work 는 원형',
  },
];

const BH = 40;
const GAP = 8;
const X0 = 16;
const PITCH = 110;
const TOP = 20;

export default function DoesS() {
  const VB_H = TOP + 2 * PITCH + 12 + BH + 22 + 10;
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="s 는 한 번만 쓴다. 평서문 She works here 에서는 동사가 s 를 갖고, 질문 Does she work here 에서는 Does 가 s 를 맡고 동사는 원형이다. Does she works here 는 나쁜 예다.">
      {GROUPS.map((g, i) => {
        const y0 = TOP + i * PITCH;
        let x = X0;
        return (
          <g key={g.label}>
            <text className={g.labelCls} x="8" y={y0}>{g.label}</text>
            {g.cells.map((c) => {
              const cx = x;
              x += c.w + GAP;
              return (
                <g key={c.t}>
                  <rect className={c.cls} x={cx} y={y0 + 12} width={c.w} height={BH} rx="6" />
                  <text className="t-strong" x={cx + c.w / 2} y={y0 + 12 + 25} textAnchor="middle">{c.t}</text>
                </g>
              );
            })}
            <text className="t-sub" x="8" y={y0 + 12 + BH + 22}>{g.note}</text>
          </g>
        );
      })}
    </svg>
  );
}
