/** 추정은 설계에서 숫자로, 허용 투자량은 숫자에서 설계로 향한다(Shape Up 3장의 구분). */
type Panel = { title: string; from: [string, string]; to: [string, string]; note: string };

const PANELS: Panel[] = [
  { title: '추정: 설계에서 시작해 숫자로 끝난다', from: ['설계', '원하는 기능 전부'], to: ['숫자', '걸리는 시간'], note: '범위가 고정이고, 날짜가 변한다' },
  { title: '허용 투자량: 숫자에서 시작해 설계로 끝난다', from: ['숫자', '쓸 수 있는 시간'], to: ['설계', '맞춰 넣은 범위'], note: '시간이 고정이고, 범위가 변한다' },
];

// 여백 기준: 상자 안 14px, 두 줄 상자 높이 66, 묶음 사이 24px 이상.
const BW = 150;
const BH = 66;
const RX = 360 - 8 - BW;
const PANEL_H = 30 + BH + 24 + 4; // 제목, 상자, 메모
const BETWEEN = 28;
const top = (i: number) => 8 + i * (PANEL_H + BETWEEN);
const noteBase = (i: number) => top(i) + 30 + BH + 24;
// 마지막 메모 baseline + 아래 여백 8 + 글자 아래쪽 4
const VB_H = noteBase(PANELS.length - 1) + 4 + 8;

export default function AppetiteFlow() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="추정은 설계에서 시작해 걸리는 시간이라는 숫자로 끝나고, 허용 투자량은 쓸 수 있는 시간이라는 숫자에서 시작해 그 안에 들어가는 범위로 끝난다.">
      <defs>
        <marker id="app-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      {PANELS.map((p, i) => {
        const y0 = top(i);
        const by = y0 + 30;
        return (
          <g key={p.title}>
            <text className="t-strong" x="8" y={y0 + 14}>{p.title}</text>
            <rect className="svg-box-key" x="8" y={by} width={BW} height={BH} rx="8" />
            <text className="t-strong" x="22" y={by + 29}>{p.from[0]}</text>
            <text className="t-sub" x="22" y={by + 50}>{p.from[1]}</text>
            <line className="svg-flow" x1={8 + BW + 6} y1={by + BH / 2} x2={RX - 6} y2={by + BH / 2} markerEnd="url(#app-arr)" />
            <rect className="svg-berg" x={RX} y={by} width={BW} height={BH} rx="8" />
            <text className="t-strong" x={RX + 14} y={by + 29}>{p.to[0]}</text>
            <text className="t-sub" x={RX + 14} y={by + 50}>{p.to[1]}</text>
            <text className="t-sub" x="8" y={noteBase(i)}>{p.note}</text>
          </g>
        );
      })}
    </svg>
  );
}
