/** 전체 -> 우리가 팔 수 있는 범위 -> 처음 3년에 얻는 범위. 모든 입력은 가정이고 단계마다 곱하는 비율을 코드로 계산한다. */
const PER = 36 * 8500; // 고객 1명의 연 지출(원)
const ALL_CUST = 3_000_000 * 0.25;
const SAM_CUST = ALL_CUST * 0.4 * 0.4;
const SOM_CUST = ((3e8 * 3) / 60000) * 0.6; // 예산 3억 x 3년 / 획득 비용 6만원 x 유지 60%
const fmt = (n: number) => Math.round(n).toLocaleString('en-US');
const eok = (cust: number) => `${(Math.round((cust * PER) / 1e7) / 10).toLocaleString('en-US')}억원`;
const R1 = SAM_CUST / ALL_CUST;
const R2 = SOM_CUST / SAM_CUST;

const STAGES = [
  { name: '전체', sub: `고객 ${fmt(ALL_CUST)}명`, value: eok(ALL_CUST), cls: 'svg-box' },
  { name: '우리가 팔 수 있는 범위', sub: `고객 ${fmt(SAM_CUST)}명`, value: eok(SAM_CUST), cls: 'svg-box' },
  { name: '처음 3년에 얻는 범위', sub: `활성 고객 ${fmt(SOM_CUST)}명`, value: eok(SOM_CUST), cls: 'svg-box-key' },
];
const LABELS = [
  `배송권 40% × 이용 40% = ${Math.round(R1 * 100)}%`,
  `예산 ÷ 획득 비용으로 계산 = ${(R2 * 100).toFixed(1)}%`,
];
const H = 66;
const GAP = 48;
const TOP = 8;
const y = (i: number) => TOP + i * (H + GAP);
const STROKE = 1.5;
const VB_H = Math.ceil(y(2) + H + STROKE / 2 + 8);

export default function ScopeFlow() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label={`전체 ${eok(ALL_CUST)}에서 우리가 팔 수 있는 범위 ${eok(SAM_CUST)}으로 ${Math.round(R1 * 100)}퍼센트, 처음 3년에 얻는 범위 ${eok(SOM_CUST)}으로 ${(R2 * 100).toFixed(1)}퍼센트로 좁아진다.`}>
      <defs>
        <marker id="sf-ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      {STAGES.map((s, i) => (
        <g key={s.name}>
          <rect className={s.cls} x="8" y={y(i)} width="344" height={H} rx="8" />
          <text className="t-strong" x="22" y={y(i) + 28}>{s.name}</text>
          <text className="t-sub" x="22" y={y(i) + 50}>{s.sub}</text>
          <text className="t-strong" x="338" y={y(i) + 39} textAnchor="end">{s.value}</text>
          {i < 2 && (
            <g>
              <line className="svg-flow" x1="40" y1={y(i) + H + 6} x2="40" y2={y(i + 1) - 6} markerEnd="url(#sf-ar)" />
              <text className="t-sub" x="56" y={y(i) + H + GAP / 2 + 5}>{LABELS[i]}</text>
            </g>
          )}
        </g>
      ))}
    </svg>
  );
}
