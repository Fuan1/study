/** Segment 문서의 보정 식: timestamp = receivedAt - (sentAt - originalTimestamp). 시각 값은 가상 예시이고, 보정 결과는 식에서 계산한다. */
const toSec = (hms: string) => {
  const [h, m, s] = hms.split(':').map(Number);
  return h * 3600 + m * 60 + s;
};
const fmt = (t: number) => {
  const h = Math.floor(t / 3600);
  const m = Math.floor((t % 3600) / 60);
  const s = t % 60;
  return [h, m, s].map((n) => String(n).padStart(2, '0')).join(':');
};

const ORIGINAL = '10:00:00'; // 기기 시계로 본 발생 시각(가상)
const SENT = '10:00:30'; // 기기 시계로 본 전송 시각(가상)
const RECEIVED = '09:59:10'; // 서버 시계로 본 수신 시각(가상)

const wait = toSec(SENT) - toSec(ORIGINAL); // 기기 시계로 잰 대기 시간(초)
const corrected = fmt(toSec(RECEIVED) - wait);

const PX = 3; // 1초당 3px
const XA = 150; // 발생 / 보정 발생
const XB = XA + wait * PX; // 전송 / 수신
const AXIS_X1 = 84;
const AXIS_A = 62;
const AXIS_B = 222;

function Dot({ x, y, label, time, strong }: { x: number; y: number; label: string; time: string; strong?: boolean }) {
  return (
    <g textAnchor="middle">
      <circle cx={x} cy={y} r="6" fill={strong ? 'var(--accent)' : 'var(--bg)'} stroke={strong ? 'var(--accent)' : 'var(--muted)'} strokeWidth="1.5" />
      <text className="t-sub" x={x} y={y + 28}>{label}</text>
      <text className={strong ? 't-accent' : 't-sub'} x={x} y={y + 48}>{time}</text>
    </g>
  );
}

export default function TimestampSkew() {
  const vbH = AXIS_B + 48 + 8 + 4; // 마지막 글자 baseline 아래 여백
  return (
    <svg viewBox={`0 0 360 ${vbH}`} role="img" aria-label={`기기 시계로 ${ORIGINAL}에 발생해 ${SENT}에 전송된 이벤트가 서버 시계로 ${RECEIVED}에 도착하면, 대기 시간 ${wait}초를 빼서 서버 시계 기준 발생 시각 ${corrected}으로 보정한다.`}>
      <text className="t-strong" x="8" y={AXIS_A + 5}>기기 시계</text>
      <line x1={AXIS_X1} y1={AXIS_A} x2="352" y2={AXIS_A} stroke="var(--line)" strokeWidth="1.5" />
      <text className="t-sub" x={(XA + XB) / 2} y="28" textAnchor="middle">대기 {wait}초</text>
      <line x1={XA} y1="38" x2={XB} y2="38" stroke="var(--muted)" />
      <line x1={XA} y1="33" x2={XA} y2="43" stroke="var(--muted)" />
      <line x1={XB} y1="33" x2={XB} y2="43" stroke="var(--muted)" />
      <Dot x={XA} y={AXIS_A} label="발생" time={ORIGINAL} />
      <Dot x={XB} y={AXIS_A} label="전송" time={SENT} />
      <line x1={XA} y1={AXIS_A + 62} x2={XA} y2={AXIS_B - 10} stroke="var(--line)" strokeDasharray="4 3" />
      <line x1={XB} y1={AXIS_A + 62} x2={XB} y2={AXIS_B - 10} stroke="var(--line)" strokeDasharray="4 3" />
      <text className="t-strong" x="8" y={AXIS_B + 5}>서버 시계</text>
      <line x1={AXIS_X1} y1={AXIS_B} x2="352" y2={AXIS_B} stroke="var(--line)" strokeWidth="1.5" />
      <Dot x={XA} y={AXIS_B} label="보정 발생" time={corrected} strong />
      <Dot x={XB} y={AXIS_B} label="수신" time={RECEIVED} />
    </svg>
  );
}
