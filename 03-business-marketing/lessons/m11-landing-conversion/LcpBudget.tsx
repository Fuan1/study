/** web.dev "Optimize LCP" 의 하위 구간 배분(서버 응답 약 40%, 로드 지연 10% 미만, 로드 시간 약 40%, 렌더 지연 10% 미만)을
 *  LCP 좋음 기준 2.5초(web.dev "Web Vitals")에 곱한 이론값이다. */
const LIMIT = 2.5;
const PARTS = [
  { name: '서버 응답(TTFB)', share: 0.4, sign: '약', cls: 'svg-berg' },
  { name: '리소스 로드 지연', share: 0.1, sign: '미만', cls: 'svg-box' },
  { name: '리소스 로드 시간', share: 0.4, sign: '약', cls: 'svg-berg' },
  { name: '요소 렌더 지연', share: 0.1, sign: '미만', cls: 'svg-box' },
];

const X = 8;
const W = 344;
const TOP = 8;
const HEAD = 24;
const BAR_Y = TOP + HEAD;
const BAR_H = 36;
const LEG_TOP = BAR_Y + BAR_H + 24; // 막대와 범례 사이 24
const LEG_PITCH = 30;
const fmt = (n: number) => (Math.round(n * 100) / 100).toString();
const VB_H = LEG_TOP + (PARTS.length - 1) * LEG_PITCH + 12 + 8;

export default function LcpBudget() {
  let acc = 0;
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="LCP 좋음 기준 2.5초의 시간 배분. 서버 응답 약 1.0초, 리소스 로드 지연 0.25초 미만, 리소스 로드 시간 약 1.0초, 요소 렌더 지연 0.25초 미만.">
      <text className="t-sub" x={X} y={TOP + 12}>LCP 좋음 기준 {LIMIT}초를 나눈 배분</text>
      {PARTS.map((p) => {
        const x = X + acc * W;
        acc += p.share;
        return <rect key={p.name} className={p.cls} x={x} y={BAR_Y} width={p.share * W} height={BAR_H} />;
      })}
      {PARTS.map((p, i) => {
        const y = LEG_TOP + i * LEG_PITCH;
        return (
          <g key={p.name}>
            <rect className={p.cls} x={X} y={y} width="12" height="12" rx="2" />
            <text className="t-strong" x={X + 24} y={y + 11}>{p.name}</text>
            <text className="t-sub" x={X + W} y={y + 11} textAnchor="end">
              {p.sign === '약' ? `약 ${p.share * 100}%, 약 ${fmt(p.share * LIMIT)}초` : `${p.share * 100}% 미만, ${fmt(p.share * LIMIT)}초 미만`}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
