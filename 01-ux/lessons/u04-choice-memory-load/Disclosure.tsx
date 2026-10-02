/** 점진적 공개의 구조를 가정한 설정 화면으로 보인다. 특정 서비스의 실제 화면이 아니다. */
const MAIN = ['알림 켜기', '화면 밝기', '언어'];
const MORE = ['캐시 삭제', '데이터 내보내기', '개발자 모드', '실험 기능', '로그 보기'];

export default function Disclosure() {
  return (
    <svg viewBox="0 0 360 262" role="img" aria-label="왼쪽 기본 화면에는 자주 쓰는 설정 세 개와 고급 설정 더 보기 버튼이 있고, 누르면 오른쪽 보조 화면에 드물게 쓰는 설정 다섯 개가 나타난다.">
      <defs>
        <marker id="pd-ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      <text className="t-strong" x="8" y="18">기본 화면</text>
      <rect className="svg-box-key" x="8" y="28" width="148" height="196" rx="10" />
      {MAIN.map((m, i) => (
        <g key={m}>
          <rect className="svg-box" x="18" y={40 + i * 40} width="128" height="32" rx="6" />
          <text x="82" y={61 + i * 40} textAnchor="middle" fontSize="13">{m}</text>
        </g>
      ))}
      <rect x="18" y="166" width="128" height="40" rx="6" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1.5" />
      <text className="t-accent" x="82" y="191" textAnchor="middle">고급 설정 더 보기</text>
      <line className="svg-flow" x1="158" y1="186" x2="196" y2="186" markerEnd="url(#pd-ar)" />
      <text className="t-strong" x="204" y="18">보조 화면</text>
      <rect className="svg-box" x="204" y="28" width="148" height="196" rx="10" />
      {MORE.map((m, i) => (
        <g key={m}>
          <rect className="svg-box" x="214" y={38 + i * 36} width="128" height="30" rx="6" />
          <text x="278" y={58 + i * 36} textAnchor="middle" fontSize="13">{m}</text>
        </g>
      ))}
      <text className="t-sub" x="8" y="246">자주 쓰는 것만 먼저 보이고 나머지는 요청할 때 연다.</text>
    </svg>
  );
}
