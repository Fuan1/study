type Block = { label: string; lines: string[]; key?: boolean };

const BLOCKS: Block[] = [
  { label: '결론', lines: ['한 문장. 결정에 대한 답'], key: true },
  { label: '근거', lines: ['1. 비교한 값, 기간, 분모', '2. 두 번째 근거와 차트 한 장', '3. 세 번째 근거(있을 때만)'] },
  { label: '한계', lines: ['표본, 기간, 정의의 범위', '결론이 틀릴 수 있는 경우'] },
  { label: '다음 행동', lines: ['누가 언제까지 무엇을'] },
];

// 상자 높이 = 라벨 줄(26) + 첫 줄(50) + 줄 간격 20씩 + 아래 여백 20. 상자 사이 24px.
const X = 8;
const W = 344;
const GAP = 24;
const hOf = (b: Block) => 50 + 20 * (b.lines.length - 1) + 20;

export default function OnePager() {
  let y = 8;
  const rows = BLOCKS.map((b) => {
    const row = { b, y, h: hOf(b) };
    y += row.h + GAP;
    return row;
  });
  const last = rows[rows.length - 1];
  const bottom = last.y + last.h;
  return (
    <svg viewBox={`0 0 360 ${bottom + 10}`} role="img" aria-label="한 장 요약의 모양. 위에서 아래로 결론 한 문장, 근거 두세 개, 한계, 다음 행동 칸이 차례로 놓인다.">
      {rows.map(({ b, y: ry, h }) => (
        <g key={b.label}>
          <rect className={b.key ? 'svg-box-key' : 'svg-box'} x={X} y={ry} width={W} height={h} rx="8" />
          <text className="t-strong" x={X + 14} y={ry + 26}>{b.label}</text>
          {b.lines.map((l, i) => (
            <text className="t-sub" key={l} x={X + 14} y={ry + 50 + i * 20}>{l}</text>
          ))}
        </g>
      ))}
    </svg>
  );
}
