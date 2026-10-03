// 형태 예시(가상 값): DACI 역할 구분표 한 장. 인원 규칙은 Atlassian Team Playbook DACI 페이지에서 확인한 것이다.
const ROWS: { k: string; who: string; rule: string; key?: boolean }[] = [
  { k: 'Driver', who: '기획자(PM)', rule: '1명. 마감까지 결정을 받아 낸다' },
  { k: 'Approver', who: '제품 리드', rule: '1명. 최종 결정을 한다', key: true },
  { k: 'Contributors', who: '디자인, 개발, 데이터', rule: '여럿. 발언만 하고 표는 없다' },
  { k: 'Informed', who: '영업, 고객지원', rule: '여럿. 결정 뒤에 알린다' },
];

const TOP = 8;
const HEAD = 44;
const ROW = 62;
const BOTTOM = TOP + HEAD + ROWS.length * ROW;
// 카드 아랫변 + 선 두께 절반 + 아래 여백 8
const VB_H = BOTTOM + 1 + 8;
const VAL_X = 122;

export default function RoleSheet() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="역할 구분표 한 장. 결정 이름 아래에 Driver 1명, Approver 1명, Contributors 여럿, Informed 여럿을 역할 이름으로 적는다.">
      <rect className="svg-box" x="8" y={TOP} width="344" height={HEAD + ROWS.length * ROW} rx="8" />
      <text className="t-strong" x="22" y={TOP + 28}>결정: 알림 설정 개편 범위</text>
      <text className="t-sub" x="338" y={TOP + 28} textAnchor="end">가상</text>
      {ROWS.map((r, i) => {
        const top = TOP + HEAD + i * ROW;
        return (
          <g key={r.k}>
            <line x1="8" y1={top} x2="352" y2={top} stroke="var(--line)" />
            <text className={r.key ? 't-accent' : 't-sub'} x="22" y={top + 26}>{r.k}</text>
            <text className="t-strong" x={VAL_X} y={top + 26}>{r.who}</text>
            <text className="t-sub" x={VAL_X} y={top + 47}>{r.rule}</text>
          </g>
        );
      })}
    </svg>
  );
}
