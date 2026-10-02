type Box = { label: string; main: string; sub: string; key?: boolean };

const BOXES: Box[] = [
  { label: '질문', main: '결제 직전에 어디서 빠지나', sub: '결정 하나에서 뽑는다: 먼저 고칠 단계' },
  { label: '데이터', main: '단계 사건, 사용자 식별자, 시각', sub: '기기·유입 같은 속성도 함께 기록' },
  { label: '분석', main: '단계를 정의하고 사용자 수를 센다', sub: '순서, 전환 창, 집계 기준을 먼저 고정' },
  { label: '결과물', main: '퍼널 표, 이탈 지도, 비교표', sub: '단계, 사용자 수, 단계·누적 전환율', key: true },
  { label: '결정', main: '손실 큰 구간의 원인 가설 세우기', sub: 'A/B 테스트나 조사로 원인을 확인' },
];

// 여백 기준: 상자 높이 66(두 줄), 글자는 가장자리에서 14px 이상, 상자 사이 28px.
const X = 8;
const W = 344;
const H = 66;
const GAP = 28;

export default function DataToFunnel() {
  const y = (i: number) => 8 + i * (H + GAP);
  const bottom = y(BOXES.length - 1) + H; // 마지막 상자 아랫변
  const vb = Math.ceil(bottom + 0.75 + 8);
  return (
    <svg viewBox={`0 0 360 ${vb}`} role="img" aria-label="퍼널 분석의 흐름. 질문에서 시작해 단계 사건과 사용자 식별자를 모으고, 단계를 정의해 사용자 수를 세어, 퍼널 표와 이탈 지도와 비교표를 얻고, 손실이 큰 구간의 원인 가설을 세워 확인한다.">
      <defs>
        <marker id="ar-d07a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      {BOXES.map((b, i) => (
        <g key={b.label}>
          <rect className={b.key ? 'svg-berg' : 'svg-box'} x={X} y={y(i)} width={W} height={H} rx="8" />
          <text className="t-strong" x={X + 14} y={y(i) + 29}>{b.label} · {b.main}</text>
          <text className="t-sub" x={X + 14} y={y(i) + 50}>{b.sub}</text>
          {i < BOXES.length - 1 && (
            <line className="svg-flow" x1={180} y1={y(i) + H + 6} x2={180} y2={y(i) + H + GAP - 6} markerEnd="url(#ar-d07a)" />
          )}
        </g>
      ))}
    </svg>
  );
}
