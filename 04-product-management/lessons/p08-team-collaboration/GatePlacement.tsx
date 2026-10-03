type Stage = { title: string; when: string; tag: string; official: boolean };

const STAGES: Stage[] = [
  { title: '준비 기준 (준비 정의)', when: '스프린트에 넣기 전 · 항목마다', tag: 'Guide에 용어 없음 · 관행', official: false },
  { title: '인수 기준', when: '개발 중과 끝 · 항목마다', tag: 'Guide에 용어 없음 · 관행', official: false },
  { title: '완료 정의', when: '증분이 되기 전 · 모든 항목 공통', tag: 'Guide에 있음', official: true },
];

// 여백 기준: 상자 안 14px, 세 줄 상자 높이 88(줄 간격 20), 상자 사이 28px.
const X = 48;
const W = 360 - 8 - X;
const H = 88;
const GAP = 28;
const y = (i: number) => 8 + i * (H + GAP);
const RAIL = 26;
// 마지막 상자 아랫변 + 선 두께 절반 + 아래 여백 8
const VB_H = y(STAGES.length - 1) + H + 1 + 8;

export default function GatePlacement() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="세 기준을 판정하는 시점. 준비 기준은 스프린트에 넣기 전 항목마다, 인수 기준은 개발 중과 끝에 항목마다, 완료 정의는 증분이 되기 전 모든 항목에 공통으로 적용한다. 완료 정의만 Scrum Guide에 있다.">
      <defs>
        <marker id="gpar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      {STAGES.map((s, i) => (
        <g key={s.title}>
          <rect className={s.official ? 'svg-box-key' : 'svg-box'} x={X} y={y(i)} width={W} height={H} rx="8" />
          <circle cx={RAIL} cy={y(i) + H / 2} r="7" className={s.official ? 'svg-berg' : 'svg-box'} />
          <line className="svg-flow" x1={RAIL + 8} y1={y(i) + H / 2} x2={X - 6} y2={y(i) + H / 2} />
          <text className="t-strong" x={X + 14} y={y(i) + 29}>{s.title}</text>
          <text className="t-sub" x={X + 14} y={y(i) + 49}>{s.when}</text>
          <text className={s.official ? 't-good' : 't-warm'} x={X + 14} y={y(i) + 69} style={{ fontSize: '12.5px' }}>{s.tag}</text>
          {i < STAGES.length - 1 && (
            <line className="svg-flow" x1={RAIL} y1={y(i) + H / 2 + 12} x2={RAIL} y2={y(i + 1) + H / 2 - 12} markerEnd="url(#gpar)" />
          )}
        </g>
      ))}
    </svg>
  );
}
