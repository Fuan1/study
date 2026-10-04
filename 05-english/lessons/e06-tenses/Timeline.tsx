/** 개념 도식. 숫자 값은 없고 위치로 때의 관계만 보인다. */
const L = 124; // 시간선 시작 x
const R = 352; // 시간선 끝 x
const NOW = 240;
const TOP = 48;
const PITCH = 64;
const BAR = 16;

const ROWS = [
  { name: '과거', ex: 'I worked' },
  { name: '현재완료', ex: 'I have worked' },
  { name: '현재진행', ex: 'I am working' },
  { name: '현재', ex: 'I work' },
  { name: '미래', ex: 'I will work' },
];

export default function Timeline() {
  const cy = (i: number) => TOP + i * PITCH + 28;
  const bottom = cy(ROWS.length - 1) + 24;
  const VB_H = bottom + 12;
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="시제별 시간선. 과거형은 지금 앞에서 끝나고, 현재완료는 과거에서 지금까지 이어지고, 현재진행은 지금 주변의 짧은 구간이고, 현재형은 지금을 포함해 반복되고, 미래는 지금 뒤로 향한다.">
      <defs>
        <marker id="ar-tl" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      <text className="t-sub" x={L} y="20">과거</text>
      <text className="t-strong" x={NOW} y="20" textAnchor="middle">지금</text>
      <text className="t-sub" x={R} y="20" textAnchor="end">미래</text>
      <line className="svg-waterline" x1={NOW} y1="32" x2={NOW} y2={bottom} strokeDasharray="4 4" />
      {ROWS.map((r, i) => (
        <g key={r.name}>
          <text className="t-strong" x="8" y={cy(i) - 6}>{r.name}</text>
          <text className="t-sub" x="8" y={cy(i) + 14}>{r.ex}</text>
          <line className="svg-box" x1={L} y1={cy(i)} x2={R} y2={cy(i)} />
        </g>
      ))}
      <rect className="svg-berg" x="140" y={cy(0) - BAR / 2} width="56" height={BAR} rx="4" />
      <rect className="svg-berg" x="140" y={cy(1) - BAR / 2} width={NOW - 140} height={BAR} rx="4" />
      <rect className="svg-berg" x="218" y={cy(2) - BAR / 2} width="44" height={BAR} rx="4" />
      {[146, 182, 218, 262, 298, 334].map((x) => (
        <circle key={x} className="svg-berg" cx={x} cy={cy(3)} r="5" />
      ))}
      <line className="svg-flow" x1="258" y1={cy(4)} x2="344" y2={cy(4)} markerEnd="url(#ar-tl)" />
    </svg>
  );
}
