/** 현지 시각 + 시차 표기로 UTC 를 계산한다(UTC = 현지 시각 - 시차, RFC 3339). 날짜와 시각은 가정한 예시다. */
const OFFSET_H = -4;
const LOCAL = { y: 2025, mo: 2, d: 14, h: 23, mi: 30 }; // 3월 14일 23:30, UTC-4
const HOUR = 3600_000;

const event = Date.UTC(LOCAL.y, LOCAL.mo, LOCAL.d, LOCAL.h - OFFSET_H, LOCAL.mi);
const start = Date.UTC(LOCAL.y, LOCAL.mo, LOCAL.d, 18, 0); // 눈금 시작: UTC 14일 18시
const SPAN = 12; // 시간
const hrs = (ms: number) => (ms - start) / HOUR;
const utcMidnight = hrs(Date.UTC(LOCAL.y, LOCAL.mo, LOCAL.d + 1, 0, 0));
const localMidnight = hrs(Date.UTC(LOCAL.y, LOCAL.mo, LOCAL.d + 1, 0 - OFFSET_H, 0));
const tEvent = hrs(event);

const X0 = 16;
const X1 = 344;
const x = (t: number) => X0 + (t / SPAN) * (X1 - X0);
const pad2 = (v: number) => String(v).padStart(2, '0');
const ev = new Date(event);
const utcLabel = `${pad2(ev.getUTCHours())}:${pad2(ev.getUTCMinutes())}`;
const localLabel = `${pad2(LOCAL.h)}:${pad2(LOCAL.mi)}`;

const ROW1 = 68;
const ROW2 = 148;
const BH = 44;
const AXIS_TXT = ROW2 + BH + 22;
const VH = AXIS_TXT + 4 + 8;

function Bands({ y, cut, a, b }: { y: number; cut: number; a: string; b: string }) {
  return (
    <g>
      <rect className="svg-box" x={X0} y={y} width={x(cut) - X0} height={BH} rx="6" />
      <rect className="svg-berg" x={x(cut)} y={y} width={X1 - x(cut)} height={BH} rx="6" />
      <text className="t-strong" x={X0 + 12} y={y + 27}>{a}</text>
      <text className="t-strong" x={x(cut) + 12} y={y + 27}>{b}</text>
    </g>
  );
}

export default function TimeShift() {
  return (
    <svg viewBox={`0 0 360 ${VH}`} role="img" aria-label={`같은 순간이 현지 시각 ${localLabel}(UTC${OFFSET_H})로는 14일이고 UTC ${utcLabel}로는 15일이다. 날짜 경계가 달라 일별 합계에서 다른 날로 들어간다.`}>
      <text className="t-strong" x="352" y="22" textAnchor="end">{`같은 순간: 현지 ${localLabel} = UTC ${utcLabel}`}</text>
      <text className="t-sub" x={X0} y={ROW1 - 10}>현지 날짜 기준(UTC-4)</text>
      <Bands y={ROW1} cut={localMidnight} a="14일" b="15일" />
      <text className="t-sub" x={X0} y={ROW2 - 10}>UTC 날짜 기준</text>
      <Bands y={ROW2} cut={utcMidnight} a="14일" b="15일" />
      <line x1={x(tEvent)} y1="42" x2={x(tEvent)} y2={ROW2 + BH} stroke="var(--warm)" strokeWidth="2" />
      <circle cx={x(tEvent)} cy="38" r="4" fill="var(--warm)" />
      <text className="t-sub" x={X0} y={AXIS_TXT}>UTC 14일 18시</text>
      <text className="t-sub" x={x(utcMidnight)} y={AXIS_TXT} textAnchor="middle">15일 0시</text>
      <text className="t-sub" x={X1} y={AXIS_TXT} textAnchor="end">15일 6시</text>
    </svg>
  );
}
