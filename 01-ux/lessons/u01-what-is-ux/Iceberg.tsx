export default function Iceberg() {
  return (
    <svg viewBox="0 0 360 340" role="img" aria-label="수면 위에는 UI(색, 글꼴, 아이콘, 버튼 모양)가 있고, 수면 아래에는 흐름, 정보 구조, 목표, 맥락이 있는 빙산 도식">
      <rect className="svg-water" x="0" y="110" width="360" height="230" />
      <line className="svg-waterline" x1="0" y1="110" x2="360" y2="110" strokeDasharray="6 5" />
      <polygon className="svg-tip" points="150,110 164,78 180,50 196,76 210,110" />
      <text className="t-warm" x="14" y="52">UI · 표면</text>
      <text className="t-sub" x="14" y="72">색 · 글꼴 · 아이콘</text>
      <text className="t-sub" x="14" y="88">버튼 모양</text>
      <text className="t-sub" x="346" y="104" textAnchor="end">수면 위</text>
      <text className="t-accent" x="346" y="128" textAnchor="end">수면 아래</text>
      <polygon className="svg-berg" points="110,110 250,110 292,160 292,250 250,315 110,315 68,250 68,160" />
      <g textAnchor="middle">
        <text className="t-strong" x="180" y="146">흐름</text>
        <text className="t-sub" x="180" y="164">가입 → 첫 글 → 반응 확인</text>
        <text className="t-strong" x="180" y="194">정보 구조</text>
        <text className="t-sub" x="180" y="212">게시판 · 분류 · 알림 연결</text>
        <text className="t-strong" x="180" y="242">목표</text>
        <text className="t-sub" x="180" y="260">사용자가 얻고 싶은 것</text>
        <text className="t-strong" x="180" y="290">맥락</text>
        <text className="t-sub" x="180" y="308">언제 · 어디서 · 누구와</text>
      </g>
    </svg>
  );
}
