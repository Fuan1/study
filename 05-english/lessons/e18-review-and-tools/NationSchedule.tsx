/**
 * 출처: Nation (2014) 활동 5.1의 단어 카드 복습 순서(현장 지침, 연구값 아님).
 * 형태 예시: 간격이 점점 벌어지는 모양만 보인다. 점 사이 길이는 축척이 아니다.
 */
type Step = { when: string; note: string };
const STEPS: Step[] = [
  { when: '처음 본 직후', note: '1회째' },
  { when: '몇 분 뒤', note: '2회째' },
  { when: '한 시간쯤 뒤', note: '3회째' },
  { when: '다음 날', note: '4회째' },
  { when: '일주일 뒤', note: '5회째' },
  { when: '그 뒤 2주쯤', note: '6회째' },
];

const CX = 24;
const TOP = 20;
const GAPS = [36, 44, 54, 66, 80]; // 모양만 보이는 길이

export default function NationSchedule() {
  const ys = STEPS.map((_, i) => TOP + GAPS.slice(0, i).reduce((a, b) => a + b, 0));
  const last = ys[ys.length - 1];
  return (
    <svg viewBox={`0 0 360 ${last + 6 + 20}`} role="img" aria-label="단어 카드 복습 순서. 처음 본 직후, 몇 분 뒤, 한 시간쯤 뒤, 다음 날, 일주일 뒤, 그 뒤 2주쯤 순서로 간격이 벌어진다.">
      <line className="svg-flow" x1={CX} y1={ys[0]} x2={CX} y2={last} />
      {STEPS.map((s, i) => (
        <g key={s.when}>
          <circle className={i === 0 ? 'svg-box' : 'svg-berg'} cx={CX} cy={ys[i]} r="7" />
          <text className="t-strong" x="48" y={ys[i] + 5}>{s.when}</text>
          <text className="t-sub" x="352" y={ys[i] + 5} textAnchor="end">{s.note}</text>
        </g>
      ))}
    </svg>
  );
}
