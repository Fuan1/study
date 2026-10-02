/** 광고, 랜딩, 가입에서 약속이 바뀌면 그 지점이 이탈 지점이 된다. 예시는 가상이다. */
type Step = { title: string; sub: string; cls: string; note?: string };
const STEPS: Step[] = [
  { title: '광고', sub: '첫 달 무료로 시작', cls: 'svg-box' },
  { title: '랜딩', sub: '14일 무료 체험', cls: 'svg-box-bad', note: '기간이 달라짐' },
  { title: '가입', sub: '카드 등록 후 시작', cls: 'svg-box-bad', note: '조건이 새로 생김' },
];

const W = 344;
const H = 68;
const GAP = 44;
const TOP = 8;
const STROKE = 2;
const y = (i: number) => TOP + i * (H + GAP);
const VB_H = Math.ceil(y(STEPS.length - 1) + H + STROKE / 2 + 8);

export default function PromiseChain() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="광고는 첫 달 무료, 랜딩은 14일 무료 체험으로 기간이 달라지고, 가입 화면은 카드 등록 조건이 새로 생긴다. 약속이 바뀌는 지점마다 이탈한다.">
      <defs>
        <marker id="m04ar3" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      {STEPS.map((s, i) => (
        <g key={s.title}>
          <rect className={s.cls} x="8" y={y(i)} width={W} height={H} rx="8" />
          <text className="t-strong" x="22" y={y(i) + 29}>{s.title}</text>
          <text className="t-sub" x="22" y={y(i) + 51}>{s.sub}</text>
          {i > 0 && (
            <g>
              <line className="svg-flow" x1="40" y1={y(i) - GAP + 6} x2="40" y2={y(i) - 6} markerEnd="url(#m04ar3)" />
              <text className="t-bad" x="56" y={y(i) - GAP / 2 + 5}>{s.note}</text>
            </g>
          )}
        </g>
      ))}
    </svg>
  );
}
