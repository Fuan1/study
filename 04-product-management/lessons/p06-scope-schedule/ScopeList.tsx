/** 형태 예시(가상 값). 가상의 모임 일정 기능으로 범위 목록의 모양만 보인다. */
type Group = { label: string; sub: string; cls: string; box: string; lines: [string, string] };

const GROUPS: Group[] = [
  { label: '포함 · 필수', sub: '이번 시간 상자', cls: 't-good', box: 'svg-box-good', lines: ['일정 만들기', '참석 응답 받기'] },
  { label: '포함 · 선택', sub: '이번 시간 상자', cls: 't-warm', box: 'svg-tip', lines: ['응답 마감 알림', '필수가 끝나면 한다'] },
  { label: '제외', sub: '이번엔 안 함', cls: 't-bad', box: 'svg-box-bad', lines: ['반복 일정', '캘린더 연동'] },
  { label: '나중', sub: '다시 볼 조건', cls: 't-strong', box: 'svg-box', lines: ['결제 연동', '조건: 반복 개최 확인'] },
];

// 여백 기준: 상자 안 14px 이상, 두 줄 상자 높이 66, 상자 사이 24px.
const H = 66;
const GAP = 24;
const TOP = 8;
const y = (i: number) => TOP + i * (H + GAP);
// 마지막 상자 아랫변 + 선 두께 절반 + 아래 여백 8
const VB_H = y(GROUPS.length - 1) + H + 1 + 8;

export default function ScopeList() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="범위 목록의 모양. 포함 필수, 포함 선택, 제외, 나중 네 묶음으로 나누고 나중에는 다시 볼 조건을 적는다.">
      {GROUPS.map((g, i) => (
        <g key={g.label}>
          <rect className={g.box} x="8" y={y(i)} width="344" height={H} rx="8" />
          <text className={g.cls} x="22" y={y(i) + 29}>{g.label}</text>
          <text className="t-sub" x="22" y={y(i) + 50}>{g.sub}</text>
          <text x="140" y={y(i) + 29} fontSize="13">{g.lines[0]}</text>
          <text x="140" y={y(i) + 50} fontSize="13">{g.lines[1]}</text>
        </g>
      ))}
    </svg>
  );
}
