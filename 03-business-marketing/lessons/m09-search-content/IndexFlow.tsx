/** robots.txt 로 막으면 noindex 가 읽히지 않는다는 것을 판단 흐름으로 보인다. */
type Step = { q: string; sub: string; yes: string; res: string; cls: string };

const STEPS: Step[] = [
  { q: 'robots.txt 로 막았나?', sub: '크롤링 접근 규칙', yes: '읽지 못함', res: 'noindex 무효', cls: 'svg-box-bad' },
  { q: 'noindex 가 있나?', sub: '메타 태그, 응답 헤더', yes: '색인 제외', res: '다음 수집 때', cls: 'svg-box-good' },
];

const LW = 204;
const RW = 112;
const RX = 360 - 8 - RW;
const H = 68;
const GAP = 48;
const TOP = 8;
const STROKE = 2;
const y = (i: number) => TOP + i * (H + GAP);
const VB_H = Math.ceil(y(STEPS.length) + H + STROKE / 2 + 8);

export default function IndexFlow() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="색인 제어 판단 흐름. robots.txt 로 막으면 페이지를 읽지 못해 noindex 도 효력이 없다. 막지 않고 noindex 가 있으면 색인에서 제외된다. 둘 다 아니면 색인 후보가 된다.">
      <defs>
        <marker id="ar-m09b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      {STEPS.map((s, i) => (
        <g key={s.q}>
          <rect className="svg-box" x="8" y={y(i)} width={LW} height={H} rx="8" />
          <text className="t-strong" x="22" y={y(i) + 29}>{s.q}</text>
          <text className="t-sub" x="22" y={y(i) + 50}>{s.sub}</text>
          <line className="svg-flow" x1={8 + LW + 6} y1={y(i) + H / 2} x2={RX - 6} y2={y(i) + H / 2} markerEnd="url(#ar-m09b)" />
          <text className="t-sub" x={(8 + LW + RX) / 2} y={y(i) + H / 2 - 10} textAnchor="middle">예</text>
          <rect className={s.cls} x={RX} y={y(i)} width={RW} height={H} rx="8" />
          <text className="t-strong" x={RX + 14} y={y(i) + 29}>{s.yes}</text>
          <text className="t-sub" x={RX + 14} y={y(i) + 50}>{s.res}</text>
          <line className="svg-flow" x1={8 + LW / 2} y1={y(i) + H + 6} x2={8 + LW / 2} y2={y(i) + H + GAP - 6} markerEnd="url(#ar-m09b)" />
          <text className="t-sub" x={8 + LW / 2 + 14} y={y(i) + H + GAP / 2 + 5}>아니오</text>
        </g>
      ))}
      <rect className="svg-box-key" x="8" y={y(STEPS.length)} width={LW} height={H} rx="8" />
      <text className="t-strong" x="22" y={y(STEPS.length) + 29}>색인 후보</text>
      <text className="t-sub" x="22" y={y(STEPS.length) + 50}>이후는 품질과 중복 판단</text>
    </svg>
  );
}
