/** 공통 영역, 균일 연결, 프래그난츠의 Before / After. 가정한 예시이며 특정 서비스 화면이 아니다. */
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

function Icon({ x, simple }: { x: number; simple: boolean }) {
  const s = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const };
  return (
    <g transform={`translate(${x + 42} 290)`}>
      <polygon points="40,0 80,32 0,32" {...s} />
      <rect x="10" y="32" width="60" height="38" {...s} />
      {!simple && (
        <g {...s}>
          <rect x="52" y="6" width="9" height="16" />
          <path d="M56 2 C52 -6 62 -8 58 -16" />
          <path d="M40 8 L40 28 M30 18 L50 18" />
          <rect x="18" y="42" width="14" height="12" />
          <path d="M25 42 L25 54 M18 48 L32 48" />
          <rect x="44" y="44" width="16" height="26" />
          <circle cx="56" cy="58" r="1.6" />
          <path d="M4 70 C14 64 22 76 32 70 C42 64 50 76 60 70 C66 66 70 70 76 70" />
        </g>
      )}
    </g>
  );
}

export default function RegionConnectPragnanz() {
  return (
    <svg viewBox="0 0 360 396" role="img" aria-label="공통 영역은 같은 간격의 메뉴 넷도 테두리를 두르면 둘씩 묶인다. 균일 연결은 세 원 중 선으로 이은 두 원이 하나로 읽힌다. 프래그난츠는 장식이 많은 집 모양 아이콘보다 핵심 형태만 남긴 아이콘이 쉽게 읽힌다.">
      <text className="t-strong" x="8" y="20">Before</text>
      <text className="t-strong" x="188" y="20">After</text>
      <text className="t-accent" x="8" y="44">공통 영역: 테두리로 묶는다</text>
      <Menu x={8} boxed={false} />
      <Menu x={188} boxed />
      <text className="t-bad" x="8" y="116">간격이 같아 묶임이 없다</text>
      <text className="t-good" x="188" y="116">같은 영역은 같은 묶음</text>
      <line x1="8" y1="130" x2="352" y2="130" stroke="var(--line)" />
      <text className="t-accent" x="8" y="152">균일 연결: 선으로 이은 것이 한 덩어리</text>
      <Dots x={8} linked={false} />
      <Dots x={188} linked />
      <text className="t-bad" x="8" y="222">셋이 따로 읽힌다</text>
      <text className="t-good" x="188" y="222">A와 B가 하나로 읽힌다</text>
      <line x1="8" y1="236" x2="352" y2="236" stroke="var(--line)" />
      <text className="t-accent" x="8" y="258">프래그난츠: 가장 단순한 형태로 읽는다</text>
      <Icon x={8} simple={false} />
      <Icon x={188} simple />
      <text className="t-bad" x="8" y="384">장식이 많아 형태가 흐려진다</text>
      <text className="t-good" x="188" y="384">핵심 형태만 남긴다</text>
    </svg>
  );
}
