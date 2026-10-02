/** 조작 배치: 주요 버튼은 크게, 위험 버튼은 떨어뜨린다. 가정한 예시이며 특정 서비스 화면이 아니다. */
const PANEL_Y = 44;
const PANEL_H = 168;

function Before({ x }: { x: number }) {
  const y = PANEL_Y + 62; // 버튼 높이 44, 위아래 62
  return (
    <g>
      <rect className="svg-box" x={x} y={PANEL_Y} width="164" height={PANEL_H} rx="8" />
      <rect className="svg-box" x={x + 12} y={y} width="68" height="44" rx="6" />
      <text x={x + 46} y={y + 27} textAnchor="middle" fontSize="13">삭제</text>
      <rect className="svg-box" x={x + 84} y={y} width="68" height="44" rx="6" />
      <text x={x + 118} y={y + 27} textAnchor="middle" fontSize="13">저장</text>
    </g>
  );
}

function After({ x }: { x: number }) {
  const ys = PANEL_Y + 16; // 저장: 높이 56
  const yd = ys + 56 + 36; // 삭제: 높이 44, 저장과 36 떨어뜨림
  return (
    <g>
      <rect className="svg-box" x={x} y={PANEL_Y} width="164" height={PANEL_H} rx="8" />
      <rect x={x + 12} y={ys} width="140" height="56" rx="8" fill="var(--accent)" />
      <text x={x + 82} y={ys + 33} textAnchor="middle" fontSize="14" fontWeight="700" style={{ fill: 'var(--bg)' }}>저장</text>
      <rect className="svg-box-bad" x={x + 12} y={yd} width="140" height="44" rx="8" />
      <text className="t-bad" x={x + 82} y={yd + 27} textAnchor="middle" fontSize="13">삭제</text>
    </g>
  );
}

export default function ButtonPlacement() {
  return (
    <svg viewBox="0 0 360 276" role="img" aria-label="왼쪽은 삭제와 저장이 같은 크기와 모양으로 바로 붙어 있어 삭제를 잘못 누르기 쉽다. 오른쪽은 저장을 크게 채워 위에 두고, 삭제는 아래로 떨어뜨려 모양을 다르게 했다.">
      <text className="t-strong" x="8" y="22">Before</text>
      <text className="t-strong" x="188" y="22">After</text>
      <Before x={8} />
      <After x={188} />
      <text className="t-bad" x="8" y="248">같은 크기로 붙어 있다</text>
      <text className="t-bad" x="8" y="268">삭제를 잘못 누른다</text>
      <text className="t-good" x="188" y="248">저장은 크게</text>
      <text className="t-good" x="188" y="268">삭제는 떨어뜨린다</text>
    </svg>
  );
}
