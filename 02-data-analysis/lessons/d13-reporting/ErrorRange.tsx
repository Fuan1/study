// 출처 값: Dmitriev 외(2017)의 MSN.com 실험 사례. 변화 0.5퍼센트, 구간 약 ±5퍼센트, 80퍼센트 검정력으로 잡히는 최소 변화 7.8퍼센트.
const CHANGE = 0.5;
const HALF = 5; // "약" ±5
const MIN_DETECT = 7.8;

const X0 = 24;
const X1 = 336;
const LO = -10;
const HI = 10;
const x = (v: number) => X0 + ((v - LO) / (HI - LO)) * (X1 - X0);

const AXIS_Y = 112;

export default function ErrorRange() {
  return (
    <svg viewBox="0 0 360 232" role="img" aria-label="페이지뷰 변화를 수직선 위에 그린 그림. 관측 변화는 0.5퍼센트이고 구간은 약 마이너스 4.5에서 플러스 5.5퍼센트로 0을 가로지른다. 이 실험이 잡을 수 있는 최소 변화는 7.8퍼센트다.">
      <text className="t-strong" x={x(CHANGE)} y="40" textAnchor="middle">관측 변화 +0.5%</text>
      <rect className="svg-berg" x={x(CHANGE - HALF)} y="56" width={x(CHANGE + HALF) - x(CHANGE - HALF)} height="16" rx="3" />
      <circle cx={x(CHANGE)} cy="64" r="5" fill="var(--strong)" />
      <line x1={x(0)} y1="48" x2={x(0)} y2={AXIS_Y} stroke="var(--muted)" strokeDasharray="4 3" />
      <line x1={x(MIN_DETECT)} y1="48" x2={x(MIN_DETECT)} y2={AXIS_Y} stroke="var(--warm)" strokeWidth="1.5" strokeDasharray="4 3" />
      <line x1={X0} y1={AXIS_Y} x2={X1} y2={AXIS_Y} stroke="var(--line)" />
      {[-10, 0, 10].map((v) => (
        <text key={v} className="t-sub" x={x(v)} y={AXIS_Y + 22} textAnchor="middle">{v > 0 ? `+${v}%` : `${v}%`}</text>
      ))}
      <circle cx="26" cy="158" r="5" fill="var(--strong)" />
      <text className="t-sub" x="42" y="162">점: 관측한 변화 +0.5%</text>
      <rect className="svg-berg" x="21" y="178" width="10" height="16" rx="3" />
      <text className="t-sub" x="42" y="191">띠: 구간, 약 -4.5%에서 +5.5%</text>
      <line x1="21" y1="212" x2="31" y2="212" stroke="var(--warm)" strokeWidth="1.5" strokeDasharray="4 3" />
      <text className="t-sub" x="42" y="216">점선: 잡을 수 있는 최소 변화 7.8%</text>
    </svg>
  );
}
