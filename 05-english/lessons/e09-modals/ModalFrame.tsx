/**
 * 조동사 문장틀. 주어 + 조동사 + 동사 원형. 틀린 모양 셋과 고친 모양 셋을 같은 줄에 나란히 놓는다.
 * 문장은 이 글에서 직접 쓴 예이고 규칙은 영국 문화원 자료를 따랐다.
 */
const PARTS = [
  { w: 'She', sub: '주어', key: false },
  { w: 'can', sub: '조동사', key: true },
  { w: 'swim', sub: '동사 원형', key: false },
];

const PAIRS = [
  { bad: 'She cans swim.', good: 'She can swim.' },
  { bad: 'She can to swim.', good: 'She can swim.' },
  { bad: 'Do you can swim?', good: 'Can you swim?' },
];

const BW = 104; // 틀 상자 폭
const GAP = 16;
const BH = 66;
const COL = 168;
const COL2 = 360 - 8 - COL;
const LINE = 26;
const TOP2 = 128; // 비교 상자 윗변
const H2 = 100;

export default function ModalFrame() {
  const vbH = TOP2 + H2 + 8 + 8;
  return (
    <svg viewBox={`0 0 360 ${vbH}`} role="img" aria-label="조동사 문장틀은 주어, 조동사, 동사 원형 순서다. She cans swim, She can to swim, Do you can swim은 틀리고 She can swim, Can you swim이 맞다.">
      {PARTS.map((p, i) => {
        const x = 8 + i * (BW + GAP);
        return (
          <g key={p.w}>
            <rect className={p.key ? 'svg-box-key' : 'svg-box'} x={x} y="8" width={BW} height={BH} rx="8" />
            <text className="t-strong" x={x + BW / 2} y="39" textAnchor="middle">{p.w}</text>
            <text className="t-sub" x={x + BW / 2} y="59" textAnchor="middle">{p.sub}</text>
          </g>
        );
      })}
      <text className="t-bad" x="8" y="108">틀린 모양</text>
      <text className="t-good" x={COL2} y="108">맞는 모양</text>
      <rect className="svg-box-bad" x="8" y={TOP2} width={COL} height={H2} rx="8" />
      <rect className="svg-box-good" x={COL2} y={TOP2} width={COL} height={H2} rx="8" />
      {PAIRS.map((p, i) => (
        <g key={p.bad}>
          <text className="t-strong" x="22" y={TOP2 + 30 + i * LINE}>{p.bad}</text>
          <text className="t-strong" x={COL2 + 14} y={TOP2 + 30 + i * LINE}>{p.good}</text>
        </g>
      ))}
    </svg>
  );
}
