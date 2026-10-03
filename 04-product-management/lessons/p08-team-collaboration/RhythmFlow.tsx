type Row = { q: string; sub: string; out: string; limit: string };

const ROWS: Row[] = [
  { q: '백로그 정리', sub: '항목을 작고 분명하게', out: '준비된 항목', limit: '시간 상한 없음' },
  { q: '스프린트 계획', sub: '목표와 넣을 항목 정하기', out: '스프린트 목표', limit: '최대 8시간' },
  { q: '진행 확인', sub: '매일 목표 진행과 막힘', out: '다음 날 계획', limit: '15분' },
  { q: '스프린트 리뷰', sub: '결과를 보고 백로그 조정', out: '조정된 백로그', limit: '최대 4시간' },
  { q: '회고', sub: '일하는 방식 개선', out: '개선 항목', limit: '최대 3시간' },
];

// 여백 기준: 상자 안 14px, 두 줄 상자 높이 66, 상자 사이 34px.
const LW = 176; // 접점 상자 폭
const RW = 132; // 결과물 상자 폭
const RX = 360 - 8 - RW;
const H = 66;
const GAP = 34;
const y = (i: number) => 8 + i * (H + GAP);
// 마지막 상자 아랫변 + 선 두께 절반 + 아래 여백 8
const VB_H = y(ROWS.length - 1) + H + 1 + 8;

export default function RhythmFlow() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="협업 접점 다섯 개와 결과물. 백로그 정리는 준비된 항목, 스프린트 계획은 스프린트 목표, 진행 확인은 다음 날 계획, 스프린트 리뷰는 조정된 백로그, 회고는 개선 항목을 남긴다. 한 달 스프린트 기준 시간 상한은 계획 8시간, 진행 확인 15분, 리뷰 4시간, 회고 3시간이다.">
      <defs>
        <marker id="rfar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      {ROWS.map((r, i) => (
        <g key={r.q}>
          <rect className="svg-box" x="8" y={y(i)} width={LW} height={H} rx="8" />
          <text className="t-strong" x="22" y={y(i) + 29}>{r.q}</text>
          <text className="t-sub" x="22" y={y(i) + 50}>{r.sub}</text>
          <line className="svg-flow" x1={8 + LW + 6} y1={y(i) + H / 2} x2={RX - 6} y2={y(i) + H / 2} markerEnd="url(#rfar)" />
          <rect className="svg-berg" x={RX} y={y(i)} width={RW} height={H} rx="8" />
          <text className="t-strong" x={RX + 14} y={y(i) + 29}>{r.out}</text>
          <text className="t-sub" x={RX + 14} y={y(i) + 50}>{r.limit}</text>
          {i < ROWS.length - 1 && (
            <line className="svg-flow" x1={8 + LW / 2} y1={y(i) + H + 5} x2={8 + LW / 2} y2={y(i) + H + GAP - 5} markerEnd="url(#rfar)" />
          )}
        </g>
      ))}
    </svg>
  );
}
