/** 메시지는 누구에게, 문제, 결과, 증거, 행동의 다섯 칸을 이 순서로 쓴다. 예시는 가상 제품(정산이지)이다. */
type Step = { title: string; sub: string; cls: string };

const STEPS: Step[] = [
  { title: '1  누구에게', sub: '월말 정산이 버거운 소규모 판매자', cls: 'svg-box' },
  { title: '2  어떤 문제', sub: '엑셀로 정산표를 매달 직접 만든다', cls: 'svg-box' },
  { title: '3  우리가 주는 결과', sub: '정산이 8시간에서 1시간으로(가정)', cls: 'svg-box-key' },
  { title: '4  증거', sub: '시범 사용 20곳, 자체 측정, 2026년 3월', cls: 'svg-box' },
  { title: '5  다음 행동', sub: '내 엑셀 한 장 올려 보기, 14일 무료', cls: 'svg-box' },
];

const W = 344;
const H = 68;
const GAP = 28;
const TOP = 8;
const STROKE = 1.5;
const y = (i: number) => TOP + i * (H + GAP);
const VB_H = Math.ceil(y(STEPS.length - 1) + H + STROKE / 2 + 8);

export default function MessageOrder() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="메시지를 쓰는 순서. 누구에게, 어떤 문제, 우리가 주는 결과, 증거, 다음 행동의 다섯 칸이다. 결과 칸이 중심이다.">
      <defs>
        <marker id="m04ar1" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      {STEPS.map((s, i) => (
        <g key={s.title}>
          <rect className={s.cls} x="8" y={y(i)} width={W} height={H} rx="8" />
          <text className="t-strong" x="22" y={y(i) + 29}>{s.title}</text>
          <text className="t-sub" x="22" y={y(i) + 51}>{s.sub}</text>
          {i < STEPS.length - 1 && (
            <line className="svg-flow" x1="180" y1={y(i) + H + 5} x2="180" y2={y(i) + H + GAP - 5} markerEnd="url(#m04ar1)" />
          )}
        </g>
      ))}
    </svg>
  );
}
