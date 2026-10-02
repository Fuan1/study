/** 형태 예시(가상 값). 같은 퍼널을 기기별로 나눈 단계 전환율. */
const GAPS = ['방문 → 상품 보기', '상품 보기 → 장바구니', '장바구니 → 결제 시작', '결제 시작 → 결제 완료'];
const MOBILE = [48, 22, 55, 78];
const DESKTOP = [52, 42, 66, 82];

const X = 8;
const SCALE = 2; // 100% = 200px
const PITCH = 78;
const diffs = MOBILE.map((m, i) => DESKTOP[i] - m);
const maxDiff = Math.max(...diffs);

export default function SegmentCompare() {
  const lastRow = 8 + (GAPS.length - 1) * PITCH;
  const vb = Math.ceil(lastRow + 46 + 14 + 0.75 + 8); // 마지막 막대 아랫변 + 선 두께 절반 + 여백
  return (
    <svg viewBox={`0 0 360 ${vb}`} role="img" aria-label="같은 퍼널을 모바일과 데스크톱으로 나눈 단계 전환율. 상품 보기에서 장바구니 담기 구간만 모바일 22퍼센트, 데스크톱 42퍼센트로 20퍼센트포인트 차이가 난다. 가상 값.">
      {GAPS.map((g, i) => {
        const r = 8 + i * PITCH;
        const worst = diffs[i] === maxDiff;
        return (
          <g key={g}>
            <text className="t-strong" x={X} y={r + 16}>{g}</text>
            {worst && <text className="t-bad" x={X + 344} y={r + 16} textAnchor="end">{maxDiff}%p 차이</text>}
            <rect className={worst ? 'svg-tip' : 'svg-berg'} x={X} y={r + 26} width={MOBILE[i] * SCALE} height="14" rx="3" />
            <text className={worst ? 't-bad' : 't-sub'} x={X + MOBILE[i] * SCALE + 8} y={r + 37}>모바일 {MOBILE[i]}%</text>
            <rect className="svg-box" x={X} y={r + 46} width={DESKTOP[i] * SCALE} height="14" rx="3" />
            <text className="t-sub" x={X + DESKTOP[i] * SCALE + 8} y={r + 57}>데스크톱 {DESKTOP[i]}%</text>
          </g>
        );
      })}
    </svg>
  );
}
