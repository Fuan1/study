const RUNGS = [
  { cls: 'svg-box-good', tone: 't-good', head: '과거의 구체적 행동', ex: '"지난번에 방을 잡은 때를 말해 주세요"', note: '실제로 있었던 일이라 근거가 된다' },
  { cls: 'svg-box', tone: 't-warm', head: '평소의 일반 습관', ex: '"보통 어떻게 하세요?"', note: '기억이 뭉개지고 좋게 포장되기 쉽다' },
  { cls: 'svg-box-bad', tone: 't-bad', head: '미래의 가정과 의견', ex: '"이런 기능이 있으면 쓰시겠어요?"', note: '낙관적으로 답하기 쉽다. 근거로 약하다' },
];

export default function QuestionLadder() {
  const h = 96;
  const gap = 28;
  return (
    <svg viewBox="0 0 360 360" role="img" aria-label="질문의 세 단계. 과거의 구체적 행동을 물을수록 믿을 만하고, 미래의 가정을 물을수록 믿기 어렵다. 예시 질문은 가정이다.">
      {RUNGS.map((r, i) => {
        const y = 8 + i * (h + gap);
        return (
          <g key={r.head}>
            <rect className={r.cls} x="8" y={y} width="344" height={h} rx="8" />
            <text className="t-strong" x="22" y={y + 30}>{r.head}</text>
            <text x="22" y={y + 53} fontSize="13">{r.ex}</text>
            <text className={r.tone} x="22" y={y + 76}>{r.note}</text>
            {i < RUNGS.length - 1 && (
              <path d={`M180 ${y + h + 4} L180 ${y + h + gap - 4}`} className="svg-flow" />
            )}
          </g>
        );
      })}
    </svg>
  );
}
