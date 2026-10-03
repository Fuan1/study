// 나쁜 예 → 고친 예 두 쌍. 위 쌍의 기준값은 web.dev Core Web Vitals 권장값(LCP 2.5초, 75번째 백분위, 모바일·데스크톱 따로).
// 아래 쌍은 형태 예시(가상 값)이다.
type Pair = { bad: string; goodLines: string[]; goodTag: string; arrow: string };

const PAIRS: Pair[] = [
  {
    bad: '화면이 빨리 떠야 한다',
    goodTag: '고친 예 · 기준과 측정 방식',
    goodLines: ['상품 목록의 LCP는 모바일·데스크톱', '각각 75번째 백분위에서 2.5초 이내'],
    arrow: '기준값과 측정 방식을 붙인다',
  },
  {
    bad: '드롭다운으로 국가를 고른다',
    goodTag: '고친 예 · 방법이 아닌 필요',
    goodLines: ['사용자는 가입할 때 거주 국가를 지정할 수 있다'],
    arrow: '구현 방식을 빼고 필요를 쓴다',
  },
];

const BAD_H = 66;
const ARROW = 36;
const PAIR_GAP = 36;
const goodH = (n: number) => 46 + n * 20 + 2; // 태그 줄 + 문장 줄(20px 간격) + 아래 여백
let y = 8;
const layout = PAIRS.map((p) => {
  const badY = y;
  const goodY = badY + BAD_H + ARROW;
  const gh = goodH(p.goodLines.length);
  y = goodY + gh + PAIR_GAP;
  return { ...p, badY, goodY, gh };
});
const last = layout[layout.length - 1];
// 마지막 상자 아랫변 + 선 두께 절반 + 아래 여백 8
const VB_H = last.goodY + last.gh + 1 + 8;

export default function AmbiguityFix() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="모호한 요구 문장을 고치는 두 예. 화면이 빨리 떠야 한다는 기준값과 측정 방식을 붙여 고치고, 드롭다운으로 국가를 고른다는 구현 방식을 빼고 거주 국가를 지정할 수 있다로 고친다.">
      <defs>
        <marker id="p4fix" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      {layout.map((p) => (
        <g key={p.bad}>
          <rect className="svg-box-bad" x="8" y={p.badY} width="344" height={BAD_H} rx="8" />
          <text className="t-bad" x="22" y={p.badY + 28}>나쁜 예</text>
          <text x="22" y={p.badY + 49} fontSize="13">{p.bad}</text>
          <line className="svg-flow" x1="40" y1={p.badY + BAD_H + 6} x2="40" y2={p.goodY - 6} markerEnd="url(#p4fix)" />
          <text className="t-sub" x="56" y={p.badY + BAD_H + ARROW / 2 + 4.5}>{p.arrow}</text>
          <rect className="svg-box-good" x="8" y={p.goodY} width="344" height={p.gh} rx="8" />
          <text className="t-good" x="22" y={p.goodY + 28}>{p.goodTag}</text>
          {p.goodLines.map((l, i) => (
            <text key={l} x="22" y={p.goodY + 49 + i * 20} fontSize="13">{l}</text>
          ))}
        </g>
      ))}
    </svg>
  );
}
