/** 1993년 찬물 실험의 구조를 단순화한 개념도다. 곡선 모양은 실측 곡선이 아니라 설명용이다. */
const X0 = 40;
const PX = 2.5; // 1초당 가로 길이
const Y_BASE = 104;
const H = 70;

const pt = (sec: number, level: number) => `${(X0 + sec * PX).toFixed(1)},${(Y_BASE - level * H).toFixed(1)}`;

const SHORT = [pt(0, 0.1), pt(8, 0.8), pt(60, 0.85)].join(' ');
const LONG = [pt(0, 0.1), pt(8, 0.8), pt(60, 0.85), pt(90, 0.5)].join(' ');

const CHOSE = 22;
const TOTAL = 32;

function Panel({ y, title, path, endSec, endLevel, note, tone }: { y: number; title: string; path: string; endSec: number; endLevel: number; note: string; tone: 'bad' | 'good' }) {
  return (
    <g transform={`translate(0 ${y})`}>
      <text className="t-strong" x="8" y="14">{title}</text>
      <line className="svg-flow" x1={X0} y1={Y_BASE} x2={X0 + 100 * PX} y2={Y_BASE} />
      <line className="svg-flow" x1={X0} y1={Y_BASE} x2={X0} y2={Y_BASE - H - 6} />
      <text className="t-sub" x={X0 - 6} y={Y_BASE - H + 8} textAnchor="end">불쾌</text>
      <polyline points={path} fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinejoin="round" />
      <circle cx={X0 + 45 * PX} cy={Y_BASE - 0.85 * H} r="4.5" fill="var(--warm)" />
      <text className="t-warm" x={X0 + 45 * PX} y={Y_BASE - 0.85 * H - 9} textAnchor="middle" fontSize="12.5">정점</text>
      <circle cx={X0 + endSec * PX} cy={Y_BASE - endLevel * H} r="5" className={tone === 'good' ? 'svg-box-good' : 'svg-box-bad'} />
      <text className={tone === 'good' ? 't-good' : 't-bad'} x={X0 + endSec * PX + 10} y={Y_BASE - endLevel * H + 4}>끝</text>
      <text className="t-sub" x={X0} y={Y_BASE + 17}>0초</text>
      <text className="t-sub" x={X0 + endSec * PX} y={Y_BASE + 17} textAnchor="middle">{endSec}초</text>
      <text className="t-sub" x="352" y="14" textAnchor="end">{note}</text>
    </g>
  );
}

export default function PeakEndTrials() {
  const pct = Math.round((CHOSE / TOTAL) * 100);
  return (
    <svg viewBox="0 0 360 304" role="img" aria-label={`찬물 실험 개념도. 짧은 시험은 60초에 끝나고 긴 시험은 같은 정점 뒤에 30초 동안 덜 아픈 구간이 붙는다. 32명 중 ${CHOSE}명, ${pct}퍼센트가 긴 시험을 다시 하겠다고 골랐다.`}>
      <Panel y={4} title="짧은 시험 60초" path={SHORT} endSec={60} endLevel={0.85} note="14도 유지" tone="bad" />
      <Panel y={134} title="긴 시험 90초" path={LONG} endSec={90} endLevel={0.5} note="마지막 30초 약간 덜 아픔" tone="good" />
      <text className="t-good" x="180" y="282" textAnchor="middle">{TOTAL}명 중 {CHOSE}명({pct}%)이 긴 시험을 다시 하겠다고 골랐다</text>
      <text className="t-sub" x="180" y="298" textAnchor="middle">개념도. 곡선은 설명용이다</text>
    </svg>
  );
}
