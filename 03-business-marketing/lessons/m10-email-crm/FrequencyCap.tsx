/**
 * 한 고객이 세 시퀀스에 동시에 들어 있을 때 14일 동안의 발송 모의(가정).
 * 규칙: 하루 최대 1통, 직전 7일(당일 포함) 최대 3통, 같은 날 겹치면 우선순위가 높은 시퀀스가 보낸다.
 * 탈락한 메일은 이월하지 않고 폐기한다. 우선순위: 구매 후 > 재참여 > 뉴스레터.
 */
type Seq = { name: string; days: number[] };

const SEQS: Seq[] = [
  { name: '구매 후 안내', days: [3, 5, 8] },
  { name: '재참여', days: [1, 4, 8, 12] },
  { name: '뉴스레터', days: [2, 9] },
];
const DAYS = 14;
const DAY_CAP = 1;
const WEEK_CAP = 3;

type Cell = 'sent' | 'held' | null;
function simulate(): Cell[][] {
  const grid: Cell[][] = SEQS.map(() => Array<Cell>(DAYS + 1).fill(null));
  const sentDays: number[] = [];
  for (let d = 1; d <= DAYS; d += 1) {
    const cands = SEQS.map((s, i) => ({ i, on: s.days.includes(d) })).filter((c) => c.on); // 앞쪽 시퀀스가 우선순위가 높다
    let sentToday = 0;
    for (const c of cands) {
      const inWeek = sentDays.filter((x) => x > d - 7).length;
      if (sentToday < DAY_CAP && inWeek < WEEK_CAP) {
        grid[c.i][d] = 'sent';
        sentDays.push(d);
        sentToday += 1;
      } else {
        grid[c.i][d] = 'held';
      }
    }
  }
  return grid;
}

// 여백 기준: 행 제목은 점에서 8px 이상, 행 사이 24px 이상, 범례는 눈금 아래 24px 이상.
const GRID = simulate();
const R = 9;
const PITCH_X = 344 / DAYS;
const cx = (d: number) => 8 + (d - 0.5) * PITCH_X;
const ROW_PITCH = 64;
const rowY = (i: number) => 8 + i * ROW_PITCH; // 행 제목 baseline = rowY + 14
const cy = (i: number) => rowY(i) + 14 + 12 + R; // 제목 baseline 아래 12, 점 반지름 9
const TICK = cy(SEQS.length - 1) + R + 8 + 12; // 점 아래 8 + 글자 높이
const LEG = TICK + 28;
const STROKE = 1.5;
export const VB_H = Math.ceil(LEG + 4 + STROKE);

export default function FrequencyCap() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="세 시퀀스가 겹친 14일 모의. 후보 9통 중 6통을 보내고 3통은 보류한다. 4일의 재참여와 5일의 구매 후 안내는 직전 7일 3통 상한에 걸리고, 8일의 재참여는 같은 날 우선순위가 높은 구매 후 안내에 밀린다.">
      {SEQS.map((s, i) => (
        <g key={s.name}>
          <text className="t-strong" x={8} y={rowY(i) + 14}>{s.name}</text>
          {GRID[i].map((c, d) => {
            if (!c) return null;
            return c === 'sent'
              ? <circle key={d} className="svg-berg" cx={cx(d)} cy={cy(i)} r={R} />
              : <circle key={d} className="svg-box-bad" cx={cx(d)} cy={cy(i)} r={R} />;
          })}
        </g>
      ))}
      {Array.from({ length: DAYS }, (_, k) => k + 1).map((d) => (
        <text key={d} className="t-sub" x={cx(d)} y={TICK} textAnchor="middle">{d}</text>
      ))}
      <circle className="svg-berg" cx={8 + R} cy={LEG - 4} r={7} />
      <text className="t-sub" x={8 + 2 * R + 8} y={LEG}>발송</text>
      <circle className="svg-box-bad" cx={120 + R} cy={LEG - 4} r={7} />
      <text className="t-sub" x={120 + 2 * R + 8} y={LEG}>보류(상한·같은 날 중복)</text>
    </svg>
  );
}
