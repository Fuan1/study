/** 점진적 공개의 구조를 가정한 설정 화면으로 보인다. 특정 서비스의 실제 화면이 아니다. */
const MAIN = ['알림 켜기', '화면 밝기', '언어'];
const MORE = ['캐시 삭제', '데이터 내보내기', '개발자 모드', '실험 기능', '로그 보기'];

// 여백 기준: 항목 상자 높이 42(글자 위아래 14px/12px), 상자 사이 8px, 화면 틀 안쪽 12px.
const ITEM_H = 42;
const PITCH = 50;
const TOP = 46; // 첫 항목 y

export default function Disclosure() {
  return (
    <svg viewBox="0 0 360 308" role="img" aria-label="왼쪽 기본 화면에는 자주 쓰는 설정 세 개와 고급 설정 더 보기 버튼이 있고, 누르면 오른쪽 보조 화면에 드물게 쓰는 설정 다섯 개가 나타난다.">
      <defs>
        <marker id="pd-ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      <text className="t-strong" x="8" y="18">기본 화면</text>
      <rect className="svg-box-key" x="8" y="34" width="148" height="266" rx="10" />
      {MAIN.map((m, i) => (
        <g key={m}>
          <rect className="svg-box" x="20" y={TOP + i * PITCH} width="124" height={ITEM_H} rx="6" />
          <text x="82" y={TOP + i * PITCH + 26} textAnchor="middle" fontSize="13">{m}</text>
        </g>
      ))}
      <rect x="20" y={TOP + 4 * PITCH} width="124" height={ITEM_H} rx="6" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1.5" />
      <text className="t-accent" x="82" y={TOP + 4 * PITCH + 26} textAnchor="middle">고급 설정 더 보기</text>
      <line className="svg-flow" x1="160" y1={TOP + 4 * PITCH + ITEM_H / 2} x2="200" y2={TOP + 4 * PITCH + ITEM_H / 2} markerEnd="url(#pd-ar)" />
      <text className="t-strong" x="204" y="18">보조 화면</text>
      <rect className="svg-box" x="204" y="34" width="148" height="266" rx="10" />
      {MORE.map((m, i) => (
        <g key={m}>
          <rect className="svg-box" x="216" y={TOP + i * PITCH} width="124" height={ITEM_H} rx="6" />
          <text x="278" y={TOP + i * PITCH + 26} textAnchor="middle" fontSize="13">{m}</text>
        </g>
      ))}
    </svg>
  );
}
