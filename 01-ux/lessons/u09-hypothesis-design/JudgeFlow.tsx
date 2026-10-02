const ROWS = [
  { cond: ['기준을 넘었고', '반증 신호가 없다'], verdict: '계속', cc: 'svg-box-good', vc: 't-good', note: '다음 위험으로' },
  { cond: ['기준 미달, 원인이', '해법 쪽이다'], verdict: '수정', cc: 'svg-box-key', vc: 't-strong', note: '고쳐서 재시험' },
  { cond: ['기준 미달, 원인이', '가정 쪽이다'], verdict: '폐기', cc: 'svg-box-bad', vc: 't-bad', note: '문제 정의로 복귀' },
];

export default function JudgeFlow() {
  return (
    <svg viewBox="0 0 360 300" role="img" aria-label="실험 결과를 실험 전에 정한 기준과 비교한 뒤 세 갈래로 판단한다. 기준을 넘으면 계속, 기준 미달이고 원인이 해법이면 수정, 기준 미달이고 원인이 가정이면 폐기한다.">
      <defs>
        <marker id="arJudge" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      <text className="t-accent" x="180" y="18" textAnchor="middle">실험 전에 정한 기준과 비교한다</text>
      {ROWS.map((r, i) => {
        const y = 36 + i * 86;
        return (
          <g key={r.verdict}>
            <rect className="svg-box" x="8" y={y} width="180" height="70" rx="8" />
            <text className="t-sub" x="20" y={y + 29}>{r.cond[0]}</text>
            <text className="t-sub" x="20" y={y + 49}>{r.cond[1]}</text>
            <line className="svg-flow" x1="190" y1={y + 35} x2="208" y2={y + 35} markerEnd="url(#arJudge)" />
            <rect className={r.cc} x="210" y={y} width="142" height="70" rx="8" />
            <text className={r.vc} x="222" y={y + 29}>{r.verdict}</text>
            <text className="t-sub" x="222" y={y + 50}>{r.note}</text>
          </g>
        );
      })}
    </svg>
  );
}
