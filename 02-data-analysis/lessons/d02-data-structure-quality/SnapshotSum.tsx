/** 일별 잔액 스냅샷은 날짜를 가로질러 더하지 않는다. 가상 계좌 3개 3일치 잔액을 코드로 합산한다. */
const SNAP = [
  { d: '09-28', bal: [100000, 50000, 30000] },
  { d: '09-29', bal: [120000, 40000, 30000] },
  { d: '09-30', bal: [110000, 60000, 20000] },
];
const sum = (a: number[]) => a.reduce((s, v) => s + v, 0);
const DAY = SNAP.map((s) => ({ label: s.d, value: sum(s.bal) }));
const ALL = DAY.reduce((s, r) => s + r.value, 0);

const BX = 64; // 막대 시작 x
const MAXW = 220; // 3일 합 막대 폭
const BAR_H = 24;
const PITCH = 40;
const fmt = (n: number) => n.toLocaleString('en-US');

export default function SnapshotSum() {
  const dayY = (i: number) => 8 + i * PITCH;
  const lastDayBottom = dayY(DAY.length - 1) + BAR_H; // 112
  const sumY = lastDayBottom + 24; // 다른 묶음은 24px 띄운다
  const H = Math.ceil(sumY + BAR_H + 1 + 12);
  const rows = [...DAY.map((r, i) => ({ ...r, y: dayY(i), bad: false })), { label: '3일 합', value: ALL, y: sumY, bad: true }];
  return (
    <svg viewBox={`0 0 360 ${H}`} role="img" aria-label={`하루 잔액 합계는 ${DAY.map((r) => fmt(r.value)).join(', ')}이다. 3일치를 전부 더하면 ${fmt(ALL)}로 하루 값의 약 3배가 된다.`}>
      {rows.map((r) => {
        const w = (r.value / ALL) * MAXW;
        return (
          <g key={r.label}>
            <text className="t-sub" x="8" y={r.y + 17}>{r.label}</text>
            <rect x={BX} y={r.y} width={w} height={BAR_H} rx="4" fill="var(--accent-soft)" stroke={r.bad ? 'var(--bad)' : 'var(--accent)'} strokeWidth="1.5" />
            <text className={r.bad ? 't-bad' : 't-sub'} x={BX + w + 8} y={r.y + 17}>{fmt(r.value)}</text>
          </g>
        );
      })}
    </svg>
  );
}
