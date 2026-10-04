/**
 * 형태 예시(가상 값). 섀도잉은 소리와 거의 동시에 따라 말하고,
 * 듣고 따라 말하기(listen and repeat)는 소리가 멈춘 뒤에 말한다.
 */
const BH = 36;

export default function ShadowTiming() {
  // 섀도잉: 소리 3개, 내 말이 조금 늦게 겹친다
  const sA = [24, 128, 232];
  // 듣고 따라 말하기: 소리 2개, 멈춘 사이에 내 말
  const sB = [24, 168];
  const mB = [96, 240];
  const yA = 34;
  const yB = 164;
  const VB_H = yB + 2 * BH + 12 + 24 + 12;
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="섀도잉과 듣고 따라 말하기의 차이. 섀도잉은 소리가 나오는 동안 거의 동시에 따라 말하고, 듣고 따라 말하기는 소리가 멈춘 뒤에 말한다.">
      <text className="t-strong" x="8" y="22">섀도잉: 소리와 거의 동시에</text>
      {sA.map((x, i) => (
        <g key={x}>
          <rect className="svg-berg" x={x} y={yA} width="100" height={BH} rx="4" />
          <text className="t-strong" x={x + 50} y={yA + 23} textAnchor="middle">소리 {i + 1}</text>
          <rect className="svg-box" x={x + 14} y={yA + BH + 12} width="100" height={BH} rx="4" />
          <text className="t-sub" x={x + 64} y={yA + BH + 12 + 23} textAnchor="middle">내 말 {i + 1}</text>
        </g>
      ))}
      <text className="t-strong" x="8" y={yB - 12}>듣고 따라 말하기: 멈춘 뒤에</text>
      {sB.map((x, i) => (
        <g key={x}>
          <rect className="svg-berg" x={x} y={yB} width="66" height={BH} rx="4" />
          <text className="t-strong" x={x + 33} y={yB + 23} textAnchor="middle">소리 {i + 1}</text>
          <rect className="svg-box" x={mB[i]} y={yB + BH + 12} width="66" height={BH} rx="4" />
          <text className="t-sub" x={mB[i] + 33} y={yB + BH + 12 + 23} textAnchor="middle">내 말 {i + 1}</text>
        </g>
      ))}
      <text className="t-sub" x="352" y={yB + 2 * BH + 12 + 24} textAnchor="end">시간 →</text>
    </svg>
  );
}
