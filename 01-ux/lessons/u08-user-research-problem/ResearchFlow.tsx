const STEPS = [
  { title: '사용자에게서 모은 것', sub: '인터뷰·관찰 기록, 로그, 설문', h: 52 },
  { title: '패턴', sub: '친화도 다이어그램으로 묶은 주제', h: 52 },
  { title: '문제 정의', sub: '누가·상황·하려는 일·막히는 이유', h: 70, key: true, tag: '전략·범위를 정하는 근거' },
  { title: 'How Might We', sub: '해결 방향을 여는 질문', h: 52 },
  { title: '가설과 설계', sub: '아이디어, 프로토타입, 검증(U9, U10)', h: 52 },
];

export default function ResearchFlow() {
  const gap = 18;
  let y = 8;
  const rows = STEPS.map((s) => {
    const row = { ...s, y };
    y += s.h + gap;
    return row;
  });
  const H = y - gap + 8;
  return (
    <svg viewBox={`0 0 360 ${H}`} role="img" aria-label="리서치에서 문제 정의로 가는 흐름. 모은 자료에서 패턴을 찾고, 문제 정의 문장을 쓰고, How Might We 질문을 거쳐 가설과 설계로 간다.">
      <defs>
        <marker id="u8ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      {rows.map((s, i) => (
        <g key={s.title}>
          <rect className={s.key ? 'svg-box-key' : 'svg-box'} x="8" y={s.y} width="344" height={s.h} rx="8" />
          <text className="t-strong" x="22" y={s.y + 23}>{s.title}</text>
          <text className="t-sub" x="22" y={s.y + 43}>{s.sub}</text>
          {s.tag && <text className="t-accent" x="22" y={s.y + 62}>{s.tag}</text>}
          {i < rows.length - 1 && <line className="svg-flow" x1="180" y1={s.y + s.h + 1} x2="180" y2={s.y + s.h + gap - 1} markerEnd="url(#u8ar)" />}
        </g>
      ))}
    </svg>
  );
}
