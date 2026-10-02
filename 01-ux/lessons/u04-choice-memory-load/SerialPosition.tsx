/** 5칸 하단 바에서 핵심 목적지를 양 끝에 두는 배치. 가정한 구성이며 클릭률 데이터가 아니다. */
const N = 5;
const CW = 63;
const GAP = 6;
const X0 = 10;
const CY = 46; // 칸 y (제목 글자 아래 24px)
const CH = 68; // 칸 높이: 두 줄 글자 위아래 15px
const ROLE = ['핵심 1', '보조', '보조', '보조', '핵심 2'];

export default function SerialPosition() {
  return (
    <svg viewBox="0 0 360 126" role="img" aria-label="다섯 칸 하단 바. 맨 앞 칸과 맨 끝 칸에 핵심 목적지를 두고 가운데 세 칸에 보조 항목을 둔다. 클릭률 근거가 없는 경험칙이다.">
      <text className="t-strong" x="8" y="18">5칸 하단 바(가정한 구성)</text>
      {ROLE.map((r, i) => {
        const key = i === 0 || i === N - 1;
        const x = X0 + i * (CW + GAP);
        return (
          <g key={i}>
            <rect className={key ? 'svg-box-key' : 'svg-box'} x={x} y={CY} width={CW} height={CH} rx="8" />
            <text x={x + CW / 2} y={CY + 27} textAnchor="middle" fontSize="13" className={key ? 't-accent' : 't-sub'}>{r}</text>
            <text x={x + CW / 2} y={CY + 49} textAnchor="middle" fontSize="13" className="t-sub">{i + 1}번 칸</text>
          </g>
        );
      })}
    </svg>
  );
}
