/** 공통 영역(테두리)과 균일 연결(선)의 Before / After. 가정한 예시이며 특정 서비스 화면이 아니다. */
const MENU = ['홈', '검색', '설정', '도움'];
const MENU_X = [39, 133, 227, 321]; // 같은 간격(94)
const BOXES = [8, 196]; // 상자 x(폭 156, 글자 좌우 여백 18 이상)

function Menu({ y, boxed }: { y: number; boxed: boolean }) {
  return (
    <g>
      {boxed && BOXES.map((bx) => (
        <rect key={bx} className="svg-box-key" x={bx} y={y} width="156" height="40" rx="8" />
      ))}
      {MENU.map((t, i) => (
        <text key={t} x={MENU_X[i]} y={y + 25} textAnchor="middle" fontSize="13">{t}</text>
      ))}
    </g>
  );
}

const CX = [60, 180, 300];

function Dots({ cy, linked }: { cy: number; linked: boolean }) {
  return (
    <g>
      {linked && <line x1={CX[0] + 20} y1={cy} x2={CX[1] - 20} y2={cy} stroke="var(--accent)" strokeWidth="3" />}
      {['A', 'B', 'C'].map((t, i) => (
        <g key={t}>
          <circle className="svg-box-key" cx={CX[i]} cy={cy} r="20" />
          <text x={CX[i]} y={cy + 5} textAnchor="middle" fontSize="13">{t}</text>
        </g>
      ))}
    </g>
  );
}

export default function RegionConnect() {
  return (
    <svg viewBox="0 0 360 462" role="img" aria-label="위쪽은 같은 간격의 메뉴 넷도 테두리를 두르면 둘씩 묶인다. 아래쪽은 세 원 중 선으로 이은 두 원이 하나로 읽힌다.">
      <text className="t-accent" x="8" y="20">테두리: 같은 상자 안은 한 묶음</text>
      <text className="t-strong" x="8" y="56">Before</text>
      <text className="t-bad" x="72" y="56">간격이 같아 묶임이 없다</text>
      <Menu y={72} boxed={false} />
      <text className="t-strong" x="8" y="155">After</text>
      <text className="t-good" x="72" y="155">같은 상자는 같은 묶음</text>
      <Menu y={171} boxed />
      <line x1="8" y1="235" x2="352" y2="235" stroke="var(--line)" />
      <text className="t-accent" x="8" y="263">선: 이어진 것이 한 덩어리</text>
      <text className="t-strong" x="8" y="300">Before</text>
      <text className="t-bad" x="72" y="300">셋이 따로 읽힌다</text>
      <Dots cy={336} linked={false} />
      <text className="t-strong" x="8" y="398">After</text>
      <text className="t-good" x="72" y="398">A와 B가 하나로 읽힌다</text>
      <Dots cy={434} linked />
    </svg>
  );
}
