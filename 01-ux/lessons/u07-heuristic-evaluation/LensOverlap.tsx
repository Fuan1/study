export default function LensOverlap() {
  return (
    <svg viewBox="0 0 360 300" role="img" aria-label="전문가 점검(휴리스틱 평가)과 사용자 테스트가 찾는 문제가 일부만 겹치는 두 원 도식">
      <text className="t-strong" x="118" y="22" textAnchor="middle">휴리스틱 평가</text>
      <text className="t-strong" x="242" y="22" textAnchor="middle">사용자 테스트</text>
      <circle cx="118" cy="150" r="100" style={{ fill: 'var(--warm-soft)', stroke: 'var(--warm)', strokeWidth: 1.5, fillOpacity: 0.8 }} />
      <circle cx="242" cy="150" r="100" style={{ fill: 'var(--accent-soft)', stroke: 'var(--accent)', strokeWidth: 1.5, fillOpacity: 0.8 }} />
      <g textAnchor="middle">
        <text className="t-sub" x="82" y="128">원칙 위반을</text>
        <text className="t-sub" x="82" y="146">글자 그대로</text>
        <text className="t-sub" x="82" y="164">찾는다</text>
        <text className="t-sub" x="82" y="192">사소한 문제도</text>
        <text className="t-sub" x="82" y="210">많이 나온다</text>
        <text className="t-strong" x="180" y="140">겹치는</text>
        <text className="t-strong" x="180" y="160">문제</text>
        <text className="t-sub" x="278" y="128">실제 행동에서</text>
        <text className="t-sub" x="278" y="146">만 드러나는</text>
        <text className="t-sub" x="278" y="164">막힘</text>
        <text className="t-sub" x="278" y="192">사용자가 겪는</text>
        <text className="t-sub" x="278" y="210">실제 맥락</text>
      </g>
      <text className="t-sub" x="180" y="290" textAnchor="middle">영역 크기는 비율이 아니다</text>
    </svg>
  );
}
