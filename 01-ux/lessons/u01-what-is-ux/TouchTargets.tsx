type Size = { v: number; unit: string; l1: string; l2: string; cls: string };

const SIZES: Size[] = [
  { v: 24, unit: 'px', l1: 'WCAG AA', l2: '최소', cls: 'svg-box' },
  { v: 44, unit: 'pt', l1: 'iOS 권장', l2: 'WCAG AAA는 44px', cls: 'svg-berg' },
  { v: 48, unit: 'dp', l1: 'Android 권장', l2: 'Material', cls: 'svg-berg' },
];

const COL = 120;
const BASE = 76;

export default function TouchTargets() {
  return (
    <svg viewBox="0 0 360 160" role="img" aria-label="터치 영역 크기를 같은 축척으로 비교. 24px는 WCAG AA 최소, 44pt는 iOS 권장, 48dp는 Android 권장.">
      {SIZES.map((s, i) => {
        const cx = i * COL + COL / 2;
        return (
          <g key={s.unit} textAnchor="middle">
            <rect className={s.cls} x={cx - s.v / 2} y={BASE - s.v} width={s.v} height={s.v} rx="4" />
            <text className="t-strong" x={cx} y={BASE + 22}>{s.v} {s.unit}</text>
            <text className="t-sub" x={cx} y={BASE + 40}>{s.l1}</text>
            <text className="t-sub" x={cx} y={BASE + 57}>{s.l2}</text>
          </g>
        );
      })}
      <text className="t-sub" x="180" y="152" textAnchor="middle">단위가 달라도 같은 길이로 그렸다</text>
    </svg>
  );
}
