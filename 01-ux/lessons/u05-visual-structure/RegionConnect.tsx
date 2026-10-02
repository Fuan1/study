/** 공통 영역(테두리)과 균일 연결(선)의 Before / After. 가정한 예시이며 특정 서비스 화면이 아니다. */
const MENU = ['홈', '검색', '설정', '도움'];
const PITCH = 40;

function Menu({ x, boxed }: { x: number; boxed: boolean }) {
  return (
    <g>
      {boxed && [0, 2].map((i) => (
        <rect key={i} className="svg-box-key" x={x + 2 + i * PITCH} y="62" width={PITCH * 2 - 4} height="30" rx="8" />
      ))}
      {MENU.map((t, i) => (
        <text key={t} x={x + 20 + i * PITCH} y="82" textAnchor="middle">{t}</text>
      ))}
    </g>
  );
}

function Dots({ x, linked }: { x: number; linked: boolean }) {
  const cx = [x + 22, x + 82, x + 142];
  return (
    <g>
      {linked && <line x1={cx[0] + 14} y1="182" x2={cx[1] - 14} y2="182" stroke="var(--accent)" strokeWidth="3" />}
      {['A', 'B', 'C'].map((t, i) => (
        <g key={t}>
          <circle className="svg-box-key" cx={cx[i]} cy="182" r="14" />
          <text x={cx[i]} y="187" textAnchor="middle">{t}</text>
        </g>
      ))}
    </g>
  );
}

export default function RegionConnect() {
  return (
    <svg viewBox="0 0 360 236" role="img" aria-label="위쪽은 같은 간격의 메뉴 넷도 테두리를 두르면 둘씩 묶인다. 아래쪽은 세 원 중 선으로 이은 두 원이 하나로 읽힌다.">
      <text className="t-strong" x="8" y="20">Before</text>
      <text className="t-strong" x="188" y="20">After</text>
      <text className="t-accent" x="8" y="44">테두리: 같은 상자 안은 한 묶음</text>
      <Menu x={8} boxed={false} />
      <Menu x={188} boxed />
      <text className="t-bad" x="8" y="116">간격이 같아 묶임이 없다</text>
      <text className="t-good" x="188" y="116">같은 상자는 같은 묶음</text>
      <line x1="8" y1="130" x2="352" y2="130" stroke="var(--line)" />
      <text className="t-accent" x="8" y="152">선: 이어진 것이 한 덩어리</text>
      <Dots x={8} linked={false} />
      <Dots x={188} linked />
      <text className="t-bad" x="8" y="222">셋이 따로 읽힌다</text>
      <text className="t-good" x="188" y="222">A와 B가 하나로 읽힌다</text>
    </svg>
  );
}
