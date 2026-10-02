/** 터치 영역 기준 크기를 같은 비율로 그린다(위). 간격 예외는 WCAG 2.5.8 의 24 CSS px 원 규칙을 3배 확대해 계산한 예시다(아래). */
const SIZES = [
  { n: 24, cx: 60, lines: ['WCAG 2.5.8 AA'] },
  { n: 44, cx: 180, lines: ['WCAG 2.5.5 AAA', 'Apple 44pt'] },
  { n: 48, cx: 300, lines: ['Material 48dp'] },
];

const K = 3; // 간격 예외 도식의 확대 배율
const ICON = 16;
const R = 12; // 24px 지름 원의 반지름

function Pair({ cx, gap, ok }: { cx: number; gap: number; ok: boolean }) {
  const centerDist = (ICON + gap) * K;
  const c1 = cx - centerDist / 2;
  const c2 = cx + centerDist / 2;
  const cy = 269;
  return (
    <g>
      {[c1, c2].map((c) => (
        <g key={c}>
          <circle cx={c} cy={cy} r={R * K} fill="none" stroke={ok ? 'var(--good)' : 'var(--bad)'} strokeWidth="1.5" strokeDasharray="5 3" />
          <rect className="svg-box-key" x={c - (ICON * K) / 2} y={cy - (ICON * K) / 2} width={ICON * K} height={ICON * K} rx="3" />
        </g>
      ))}
    </g>
  );
}

export default function TargetSizes() {
  return (
    <svg viewBox="0 0 360 344" role="img" aria-label="위쪽은 24, 44, 48 정사각형을 같은 비율로 그린 터치 영역 기준. 아래쪽은 16 픽셀 아이콘 둘 사이 간격이 8 픽셀이면 24 픽셀 원이 겹치지 않아 통과하고, 4 픽셀이면 원이 겹쳐 미달이다. 3배 확대한 계산 예시.">
      <text className="t-strong" x="8" y="20">터치 영역 기준 크기(같은 비율)</text>
      {SIZES.map((s) => (
        <g key={s.n}>
          <rect className="svg-box-key" x={s.cx - s.n / 2} y={90 - s.n} width={s.n} height={s.n} />
          <rect x={s.cx - 8} y={90 - s.n / 2 - 8} width="16" height="16" rx="2" fill="var(--muted)" />
          <text className="t-strong" x={s.cx} y="116" textAnchor="middle">{s.n} x {s.n}</text>
          {s.lines.map((l, i) => (
            <text key={l} className="t-sub" x={s.cx} y={137 + i * 20} textAnchor="middle">{l}</text>
          ))}
        </g>
      ))}
      <line x1="8" y1="185" x2="352" y2="185" stroke="var(--line)" />
      <text className="t-strong" x="8" y="213">간격 예외 · 16px 아이콘 둘(3배 확대)</text>
      <Pair cx={90} gap={8} ok />
      <Pair cx={270} gap={4} ok={false} />
      <text className="t-good" x="90" y="333" textAnchor="middle">간격 8px: 원이 안 겹침</text>
      <text className="t-bad" x="270" y="333" textAnchor="middle">간격 4px: 원이 겹침</text>
    </svg>
  );
}
