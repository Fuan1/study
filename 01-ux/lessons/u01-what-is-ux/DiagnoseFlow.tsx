type Step = { q: string; sub: string; yes: string; fix: string };

const STEPS: Step[] = [
  { q: '기준값 미달이 있나?', sub: '대비, 터치 영역을 수치로 확인', yes: '표면 · 골격', fix: '화면 수정' },
  { q: '과업 도중 헤매나?', sub: '되돌아오기, 중도 이탈', yes: '구조', fix: '분류, 단계 수 수정' },
  { q: '기능이 없거나 안 쓰이나?', sub: '핵심 과업 대비 기능 목록', yes: '범위', fix: '기능 목록 조정' },
];

const W = 200;
const H = 52;
const GAP = 34;

export default function DiagnoseFlow() {
  const y = (i: number) => 6 + i * (H + GAP);
  const last = STEPS.length;
  return (
    <svg viewBox="0 0 360 322" role="img" aria-label="막힘을 진단하는 순서. 기준값 미달이면 표면과 골격, 아니면 과업 도중 헤매는지 보고 구조, 아니면 기능이 없거나 안 쓰이는지 보고 범위, 모두 아니면 전략을 확인한다.">
      <defs>
        <marker id="ar2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      {STEPS.map((s, i) => (
        <g key={s.q}>
          <rect className="svg-box" x="8" y={y(i)} width={W} height={H} rx="6" />
          <text className="t-strong" x="20" y={y(i) + 22}>{s.q}</text>
          <text className="t-sub" x="20" y={y(i) + 41}>{s.sub}</text>
          <line className="svg-flow" x1={8 + W + 1} y1={y(i) + H / 2} x2="226" y2={y(i) + H / 2} markerEnd="url(#ar2)" />
          <text className="t-good" x={8 + W + 4} y={y(i) + H / 2 - 5}>예</text>
          <rect className="svg-berg" x="230" y={y(i)} width="122" height={H} rx="6" />
          <text className="t-strong" x="241" y={y(i) + 22}>{s.yes}</text>
          <text className="t-sub" x="241" y={y(i) + 41}>{s.fix}</text>
          <line className="svg-flow" x1={8 + W / 2} y1={y(i) + H + 1} x2={8 + W / 2} y2={y(i) + H + GAP - 1} markerEnd="url(#ar2)" />
          <text className="t-sub" x={8 + W / 2 + 8} y={y(i) + H + GAP / 2 + 5}>아니오</text>
        </g>
      ))}
      <rect className="svg-box-key" x="8" y={y(last)} width={W} height={H} rx="6" />
      <text className="t-strong" x="20" y={y(last) + 22}>전략 확인</text>
      <text className="t-sub" x="20" y={y(last) + 41}>쓸 이유가 있는가</text>
    </svg>
  );
}
