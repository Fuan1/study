const NOTES = ['빈 방 못 찾음', '취소 방법 모름', '이미 사람 있음', '목록이 길다', '연장 못 함', '방이 겹침'];
const CLUSTERS = [
  { label: '찾기가 어렵다', notes: ['빈 방 못 찾음', '목록이 길다'] },
  { label: '예약이 어긋난다', notes: ['방이 겹침', '이미 사람 있음'] },
  { label: '변경이 막힌다', notes: ['취소 방법 모름', '연장 못 함'] },
];
const CW = 108;
const gx = (i: number) => 8 + i * (CW + 10);

function Note({ x, y, w, t }: { x: number; y: number; w: number; t: string }) {
  return (
    <g>
      <rect className="svg-box" x={x} y={y} width={w} height="30" rx="5" />
      <text x={x + w / 2} y={y + 20} textAnchor="middle" fontSize="12.5">{t}</text>
    </g>
  );
}

export default function AffinitySteps() {
  return (
    <svg viewBox="0 0 360 304" role="img" aria-label="친화도 다이어그램의 세 단계. 관찰을 한 장씩 적고, 비슷한 것끼리 묶고, 묶음에 이름을 붙인다. 노트 내용은 가정이다.">
      <text className="t-strong" x="8" y="18">1. 관찰을 한 장에 하나씩 적는다</text>
      {NOTES.map((t, i) => (
        <Note key={t} x={gx(i % 3)} y={28 + Math.floor(i / 3) * 38} w={CW} t={t} />
      ))}
      <text className="t-strong" x="8" y="132">2. 비슷한 것끼리 묶는다</text>
      {CLUSTERS.map((c, i) => (
        <g key={c.label}>
          <rect className="svg-box-key" x={gx(i) - 4} y="142" width={CW + 8} height="84" rx="8" />
          {c.notes.map((t, k) => (
            <Note key={t} x={gx(i)} y={150 + k * 36} w={CW} t={t} />
          ))}
        </g>
      ))}
      <text className="t-strong" x="8" y="250">3. 묶음에 이름을 붙인다</text>
      {CLUSTERS.map((c, i) => (
        <g key={c.label}>
          <rect className="svg-box-good" x={gx(i)} y="260" width={CW} height="34" rx="6" />
          <text className="t-accent" x={gx(i) + CW / 2} y="282" textAnchor="middle">{c.label}</text>
        </g>
      ))}
    </svg>
  );
}
