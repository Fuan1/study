/**
 * 형태 예시(가상 값). 한 주 활동 기록을 네 칸으로 분류해 합산한 모양.
 * 균등선은 합계의 4분의 1이다. 비율과 균등선은 코드에서 계산한다.
 */
const LOG = [
  { name: '언어 학습', min: 150 },
  { name: '받아들이기', min: 60 },
  { name: '내보내기', min: 0 },
  { name: '유창성', min: 30 },
];

const TOTAL = LOG.reduce((s, r) => s + r.min, 0);
const EVEN = TOTAL / LOG.length;
const BX = 92;
const SCALE = 160 / 150;
const BH = 22;
const PITCH = 40;
const TOP = 40;

export default function WeekLog() {
  const evenX = BX + EVEN * SCALE;
  const lastBottom = TOP + (LOG.length - 1) * PITCH + BH;
  const vbH = lastBottom + 16;
  return (
    <svg viewBox={`0 0 360 ${vbH}`} role="img" aria-label="한 주 기록 예시. 언어 학습에 150분, 받아들이기 60분, 내보내기 0분, 유창성 30분을 썼다. 내보내기 칸이 비어 있고 언어 학습이 균등선을 크게 넘는다.">
      <text className="t-sub" x={evenX} y="16" textAnchor="middle">균등선 {EVEN}분</text>
      <line x1={evenX} y1="26" x2={evenX} y2={lastBottom + 8} stroke="var(--line)" strokeWidth="1.5" strokeDasharray="4 3" />
      {LOG.map((r, i) => {
        const y = TOP + i * PITCH;
        const w = Math.max(r.min * SCALE, 0);
        const over = r.min > EVEN;
        return (
          <g key={r.name}>
            <text className="t-sub" x="8" y={y + 16}>{r.name}</text>
            {w > 0 && <rect className={over ? 'svg-tip' : 'svg-berg'} x={BX} y={y} width={w} height={BH} rx="4" />}
            <text className={r.min === 0 ? 't-bad' : 't-strong'} x={BX + w + 8} y={y + 16}>{r.min}분 · {Math.round((r.min / TOTAL) * 100)}%</text>
          </g>
        );
      })}
    </svg>
  );
}
