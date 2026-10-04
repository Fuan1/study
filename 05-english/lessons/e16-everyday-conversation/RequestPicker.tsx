type Group = { title: string; boxes: { pat: string; tag: string }[]; ex: string };

// 출처: Cambridge Grammar. 허락 구하기에는 can, could, may. 부탁에는 can, could. could 가 can 보다 정중.
const GROUPS: Group[] = [
  {
    title: '내가 하고 싶을 때 (허락 구하기)',
    boxes: [
      { pat: 'Can I ...?', tag: '보통' },
      { pat: 'Could I ...?', tag: '더 정중' },
    ],
    ex: 'Could I use your bathroom, please?',
  },
  {
    title: '상대가 해 주길 바랄 때 (부탁)',
    boxes: [
      { pat: 'Can you ...?', tag: '보통' },
      { pat: 'Could you ...?', tag: '더 정중' },
    ],
    ex: 'Could you turn that music down a little, please?',
  },
];

const BW = 168;
const H = 66;
const STRIDE = 150;

export default function RequestPicker() {
  const vb = STRIDE + 32 + H + 24 + 16;
  return (
    <svg viewBox={`0 0 360 ${vb}`} role="img" aria-label="허락과 부탁의 틀. 내가 하려면 Can I 나 Could I, 상대에게 부탁하려면 Can you 나 Could you. Could 가 더 정중하다.">
      {GROUPS.map((g, gi) => {
        const base = gi * STRIDE;
        return (
          <g key={g.title}>
            <text className="t-strong" x="8" y={base + 20}>{g.title}</text>
            {g.boxes.map((b, bi) => {
              const x = 8 + bi * (BW + 8);
              return (
                <g key={b.pat}>
                  <rect className={bi === 1 ? 'svg-berg' : 'svg-box'} x={x} y={base + 32} width={BW} height={H} rx="8" />
                  <text className="t-strong" x={x + 14} y={base + 32 + 29}>{b.pat}</text>
                  <text className="t-sub" x={x + 14} y={base + 32 + 50}>{b.tag}</text>
                </g>
              );
            })}
            <text className="t-sub" x="8" y={base + 32 + H + 24}>{g.ex}</text>
          </g>
        );
      })}
    </svg>
  );
}
