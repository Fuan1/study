/** 형태 예시(가상 값). 같은 관찰이라도 근거에 따라 등급과 다음 행동이 갈린다. */
type Card = { grade: string; cls: string; next: string; obs: string; ev: string; why: string };

const CARDS: Card[] = [
  { grade: '패턴', cls: 't-good', next: '통찰로 올림', obs: '쿠폰 입력란에서 멈춤', ev: '관찰 3명 · 로그 일치', why: '코드를 찾는 데 시간이 듦' },
  { grade: '단서', cls: 't-warm', next: '확인 질문으로 남김', obs: '알림을 모두 껐다고 말함', ev: '말 1명 · 로그 미확인', why: '아직 해석하지 않음' },
  { grade: '충돌', cls: 't-bad', next: '원인 확인 전 보류', obs: '검색을 안 쓴다고 말함', ev: '말 4명 · 로그는 반대', why: '정의와 표본부터 점검' },
];

// 여백 기준: 카드 안 14px, 줄 간격 22px.
const H = 116;
const GAP = 16;
const y = (i: number) => 8 + i * (H + GAP);
// 마지막 카드 아랫변 + 선 두께 절반 + 아래 여백 8
const VB_H = y(CARDS.length - 1) + H + 1 + 8;
const VX = 66;

export default function InsightRows() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="통찰 정리표의 행 세 개. 패턴은 관찰 3명과 로그가 일치해 통찰로 올리고, 단서는 말 1명뿐이라 확인 질문으로 남기고, 충돌은 말 4명과 로그가 반대라 보류한다.">
      {CARDS.map((c, i) => {
        const top = y(i);
        return (
          <g key={c.grade}>
            <rect className="svg-box" x="8" y={top} width="344" height={H} rx="8" />
            <text className={c.cls} x="22" y={top + 26}>{c.grade}</text>
            <text className="t-sub" x="338" y={top + 26} textAnchor="end">{c.next}</text>
            <line x1="8" y1={top + 36} x2="352" y2={top + 36} stroke="var(--line)" />
            <text className="t-sub" x="22" y={top + 58}>관찰</text>
            <text x={VX} y={top + 58} fontSize="13">{c.obs}</text>
            <text className="t-sub" x="22" y={top + 80}>근거</text>
            <text x={VX} y={top + 80} fontSize="13">{c.ev}</text>
            <text className="t-sub" x="22" y={top + 102}>해석</text>
            <text x={VX} y={top + 102} fontSize="13">{c.why}</text>
          </g>
        );
      })}
    </svg>
  );
}
