/** 형태 예시(가상 값). InsightRows 와 같은 가상 예시 세 개가 근거에 따라 다른 다음 행동을 받는다. */
type Row = { name: string; ev: string; act: string; actSub: string; key?: boolean };

const ROWS: Row[] = [
  { name: '쿠폰 위치를 못 찾는다', ev: '관찰 3명 · 로그 일치', act: '결정 후보', actSub: '해결책 비교', key: true },
  { name: '알림이 너무 많다', ev: '말 1명 · 빈도를 모름', act: '빈도 확인', actSub: '로그·설문' },
  { name: '검색을 안 쓴다', ev: '말 4명 · 로그는 반대', act: '보류', actSub: '정의 점검' },
];

// 여백 기준: 상자 안 14px, 두 줄 상자 높이 66, 상자 사이 16px, 열 제목은 상자 위 13px 이상.
const LW = 206;
const RX = 240;
const RW = 360 - 8 - RX;
const H = 66;
const GAP = 16;
const TOP = 40;
const y = (i: number) => TOP + i * (H + GAP);
// 마지막 상자 아랫변 + 선 두께 절반 + 아래 여백 8
const VB_H = y(ROWS.length - 1) + H + 1 + 8;

export default function CandidateList() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="결정 후보표의 모양. 쿠폰 위치를 못 찾는다는 근거가 강해 결정 후보, 알림이 너무 많다는 말 1명뿐이라 빈도 확인, 검색을 안 쓴다는 말과 로그가 반대라 보류한다.">
      <defs>
        <marker id="cl-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      <text className="t-sub" x="8" y="24">후보와 근거</text>
      <text className="t-sub" x={RX} y="24">다음 행동</text>
      {ROWS.map((r, i) => (
        <g key={r.name}>
          <rect className={r.key ? 'svg-box-key' : 'svg-box'} x="8" y={y(i)} width={LW} height={H} rx="8" />
          <text className="t-strong" x="22" y={y(i) + 29}>{r.name}</text>
          <text className="t-sub" x="22" y={y(i) + 50}>{r.ev}</text>
          <line className="svg-flow" x1={8 + LW + 6} y1={y(i) + H / 2} x2={RX - 6} y2={y(i) + H / 2} markerEnd="url(#cl-arrow)" />
          <rect className="svg-berg" x={RX} y={y(i)} width={RW} height={H} rx="8" />
          <text className="t-strong" x={RX + 14} y={y(i) + 29}>{r.act}</text>
          <text className="t-sub" x={RX + 14} y={y(i) + 50}>{r.actSub}</text>
        </g>
      ))}
    </svg>
  );
}
