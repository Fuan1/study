/** 같은 구매 경로(가상)를 정의대로 나눈 채널 몫. 마지막 클릭·첫 클릭·선형은 정의에서 계산되는 값이다. 데이터 기반은 계정 데이터로 추정하므로 계산하지 않고 물음표로 둔다. */
const TOUCHES = [
  { name: 'SNS 광고', sub: '구매 12일 전' },
  { name: '일반 검색', sub: '구매 9일 전' },
  { name: '이메일', sub: '구매 3일 전' },
  { name: '브랜드 검색', sub: '구매 당일' },
];
const N = TOUCHES.length;

const last = TOUCHES.map((_, i) => (i === N - 1 ? 1 : 0));
const first = TOUCHES.map((_, i) => (i === 0 ? 1 : 0));
const linear = TOUCHES.map(() => 1 / N);

const MODELS = [
  { head: ['마지막', '클릭'], v: last as (number | null)[] },
  { head: ['첫', '클릭'], v: first as (number | null)[] },
  { head: ['선형', ''], v: linear as (number | null)[] },
  { head: ['데이터', '기반'], v: TOUCHES.map(() => null) as (number | null)[] },
];

const CW = 54;
const CH = 48;
const GAP = 4;
const RGAP = 6;
const X0 = 360 - 8 - (MODELS.length * CW + (MODELS.length - 1) * GAP);
const TOP = 56;
const cellX = (j: number) => X0 + j * (CW + GAP);
const rowY = (i: number) => TOP + i * (CH + RGAP);
const STROKE = 1.5;
const VB_H = Math.ceil(rowY(N - 1) + CH + STROKE / 2 + 12);

export default function PathShares() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="같은 구매 경로 하나를 모델별로 나눈 채널 몫(퍼센트). 마지막 클릭은 브랜드 검색 100, 첫 클릭은 SNS 광고 100, 선형은 네 접점 모두 25다. 데이터 기반은 계정 데이터로 추정하므로 한 경로로 계산할 수 없다.">
      {MODELS.map((m, j) => (
        <g key={m.head.join('')}>
          <text className="t-sub" x={cellX(j) + CW / 2} y="20" textAnchor="middle">{m.head[0]}</text>
          <text className="t-sub" x={cellX(j) + CW / 2} y="40" textAnchor="middle">{m.head[1]}</text>
        </g>
      ))}
      {TOUCHES.map((t, i) => (
        <g key={t.name}>
          <text className="t-strong" x="8" y={rowY(i) + 21}>{t.name}</text>
          <text className="t-sub" x="8" y={rowY(i) + 41}>{t.sub}</text>
          {MODELS.map((m, j) => {
            const v = m.v[i];
            return (
              <g key={m.head.join('')}>
                <rect className="svg-box" x={cellX(j)} y={rowY(i)} width={CW} height={CH} rx="6" />
                {v !== null && (
                  <rect x={cellX(j)} y={rowY(i)} width={CW} height={CH} rx="6" fill="var(--warm)" fillOpacity={(0.38 * v).toFixed(3)} stroke="none" />
                )}
                <text className="t-strong" x={cellX(j) + CW / 2} y={rowY(i) + CH / 2 + 5} textAnchor="middle">{v === null ? '?' : Math.round(v * 100)}</text>
              </g>
            );
          })}
        </g>
      ))}
    </svg>
  );
}
