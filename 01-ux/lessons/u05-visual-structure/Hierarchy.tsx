/** 같은 내용에 크기, 대비, 간격, 정렬을 차등 적용한 Before / After. 가정한 카드 예시이며 특정 서비스 화면이 아니다. */
function Before({ x }: { x: number }) {
  return (
    <g>
      <rect className="svg-box" x={x} y="36" width="164" height="168" rx="8" />
      <text x={x + 16} y="64" fontSize="13">행사 이름</text>
      <text x={x + 16} y="90" fontSize="13">기간과 장소</text>
      <text x={x + 16} y="116" fontSize="13">한두 줄로 쓴 설명</text>
      <text x={x + 16} y="142" fontSize="13">행사 내용을 요약</text>
      <text x={x + 34} y="176" fontSize="13">신청하기</text>
    </g>
  );
}

function After({ x }: { x: number }) {
  return (
    <g>
      <rect className="svg-box" x={x} y="36" width="164" height="168" rx="8" />
      <text className="t-strong" x={x + 16} y="66" fontSize="17">행사 이름</text>
      <text className="t-sub" x={x + 16} y="86">기간과 장소</text>
      <text x={x + 16} y="116" fontSize="13">한두 줄로 쓴 설명</text>
      <text x={x + 16} y="134" fontSize="13">행사 내용을 요약</text>
      <rect x={x + 16} y="152" width="84" height="36" rx="8" fill="var(--accent)" />
      <text x={x + 58} y="175" textAnchor="middle" fontSize="13" fontWeight="700" style={{ fill: 'var(--bg)' }}>신청하기</text>
    </g>
  );
}

export default function Hierarchy() {
  return (
    <svg viewBox="0 0 360 256" role="img" aria-label="같은 내용의 카드 둘. 왼쪽은 글자 크기, 색, 간격이 모두 같고 버튼이 글자처럼 보인다. 오른쪽은 제목을 크게, 보조 정보를 흐리게, 설명은 제목과 간격을 두어 묶고, 버튼은 채운 상자로 만들고 왼쪽 선을 맞췄다.">
      <text className="t-strong" x="8" y="22">Before</text>
      <text className="t-strong" x="188" y="22">After</text>
      <Before x={8} />
      <After x={188} />
      <text className="t-bad" x="8" y="228">크기, 색, 간격이 같다</text>
      <text className="t-bad" x="8" y="245">버튼이 글자처럼 보인다</text>
      <text className="t-good" x="188" y="228">크기, 대비, 간격, 정렬을</text>
      <text className="t-good" x="188" y="245">중요도 순으로 차등</text>
    </svg>
  );
}
