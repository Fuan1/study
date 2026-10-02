/** 같은 순간이 UTC 와 KST 에서 다른 날짜가 된다. 시각은 2026-09-29 00:00 UTC 기준 시간(h)으로 계산한다. */
const T0 = 9; // 축 시작: 09-29 09:00 UTC
const T1 = 30; // 축 끝: 09-30 06:00 UTC
const EVENT = 23 + 50 / 60; // 09-29 23:50 UTC
const UTC_MID = 24; // UTC 자정(09-30 00:00)
const KST_MID = 15; // KST 자정 = 09-29 15:00 UTC

const AX0 = 56;
const AX1 = 352;
const xOf = (h: number) => AX0 + ((h - T0) / (T1 - T0)) * (AX1 - AX0);
const BH = 40;
const UTC_Y = 36;
const KST_Y = UTC_Y + BH + 12;

type Band = { from: number; to: number; label: string; hit: boolean };
const UTC_BANDS: Band[] = [
  { from: T0, to: UTC_MID, label: '09-29', hit: EVENT < UTC_MID },
  { from: UTC_MID, to: T1, label: '09-30', hit: EVENT >= UTC_MID },
];
const KST_BANDS: Band[] = [
  { from: T0, to: KST_MID, label: '09-29', hit: EVENT < KST_MID },
  { from: KST_MID, to: T1, label: '09-30', hit: EVENT >= KST_MID },
];

export default function TimeShift() {
  const ex = xOf(EVENT);
  const bandsBottom = KST_Y + BH;
  const noteY = bandsBottom + 22; // 라벨 baseline
  const H = Math.ceil(noteY + 4 + 12);
  const row = (bands: Band[], y: number, name: string) => (
    <g>
      <text className="t-strong" x="8" y={y + BH / 2 + 5}>{name}</text>
      {bands.map((b) => (
        <g key={b.label}>
          <rect className={b.hit ? 'svg-berg' : 'svg-box'} x={xOf(b.from)} y={y} width={xOf(b.to) - xOf(b.from)} height={BH} />
          <text className={b.hit ? 't-strong' : 't-sub'} x={xOf(b.from) + 12} y={y + BH / 2 + 5}>{b.label}</text>
        </g>
      ))}
    </g>
  );
  return (
    <svg viewBox={`0 0 360 ${H}`} role="img" aria-label="09-29 23:50 UTC 의 이벤트는 UTC 날짜로는 09-29, KST 날짜로는 09-30 이다. KST 자정은 15:00 UTC 이다.">
      <text className="t-warm" x={ex} y="18" textAnchor="middle">이벤트 23:50 UTC</text>
      {row(UTC_BANDS, UTC_Y, 'UTC')}
      {row(KST_BANDS, KST_Y, 'KST')}
      <line x1={ex} y1="26" x2={ex} y2={bandsBottom + 6} stroke="var(--warm)" strokeWidth="2" />
      <text className="t-sub" x={xOf(KST_MID)} y={noteY}>KST 자정 = 15:00 UTC</text>
    </svg>
  );
}
