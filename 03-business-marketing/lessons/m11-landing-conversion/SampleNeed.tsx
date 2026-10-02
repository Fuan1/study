/** Kohavi 외(2007) 근사식 n = (4 r sigma / delta)^2 (신뢰 95%, 검정력 90%)에 기준 전환율 5%(가정)를 넣어 계산한 이론값.
 *  r = 2(변형 수), sigma^2 = p(1-p), delta = p x 상대 변화. 논문 본문의 20% 변화 30,400명과 일치한다. */
const P = 0.05;
const R = 2;
const ROWS = [0.05, 0.1, 0.2, 0.4].map((rel) => {
  const delta = P * rel;
  const n = Math.pow((4 * R * Math.sqrt(P * (1 - P))) / delta, 2);
  const to = P * (1 + rel);
  return { rel, n: Math.round(n), to };
});
const MAX = ROWS[0].n;

const TOP = 8;
const HEAD = 24;
const PITCH = 52;
const BAR_X = 150;
const BAR_MAX = 130;
const BAR_H = 18;
const rowY = (i: number) => TOP + HEAD + i * PITCH;
const VB_H = rowY(ROWS.length - 1) + 32 + 8;
const pct = (v: number) => `${(Math.round(v * 10000) / 100).toString()}%`;
const comma = (n: number) => n.toLocaleString('en-US');

export default function SampleNeed() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label={`기준 전환율 5퍼센트에서 변화 크기별 필요한 전체 사용자 수. 상대 5퍼센트 변화는 ${comma(ROWS[0].n)}명, 10퍼센트는 ${comma(ROWS[1].n)}명, 20퍼센트는 ${comma(ROWS[2].n)}명, 40퍼센트는 ${comma(ROWS[3].n)}명.`}>
      <text className="t-sub" x="8" y={TOP + 12}>기준 전환율 5%(가정), 전체 사용자 수</text>
      {ROWS.map((r, i) => {
        const y = rowY(i);
        const w = (r.n / MAX) * BAR_MAX;
        return (
          <g key={r.rel}>
            <text className="t-strong" x="8" y={y + 14}>상대 {r.rel * 100}% 변화</text>
            <text className="t-sub" x="8" y={y + 34}>5% 에서 {pct(r.to)}</text>
            <rect className="svg-berg" x={BAR_X} y={y + 7} width={w} height={BAR_H} rx="3" />
            <text className="t-strong" x={BAR_X + w + 8} y={y + 7 + BAR_H / 2 + 5}>{comma(r.n)}</text>
          </g>
        );
      })}
    </svg>
  );
}
