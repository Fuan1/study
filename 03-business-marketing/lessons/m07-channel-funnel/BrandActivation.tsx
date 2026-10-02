// IPA 데이터뱅크(Binet & Field 2018, Effectiveness in Context)가 제시한 최적 브랜드:활성화 비율.
// 값은 원문 그림 87·88·66에서 옮겼다. 계산한 값이 아니라 출처의 관측값이다.
const ROWS: { name: string; brand: number }[] = [
  { name: '전체', brand: 62 },
  { name: '금융 서비스', brand: 80 },
  { name: '소매', brand: 64 },
  { name: 'FMCG(생활 소비재)', brand: 60 },
  { name: '내구재', brand: 58 },
  { name: '소멸성 서비스(여행 등)', brand: 48 },
  { name: '신규 브랜드 출시 초기', brand: 35 },
];

const X0 = 12;
const TW = 336;
const BH = 16;
const PITCH = 62;
const Y0 = 8;
const rowY = (i: number) => Y0 + i * PITCH;
// 마지막 막대 아랫변 + 구분선까지 24, 설명 두 줄
const LAST_BOTTOM = rowY(ROWS.length - 1) + 26 + BH;
const DIV = LAST_BOTTOM + 24;
const VB_H = DIV + 44 + 4 + 8;

export default function BrandActivation() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label={`최적 브랜드 대 활성화 예산 비율. ${ROWS.map((r) => `${r.name} ${r.brand} 대 ${100 - r.brand}`).join(', ')}.`}>
      {ROWS.map((r, i) => {
        const y = rowY(i);
        return (
          <g key={r.name}>
            <text className="t-strong" x={X0} y={y + 14}>{r.name}</text>
            <text className="t-sub" x={X0 + TW} y={y + 14} textAnchor="end">{r.brand} : {100 - r.brand}</text>
            <rect className="svg-box" x={X0} y={y + 26} width={TW} height={BH} rx="3" />
            <rect x={X0} y={y + 26} width={(TW * r.brand) / 100} height={BH} rx="3" fill="var(--accent)" />
          </g>
        );
      })}
      <line x1="8" y1={DIV} x2="352" y2={DIV} stroke="var(--line)" />
      <text className="t-sub" x={X0} y={DIV + 24}>채운 부분이 브랜드 빌딩, 빈 부분이 활성화</text>
      <text className="t-sub" x={X0} y={DIV + 44}>숫자는 브랜드 : 활성화(예산 %)</text>
    </svg>
  );
}
