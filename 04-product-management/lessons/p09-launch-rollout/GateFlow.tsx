// 한 단계에서 노출을 늘릴지 정하는 질문 순서. 형태 예시이며 순서는 이 글의 정리다.
type Gate = { q: string; sub: string; no?: string; noSub?: string; bad?: boolean };

const GATES: Gate[] = [
  { q: '가드레일이 선 안?', sub: '단계 내내 확인한다', no: '아니오: 되돌림', noSub: '논의는 끈 뒤에', bad: true },
  { q: '계측·비율이 맞나?', sub: '표본 비율, 로그 이상', no: '아니오: 멈춤', noSub: '원인부터 찾는다' },
  { q: '관찰 창을 채웠나?', sub: '정한 시간과 규모', no: '아니오: 대기', noSub: '늘리지 않는다' },
  { q: '다음 단계로 확대', sub: '단계표의 다음 줄' },
];

const LW = 176;
const RW = 136;
const RX = 360 - 8 - RW;
const H = 66;
const GAP = 34;
const y = (i: number) => 8 + i * (H + GAP);
// 마지막 상자 아랫변 + 선 두께 절반 + 아래 여백 8
const VB_H = y(GATES.length - 1) + H + 1 + 8;

export default function GateFlow() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="노출 확대 판단 순서. 가드레일이 선 안인가, 계측과 비율이 맞는가, 관찰 창을 채웠는가를 차례로 묻고 모두 예이면 다음 단계로 확대한다. 아니오이면 각각 되돌림, 멈춤, 대기.">
      <defs>
        <marker id="gbar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      {GATES.map((g, i) => (
        <g key={g.q}>
          <rect className={g.no ? 'svg-box' : 'svg-box-key'} x="8" y={y(i)} width={LW} height={H} rx="8" />
          <text className="t-strong" x="22" y={y(i) + 29}>{g.q}</text>
          <text className="t-sub" x="22" y={y(i) + 50}>{g.sub}</text>
          {g.no && (
            <g>
              <line className="svg-flow" x1={8 + LW + 6} y1={y(i) + H / 2} x2={RX - 6} y2={y(i) + H / 2} markerEnd="url(#gbar)" />
              <rect className={g.bad ? 'svg-box-bad' : 'svg-box'} x={RX} y={y(i)} width={RW} height={H} rx="8" />
              <text className={g.bad ? 't-bad' : 't-strong'} x={RX + 14} y={y(i) + 29}>{g.no}</text>
              <text className="t-sub" x={RX + 14} y={y(i) + 50}>{g.noSub}</text>
            </g>
          )}
          {i < GATES.length - 1 && (
            <g>
              <line className="svg-flow" x1={8 + LW / 2} y1={y(i) + H + 5} x2={8 + LW / 2} y2={y(i) + H + GAP - 5} markerEnd="url(#gbar)" />
              <text className="t-sub" x={8 + LW / 2 + 14} y={y(i) + H + GAP / 2 + 5}>예</text>
            </g>
          )}
        </g>
      ))}
    </svg>
  );
}
