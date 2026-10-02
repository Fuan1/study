/** 라이프사이클 메시지 지도: 단계, 트리거, 메시지 목적. 형태 예시(가상). 단계 이름과 트리거는 서비스에 맞춰 바꾼다. */
type Stage = { title: string; sub: string; key?: boolean };

const STAGES: Stage[] = [
  { title: '1 가입 직후', sub: '가입 완료 → 시작 안내' },
  { title: '2 구매 전', sub: '핵심 행동 없이 대기 → 활성화' },
  { title: '3 첫 구매 후', sub: '구매 완료 → 사용 안내, 후기' },
  { title: '4 반복 구매', sub: '구매 주기 안 → 소식, 추천' },
  { title: '5 휴면과 복귀', sub: '정한 기간 무행동 → 재참여', key: true },
];

// 여백 기준: 두 줄 상자 높이 66(글자 위아래 12px 이상), 상자 사이 28(화살표 포함).
const X = 8;
const W = 344;
const H = 66;
const GAP = 28;
const TOP = 8;
const STROKE = 1.5;
const y = (i: number) => TOP + i * (H + GAP);
export const VB_H = Math.ceil(y(STAGES.length - 1) + H + STROKE / 2 + 8);

export default function LifecycleMap() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="라이프사이클 메시지 지도. 가입 직후, 구매 전, 첫 구매 후, 반복 구매, 휴면과 복귀의 다섯 단계를 이벤트 트리거와 메시지 목적으로 이어 보여 준다.">
      <defs>
        <marker id="lc-ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      {STAGES.map((s, i) => (
        <g key={s.title}>
          <rect className={s.key ? 'svg-box-key' : 'svg-box'} x={X} y={y(i)} width={W} height={H} rx="8" />
          <text className="t-strong" x={X + 14} y={y(i) + 28}>{s.title}</text>
          <text className="t-sub" x={X + 14} y={y(i) + 50}>{s.sub}</text>
          {i < STAGES.length - 1 && (
            <line className="svg-flow" x1={X + W / 2} y1={y(i) + H + 4} x2={X + W / 2} y2={y(i) + H + GAP - 4} markerEnd="url(#lc-ar)" />
          )}
        </g>
      ))}
    </svg>
  );
}
