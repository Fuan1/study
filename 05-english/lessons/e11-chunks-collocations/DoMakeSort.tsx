const DO = ['homework', 'the shopping', 'the laundry', 'the cooking'];
const MAKE = ['a cake', 'a plan', 'a mistake', 'a phone call'];

// 여백 기준: 칩 높이 36 이상(글자는 칩 안), 칩 사이 10, 머리말과 칩 사이 24 이상.
const CW = 168;
const GAPX = 8;
const X2 = 8 + CW + GAPX;
const CH = 40;
const CG = 10;
const CHIP_TOP = 76;

export default function DoMakeSort() {
  const rows = DO.length;
  const VB_H = CHIP_TOP + rows * CH + (rows - 1) * CG + 12;
  const col = (x: number, title: string, sub: string, items: string[], verb: string, cls: string) => (
    <g>
      <text className="t-strong" x={x + 4} y="22">{title}</text>
      <text className="t-sub" x={x + 4} y="44">{sub}</text>
      {items.map((it, i) => (
        <g key={it}>
          <rect className={cls} x={x} y={CHIP_TOP + i * (CH + CG)} width={CW} height={CH} rx="8" />
          <text className="t-strong" x={x + 14} y={CHIP_TOP + i * (CH + CG) + 25}>{verb} {it}</text>
        </g>
      ))}
    </g>
  );
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="do 는 하는 일 자체, make 는 만들어지는 결과에 쓰는 경향이 있다. do homework, do the shopping, do the laundry, do the cooking. make a cake, make a plan, make a mistake, make a phone call.">
      {col(8, 'do', '하는 일 자체', DO, 'do', 'svg-box')}
      {col(X2, 'make', '만들어지는 것·결과', MAKE, 'make', 'svg-berg')}
    </svg>
  );
}
