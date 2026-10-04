/**
 * 이 글의 정리. 되물음을 받았을 때 어떤 증상인지로 고칠 곳을 고르는 순서.
 * 중요도 순위가 아니라 증상 순서다.
 */
type Step = { q: string; fix: string };

const STEPS: Step[] = [
  { q: '1. 다른 단어로 들린다', fix: '소리부터: 자음 바뀜, 끝소리, 자음 묶음' },
  { q: '2. 소리는 맞는데 단어를 못 알아듣는다', fix: '단어 강세 자리와 음절 수 확인' },
  { q: '3. 문장 전체가 뭉개져 들린다', fix: '핵심 단어 하나에 힘, 나머지는 약하게' },
];

const H = 66;
const GAP = 40;
const TOP = 8;

export default function PriorityFlow() {
  const y = (i: number) => TOP + i * (H + GAP);
  const VB_H = y(STEPS.length - 1) + H + 1 + 8;
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="되물음을 받았을 때 고칠 곳을 고르는 순서. 다른 단어로 들리면 소리, 소리는 맞는데 단어를 못 알아들으면 단어 강세, 문장 전체가 뭉개지면 핵심 단어 강세.">
      <defs>
        <marker id="ar-e03-flow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      {STEPS.map((s, i) => (
        <g key={s.q}>
          <rect className={i === 0 ? 'svg-berg' : 'svg-box'} x="8" y={y(i)} width="344" height={H} rx="8" />
          <text className="t-strong" x="22" y={y(i) + 28}>{s.q}</text>
          <text className="t-sub" x="22" y={y(i) + 50}>{s.fix}</text>
          {i < STEPS.length - 1 && (
            <g>
              <line className="svg-flow" x1="180" y1={y(i) + H + 6} x2="180" y2={y(i) + H + GAP - 6} markerEnd="url(#ar-e03-flow)" />
              <text className="t-sub" x="194" y={y(i) + H + GAP / 2 + 5}>아니면</text>
            </g>
          )}
        </g>
      ))}
    </svg>
  );
}
