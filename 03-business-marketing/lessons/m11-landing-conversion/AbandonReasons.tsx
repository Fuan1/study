/** Baymard Institute 의 체크아웃 이탈 이유 설문(baymard.com/lists/cart-abandonment-rate, 2026년 10월 확인). 값은 원문 그대로. */
const ROWS: [string, number][] = [
  ['추가 비용이 높음', 40],
  ['배송이 느림', 20],
  ['카드 정보를 믿지 못함', 19],
  ['계정 만들기를 요구', 18],
  ['과정이 길고 복잡', 17],
  ['사이트 오류·멈춤', 17],
  ['반품 정책이 불만', 13],
  ['총액을 미리 못 봄', 12],
  ['카드 승인 거절', 10],
  ['결제 수단이 부족', 9],
];

const TOP = 8;
const PITCH = 30; // 줄 간격
const BAR_H = 18; // 36px 미만이라 값 글자는 막대 밖에 둔다
const BAR_X = 150;
const SCALE = 3.5; // 1%당 px. 40% -> 140px
const HEAD = 24;
const rowY = (i: number) => TOP + HEAD + i * PITCH;
const VB_H = rowY(ROWS.length - 1) + BAR_H + 8;

export default function AbandonReasons() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="체크아웃 이탈 이유 응답 비율. 추가 비용이 높음 40퍼센트, 배송이 느림 20, 카드 정보를 믿지 못함 19, 계정 만들기를 요구 18, 과정이 길고 복잡 17, 사이트 오류 17, 반품 정책 13, 총액을 미리 못 봄 12, 카드 승인 거절 10, 결제 수단 부족 9.">
      <text className="t-sub" x="8" y={TOP + 12}>이탈 이유별 응답 비율(%)</text>
      {ROWS.map(([label, v], i) => {
        const y = rowY(i);
        const w = v * SCALE;
        return (
          <g key={label}>
            <text className="t-sub" x="8" y={y + BAR_H / 2 + 5}>{label}</text>
            <rect className="svg-berg" x={BAR_X} y={y} width={w} height={BAR_H} rx="3" />
            <text className="t-strong" x={BAR_X + w + 8} y={y + BAR_H / 2 + 5}>{v}%</text>
          </g>
        );
      })}
    </svg>
  );
}
