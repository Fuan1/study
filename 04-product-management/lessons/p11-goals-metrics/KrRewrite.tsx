// 할 일로 쓴 핵심 결과를 결과로 고친 세 쌍. 출처: Google OKR 가이드(Foo 4.1, 만족 수준 공개), Doerr 의 전화 50통 사례.
type Pair = { bad: string; good: string; sub: string; tag: string };

const PAIRS: Pair[] = [
  { bad: 'Foo 4.1 을 출시한다', good: '일일 가입을 25퍼센트 늘린다', sub: '5월 1일까지. 출시가 아니라 변화', tag: '결과' },
  { bad: '고객에게 전화 50통을 건다', good: '신규 고객 수', sub: '통화 수가 아니라 얻은 고객', tag: '결과' },
  { bad: '고객 만족도를 평가한다', good: '3월 7일까지 만족 수준을 공개한다', sub: '한 일이 아니라 남는 증거', tag: '증거' },
];

const BH = 46; // 한 줄 상자
const GH = 66; // 두 줄 상자
const GAP = 34; // 화살표 구간
const PGAP = 28; // 쌍 사이
const BX = 8;
const BW = 344;
const TX = 76;
const pairH = BH + GAP + GH;
const y0 = (i: number) => 8 + i * (pairH + PGAP);
// 마지막 상자 아랫변 + 선 두께 절반 + 아래 여백 8
const VB_H = y0(PAIRS.length - 1) + pairH + 1 + 8;

export default function KrRewrite() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="할 일로 쓴 핵심 결과를 결과로 고친 세 쌍. Foo 4.1 출시는 일일 가입 25퍼센트 증가로, 전화 50통은 신규 고객 수로, 만족도 평가는 만족 수준 공개로 고친다.">
      <defs>
        <marker id="kr-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      {PAIRS.map((p, i) => {
        const a = y0(i);
        const b = a + BH + GAP;
        return (
          <g key={p.bad}>
            <rect className="svg-box-bad" x={BX} y={a} width={BW} height={BH} rx="8" />
            <text className="t-bad" x="24" y={a + 28}>할 일</text>
            <text className="t-strong" x={TX} y={a + 28}>{p.bad}</text>
            <line className="svg-flow" x1="44" y1={a + BH + 6} x2="44" y2={b - 6} markerEnd="url(#kr-arrow)" />
            <text className="t-sub" x="60" y={a + BH + GAP / 2 + 5}>고친다</text>
            <rect className="svg-box-good" x={BX} y={b} width={BW} height={GH} rx="8" />
            <text className="t-good" x="24" y={b + 29}>{p.tag}</text>
            <text className="t-strong" x={TX} y={b + 29}>{p.good}</text>
            <text className="t-sub" x={TX} y={b + 50}>{p.sub}</text>
          </g>
        );
      })}
    </svg>
  );
}
