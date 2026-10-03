// 롤아웃 단계표의 모양. 형태 예시(가상 값): 칸에는 규칙을 쓰고 숫자는 팀이 채운다.
type Stage = { name: string; watch: string; next: string; back: string };

const STAGES: Stage[] = [
  { name: '1. 내부·초대 사용자', watch: '오류, 로그가 남는지', next: '계측 정상, 치명 결함 없음', back: '치명 결함이면 끈다' },
  { name: '2. 소수 무작위 사용자', watch: '가드레일, 성공 지표 방향', next: '관찰 창을 채우고 선 안', back: '가드레일이 선을 넘으면' },
  { name: '3. 절반으로 확대', watch: '위와 같음, 지원 문의', next: '같은 조건을 채움', back: '선을 넘거나 문의 급증' },
  { name: '4. 전체 노출', watch: '출시 후 평가 지표', next: '플래그 정리 일정 확정', back: '합의한 선을 넘으면' },
];

const ROWS: [string, 'watch' | 'next' | 'back', string][] = [
  ['관찰', 'watch', 't-sub'],
  ['다음', 'next', 't-sub'],
  ['롤백', 'back', 't-bad'],
];

const FIRST = 62; // 머리줄(28)에서 첫 줄까지 34: 글자 사이 9px 이상
const PITCH = 26; // 줄 baseline 간격
const H = FIRST + PITCH * 2 + 16; // 마지막 줄 아래 여백 16
const GAP = 28;
const y = (i: number) => 8 + i * (H + GAP);
// 마지막 상자 아랫변 + 선 두께 절반 + 아래 여백 8
const VB_H = y(STAGES.length - 1) + H + 1 + 8;
const VAL_X = 66;

export default function RolloutTable() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="롤아웃 단계표. 단계마다 노출 범위, 관찰 지표, 다음 단계 조건, 롤백 조건을 한 칸씩 적는다. 내부와 초대 사용자, 소수 무작위 사용자, 절반으로 확대, 전체 노출의 네 단계 예시.">
      {STAGES.map((s, i) => (
        <g key={s.name}>
          <rect className="svg-box" x="8" y={y(i)} width="344" height={H} rx="8" />
          <text className="t-strong" x="22" y={y(i) + 28}>{s.name}</text>
          {ROWS.map(([label, key, cls], r) => (
            <g key={label}>
              <text className={cls} x="22" y={y(i) + FIRST + r * PITCH}>{label}</text>
              <text x={VAL_X} y={y(i) + FIRST + r * PITCH} fontSize="13">{s[key]}</text>
            </g>
          ))}
        </g>
      ))}
    </svg>
  );
}
