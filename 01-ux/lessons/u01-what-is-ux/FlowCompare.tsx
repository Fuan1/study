type Col = { x: number; title: string; steps: string[]; mark: number; tone: 'bad' | 'good'; note: string[] };

function Column({ x, title, steps, mark, tone, note }: Col) {
  const w = 164;
  const y0 = 38;
  const h = 34;
  const gap = 16;
  const end = y0 + steps.length * h + (steps.length - 1) * gap;
  return (
    <g>
      <text className="t-strong" x={x} y="20">{title}</text>
      {steps.map((s, i) => {
        const y = y0 + i * (h + gap);
        return (
          <g key={s}>
            <rect className={i === mark ? `svg-box-${tone}` : 'svg-box'} x={x} y={y} width={w} height={h} rx="6" />
            <text x={x + w / 2} y={y + 22} textAnchor="middle" fontSize="13">{s}</text>
            {i < steps.length - 1 && <line className="svg-flow" x1={x + w / 2} y1={y + h + 1} x2={x + w / 2} y2={y + h + gap - 1} markerEnd="url(#ar)" />}
          </g>
        );
      })}
      {note.map((t, i) => (
        <text key={t} className={tone === 'bad' ? 't-bad' : 't-good'} x={x} y={end + 26 + i * 17}>{t}</text>
      ))}
    </g>
  );
}

export default function FlowCompare() {
  return (
    <svg viewBox="0 0 360 330" role="img" aria-label="같은 화면으로 글쓰기 흐름 두 가지를 비교. A는 5단계이고 뒤로가기를 누르면 작성 내용이 사라진다. B는 4단계이고 입력 중 자동 임시저장된다.">
      <defs>
        <marker id="ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      <Column x={8} title="A · 글쓰기 5단계" steps={['글쓰기 버튼', '카테고리 선택', '제목 입력', '본문 입력', '발행']} mark={3} tone="bad" note={['뒤로가기 한 번에', '작성 내용 삭제']} />
      <Column x={188} title="B · 글쓰기 4단계" steps={['글쓰기 버튼', '본문 입력', '분류 추천', '발행']} mark={1} tone="good" note={['입력 중 자동 임시저장', '나가도 이어서 쓰기']} />
    </svg>
  );
}
