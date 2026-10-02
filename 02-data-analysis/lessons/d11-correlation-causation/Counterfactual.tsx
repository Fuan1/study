/** 형태 예시(가상 값). 처리군과 대조군의 개입 전 간격을 개입 후에도 이어 그린 점선이 반사실이다. */
const CTRL = [20, 22, 21, 24, 25, 27, 26];
const GAP = 14; // 개입 전 처리군이 대조군보다 높은 정도
const EFFECT = [0, 0, 0, 0, 6, 9, 10];
const TREATED = CTRL.map((v, i) => v + GAP + EFFECT[i]);
const CF = CTRL.map((v) => v + GAP);
const SPLIT = 3; // 마지막 개입 전 시점의 위치

const X0 = 24;
const STEP = 44;
const AXIS_Y = 208;
const Y_BASE = 200;
const Y_UNIT = 4.3;
const px = (i: number) => X0 + i * STEP;
const py = (v: number) => Y_BASE - (v - 15) * Y_UNIT;
const pts = (vals: number[], from = 0) => vals.map((v, i) => [px(i + from), py(v)].join(',')).join(' ');

const LEGEND = [
  { label: '처리군(관측)', stroke: 'var(--accent)', dash: undefined },
  { label: '대조군(관측)', stroke: 'var(--muted)', dash: undefined },
  { label: '반사실(가정)', stroke: 'var(--warm)', dash: '5 4' },
];

export default function Counterfactual() {
  const cut = (px(SPLIT) + px(SPLIT + 1)) / 2;
  const last = CTRL.length - 1;
  const bx = px(last) + 14; // 효과 괄호 x
  const mid = (py(TREATED[last]) + py(CF[last])) / 2;
  const legendY = AXIS_Y + 44; // 범례 선 y. 시간 라벨(AXIS_Y+20) 글자와 9px 이상 띄운다
  return (
    <svg viewBox={`0 0 360 ${legendY + 20}`} role="img" aria-label="개입 전에는 처리군과 대조군이 일정한 간격으로 함께 움직이고, 개입 후 처리군이 반사실 점선보다 높아진다. 처리군 관측선과 반사실 점선의 차이가 효과다.">
      <line x1={X0} y1={AXIS_Y} x2="296" y2={AXIS_Y} stroke="var(--line)" strokeWidth="1.5" />
      <text className="t-sub" x="296" y={AXIS_Y + 20} textAnchor="end">시간</text>
      <line x1={cut} y1="34" x2={cut} y2={AXIS_Y} stroke="var(--muted)" strokeWidth="1.5" strokeDasharray="4 4" />
      <text className="t-sub" x={cut - 8} y="24" textAnchor="end">개입 전</text>
      <text className="t-sub" x={cut + 8} y="24">개입 후</text>
      <polyline points={pts(CTRL)} fill="none" stroke="var(--muted)" strokeWidth="2" />
      <polyline points={pts(CF.slice(SPLIT), SPLIT)} fill="none" stroke="var(--warm)" strokeWidth="2" strokeDasharray="5 4" />
      <polyline points={pts(TREATED)} fill="none" stroke="var(--accent)" strokeWidth="2" />
      <line x1={bx} y1={py(TREATED[last])} x2={bx} y2={py(CF[last])} stroke="var(--strong)" strokeWidth="1.5" />
      <line x1={bx - 4} y1={py(TREATED[last])} x2={bx + 4} y2={py(TREATED[last])} stroke="var(--strong)" strokeWidth="1.5" />
      <line x1={bx - 4} y1={py(CF[last])} x2={bx + 4} y2={py(CF[last])} stroke="var(--strong)" strokeWidth="1.5" />
      <text className="t-strong" x={bx + 10} y={mid + 5}>효과</text>
      {LEGEND.map((l, i) => (
        <g key={l.label}>
          <line x1={8 + i * 116} y1={legendY} x2={8 + i * 116 + 20} y2={legendY} stroke={l.stroke} strokeWidth="2" strokeDasharray={l.dash} />
          <text className="t-sub" x={8 + i * 116 + 26} y={legendY + 4}>{l.label}</text>
        </g>
      ))}
    </svg>
  );
}
