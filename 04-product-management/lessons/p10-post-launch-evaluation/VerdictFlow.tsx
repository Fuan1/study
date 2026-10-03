// 판정 순서. 가드레일을 먼저 보고, 목표 지표를 보고, 미달이면 고칠 수 있는지를 본다. 실무 관행을 정리한 흐름이다.
type Row = { q: string; sub: string; yes: boolean; label: string; out: string; outSub: string; cls: string };

const ROWS: Row[] = [
  { q: '가드레일 유지?', sub: '허용 범위 안인가', yes: false, label: '아니오', out: '되돌림', outSub: '원래대로 복원', cls: 'svg-box-bad' },
  { q: '목표 지표 달성?', sub: '기준값 이상인가', yes: true, label: '예', out: '유지', outSub: '확대 후 관찰', cls: 'svg-box-good' },
  { q: '고칠 수 있나?', sub: '원인이 보이는가', yes: true, label: '예', out: '수정', outSub: '고친 뒤 재판정', cls: 'svg-berg' },
];
const DOWN = ['예', '아니오', '아니오'];

// 여백 기준: 상자 안 14px, 두 줄 상자 높이 66, 상자 사이 34px.
const LW = 160;
const RW = 132;
const RX = 360 - 8 - RW;
const H = 66;
const GAP = 34;
const y = (i: number) => 8 + i * (H + GAP);
const LAST = ROWS.length; // 폐기 상자의 행 번호
// 마지막 상자 아랫변 + 선 두께 절반 + 아래 여백 8
const VB_H = y(LAST) + H + 1 + 8;
const MID_X = (8 + LW + RX) / 2;

export default function VerdictFlow() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="판정 순서. 가드레일이 허용 범위를 벗어나면 되돌림. 유지되고 목표 지표가 기준값 이상이면 유지. 미달이면 원인이 보이고 고칠 수 있으면 수정, 아니면 폐기.">
      <defs>
        <marker id="p10ar2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      {ROWS.map((r, i) => (
        <g key={r.q}>
          <rect className="svg-box" x="8" y={y(i)} width={LW} height={H} rx="8" />
          <text className="t-strong" x="22" y={y(i) + 29}>{r.q}</text>
          <text className="t-sub" x="22" y={y(i) + 50}>{r.sub}</text>
          <line className="svg-flow" x1={8 + LW + 6} y1={y(i) + H / 2} x2={RX - 6} y2={y(i) + H / 2} markerEnd="url(#p10ar2)" />
          <text className="t-sub" x={MID_X} y={y(i) + H / 2 - 12} textAnchor="middle">{r.label}</text>
          <rect className={r.cls} x={RX} y={y(i)} width={RW} height={H} rx="8" />
          <text className="t-strong" x={RX + 14} y={y(i) + 29}>{r.out}</text>
          <text className="t-sub" x={RX + 14} y={y(i) + 50}>{r.outSub}</text>
          <line className="svg-flow" x1={8 + LW / 2} y1={y(i) + H + 5} x2={8 + LW / 2} y2={y(i) + H + GAP - 5} markerEnd="url(#p10ar2)" />
          <text className="t-sub" x={8 + LW / 2 + 14} y={y(i) + H + GAP / 2 + 5}>{DOWN[i]}</text>
        </g>
      ))}
      <rect className="svg-berg" x="8" y={y(LAST)} width={LW} height={H} rx="8" />
      <text className="t-strong" x="22" y={y(LAST) + 29}>폐기</text>
      <text className="t-sub" x="22" y={y(LAST) + 50}>종료 절차로</text>
    </svg>
  );
}
