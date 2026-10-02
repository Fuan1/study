/** 가정한 주문 데이터(paid 8건)의 채널별 매출 합을 전체와 대조한다. 값은 채널별 금액 배열에서 계산한다. */
const ORDERS: { ch: string | null; amt: number }[] = [
  { ch: 'web', amt: 30000 },
  { ch: 'app', amt: 45000 },
  { ch: 'app', amt: 20000 },
  { ch: null, amt: 15000 },
  { ch: 'web', amt: 60000 },
  { ch: 'web', amt: 120000 },
  { ch: 'app', amt: 38000 },
  { ch: 'web', amt: 52000 },
];
const sumBy = (ch: string | null) => ORDERS.filter((o) => o.ch === ch).reduce((s, o) => s + o.amt, 0);
const TOTAL = ORDERS.reduce((s, o) => s + o.amt, 0);
const WEB = sumBy('web');
const APP = sumBy('app');
const NONE = sumBy(null);
const fmt = (n: number) => n.toLocaleString('en-US');

// 여백 기준: 막대 높이 36, 막대 위 제목 baseline 은 막대에서 12 위, 막대 아래 설명은 10 아래, 행 사이 24 이상.
const X0 = 8;
const BW = 344;
const SC = BW / TOTAL; // 금액 1당 폭
const BAR_H = 36;
const ROW = 108; // 한 행: 제목 14 + 막대 36 + 설명까지
const rowY = (i: number) => 8 + i * ROW;

type Seg = { label: string; w: number; cls: string };
const seg = (v: number, label: string, cls: string): Seg => ({ label, w: v * SC, cls });

const ROWS: { title: string; tcls: string; segs: Seg[]; note: string; ncls: string; gap?: number }[] = [
  {
    title: '전체: 결제 매출 합',
    tcls: 't-strong',
    segs: [seg(TOTAL, `전체 ${fmt(TOTAL)}`, 'svg-berg')],
    note: `SUM(amount) = ${fmt(TOTAL)}`,
    ncls: 't-sub',
  },
  {
    title: '나쁜 예: WHERE 로 거른 조각의 합',
    tcls: 't-strong',
    segs: [seg(WEB, 'web', 'svg-berg'), seg(APP, 'app', 'svg-box-key')],
    note: `${fmt(WEB + APP)}: ${fmt(NONE)}이 어디에도 없다`,
    ncls: 't-bad',
    gap: NONE * SC,
  },
  {
    title: '고친 예: 채널 없음 조각을 남긴 합',
    tcls: 't-strong',
    segs: [seg(WEB, 'web', 'svg-berg'), seg(APP, 'app', 'svg-box-key'), seg(NONE, '', 'pl-ui')],
    note: `${fmt(WEB + APP + NONE)}: 전체와 같다`,
    ncls: 't-good',
  },
];

const lastNoteY = rowY(ROWS.length - 1) + 14 + 12 + BAR_H + 22; // 마지막 설명 baseline
const VB_H = Math.ceil(lastNoteY + 4 + 8); // 글자 아래 4 + 여백 8

export default function SegmentCheck() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label={`가정한 결제 매출 ${fmt(TOTAL)}원을 채널별로 나눈 합. 채널 없음 ${fmt(NONE)}원을 WHERE 로 거르면 합이 ${fmt(WEB + APP)}원이 되어 전체와 어긋난다. 채널 없음 조각을 남기면 ${fmt(TOTAL)}원으로 같다.`}>
      {ROWS.map((r, i) => {
        const y = rowY(i);
        const barY = y + 14 + 12;
        let x = X0;
        return (
          <g key={r.title}>
            <text className={r.tcls} x={X0} y={y + 14}>{r.title}</text>
            {r.segs.map((s, k) => {
              const sx = x;
              x += s.w;
              return (
                <g key={k}>
                  <rect className={s.cls} x={sx} y={barY} width={s.w} height={BAR_H} />
                  {s.label && <text className="t-strong" x={sx + s.w / 2} y={barY + BAR_H / 2 + 5} textAnchor="middle">{s.label}</text>}
                </g>
              );
            })}
            {r.gap && <rect className="svg-box-bad" x={x} y={barY} width={r.gap} height={BAR_H} />}
            <text className={r.ncls} x={X0} y={barY + BAR_H + 22}>{r.note}</text>
          </g>
        );
      })}
    </svg>
  );
}
