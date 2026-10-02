/** 시퀀스 한 개의 구조: 트리거, 대기, 조건, 메시지, 종료 조건. 예시는 활성화 유도 시퀀스(가정). */
type Step = { title: string; sub: string; key?: boolean };

const STEPS: Step[] = [
  { title: '1 트리거', sub: '가입 완료 이벤트' },
  { title: '2 대기', sub: '24시간' },
  { title: '3 조건', sub: '핵심 행동 전인가' },
  { title: '4 메시지', sub: '시작 안내 1통' },
  { title: '5 종료 조건', sub: '행동·해지하면 즉시', key: true },
];
const LABELS = ['즉시', '대기 끝', '충족', '발송 후'];

// 여백 기준: 두 줄 상자 높이 66(글자 위아래 12px 이상), 상자 사이 40, 바깥 라벨은 선과 8px 이상.
const X = 8;
const W = 196;
const H = 66;
const GAP = 40;
const TOP = 8;
const RX = 256; // 건너뜀 상자 x
const RW = 360 - 8 - RX; // 96
const STROKE = 1.5;
const y = (i: number) => TOP + i * (H + GAP);
export const VB_H = Math.ceil(y(STEPS.length - 1) + H + STROKE / 2 + 8);

export default function SequenceFlow() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="시퀀스 구조. 가입 완료가 트리거이고, 24시간 대기한 뒤, 핵심 행동을 아직 안 했는지 조건을 확인한다. 이미 했으면 건너뛰고, 안 했으면 시작 안내를 1통 보낸다. 행동하거나 해지하면 어느 단계에서든 즉시 종료한다.">
      <defs>
        <marker id="seq-ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      {STEPS.map((s, i) => (
        <g key={s.title}>
          <rect className={s.key ? 'svg-box-key' : 'svg-box'} x={X} y={y(i)} width={W} height={H} rx="8" />
          <text className="t-strong" x={X + 14} y={y(i) + 28}>{s.title}</text>
          <text className="t-sub" x={X + 14} y={y(i) + 50}>{s.sub}</text>
          {i < STEPS.length - 1 && (
            <>
              <line className="svg-flow" x1={X + W / 2} y1={y(i) + H + 6} x2={X + W / 2} y2={y(i) + H + GAP - 6} markerEnd="url(#seq-ar)" />
              <text className={i === 2 ? 't-good' : 't-sub'} x={X + W / 2 + 14} y={y(i) + H + GAP / 2 + 5}>{LABELS[i]}</text>
            </>
          )}
        </g>
      ))}
      <line className="svg-flow" x1={X + W + 6} y1={y(2) + H / 2} x2={RX - 6} y2={y(2) + H / 2} markerEnd="url(#seq-ar)" />
      <text className="t-bad" x={(X + W + RX) / 2} y={y(2) + H / 2 - 10} textAnchor="middle">불충족</text>
      <rect className="svg-box-bad" x={RX} y={y(2)} width={RW} height={H} rx="8" />
      <text className="t-strong" x={RX + 14} y={y(2) + 28}>건너뜀</text>
      <text className="t-sub" x={RX + 14} y={y(2) + 50}>이미 행동</text>
    </svg>
  );
}
