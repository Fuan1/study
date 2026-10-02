/** Iyengar & Lepper(2000) 잼 실험의 보고된 대략값을 막대 길이로 옮긴 것이다. */
const W = 240; // 100% 의 길이
const X = 8;

type Bar = { label: string; pct: number; tone: 'warm' | 'accent' };

function Group({ y, title, sub, bars }: { y: number; title: string; sub: string; bars: Bar[] }) {
  return (
    <g>
      <text className="t-strong" x={X} y={y}>{title}</text>
      <text className="t-sub" x={X} y={y + 18}>{sub}</text>
      {bars.map((b, i) => {
        const by = y + 30 + i * 32;
        const w = Math.max((b.pct / 100) * W, 3);
        return (
          <g key={b.label}>
            <rect x={X} y={by} width={w} height="24" rx="4" fill={b.tone === 'warm' ? 'var(--warm)' : 'var(--accent)'} />
            <text className="t-strong" x={X + w + 8} y={by + 17}>{b.pct}%</text>
            <text x={X + w + 52} y={by + 17} fontSize="13">{b.label}</text>
          </g>
        );
      })}
    </g>
  );
}

export default function JamStudy() {
  return (
    <svg viewBox="0 0 360 258" role="img" aria-label="잼 실험. 진열대 앞에 멈춘 사람은 24종이 약 60퍼센트, 6종이 약 40퍼센트였다. 멈춘 사람 중 실제로 산 사람은 24종이 약 3퍼센트, 6종이 약 30퍼센트였다.">
      <Group y={20} title="진열대 앞에 멈춘 사람" sub="지나간 사람 대비, 대략값" bars={[{ label: '24종', pct: 60, tone: 'warm' }, { label: '6종', pct: 40, tone: 'accent' }]} />
      <Group y={140} title="멈춘 사람 중 실제로 산 사람" sub="쿠폰으로 구매, 대략값" bars={[{ label: '24종', pct: 3, tone: 'warm' }, { label: '6종', pct: 30, tone: 'accent' }]} />
    </svg>
  );
}
