/** 기억되기 쉬운 정도의 U자 모양을 개념적으로 그린 것이다(실측값 아님). 곡선 높이는 단순한 감쇠식으로 만든다. */
const N = 5;
const CW = 62;
const X0 = 25;
const slots = Array.from({ length: N }, (_, i) => i);
// 앞쪽은 빠르게 줄고(primacy), 뒤쪽은 올라가는(recency) 모양.
const level = (i: number) => 0.28 + 0.62 * Math.exp(-i / 0.9) + 0.58 * Math.exp(-(N - 1 - i) / 0.9);

export default function SerialPosition() {
  const base = 132;
  const H = 78;
  const cx = (i: number) => X0 + i * (CW + 2) + CW / 2;
  const pts = slots.map((i) => `${cx(i).toFixed(1)},${(base - level(i) * H).toFixed(1)}`).join(' ');
  const role = ['핵심 1', '보조', '보조', '보조', '핵심 2'];
  return (
    <svg viewBox="0 0 360 246" role="img" aria-label="다섯 칸 중 맨 앞과 맨 끝 칸의 기억되기 쉬운 정도가 높고 가운데가 낮은 U자 개념도. 아래에 다섯 칸 하단 바가 있고 양 끝에 핵심 항목, 가운데에 보조 항목을 두는 배치를 보인다.">
      <text className="t-sub" x="8" y="14">기억되기 쉬운 정도(개념도)</text>
      <line x1="16" y1={base} x2="344" y2={base} stroke="var(--line)" strokeWidth="1.5" />
      <polyline points={pts} fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeDasharray="5 4" />
      {slots.map((i) => (
        <circle key={i} cx={cx(i)} cy={base - level(i) * H} r="5" fill={i === 0 || i === N - 1 ? 'var(--warm)' : 'var(--accent)'} />
      ))}
      <text className="t-warm" x={cx(0)} y={base - level(0) * H - 12} textAnchor="middle">처음</text>
      <text className="t-warm" x={cx(N - 1)} y={base - level(N - 1) * H - 12} textAnchor="middle">끝</text>
      {slots.map((i) => {
        const key = i === 0 || i === N - 1;
        return (
          <g key={i}>
            <rect className={key ? 'svg-box-key' : 'svg-box'} x={X0 + i * (CW + 2)} y="140" width={CW} height="56" rx="8" />
            <text x={cx(i)} y="164" textAnchor="middle" fontSize="13" className={key ? 't-accent' : 't-sub'}>{role[i]}</text>
            <text x={cx(i)} y="184" textAnchor="middle" fontSize="13" className="t-sub">{i + 1}번 칸</text>
          </g>
        );
      })}
      <text className="t-sub" x="8" y="222">가정한 하단 바 5칸. 칸 이름은 비워 둔 예시다.</text>
      <text className="t-sub" x="8" y="240">탭 클릭률 데이터가 아니다.</text>
    </svg>
  );
}
