/** 형태 예시(가상 값). 손실 인원과 단계 전환율을 사용자 수에서 계산한다. */
const NAMES = ['방문', '상품 보기', '장바구니 담기', '결제 시작', '결제 완료'];
const USERS = [10000, 5000, 1500, 900, 720];

const X = 8;
const W = 344;
const PITCH = 72;
const fmt = (n: number) => n.toLocaleString('en-US');

const GAPS = USERS.slice(1).map((u, i) => ({
  label: `${NAMES[i]} → ${NAMES[i + 1]}`,
  loss: USERS[i] - u,
  rate: u / USERS[i],
}));
const maxLoss = Math.max(...GAPS.map((g) => g.loss));
const minRate = Math.min(...GAPS.map((g) => g.rate));

export default function DropMap() {
  const lastRow = 8 + (GAPS.length - 1) * PITCH;
  const vb = lastRow + 62 + 3 + 8;
  return (
    <svg viewBox={`0 0 360 ${vb}`} role="img" aria-label="단계 사이 이탈 구간 지도. 손실 인원이 가장 큰 구간은 방문에서 상품 보기이고, 단계 전환율이 가장 낮은 구간은 상품 보기에서 장바구니 담기다. 가상 값.">
      {GAPS.map((g, i) => {
        const r = 8 + i * PITCH;
        return (
          <g key={g.label}>
            <text className="t-strong" x={X} y={r + 16}>{g.label}</text>
            <text className="t-strong" x={X + W} y={r + 16} textAnchor="end">{fmt(g.loss)}명 이탈</text>
            <rect className={g.loss === maxLoss ? 'svg-tip' : 'svg-berg'} x={X} y={r + 26} width={(W * g.loss) / maxLoss} height="14" rx="3" />
            <text className="t-sub" x={X} y={r + 62}>단계 전환율 {Math.round(g.rate * 100)}%</text>
            {g.loss === maxLoss && <text className="t-accent" x={X + W} y={r + 62} textAnchor="end">손실 인원 최대</text>}
            {g.rate === minRate && <text className="t-bad" x={X + W} y={r + 62} textAnchor="end">전환율 최저</text>}
          </g>
        );
      })}
    </svg>
  );
}
