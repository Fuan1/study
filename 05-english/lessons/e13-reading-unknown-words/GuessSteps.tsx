type Step = { n: string; title: string; sub: string };

const STEPS: Step[] = [
  { n: '1', title: '품사를 본다', sub: 'is usually 뒤라서 형용사 자리' },
  { n: '2', title: '문장 안을 본다', sub: 'Ana 의 평소 상태를 말한다' },
  { n: '3', title: '앞뒤 연결을 본다', sub: 'but 뒤가 sad 라서 반대 뜻' },
  { n: '4', title: '넣어 보고 확인한다', sub: '기분 좋은 뜻을 넣어 읽어 본다' },
];

const H = 66;
const GAP = 18;
const TOP = 8;
const SENT_H = 96;
const STEP_TOP = TOP + SENT_H + 24;

export default function GuessSteps() {
  const y = (i: number) => STEP_TOP + i * (H + GAP);
  const VB_H = y(STEPS.length - 1) + H + 8;
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="문맥으로 뜻을 짐작하는 네 단계. 예문 Ana is usually cheerful, but today she looks sad. 에서 cheerful 을 품사, 문장 안, 앞뒤 연결, 대입 확인 순서로 짐작한다.">
      <rect className="svg-box-key" x="8" y={TOP} width="344" height={SENT_H} rx="8" />
      <text className="t-strong" x="22" y={TOP + 28}>Ana is usually cheerful,</text>
      <text className="t-strong" x="22" y={TOP + 48}>but today she looks sad.</text>
      <text className="t-sub" x="22" y={TOP + 76}>아나는 보통 cheerful 한데 오늘은 슬퍼 보인다.</text>
      {STEPS.map((s, i) => (
        <g key={s.n}>
          <rect className={i === STEPS.length - 1 ? 'svg-berg' : 'svg-box'} x="8" y={y(i)} width="344" height={H} rx="8" />
          <text className="t-strong" x="22" y={y(i) + 28}>{s.n}</text>
          <text className="t-strong" x="44" y={y(i) + 28}>{s.title}</text>
          <text className="t-sub" x="44" y={y(i) + 48}>{s.sub}</text>
          {i < STEPS.length - 1 && <line className="svg-flow" x1="180" y1={y(i) + H + 3} x2="180" y2={y(i) + H + GAP - 3} />}
        </g>
      ))}
    </svg>
  );
}
