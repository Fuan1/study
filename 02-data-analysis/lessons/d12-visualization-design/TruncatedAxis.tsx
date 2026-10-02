/** 같은 세 값(가정)을 축 시작만 달리해 그린다. 높이는 값에서 계산한다. */
const DATA = [
  { m: '1월', v: 71 },
  { m: '2월', v: 73 },
  { m: '3월', v: 75 },
];
const TOP = 80; // 두 차트 모두 축 위끝
const PLOT_H = 140;
const BASE = 236; // 기준선 y
const BW = 36;
const BG = 14;
const PW = 160; // 패널 폭

const first = DATA[0].v;
const last = DATA[DATA.length - 1].v;
const hOf = (v: number, min: number) => ((v - min) / (TOP - min)) * PLOT_H;

type PanelProps = { x0: number; min: number; bad: boolean; headline: string };

function Panel({ x0, min, bad, headline }: PanelProps) {
  const ratio = hOf(last, min) / hOf(first, min);
  const inner = DATA.length * BW + (DATA.length - 1) * BG;
  const off = (PW - inner) / 2;
  return (
    <g>
      <text className={bad ? 't-bad' : 't-good'} x={x0} y="20">{bad ? '나쁜 차트' : '고친 차트'}</text>
      <text className="t-strong" x={x0} y="42">{headline}</text>
      {DATA.map((d, i) => {
        const h = hOf(d.v, min);
        const x = x0 + off + i * (BW + BG);
        return (
          <g key={d.m}>
            <rect x={x} y={BASE - h} width={BW} height={h} fill={i === DATA.length - 1 ? 'var(--warm)' : 'var(--muted)'} />
            <text className="t-sub" x={x + BW / 2} y={BASE - h - 8} textAnchor="middle">{d.v}</text>
            <text className="t-sub" x={x + BW / 2} y={BASE + 20} textAnchor="middle">{d.m}</text>
          </g>
        );
      })}
      <line x1={x0} y1={BASE} x2={x0 + PW} y2={BASE} stroke="var(--ink)" strokeWidth="1.5" />
      <text className={bad ? 't-bad' : 't-good'} x={x0} y={BASE + 46}>축은 {min}부터</text>
      <text className="t-sub" x={x0} y={BASE + 70}>3월 막대는 1월의 {ratio.toFixed(1)}배</text>
    </g>
  );
}

export default function TruncatedAxis() {
  const growth = ((last / first - 1) * 100).toFixed(1);
  const vbH = BASE + 70 + 4 + 12; // 마지막 글자 baseline + 내려간 부분 + 아래 여백
  return (
    <svg viewBox={`0 0 360 ${vbH}`} role="img" aria-label={`같은 값 ${DATA.map((d) => d.v).join(', ')}을 축 시작만 바꿔 그린 두 막대 차트. 축이 70에서 시작하면 3월 막대가 1월의 5배로 보이고, 0에서 시작하면 실제 증가율 ${growth}퍼센트에 맞는 높이로 보인다.`}>
      <Panel x0={8} min={70} bad headline="5배 차이로 보인다" />
      <Panel x0={192} min={0} bad={false} headline={`3개월간 ${growth}% 올랐다`} />
    </svg>
  );
}
