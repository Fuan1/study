/** 광고성 정보 전송: 오후 9시부터 다음 날 오전 8시까지는 별도 사전 동의가 필요하다(이메일 제외). */
const NIGHT_START = 21; // 오후 9시
const NIGHT_END = 8; // 오전 8시
const NIGHT_H = 24 - NIGHT_START + NIGHT_END; // 11시간
const DAY_H = 24 - NIGHT_H; // 13시간

const L = 8;
const R = 352;
const PER = (R - L) / 24; // 1시간 폭
const x = (h: number) => L + h * PER;

const TITLE_Y = 20;
const BAR_Y = 36;
const BAR_H = 48;
const TICK_Y = BAR_Y + BAR_H + 20;
const BOX_Y = TICK_Y + 24;
const BOX_H = 66;
const BOX_W = 160;
const STROKE = 2;
const VB_H = Math.ceil(BOX_Y + BOX_H + STROKE / 2 + 8);

export default function NightWindow() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label={`하루 24시간 중 오후 9시부터 다음 날 오전 8시까지 ${NIGHT_H}시간은 별도 사전 동의가 필요하고, 나머지 ${DAY_H}시간은 일반 사전 동의로 발송할 수 있다. 이메일은 야간 제한에서 제외된다.`}>
      <text className="t-sub" x={L} y={TITLE_Y}>하루 24시간</text>
      <rect className="svg-tip" x={x(0)} y={BAR_Y} width={x(NIGHT_END) - x(0)} height={BAR_H} rx="4" />
      <rect className="svg-berg" x={x(NIGHT_END)} y={BAR_Y} width={x(NIGHT_START) - x(NIGHT_END)} height={BAR_H} rx="4" />
      <rect className="svg-tip" x={x(NIGHT_START)} y={BAR_Y} width={x(24) - x(NIGHT_START)} height={BAR_H} rx="4" />
      <text className="t-strong" x={(x(0) + x(NIGHT_END)) / 2} y={BAR_Y + 29} textAnchor="middle">야간</text>
      <text className="t-strong" x={(x(NIGHT_END) + x(NIGHT_START)) / 2} y={BAR_Y + 29} textAnchor="middle">주간</text>
      <text className="t-sub" x={L} y={TICK_Y}>0시</text>
      <text className="t-sub" x={x(NIGHT_END)} y={TICK_Y} textAnchor="middle">{NIGHT_END}시</text>
      <text className="t-sub" x={x(NIGHT_START)} y={TICK_Y} textAnchor="middle">{NIGHT_START}시</text>
      <rect className="svg-tip" x={L} y={BOX_Y} width={BOX_W} height={BOX_H} rx="8" />
      <text className="t-strong" x={L + 12} y={BOX_Y + 27}>야간 {NIGHT_H}시간</text>
      <text className="t-sub" x={L + 12} y={BOX_Y + 49}>별도 동의 (이메일 제외)</text>
      <rect className="svg-berg" x={360 - 8 - BOX_W} y={BOX_Y} width={BOX_W} height={BOX_H} rx="8" />
      <text className="t-strong" x={360 - 8 - BOX_W + 12} y={BOX_Y + 27}>주간 {DAY_H}시간</text>
      <text className="t-sub" x={360 - 8 - BOX_W + 12} y={BOX_Y + 49}>일반 사전 동의로 발송</text>
    </svg>
  );
}
