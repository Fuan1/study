/** 같은 사람이 폰과 PC에서 방문한 뒤 각각 로그인하는 흐름. 동작은 Segment 문서(익명 ID 자동 생성, 로그인 시 두 ID를 함께 기록, 기기마다 익명 ID가 따로 생김)를 따랐다. */
const NODE_W = 150;
const NODE_H = 66;
const X1 = 8;
const X2 = 360 - 8 - NODE_W;

const LANES = [
  { label: '폰', a: '익명 ID A', b: 'A + 회원번호 U' },
  { label: 'PC', a: '익명 ID B', b: 'B + 회원번호 U' },
];

const LANE_GAP = 108; // 레인 시작점 간격(라벨 18px + 상자 66px + 여백 24px)

export default function IdentityFlow() {
  const laneY = (i: number) => 8 + i * LANE_GAP;
  const lastBottom = laneY(LANES.length - 1) + 30 + NODE_H; // 마지막 상자 아랫변
  const divY = lastBottom + 24;
  const y1 = divY + 30;
  const y2 = y1 + 28;
  const vbH = y2 + 8 + 4; // 마지막 글자 baseline 아래 여백
  return (
    <svg viewBox={`0 0 360 ${vbH}`} role="img" aria-label="한 사람이 폰과 PC에서 각각 방문하면 익명 ID가 둘이라 로그인 전에는 두 명으로 세어진다. 각 기기에서 로그인하면 같은 회원번호가 붙어 한 명으로 합쳐진다.">
      <defs>
        <marker id="ar-id" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      {LANES.map((l, i) => {
        const ty = laneY(i);
        const by = ty + 30;
        return (
          <g key={l.label}>
            <text className="t-strong" x={X1} y={ty + 12}>{l.label}</text>
            <rect className="svg-box" x={X1} y={by} width={NODE_W} height={NODE_H} rx="8" />
            <text className="t-strong" x={X1 + 14} y={by + 29}>방문</text>
            <text className="t-sub" x={X1 + 14} y={by + 50}>{l.a}</text>
            <line className="svg-flow" x1={X1 + NODE_W + 6} y1={by + NODE_H / 2} x2={X2 - 6} y2={by + NODE_H / 2} markerEnd="url(#ar-id)" />
            <rect className="svg-berg" x={X2} y={by} width={NODE_W} height={NODE_H} rx="8" />
            <text className="t-strong" x={X2 + 14} y={by + 29}>로그인</text>
            <text className="t-sub" x={X2 + 14} y={by + 50}>{l.b}</text>
          </g>
        );
      })}
      <line x1="8" y1={divY} x2="352" y2={divY} stroke="var(--line)" />
      <text className="t-bad" x="8" y={y1}>로그인 전 집계: 익명 ID 2개, 2명</text>
      <text className="t-good" x="8" y={y2}>로그인 후 집계: 회원번호 U, 1명</text>
    </svg>
  );
}
