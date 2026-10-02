/** 흐름에서 공들일 지점을 보여주는 도식이다. 단계 이름은 일반적인 예시이며 측정값이 없다. */
const ROWS = [
  { title: '시작, 입력, 탐색', note: '평범한 구간. 막힘만 없애면 된다', tone: 'plain' },
  { title: '오류, 막힘, 긴 대기', note: '가장 강한 순간 후보. 복구에 공들인다', tone: 'warm' },
  { title: '마지막 단계(결제, 제출)', note: '여기서 막히면 끝이 나빠진다', tone: 'key' },
  { title: '완료 화면', note: '완료를 알리고 다음 행동 하나를 안내', tone: 'good' },
  { title: '해지, 탈퇴 마무리', note: '막지 말고 쉽게 끝낸다', tone: 'good' },
] as const;

const FILL = { plain: 'var(--line)', warm: 'var(--warm)', key: 'var(--accent)', good: 'var(--good)' } as const;

export default function PeakEndPoints() {
  const h = 64;
  const top = 10;
  return (
    <svg viewBox="0 0 360 330" role="img" aria-label="사용 흐름에서 공들일 지점. 오류와 막힘의 복구, 마지막 단계, 완료 화면, 해지 마무리를 먼저 점검한다.">
      <line x1="24" y1={top + 14} x2="24" y2={top + (ROWS.length - 1) * h + 14} stroke="var(--line)" strokeWidth="2" />
      {ROWS.map((r, i) => {
        const y = top + i * h;
        return (
          <g key={r.title}>
            <circle cx="24" cy={y + 14} r="8" fill={FILL[r.tone]} />
            <text className="t-strong" x="44" y={y + 19}>{r.title}</text>
            <text className="t-sub" x="44" y={y + 40}>{r.note}</text>
          </g>
        );
      })}
    </svg>
  );
}
