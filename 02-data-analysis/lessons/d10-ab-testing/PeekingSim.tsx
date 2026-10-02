/**
 * A/A 모의 실험: 두 군의 실제 전환율이 같다(10%). 군당 최종 14,740명을 20번에 나눠 쌓으면서
 * 정해 둔 횟수만큼 양측 5% 검정을 하고, 한 번이라도 유의하면 "효과 있음"으로 멈춘다.
 * 값은 python(random.binomialvariate, 시드 2026, 2만 회 반복)으로 계산한 거짓 양성 비율이다.
 * 몬테카를로 표준오차는 약 0.15%p.
 */
type Row = { label: string; v: number; kind: 'base' | 'bad' | 'good' };

const ROWS: Row[] = [
  { label: '끝에서 1번만 확인', v: 5.17, kind: 'base' },
  { label: '2번 확인', v: 8.6, kind: 'bad' },
  { label: '5번 확인', v: 14.34, kind: 'bad' },
  { label: '10번 확인', v: 19.51, kind: 'bad' },
  { label: '20번 확인', v: 25.09, kind: 'bad' },
  { label: '10번 확인, 기준 0.5%로 보정', v: 2.56, kind: 'good' },
];

const X0 = 8;
const SCALE = 290 / 30; // 30% 가 290px
const PITCH = 64;
const BAR_DY = 28; // 라벨 아래 막대 시작(라벨 baseline 14 + 점선 시작까지 8px 이상)
const BAR_H = 22;
const TOP = 8;
const rowY = (i: number) => TOP + i * PITCH;
const lastBottom = rowY(ROWS.length - 1) + BAR_DY + BAR_H;
const LEG = lastBottom + 28; // 범례 baseline
const VB_H = LEG + 12;

export default function PeekingSim() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="실제 효과가 없는 실험에서 결과를 확인하는 횟수별 거짓 양성 비율. 1번 확인 5.2퍼센트, 2번 8.6퍼센트, 5번 14.3퍼센트, 10번 19.5퍼센트, 20번 25.1퍼센트. 10번 확인하며 기준을 10분의 1로 낮추면 2.6퍼센트.">
      {ROWS.map((r, i) => {
        const y = rowY(i);
        const w = r.v * SCALE;
        const cls = r.kind === 'bad' ? 'svg-tip' : 'svg-berg';
        return (
          <g key={r.label}>
            <text className="t-strong" x={X0} y={y + 14}>{r.label}</text>
            <rect className={cls} x={X0} y={y + BAR_DY} width={w} height={BAR_H} rx="4" />
            <line x1={X0 + 5 * SCALE} y1={y + BAR_DY - 3} x2={X0 + 5 * SCALE} y2={y + BAR_DY + BAR_H + 3} stroke="var(--strong)" strokeWidth="1.5" strokeDasharray="3 2" />
            <text className={r.kind === 'bad' ? 't-warm' : r.kind === 'good' ? 't-good' : 't-strong'} x={X0 + w + 8} y={y + BAR_DY + 16}>{r.v.toFixed(1)}%</text>
          </g>
        );
      })}
      <line x1={X0} y1={LEG - 5} x2={X0 + 22} y2={LEG - 5} stroke="var(--strong)" strokeWidth="1.5" strokeDasharray="3 2" />
      <text className="t-sub" x={X0 + 30} y={LEG}>의도한 거짓 양성 5%</text>
    </svg>
  );
}
