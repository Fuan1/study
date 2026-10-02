/** 중복 귀속의 형태 예시(가상 값). 주문 1건에 세 도구의 접점이 있고, 각 도구가 자기 전환 창 안이라 주문을 통째로 센다. */
const TOUCHES = [
  { name: '광고 플랫폼 A', sub: '12일 전 클릭', x: 40 },
  { name: '광고 플랫폼 B', sub: '5일 전 클릭', x: 150 },
  { name: '이메일 도구', sub: '1일 전 클릭', x: 250 },
];
const BUY_X = 316;
const ROW0 = 36;
const PITCH = 60;
const STROKE = 1.5;
const BOX_Y = ROW0 + TOUCHES.length * PITCH + 4;
const BOX_H = 66;
const VB_H = Math.ceil(BOX_Y + BOX_H + STROKE / 2 + 8);
const claimed = TOUCHES.length;
const actual = 1;

export default function DoubleCount() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label={`주문은 1건인데 접점이 있던 도구 ${claimed}곳이 각자 이 주문을 자기 전환으로 센다. 보고 합은 ${claimed}건, 실제 주문은 ${actual}건이고 초과 ${claimed - actual}건이 중복 귀속이다.`}>
      <text className="t-strong" x={BUY_X} y="18" textAnchor="middle">구매</text>
      <line x1={BUY_X} y1="26" x2={BUY_X} y2={BOX_Y - 12} stroke="var(--line)" strokeWidth="1.5" strokeDasharray="4 3" />
      {TOUCHES.map((t, i) => {
        const y0 = ROW0 + i * PITCH;
        return (
          <g key={t.name}>
            <text className="t-sub" x="8" y={y0 + 14}>{t.name}: {t.sub}</text>
            <line x1={t.x} y1={y0 + 36} x2={BUY_X} y2={y0 + 36} stroke="var(--accent)" strokeWidth="3" />
            <circle cx={t.x} cy={y0 + 36} r="6" fill="var(--accent)" />
            <text className="t-bad" x={BUY_X + 10} y={y0 + 41}>+1</text>
          </g>
        );
      })}
      <rect className="svg-box-bad" x="8" y={BOX_Y} width="344" height={BOX_H} rx="8" />
      <text className="t-strong" x="22" y={BOX_Y + 29}>플랫폼 보고 합 {claimed}건, 실제 주문 {actual}건</text>
      <text className="t-bad" x="22" y={BOX_Y + 50}>초과 {claimed - actual}건이 중복 귀속</text>
    </svg>
  );
}
