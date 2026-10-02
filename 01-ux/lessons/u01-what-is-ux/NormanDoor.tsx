function Door({ cx, handle, title, signal, actual, ok }: { cx: number; handle: 'bar' | 'plate'; title: string; signal: string; actual: string; ok: boolean }) {
  return (
    <g>
      <rect className="svg-box" x={cx - 38} y="14" width="76" height="124" rx="4" />
      {handle === 'bar' ? (
        <rect x={cx + 18} y="56" width="6" height="44" rx="3" fill="currentColor" />
      ) : (
        <rect className="svg-box-key" x={cx + 4} y="60" width="26" height="36" rx="3" />
      )}
      <g textAnchor="middle">
        <text className="t-strong" x={cx} y="162">{title}</text>
        <text className="t-sub" x={cx} y="182">{signal}</text>
        <text className="t-sub" x={cx} y="200">{actual}</text>
        <text className={ok ? 't-good' : 't-bad'} x={cx} y="222">{ok ? '신호와 동작이 일치' : '신호와 동작이 어긋남'}</text>
      </g>
    </g>
  );
}

export default function NormanDoor() {
  return (
    <svg viewBox="0 0 360 232" role="img" aria-label="밀어서 여는 문 두 개. 세로 손잡이가 달린 문은 당기라고 말하지만 실제로는 밀어야 해서 어긋나고, 평평한 판만 있는 문은 밀라고 말하고 실제로도 밀어서 일치한다.">
      <Door cx={90} handle="bar" title="세로 손잡이 문" signal="신호: 당기세요" actual="실제: 밀어야 함" ok={false} />
      <Door cx={270} handle="plate" title="평평한 판 문" signal="신호: 미세요" actual="실제: 밀어야 함" ok />
    </svg>
  );
}
