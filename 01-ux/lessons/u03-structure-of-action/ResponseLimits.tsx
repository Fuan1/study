/** 로그 눈금 위치는 코드로 계산한다. */
const MIN = 0.05;
const MAX = 20;
const X0 = 20;
const X1 = 340;
const px = (t: number) => X0 + ((Math.log10(t) - Math.log10(MIN)) / (Math.log10(MAX) - Math.log10(MIN))) * (X1 - X0);

const ZONES = [
  { from: MIN, to: 0.1, fill: 'var(--good)' },
  { from: 0.1, to: 1, fill: 'var(--accent)' },
  { from: 1, to: 10, fill: 'var(--warm)' },
  { from: 10, to: MAX, fill: 'var(--bad)' },
];

const ROWS = [
  { title: '0.1초 이하: 즉각적이다', body: '처방: 결과만 바로 보여준다', fill: 'var(--good)' },
  { title: '1초 이하: 흐름은 이어진다', body: '처방: 로딩 표시는 필요 없다', fill: 'var(--accent)' },
  { title: '1초에서 10초: 흐름이 끊긴다', body: '처방: 스피너나 스켈레톤을 띄운다', fill: 'var(--warm)' },
  { title: '10초 초과: 주의가 떠난다', body: '처방: 진행률과 취소를 준다', fill: 'var(--bad)' },
];

export default function ResponseLimits() {
  return (
    <svg viewBox="0 0 360 262" role="img" aria-label="응답 시간을 로그 눈금으로 그린 축. 0.1초, 0.4초(도허티), 1초, 10초가 표시되고 구간마다 필요한 피드백이 아래에 정리되어 있다.">
      {ZONES.map((z) => (
        <rect key={z.from} x={px(z.from)} y="30" width={px(z.to) - px(z.from)} height="24" style={{ fill: z.fill, fillOpacity: 0.28 }} />
      ))}
      <line x1={X0} y1="54" x2={X1} y2="54" stroke="var(--muted)" strokeWidth="1.5" />
      {[0.1, 1, 10].map((t) => (
        <g key={t}>
          <line x1={px(t)} y1="26" x2={px(t)} y2="58" stroke="var(--strong)" strokeWidth="1.5" />
          <text className="t-strong" x={px(t)} y="18" textAnchor="middle">{t}초</text>
        </g>
      ))}
      <line x1={px(0.4)} y1="30" x2={px(0.4)} y2="62" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="3 3" />
      <text className="t-accent" x={px(0.4)} y="78" textAnchor="middle">0.4초 (도허티)</text>
      <text className="t-sub" x={X1} y="78" textAnchor="end">로그 눈금</text>
      {ROWS.map((r, i) => {
        const y = 96 + i * 41;
        return (
          <g key={r.title}>
            <rect x="8" y={y} width="5" height="32" rx="2" style={{ fill: r.fill, fillOpacity: 0.8 }} />
            <text className="t-strong" x="22" y={y + 13}>{r.title}</text>
            <text className="t-sub" x="22" y={y + 30}>{r.body}</text>
          </g>
        );
      })}
    </svg>
  );
}
