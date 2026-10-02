const INK = { fill: 'var(--ink)' };

export default function ErrorPair() {
  return (
    <svg viewBox="0 0 360 332" role="img" aria-label="오류 메시지 두 개. 나쁜 예는 오류가 발생했다는 말과 코드만 있고 확인 버튼뿐이다. 고친 예는 카드 유효기간이 지나 결제하지 못했다는 원인과 다른 카드 선택이라는 다음 행동이 함께 있다.">
      <text className="t-bad" x="8" y="18">나쁜 예</text>
      <rect className="svg-box-bad" x="8" y="34" width="344" height="76" rx="10" />
      <text x="22" y="76.5" fontSize="14" style={INK}>오류가 발생했습니다 (4012)</text>
      <rect className="svg-box" x="268" y="50" width="70" height="44" rx="8" />
      <text className="t-strong" x="303" y="76.5" textAnchor="middle">확인</text>
      <text className="t-sub" x="8" y="134">원인도 해결 방법도 없다</text>

      <text className="t-good" x="8" y="175">고친 예</text>
      <rect className="svg-box-good" x="8" y="191" width="344" height="105" rx="10" />
      <text x="22" y="218" fontSize="14" style={INK}>카드 유효기간이 지나 결제하지 못했습니다</text>
      <rect className="svg-box-key" x="22" y="236" width="140" height="44" rx="8" />
      <text className="t-strong" x="92" y="262.5" textAnchor="middle">다른 카드 선택</text>
      <text className="t-sub" x="8" y="320">원인과 다음 행동이 함께 있다</text>
    </svg>
  );
}
