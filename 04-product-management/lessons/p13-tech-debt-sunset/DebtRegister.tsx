/**
 * 형태 예시(가상 값): 영역 이름과 숫자는 모두 가정이다.
 * 달 이자 = 변경마다 추가 일수 x 달 변경 횟수. 본전까지 = 원금 / 달 이자(개월).
 */
type Item = { area: string; tag: string; effect: string; extra: number; perMonth: number; principal: number };

const ITEMS: Item[] = [
  { area: '결제 모듈', tag: '먼저 갚기', effect: '결제 장애가 잦고 기능이 늦어짐', extra: 3, perMonth: 4, principal: 8 },
  { area: '알림 설정 화면', tag: '기능과 함께', effect: '새 옵션을 넣을 때 느림', extra: 1, perMonth: 2, principal: 5 },
  { area: '옛 관리자 도구', tag: '그대로 둠', effect: '불편하지만 장애는 없음', extra: 1, perMonth: 1 / 6, principal: 12 },
];

const fmt = (n: number) => (Number.isInteger(n) ? String(n) : n.toFixed(1));

const TOP = 8;
const HEAD = 32;
const H = 112;
const GAP = 12;
const y = (i: number) => TOP + HEAD + i * (H + GAP);
const VB_H = y(ITEMS.length - 1) + H + 1 + 8;

export default function DebtRegister() {
  return (
    <svg
      viewBox={`0 0 360 ${VB_H}`}
      role="img"
      aria-label="부채 목록 한 장의 모양. 영역마다 영향, 이자(변경마다 추가 일수와 달 변경 횟수), 원금(상환 일수), 본전까지 걸리는 달 수, 결정을 적는다. 가상 값이다."
    >
      <text className="t-strong" x="12" y={TOP + 16}>부채 목록 (가상 값)</text>
      {ITEMS.map((it, i) => {
        const top = y(i);
        const monthly = it.extra * it.perMonth;
        const months = it.principal / monthly;
        const freq = it.perMonth >= 1 ? `달 ${fmt(it.perMonth)}회` : '반년에 1회';
        return (
          <g key={it.area}>
            <rect className="svg-box" x="8" y={top} width="344" height={H} rx="8" />
            <text className="t-strong" x="22" y={top + 28}>{it.area}</text>
            <text className="t-accent" x="338" y={top + 28} textAnchor="end">{it.tag}</text>
            <text className="t-sub" x="22" y={top + 50}>영향</text>
            <text x="64" y={top + 50} fontSize="13">{it.effect}</text>
            <text className="t-sub" x="22" y={top + 72}>이자</text>
            <text x="64" y={top + 72} fontSize="13">+{it.extra}일 × {freq} = 달 {fmt(monthly)}일</text>
            <text className="t-sub" x="22" y={top + 94}>원금</text>
            <text x="64" y={top + 94} fontSize="13">{it.principal}일, 본전까지 {fmt(months)}개월</text>
          </g>
        );
      })}
    </svg>
  );
}
