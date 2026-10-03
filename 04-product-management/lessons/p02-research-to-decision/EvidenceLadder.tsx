type Rung = { name: string; sub: string; cls: string };

const RUNGS: Rung[] = [
  { name: '직접 관찰한 행동', sub: '무엇을 했나. 이유는 따로 묻는다', cls: 'svg-box-good' },
  { name: '기록된 행동(로그·문의)', sub: '얼마나 했나. 이유는 모른다', cls: 'svg-box-good' },
  { name: '지난 구체적 사건의 이야기', sub: '이유 후보. 기억에 기댄다', cls: 'svg-box' },
  { name: '일반 습관·의견·선호', sub: '단서로만. 어긋나기 쉽다', cls: 'svg-box' },
  { name: '예측·바람·요청한 해결책', sub: '필요를 읽는 단서로만 쓴다', cls: 'svg-box-bad' },
];

// 여백 기준: 상자 안 14px, 두 줄 상자 높이 66, 상자 사이 14px.
const BX = 48;
const BW = 360 - 8 - BX;
const H = 66;
const GAP = 14;
const y = (i: number) => 8 + i * (H + GAP);
const BOTTOM = y(RUNGS.length - 1) + H;
// 마지막 상자 아랫변 + 선 두께 절반 + 아래 여백 8
const VB_H = BOTTOM + 1 + 8;
const AX = 24;

export default function EvidenceLadder() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="실제로 일어난 일에 가까운 순서로 본 증거의 층. 직접 관찰한 행동과 기록된 행동이 위, 지난 사건의 이야기와 일반 의견이 가운데, 예측과 요청한 해결책이 아래다.">
      <defs>
        <marker id="el-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      <text className="t-strong" x={AX} y="26" textAnchor="middle">강</text>
      <line className="svg-flow" x1={AX} y1="44" x2={AX} y2="338" markerEnd="url(#el-arrow)" />
      <text className="t-strong" x={AX} y="372" textAnchor="middle">약</text>
      {RUNGS.map((r, i) => (
        <g key={r.name}>
          <rect className={r.cls} x={BX} y={y(i)} width={BW} height={H} rx="8" />
          <text className="t-strong" x={BX + 14} y={y(i) + 29}>{r.name}</text>
          <text className="t-sub" x={BX + 14} y={y(i) + 50}>{r.sub}</text>
        </g>
      ))}
    </svg>
  );
}
