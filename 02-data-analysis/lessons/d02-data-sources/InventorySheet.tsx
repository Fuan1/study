/** 데이터 인벤토리의 모양. 항목과 값은 모두 가상 예시이며 실제 서비스가 아니다. */
const COLS = [
  { x: 8, w: 142, h: '데이터와 한 행' },
  { x: 150, w: 102, h: '생기는 곳' },
  { x: 252, w: 100, h: '개인정보' },
];
const ROWS = [
  { a: '앱 이벤트', a2: '한 행: 이벤트 하나', b: '제품 로그', b2: '최근 1년', c: '사용자 ID', c2: '있음' },
  { a: '주문 내역', a2: '한 행: 상품 한 줄', b: '결제 시스템', b2: '최근 3년', c: '이름·주소', c2: '있음' },
  { a: '고객 속성', a2: '한 행: 고객 한 명', b: 'CRM', b2: '가입 이후', c: '이름·연락처', c2: '있음' },
  { a: '만족도 설문', a2: '한 행: 응답 한 건', b: '설문 도구', b2: '분기 1회', c: '수집 안 함', c2: '없음' },
];

// 여백 기준: 두 줄 행 높이 66(글자 위아래 12px 이상), 머리글 행 34.
const HH = 34;
const RH = 66;
const TOP = 8;

export default function InventorySheet() {
  const bottom = TOP + HH + ROWS.length * RH;
  return (
    <svg viewBox={`0 0 360 ${bottom + 9}`} role="img" aria-label="데이터 인벤토리 표의 모양. 열은 데이터와 한 행, 생기는 곳과 기간, 개인정보 여부. 앱 이벤트, 주문 내역, 고객 속성, 만족도 설문 네 줄이 가정한 예시로 들어 있다.">
      <rect className="svg-box" x="8" y={TOP} width="344" height={HH + ROWS.length * RH} rx="8" />
      {COLS.map((c) => (
        <text key={c.h} className="t-strong" x={c.x + 12} y={TOP + 22}>{c.h}</text>
      ))}
      {ROWS.map((r, i) => {
        const y = TOP + HH + i * RH;
        return (
          <g key={r.a}>
            <line x1="8" y1={y} x2="352" y2={y} stroke="var(--line)" />
            <text x={COLS[0].x + 12} y={y + 29} fontSize="13">{r.a}</text>
            <text className="t-sub" x={COLS[0].x + 12} y={y + 50}>{r.a2}</text>
            <text x={COLS[1].x + 12} y={y + 29} fontSize="13">{r.b}</text>
            <text className="t-sub" x={COLS[1].x + 12} y={y + 50}>{r.b2}</text>
            <text x={COLS[2].x + 12} y={y + 29} fontSize="13">{r.c}</text>
            <text className={r.c2 === '있음' ? 't-bad' : 't-good'} x={COLS[2].x + 12} y={y + 50}>{r.c2}</text>
          </g>
        );
      })}
    </svg>
  );
}
