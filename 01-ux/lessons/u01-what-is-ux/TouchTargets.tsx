type Size = { v: number; unit: string; l1: string; l2: string; cls: string };

const SIZES: Size[] = [
  { v: 24, unit: 'px', l1: 'WCAG AA', l2: '최소', cls: 'svg-box' },
  { v: 44, unit: 'pt', l1: 'iOS 권장', l2: 'AAA는 44px', cls: 'svg-berg' },
  { v: 48, unit: 'dp', l1: 'Android 권장', l2: 'Material', cls: 'svg-berg' },
];

const COL = 120;
const BASE = 66; // 정사각형 아랫선

export default function TouchTargets() {
  return (
    <svg viewBox="0 0 360 232" role="img" aria-label="터치 영역 크기를 같은 축척으로 비교. 24px는 WCAG AA 최소, 44pt는 iOS 권장, 48dp는 Android 권장.">
      {SIZES.map((s, i) => {
        const cx = i * COL + COL / 2;
        return (
          <g key={s.unit} textAnchor="middle">
            <rect className={s.cls} x={cx - s.v / 2} y={BASE - s.v} width={s.v} height={s.v} rx="4" />
            <text className="t-strong" x={cx} y={BASE + 32}>{s.v} {s.unit}</text>
            <text className="t-sub" x={cx} y={BASE + 56}>{s.l1}</text>
            <text className="t-sub" x={cx} y={BASE + 76}>{s.l2}</text>
          </g>
        );
      })}
      <line x1="8" y1="184" x2="352" y2="184" stroke="var(--line)" />
      <text className="t-sub" x="180" y="214" textAnchor="middle">단위가 달라도 같은 길이로 그렸다</text>
    </svg>
  );
}
