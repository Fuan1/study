/** 형태 예시(가상 값). 단계 전환율과 누적 전환율은 사용자 수에서 계산한다. */
const STEPS = [
  { name: '방문', users: 10000 },
  { name: '상품 보기', users: 5000 },
  { name: '장바구니 담기', users: 1500 },
  { name: '결제 시작', users: 900 },
  { name: '결제 완료', users: 720 },
];

const X = 8;
const W = 344;
const PITCH = 72;
const pct = (v: number) => `${Math.round(v * 1000) / 10}%`;
const fmt = (n: number) => n.toLocaleString('en-US');

export default function FunnelChart() {
  const first = STEPS[0].users;
  const lastRow = 8 + (STEPS.length - 1) * PITCH;
  const vb = lastRow + 62 + 3 + 8; // 마지막 줄 baseline + 내림 + 아래 여백
  return (
    <svg viewBox={`0 0 360 ${vb}`} role="img" aria-label="퍼널 표의 모양. 단계마다 사용자 수 막대와 직전 단계 대비 전환율, 첫 단계 대비 누적 전환율을 보여 준다. 가상 값.">
      {STEPS.map((s, i) => {
        const r = 8 + i * PITCH;
        const prev = i > 0 ? STEPS[i - 1].users : first;
        return (
          <g key={s.name}>
            <text className="t-strong" x={X} y={r + 16}>{s.name}</text>
            <text className="t-strong" x={X + W} y={r + 16} textAnchor="end">{fmt(s.users)}명</text>
            <rect className="svg-berg" x={X} y={r + 26} width={(W * s.users) / first} height="14" rx="3" />
            <text className="t-sub" x={X} y={r + 62}>
              {i === 0 ? '첫 단계 · 기준 100%' : `직전 대비 ${pct(s.users / prev)} · 첫 단계 대비 ${pct(s.users / first)}`}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
