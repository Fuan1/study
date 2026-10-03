// 한 분기의 점검 리듬. 시간표는 Doerr 의 "A Typical OKR Cycle", 주간 점검은 What Matters 의 주간 1:1 안내,
// 중간 점검과 채점은 Google re:Work 안내에서 가져왔다.
type Step = { when: string; what: string; key?: boolean };

const STEPS: Step[] = [
  { when: '분기 4~6주 전', what: '회사 OKR 초안' },
  { when: '분기 2주 전', what: '회사 OKR 확정과 공유' },
  { when: '분기 시작', what: '팀 OKR 공유' },
  { when: '시작 1주 뒤', what: '개인 OKR 공유' },
  { when: '분기 중 매주', what: '1:1 에서 점검. 채점은 하지 않는다', key: true },
  { when: '분기 중간', what: '모든 수준 OKR 중간 점검', key: true },
  { when: '분기 끝', what: '채점, 자기평가, 성찰', key: true },
];

const PITCH = 58;
const LX = 28;
const TX = 52;
const y = (i: number) => 24 + i * PITCH;
// 마지막 줄 baseline + 아래 여백
const VB_H = y(STEPS.length - 1) + 20 + 12;

export default function QuarterRhythm() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="한 분기의 점검 리듬. 분기 4주에서 6주 전 회사 OKR 초안, 2주 전 확정, 시작 때 팀 OKR, 1주 뒤 개인 OKR, 분기 중 매주 1대1 점검, 중간 점검, 분기 끝 채점과 성찰.">
      <line x1={LX} y1={y(0) - 4} x2={LX} y2={y(STEPS.length - 1) - 4} stroke="var(--line)" strokeWidth="1.5" />
      {STEPS.map((s, i) => (
        <g key={s.when}>
          <circle cx={LX} cy={y(i) - 4} r="6" fill={s.key ? 'var(--accent)' : 'var(--bg)'} stroke={s.key ? 'var(--accent)' : 'var(--line)'} strokeWidth="1.5" />
          <text className="t-strong" x={TX} y={y(i)}>{s.when}</text>
          <text className="t-sub" x={TX} y={y(i) + 20}>{s.what}</text>
        </g>
      ))}
    </svg>
  );
}
