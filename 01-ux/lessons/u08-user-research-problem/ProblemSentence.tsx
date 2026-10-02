/** 문제 정의 한 문장을 네 칸으로 나눠 보여 준다. 회의실 예약은 가정한 사례다. */
const SLOTS = [
  { label: '누가', lines: ['회의를 주관하는 직원'], tone: 'key' },
  { label: '어떤 상황에서', lines: ['회의 직전에 방을 급히 잡을 때'], tone: 'key' },
  { label: '무엇을 하려는데', lines: ['지금 쓸 수 있는 방을 찾는다'], tone: 'key' },
  { label: '무엇 때문에 막히는가', lines: ['빈 방을 한눈에 볼 수 없어 여러 방을 확인하고,', '결국 이미 쓰는 방으로 가는 일이 반복된다'], tone: 'key' },
  { label: '해결책(문장에 넣지 않는다)', lines: ['예: 캘린더 연동, 필터 추가'], tone: 'bad' },
];

export default function ProblemSentence() {
  // 여백 기준: 상자 안 14px 이상, 줄 간격 22px, 상자 사이 14px.
  const gap = 14;
  let y = 8;
  const rows = SLOTS.map((s) => {
    const h = 44 + s.lines.length * 22;
    const row = { ...s, y, h };
    y += h + gap;
    return row;
  });
  const H = y - gap + 8;
  return (
    <svg viewBox={`0 0 360 ${H}`} role="img" aria-label="문제 정의 문장의 네 칸. 누가, 어떤 상황에서, 무엇을 하려는데, 무엇 때문에 막히는가를 채우고 해결책은 넣지 않는다. 회의실 예약은 가정한 사례다.">
      {rows.map((s) => (
        <g key={s.label}>
          <rect className={s.tone === 'bad' ? 'svg-box-bad' : 'svg-box-key'} x="8" y={s.y} width="344" height={s.h} rx="8" />
          <text className={s.tone === 'bad' ? 't-bad' : 't-accent'} x="20" y={s.y + 26}>{s.label}</text>
          {s.lines.map((t, i) => (
            <text key={t} x="20" y={s.y + 48 + i * 22} fontSize="13">{t}</text>
          ))}
        </g>
      ))}
    </svg>
  );
}
