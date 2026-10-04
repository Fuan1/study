/**
 * 시작 분량: ERF 는 처음 주 20분에서 시작하라고 쓴다.
 * 한 권 분량: Nation & Waring 은 가장 쉬운 단계 책을 5,000단어 안팎으로 본다. 시간 = 단어 수 / 분당 단어 수.
 */
const WORDS = 5000;
type Row = { label: string; min: number };

const ROWS: Row[] = [
  { label: '처음 시작하는 주당 시간', min: 20 },
  { label: `${WORDS.toLocaleString('en-US')}단어를 분당 100단어로`, min: WORDS / 100 },
  { label: `${WORDS.toLocaleString('en-US')}단어를 분당 150단어로`, min: WORDS / 150 },
  { label: `${WORDS.toLocaleString('en-US')}단어를 분당 200단어로`, min: WORDS / 200 },
];

const X0 = 8;
const W = 280; // 60분 폭
const MAX = 60;
const PITCH = 54;
const TOP = 20;
const BAR_H = 14;

export default function WeeklyTime() {
  const vbH = TOP + (ROWS.length - 1) * PITCH + 10 + BAR_H + 18;
  return (
    <svg viewBox={`0 0 360 ${vbH}`} role="img" aria-label="주당 읽기 시간. 시작 20분, 5천 단어 한 권은 분당 100단어면 50분, 150단어면 약 33분, 200단어면 25분.">
      {ROWS.map((r, i) => {
        const y = TOP + i * PITCH;
        const w = (r.min / MAX) * W;
        return (
          <g key={r.label}>
            <text className="t-sub" x={X0} y={y}>{r.label}</text>
            <rect className="svg-berg" x={X0} y={y + 10} width={w} height={BAR_H} rx="3" />
            <text className="t-strong" x={X0 + w + 8} y={y + 10 + BAR_H - 1}>{Math.round(r.min)}분</text>
          </g>
        );
      })}
    </svg>
  );
}
