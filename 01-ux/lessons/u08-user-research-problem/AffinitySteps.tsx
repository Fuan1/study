const NOTES = ['빈 방 못 찾음', '취소 방법 모름', '이미 사람 있음', '목록이 길다', '연장 못 함', '방이 겹침'];
const CLUSTERS = [
  { label: '찾기가 어렵다', notes: ['빈 방 못 찾음', '목록이 길다'] },
  { label: '예약이 겹친다', notes: ['방이 겹침', '이미 사람 있음'] },
  { label: '변경이 막힌다', notes: ['취소 방법 모름', '연장 못 함'] },
];
// 여백 기준: 칸 안 글자 12px 이상, 칸 사이 10px, 단계 사이 30px 안팎.
const CW = 108;
const gx = (i: number) => 8 + i * (CW + 10);

export default function AffinitySteps() {
  return (
    <svg viewBox="0 0 360 366" role="img" aria-label="친화도 다이어그램의 세 단계. 관찰을 한 장씩 적고, 비슷한 것끼리 묶고, 묶음에 이름을 붙인다. 노트 내용은 가정이다.">
      <text className="t-strong" x="8" y="22">1. 관찰을 한 장에 하나씩 적는다</text>
      {NOTES.map((t, i) => {
        const y = 36 + Math.floor(i / 3) * 52;
        return (
          <g key={t}>
            <rect className="svg-box" x={gx(i % 3)} y={y} width={CW} height="42" rx="6" />
            <text x={gx(i % 3) + CW / 2} y={y + 26} textAnchor="middle" fontSize="12.5">{t}</text>
          </g>
        );
      })}
      <text className="t-strong" x="8" y="174">2. 비슷한 것끼리 묶는다</text>
      {CLUSTERS.map((c, i) => (
        <g key={c.label}>
          <rect className="svg-box-key" x={gx(i)} y="188" width={CW} height="76" rx="8" />
          <text x={gx(i) + CW / 2} y="214" textAnchor="middle" fontSize="12.5">{c.notes[0]}</text>
          <line x1={gx(i) + 12} y1="226" x2={gx(i) + CW - 12} y2="226" stroke="var(--line)" strokeWidth="1" />
          <text x={gx(i) + CW / 2} y="246" textAnchor="middle" fontSize="12.5">{c.notes[1]}</text>
        </g>
      ))}
      <text className="t-strong" x="8" y="302">3. 묶음에 이름을 붙인다</text>
      {CLUSTERS.map((c, i) => (
        <g key={c.label}>
          <rect className="svg-box-good" x={gx(i)} y="316" width={CW} height="42" rx="6" />
          <text className="t-accent" x={gx(i) + CW / 2} y="342" textAnchor="middle">{c.label}</text>
        </g>
      ))}
    </svg>
  );
}
