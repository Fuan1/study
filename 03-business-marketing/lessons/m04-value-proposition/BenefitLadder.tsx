/** 기능에서 혜택, 결과로 한 단계씩 "그래서 뭐가 달라지나?"를 물어 올라간다. 숫자는 가정이고 코드로 계산한다. */
const BEFORE_H = 8; // 가정: 지금 월말 정산 시간
const AFTER_H = 1; // 가정: 도구를 쓴 뒤
const SAVED = BEFORE_H - AFTER_H;
const PCT = ((SAVED / BEFORE_H) * 100).toFixed(1);

type Step = { title: string; sub: string; cls: string };
const STEPS: Step[] = [
  { title: '기능', sub: '엑셀 파일 자동 업로드', cls: 'svg-box' },
  { title: '혜택', sub: '정산표를 직접 만들지 않는다', cls: 'svg-berg' },
  { title: '결과', sub: `가정: ${BEFORE_H}시간에서 ${AFTER_H}시간, ${PCT}% 단축`, cls: 'svg-box-good' },
];

const W = 344;
const H = 68;
const GAP = 44;
const TOP = 8;
const STROKE = 2;
const y = (i: number) => TOP + i * (H + GAP);
const VB_H = Math.ceil(y(STEPS.length - 1) + H + STROKE / 2 + 8);

export default function BenefitLadder() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="기능은 엑셀 파일 자동 업로드. 그래서 정산표를 직접 만들지 않는 혜택. 그래서 가정으로 8시간 걸리던 정산이 1시간으로 줄어드는 결과다.">
      <defs>
        <marker id="m04ar2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      {STEPS.map((s, i) => (
        <g key={s.title}>
          <rect className={s.cls} x="8" y={y(i)} width={W} height={H} rx="8" />
          <text className="t-strong" x="22" y={y(i) + 29}>{s.title}</text>
          <text className="t-sub" x="22" y={y(i) + 51}>{s.sub}</text>
          {i < STEPS.length - 1 && (
            <g>
              <line className="svg-flow" x1="40" y1={y(i) + H + 6} x2="40" y2={y(i) + H + GAP - 6} markerEnd="url(#m04ar2)" />
              <text className="t-sub" x="56" y={y(i) + H + GAP / 2 + 5}>그래서 고객에게 뭐가 달라지나?</text>
            </g>
          )}
        </g>
      ))}
    </svg>
  );
}
