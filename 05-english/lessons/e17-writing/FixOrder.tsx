/**
 * 교정을 받았을 때 고치는 순서. 이 글의 정리이고 예문은 이 글이 만들었다.
 * 번호 원은 상자 왼쪽 안에 두고 글자는 원 오른쪽에서 시작한다.
 */
type Row = { title: string; ex: string };

const ROWS: Row[] = [
  { title: '뜻이 안 통하는 오류', ex: 'Yesterday go park → I went to the park.' },
  { title: '배운 규칙을 또 틀린 오류', ex: 'He like tea → He likes tea.' },
  { title: '대문자와 끝부호', ex: 'see you monday → See you on Monday.' },
  { title: '철자와 표현 다듬기', ex: 'tomorow → tomorrow' },
];

const H = 66;
const GAP = 24;
const TOP = 8;
const VB_H = TOP + ROWS.length * H + (ROWS.length - 1) * GAP + 16;

export default function FixOrder() {
  const y = (i: number) => TOP + i * (H + GAP);
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="교정을 받았을 때 고치는 순서. 뜻이 안 통하는 오류, 배운 규칙의 반복 오류, 대문자와 끝부호, 철자와 표현 다듬기 순서다.">
      <defs>
        <marker id="ar-e17d" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      {ROWS.map((r, i) => (
        <g key={r.title}>
          <rect className={i === 0 ? 'svg-box-key' : 'svg-box'} x="8" y={y(i)} width="344" height={H} rx="8" />
          <circle className={i === 0 ? 'svg-berg' : 'svg-box'} cx="38" cy={y(i) + H / 2} r="14" />
          <text className="t-strong" x="38" y={y(i) + H / 2 + 5} textAnchor="middle">{i + 1}</text>
          <text className="t-strong" x="66" y={y(i) + 29}>{r.title}</text>
          <text className="t-sub" x="66" y={y(i) + 50}>{r.ex}</text>
          {i < ROWS.length - 1 && (
            <line className="svg-flow" x1="38" y1={y(i) + H + 6} x2="38" y2={y(i) + H + GAP - 6} markerEnd="url(#ar-e17d)" />
          )}
        </g>
      ))}
    </svg>
  );
}
