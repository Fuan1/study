// 점수 읽기. 구간(열망 0.7~1.0 녹, 0.4~0.6 황, 0.0~0.3 적)과 예시 점수(0.9, 0.5, 0.5 의 평균 0.63)는 What Matters 의 채점 안내에서 가져왔다.
// 확약은 1.0 만 통과한다(Google OKR 플레이북).
const X0 = 24;
const W = 312;
const px = (v: number) => X0 + W * v;

const BANDS = [
  { from: 0.0, to: 0.3, label: '위험', color: 'var(--bad)' },
  { from: 0.4, to: 0.6, label: '주의', color: 'var(--warm)' },
  { from: 0.7, to: 1.0, label: '순조', color: 'var(--good)' },
];
const TICKS = [0, 0.3, 0.4, 0.6, 0.7, 1];
const KR = [0.9, 0.5, 0.5];
const AVG = Math.round((KR.reduce((s, v) => s + v, 0) / KR.length) * 100) / 100; // 0.63

const T1 = 8; // 첫 제목 baseline 위쪽 시작
const BAR_Y = T1 + 52;
const BAR_H = 28;
const LABEL_Y = BAR_Y + BAR_H + 24;
const DIV1 = LABEL_Y + 24;
const T2 = DIV1 + 32;
const TRACK_Y = T2 + 56;
const DIV2 = TRACK_Y + 56;
const R1 = DIV2 + 32;
const R2 = R1 + 26;
const VB_H = R2 + 14;

export default function KrScores() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="열망 OKR 의 점수 구간은 0.0에서 0.3이 위험, 0.4에서 0.6이 주의, 0.7에서 1.0이 순조다. 핵심 결과 점수 0.9, 0.5, 0.5의 평균은 0.63이다. 열망이면 진전이고 확약이면 1.0이 아니므로 실패다.">
      <text className="t-strong" x="16" y={T1 + 14}>열망(A) 점수 구간</text>
      {TICKS.map((t) => (
        <text key={t} className="t-sub" x={px(t)} y={BAR_Y - 10} textAnchor="middle">{t.toFixed(1)}</text>
      ))}
      {BANDS.map((b) => (
        <g key={b.label}>
          <rect x={px(b.from)} y={BAR_Y} width={W * (b.to - b.from)} height={BAR_H} rx="3" fill={b.color} fillOpacity="0.28" stroke={b.color} strokeWidth="1.5" />
          <text className="t-sub" x={px((b.from + b.to) / 2)} y={LABEL_Y} textAnchor="middle">{b.label}</text>
        </g>
      ))}
      <line x1="8" y1={DIV1} x2="352" y2={DIV1} stroke="var(--line)" />
      <text className="t-strong" x="16" y={T2 + 14}>예시: 핵심 결과 점수 0.9, 0.5, 0.5</text>
      <line x1={X0} y1={TRACK_Y} x2={X0 + W} y2={TRACK_Y} stroke="var(--line)" strokeWidth="1.5" />
      <circle cx={px(0.9)} cy={TRACK_Y} r="6" fill="var(--accent)" />
      <circle cx={px(0.5)} cy={TRACK_Y} r="6" fill="var(--accent)" />
      <line x1={px(AVG)} y1={TRACK_Y - 12} x2={px(AVG)} y2={TRACK_Y + 12} stroke="var(--warm)" strokeWidth="2" />
      <text className="t-warm" x={px(AVG) + 10} y={TRACK_Y - 16}>{`평균 ${AVG.toFixed(2)}`}</text>
      <text className="t-sub" x={px(0.9)} y={TRACK_Y + 30} textAnchor="middle">0.9</text>
      <text className="t-sub" x={px(0.5)} y={TRACK_Y + 30} textAnchor="middle">0.5 (둘)</text>
      <line x1="8" y1={DIV2} x2="352" y2={DIV2} stroke="var(--line)" />
      <text className="t-good" x="16" y={R1}>열망(A): 0.63 은 진전이다</text>
      <text className="t-bad" x="16" y={R2}>확약(C): 1.0 이 아니면 실패다</text>
    </svg>
  );
}
