// 근거: Amazon 2015 주주 서한의 Type 1(한 방향 문, 되돌리기 어려움)과 Type 2(양방향 문, 되돌릴 수 있음) 구분. 상자 안 표현은 서한 내용을 줄여 옮긴 것이다.
const ROOT_H = 66;
const BOX_H = 88;
const GAP = 24;
const BX = 52;
const BW = 300;
const y1 = 8 + ROOT_H + GAP;
const y2 = y1 + BOX_H + GAP;
const TRUNK_X = 26;
// 마지막 상자 아랫변 + 선 두께 절반 + 아래 여백 8
const VB_H = y2 + BOX_H + 1 + 8;

const BRANCHES = [
  { y: y1, cls: 'svg-box', a: '되돌릴 수 있다 (양방향 문)', b: '가벼운 절차. 소수가 빠르게 정한다', c: '틀리면 문을 다시 열고 돌아온다' },
  { y: y2, cls: 'svg-berg', a: '되돌리기 어렵다 (한 방향 문)', b: '신중한 절차. 천천히 숙고한다', c: '여러 사람에게 상담한다' },
];

export default function DoorTree() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="결정 앞에서 되돌릴 수 있는지 먼저 묻는다. 되돌릴 수 있으면 가벼운 절차로 소수가 빠르게, 되돌리기 어려우면 신중한 절차로 숙고하고 상담한다.">
      <defs>
        <marker id="dbar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      <rect className="svg-box-key" x="8" y="8" width="344" height={ROOT_H} rx="8" />
      <text className="t-strong" x="22" y="37">이 결정을 되돌릴 수 있나</text>
      <text className="t-sub" x="22" y="58">절차의 무게는 이 답에 맞춘다</text>
      <line className="svg-flow" x1={TRUNK_X} y1={8 + ROOT_H} x2={TRUNK_X} y2={y2 + BOX_H / 2} />
      {BRANCHES.map((b) => (
        <g key={b.a}>
          <line className="svg-flow" x1={TRUNK_X} y1={b.y + BOX_H / 2} x2={BX - 6} y2={b.y + BOX_H / 2} markerEnd="url(#dbar)" />
          <rect className={b.cls} x={BX} y={b.y} width={BW} height={BOX_H} rx="8" />
          <text className="t-strong" x={BX + 14} y={b.y + 29}>{b.a}</text>
          <text className="t-sub" x={BX + 14} y={b.y + 52}>{b.b}</text>
          <text className="t-sub" x={BX + 14} y={b.y + 72}>{b.c}</text>
        </g>
      ))}
    </svg>
  );
}
