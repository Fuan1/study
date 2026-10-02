/** 조작 배치: 주요 버튼은 크게, 위험 버튼은 떨어뜨린다. 가정한 예시이며 특정 서비스 화면이 아니다. */
const PANEL_Y = 36;
const PANEL_H = 150;

function Before({ x }: { x: number }) {
  return (
    <g>
      <rect className="svg-box" x={x} y={PANEL_Y} width="164" height={PANEL_H} rx="8" />
      <rect className="svg-box" x={x + 12} y="96" width="70" height="30" rx="6" />
      <text x={x + 47} y="116" textAnchor="middle" fontSize="13">삭제</text>
      <rect className="svg-box" x={x + 86} y="96" width="66" height="30" rx="6" />
      <text x={x + 119} y="116" textAnchor="middle" fontSize="13">저장</text>
    </g>
  );
}

function After({ x }: { x: number }) {
  return (
    <g>
      <rect className="svg-box" x={x} y={PANEL_Y} width="164" height={PANEL_H} rx="8" />
      <rect x={x + 12} y="52" width="140" height="44" rx="8" fill="var(--accent)" />
      <text x={x + 82} y="79" textAnchor="middle" fontSize="14" fontWeight="700" style={{ fill: 'var(--bg)' }}>저장</text>
      <rect className="svg-box-bad" x={x + 12} y="136" width="140" height="36" rx="8" />
      <text className="t-bad" x={x + 82} y="159" textAnchor="middle" fontSize="13">삭제</text>
    </g>
  );
}

export default function ButtonPlacement() {
  return (
    <svg viewBox="0 0 360 236" role="img" aria-label="왼쪽은 삭제와 저장이 같은 크기와 모양으로 바로 붙어 있어 삭제를 잘못 누르기 쉽다. 오른쪽은 저장을 크게 채워 위에 두고, 삭제는 아래로 떨어뜨려 모양을 다르게 했다.">
      <text className="t-strong" x="8" y="22">Before</text>
      <text className="t-strong" x="188" y="22">After</text>
      <Before x={8} />
      <After x={188} />
      <text className="t-bad" x="8" y="208">같은 크기로 붙어 있다</text>
      <text className="t-bad" x="8" y="225">삭제를 잘못 누른다</text>
      <text className="t-good" x="188" y="208">저장은 크게</text>
      <text className="t-good" x="188" y="225">삭제는 떨어뜨린다</text>
    </svg>
  );
}
