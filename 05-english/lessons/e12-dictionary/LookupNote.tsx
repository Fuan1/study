type Row = { label: string; value: string };

// 형태 예시(가상 값): 한 번 찾은 뒤 남기는 메모 세 칸. 값은 book 동사 항목에서 확인한 뜻과 용법으로 직접 썼다.
const ROWS: Row[] = [
  { label: '뜻 한 줄', value: '예약하다' },
  { label: '예문 한 줄', value: 'I booked a table for two.' },
  { label: '같이 쓰는 말', value: 'book a table' },
];

const H = 66;
const GAP = 12;
const PAD = 16;

export default function LookupNote() {
  const y = (i: number) => 8 + PAD + i * (H + GAP);
  const bottom = y(ROWS.length - 1) + H + PAD;
  return (
    <svg viewBox={`0 0 360 ${bottom + 12}`} role="img" aria-label="한 번 찾은 뒤 남기는 메모 세 칸. 뜻 한 줄, 예문 한 줄, 같이 쓰는 말 한 줄.">
      <rect className="svg-box-key" x="8" y="8" width="344" height={bottom - 8} rx="10" />
      {ROWS.map((r, i) => (
        <g key={r.label}>
          <rect className={i === 0 ? 'svg-berg' : 'svg-box'} x="24" y={y(i)} width="312" height={H} rx="8" />
          <text className="t-sub" x="38" y={y(i) + 28}>{r.label}</text>
          <text className="t-strong" x="38" y={y(i) + 50}>{r.value}</text>
        </g>
      ))}
    </svg>
  );
}
