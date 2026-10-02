/** 할인율은 기준 가격이 무엇이냐로 달라진다. 숫자는 가정이고 비율은 코드로 계산한다. */
const LIST = 59000; // 표시한 정상가(최근 20일 넘게 판 적 없음, 가정)
const PREV = 49000; // 직전에 실제로 판 가격(가정)
const SALE = 39000; // 판매가(가정)
const rate = (base: number) => ((base - SALE) / base) * 100;

type Row = { label: string; value: number; cls: string };
const ROWS: Row[] = [
  { label: '표시한 정상가 (20일 넘게 판 적 없음)', value: LIST, cls: 'svg-box-bad' },
  { label: '직전에 실제로 판 가격', value: PREV, cls: 'svg-box' },
  { label: '판매가', value: SALE, cls: 'svg-berg' },
];

const BAR_MAX = 240; // 최대값 막대 폭
const BAR_H = 24;
const PITCH = 72; // 행 간격(라벨 + 막대 + 여백)
const TOP = 8;
const barY = (i: number) => TOP + i * PITCH + 28;
const lastBar = barY(ROWS.length - 1) + BAR_H;
const BOX_Y = lastBar + 24; // 막대 묶음과 결과 묶음 사이 24
const BOX_H = 66;
const BOX_W = 160;
const STROKE = 2;
const VB_H = Math.ceil(BOX_Y + BOX_H + STROKE / 2 + 8);

const fmt = (n: number) => n.toLocaleString('ko-KR');

export default function DiscountBars() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label={`할인율 기준 가격 비교. 정상가 ${fmt(LIST)}원을 기준으로 하면 할인율이 ${rate(LIST).toFixed(1)}퍼센트, 직전에 실제로 판 가격 ${fmt(PREV)}원을 기준으로 하면 ${rate(PREV).toFixed(1)}퍼센트다. 판매가는 ${fmt(SALE)}원이다.`}>
      {ROWS.map((r, i) => {
        const w = (r.value / LIST) * BAR_MAX;
        return (
          <g key={r.label}>
            <text className="t-sub" x="8" y={TOP + i * PITCH + 14}>{r.label}</text>
            <rect className={r.cls} x="8" y={barY(i)} width={w} height={BAR_H} rx="6" />
            <text className="t-strong" x={8 + w + 8} y={barY(i) + 17}>{fmt(r.value)}원</text>
          </g>
        );
      })}
      <rect className="svg-box-bad" x="8" y={BOX_Y} width={BOX_W} height={BOX_H} rx="8" />
      <text className="t-sub" x="20" y={BOX_Y + 27}>정상가 기준</text>
      <text className="t-bad" x="20" y={BOX_Y + 49}>{rate(LIST).toFixed(1)}% (부풀림)</text>
      <rect className="svg-box-good" x={360 - 8 - BOX_W} y={BOX_Y} width={BOX_W} height={BOX_H} rx="8" />
      <text className="t-sub" x={360 - 8 - BOX_W + 12} y={BOX_Y + 27}>직전 판매가 기준</text>
      <text className="t-good" x={360 - 8 - BOX_W + 12} y={BOX_Y + 49}>{rate(PREV).toFixed(1)}%</text>
    </svg>
  );
}
