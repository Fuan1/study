/** 5칸 하단 바에서 핵심 목적지를 양 끝에 두는 배치. 가정한 구성이며 클릭률 데이터가 아니다. */
const N = 5;
const CW = 62;
const X0 = 25;
const ROLE = ['핵심 1', '보조', '보조', '보조', '핵심 2'];

export default function SerialPosition() {
  return (
    <svg viewBox="0 0 360 150" role="img" aria-label="다섯 칸 하단 바. 맨 앞 칸과 맨 끝 칸에 핵심 목적지를 두고 가운데 세 칸에 보조 항목을 둔다. 클릭률 근거가 없는 경험칙이다.">
      <text className="t-strong" x="8" y="18">5칸 하단 바(가정한 구성)</text>
      {ROLE.map((r, i) => {
        const key = i === 0 || i === N - 1;
        const x = X0 + i * (CW + 2);
        return (
          <g key={i}>
            <rect className={key ? 'svg-box-key' : 'svg-box'} x={x} y="30" width={CW} height="58" rx="8" />
            <text x={x + CW / 2} y="56" textAnchor="middle" fontSize="13" className={key ? 't-accent' : 't-sub'}>{r}</text>
            <text x={x + CW / 2} y="76" textAnchor="middle" fontSize="13" className="t-sub">{i + 1}번 칸</text>
          </g>
        );
      })}
      <text className="t-sub" x="8" y="118">양 끝에 핵심, 가운데에 보조.</text>
      <text className="t-sub" x="8" y="138">경험칙이며 클릭률 근거는 없다.</text>
    </svg>
  );
}
