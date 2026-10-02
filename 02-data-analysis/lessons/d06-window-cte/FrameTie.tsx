/** 같은 날짜의 두 주문이 있을 때 현재 행(#3)의 프레임. 기본 RANGE 는 같은 값의 행(#4)까지, ROWS 는 현재 행까지만 묶는다. 합계는 코드로 계산한다. */
type Row = { id: number; date: string; amount: number };

const ROWS: Row[] = [
  { id: 1, date: '01-05', amount: 30 },
  { id: 3, date: '01-07', amount: 20 },
  { id: 4, date: '01-07', amount: 40 },
  { id: 5, date: '01-09', amount: 70 },
];
const CUR = 1; // 현재 행(#3)의 위치
const rangeEnd = ROWS.reduce((last, r, i) => (r.date === ROWS[CUR].date ? i : last), CUR); // 같은 날짜 마지막 행
const sumTo = (end: number) => ROWS.slice(0, end + 1).reduce((a, r) => a + r.amount, 0);

const X = 8;
const W = 344;
const RH = 40; // 칸 높이: 글자 16 + 위아래 여백 12씩
const STEP = 44;
const DEFAULT_TITLE = '기본값 (RANGE)';
const ROWS_TITLE = 'ROWS UNBOUNDED PRECEDING';

function Panel({ top, title, end, sumClass }: { top: number; title: string; end: number; sumClass: string }) {
  return (
    <g>
      <text className="t-strong" x={X} y={top}>{title}</text>
      <text className={sumClass} x={X + W} y={top} textAnchor="end">합계 {sumTo(end)}</text>
      {ROWS.map((r, i) => {
        const y = top + 12 + i * STEP;
        const inFrame = i <= end;
        const note = i === CUR ? '현재 행' : i > CUR && i <= rangeEnd ? (inFrame ? '같은 날짜, 포함' : '같은 날짜, 제외') : '';
        return (
          <g key={r.id}>
            <rect className={inFrame ? 'svg-berg' : 'svg-box'} x={X} y={y} width={W} height={RH} rx="6" />
            <text x={X + 14} y={y + 24} fontSize="13">#{r.id} · {r.date} · {r.amount}</text>
            {note && <text className={i === CUR ? 't-accent' : inFrame ? 't-bad' : 't-sub'} x={X + W - 14} y={y + 24} textAnchor="end">{note}</text>}
          </g>
        );
      })}
    </g>
  );
}

export default function FrameTie() {
  const t1 = 22;
  const bottom1 = t1 + 12 + (ROWS.length - 1) * STEP + RH;
  const t2 = bottom1 + 24 + 14; // 묶음 사이 24px 이상
  const bottom2 = t2 + 12 + (ROWS.length - 1) * STEP + RH;
  const H = Math.ceil(bottom2 + 0.75 + 12);
  return (
    <svg viewBox={`0 0 360 ${H}`} role="img" aria-label="같은 날짜의 주문 두 건이 있을 때 현재 행의 누적합. 기본 RANGE 프레임은 같은 날짜의 다음 행까지 포함해 90, ROWS 로 지정하면 현재 행까지만 포함해 50이다.">
      <Panel top={t1} title={DEFAULT_TITLE} end={rangeEnd} sumClass="t-bad" />
      <Panel top={t2} title={ROWS_TITLE} end={CUR} sumClass="t-good" />
    </svg>
  );
}
