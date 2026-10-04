/**
 * 출처 값: Takizawa & Suzuki (2025), 일본인 영어 학습자 102명의 논증 말하기.
 * 발화 유창성 지표만으로 만든 모형이 평가 점수 변동의 61%(marginal R2 = .61)를 설명했고,
 * 두 단어 연쇄(bigram) 비율이 남은 변동을 0.8% 더 설명했다.
 */
const BARS = [
  { label: '발화 유창성 지표', share: 61 },
  { label: '두 단어 연쇄(bigram) 비율', share: 0.8 },
];

const X0 = 8;
const SPAN = 344; // 0%에서 100%까지 폭
const BH = 36; // 막대 높이 36 이상
const BAR_TOP = 28; // 라벨 아래
const ROW = 94; // 줄 간격

export default function FluencyShare() {
  const VB_H = ROW + BAR_TOP + BH + 20 + 14;
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="말하기 유창성 평가 변동 중 발화 유창성 지표가 61퍼센트를 설명하고, 두 단어 연쇄 비율은 그 위에 0.8퍼센트를 더 설명했다.">
      {BARS.map((b, i) => {
        const y0 = i * ROW;
        const w = (SPAN * b.share) / 100;
        const inside = w > 120;
        return (
          <g key={b.label}>
            <text className="t-strong" x={X0} y={y0 + 18}>{b.label}</text>
            <rect className="svg-box" x={X0} y={y0 + BAR_TOP} width={SPAN} height={BH} rx="4" />
            <rect className={i === 0 ? 'svg-berg' : 'svg-tip'} x={X0} y={y0 + BAR_TOP} width={w} height={BH} rx="4" />
            {inside ? (
              <text className="t-strong" x={X0 + 14} y={y0 + BAR_TOP + 23}>{b.share}%</text>
            ) : (
              <text className="t-warm" x={X0 + w + 12} y={y0 + BAR_TOP + 23}>{b.share}%</text>
            )}
            <text className="t-sub" x={X0} y={y0 + BAR_TOP + BH + 20}>{i === 0 ? '유창성 평가 점수 변동 100% 중' : '그 위에 더해진 설명량(원문 표기)'}</text>
          </g>
        );
      })}
    </svg>
  );
}
