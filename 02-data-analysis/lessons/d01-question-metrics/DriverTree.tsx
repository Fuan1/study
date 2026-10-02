// Bing 의 질의 분해(Kohavi 외 2012): 월간 고유 질의 수 = 사용자 수 x 사용자당 세션 수 x 세션당 고유 질의 수.
type Child = { t: string; s: string; cls: string };

const CHILDREN: Child[] = [
  { t: '사용자 수 (월)', s: '얼마나 많은 사람이 쓰나', cls: 'svg-box' },
  { t: '사용자당 세션 수', s: '늘리는 쪽이 목표: 만족하면 더 온다', cls: 'svg-box-key' },
  { t: '세션당 고유 질의 수', s: '줄어도 포기와 구분이 안 된다', cls: 'svg-box' },
];

const TOP_Y = 8;
const TOP_H = 66;
const GAP0 = 28; // 위 상자와 첫 가지 사이
const CH = 66;
const GAP = 32; // 가지 사이
const TRUNK_X = 24;
const CX = 44;
const CW = 308;
const cy = (i: number) => TOP_Y + TOP_H + GAP0 + i * (CH + GAP);
const lastBottom = cy(CHILDREN.length - 1) + CH;
const VB_H = lastBottom + 12;

export default function DriverTree() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="지표 트리 예시. 월간 고유 질의 수를 사용자 수, 사용자당 세션 수, 세션당 고유 질의 수의 곱으로 쪼갠다. 사용자당 세션 수를 늘리는 것이 목표였다.">
      <rect className="svg-box-key" x="8" y={TOP_Y} width="344" height={TOP_H} rx="8" />
      <text className="t-strong" x="22" y={TOP_Y + 29}>월간 고유 질의 수</text>
      <text className="t-sub" x="22" y={TOP_Y + 51}>아래 세 항을 곱한 값이다</text>
      <line x1={TRUNK_X} y1={TOP_Y + TOP_H} x2={TRUNK_X} y2={cy(CHILDREN.length - 1) + CH / 2} stroke="var(--line)" strokeWidth="1.5" />
      {CHILDREN.map((c, i) => (
        <g key={c.t}>
          <line x1={TRUNK_X} y1={cy(i) + CH / 2} x2={CX} y2={cy(i) + CH / 2} stroke="var(--line)" strokeWidth="1.5" />
          <rect className={c.cls} x={CX} y={cy(i)} width={CW} height={CH} rx="8" />
          <text className="t-strong" x={CX + 14} y={cy(i) + 29}>{c.t}</text>
          <text className="t-sub" x={CX + 14} y={cy(i) + 51}>{c.s}</text>
          {i < CHILDREN.length - 1 && (
            <text className="t-sub" x={CX + 8} y={cy(i) + CH + GAP / 2 + 5}>×</text>
          )}
        </g>
      ))}
    </svg>
  );
}
