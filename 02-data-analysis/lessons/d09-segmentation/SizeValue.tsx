/** 형태 예시(가상 값). 고객 비중과 가치 기여 비중은 가정한 값이고 각각 합이 100이다. 배율은 두 값에서 계산한다. */
const SEGS = [
  { name: '핵심', size: 8, value: 46 },
  { name: '단골', size: 17, value: 28 },
  { name: '일반', size: 35, value: 18 },
  { name: '신규', size: 20, value: 5 },
  { name: '휴면', size: 20, value: 3 },
];

const sum = (k: 'size' | 'value') => SEGS.reduce((a, s) => a + s[k], 0);
if (sum('size') !== 100 || sum('value') !== 100) throw new Error('비중 합이 100이 아니다');

const X0 = 60; // 막대 시작
const SCALE = 4; // 퍼센트 1당 4px, 46퍼센트 = 184px
const BAR = 14;
const PITCH = 58; // 묶음 34 + 사이 24
const Y0 = 44;

export default function SizeValue() {
  const bottom = Y0 + (SEGS.length - 1) * PITCH + BAR + 6 + BAR;
  return (
    <svg viewBox={`0 0 360 ${bottom + 1 + 14}`} role="img" aria-label="가상 예시. 세그먼트 다섯 개의 고객 비중과 가치 기여 비중을 막대로 비교한다. 핵심 세그먼트는 고객의 8퍼센트이고 가치의 46퍼센트를 낳아 배율이 5.75배다. 휴면은 고객의 20퍼센트이고 가치의 3퍼센트다.">
      <rect x="8" y="8" width="12" height="12" rx="2" fill="var(--muted)" />
      <text className="t-sub" x="28" y="19">고객 비중</text>
      <rect x="104" y="8" width="12" height="12" rx="2" fill="var(--accent)" />
      <text className="t-sub" x="124" y="19">가치 기여 비중</text>
      <text className="t-sub" x="352" y="19" textAnchor="end">배율</text>
      {SEGS.map((s, i) => {
        const y = Y0 + i * PITCH;
        const idx = s.value / s.size;
        return (
          <g key={s.name}>
            <text className="t-strong" x="8" y={y + 21}>{s.name}</text>
            <rect x={X0} y={y} width={s.size * SCALE} height={BAR} rx="3" fill="var(--muted)" />
            <text className="t-sub" x={X0 + s.size * SCALE + 8} y={y + 12}>{s.size}%</text>
            <rect x={X0} y={y + BAR + 6} width={s.value * SCALE} height={BAR} rx="3" fill="var(--accent)" />
            <text className="t-sub" x={X0 + s.value * SCALE + 8} y={y + BAR + 6 + 12}>{s.value}%</text>
            <text className={idx >= 1 ? 't-good' : 't-sub'} x="352" y={y + 21} textAnchor="end">{idx.toFixed(2)}배</text>
          </g>
        );
      })}
    </svg>
  );
}
