/**
 * 오픈율이 부풀 수 있는 크기의 모의(가정). 실제 열람률 20%, 클릭률 3.0% 고정.
 * 메일 개인정보 보호 기능으로 자동 로딩되는 수신자 비중 s 의 메일은 전부 열림으로 기록된다고 둔 최댓값이다.
 * 관측 오픈율 = s + (1 - s) * 0.2
 */
const TRUE_OPEN = 0.2;
const CLICK = 0.03;
const SHARES = [0, 0.3, 0.6];

const X0 = 8;
const SCALE = 250 / 70; // 70% 가 250px
const PITCH = 64;
const BAR_DY = 28; // 라벨 baseline 14 + 점선 시작까지 8px 이상
const BAR_H = 22;
const TOP = 8;
const rowY = (i: number) => TOP + i * PITCH;
const lastBottom = rowY(SHARES.length - 1) + BAR_DY + BAR_H;
const LEG = lastBottom + 28; // 범례 baseline
export const VB_H = LEG + 12;

export default function OpenInflation() {
  const refX = X0 + TRUE_OPEN * 100 * SCALE;
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="실제 열람률이 20퍼센트이고 클릭률이 3퍼센트로 같아도, 자동 로딩 수신자 비중이 0, 30, 60퍼센트이면 기록되는 오픈율은 20, 44, 68퍼센트로 커진다.">
      {SHARES.map((s, i) => {
        const obs = (s + (1 - s) * TRUE_OPEN) * 100;
        const y = rowY(i);
        const w = obs * SCALE;
        return (
          <g key={s}>
            <text className="t-strong" x={X0} y={y + 14}>자동 로딩 비중 {Math.round(s * 100)}%</text>
            <text className="t-sub" x={352} y={y + 14} textAnchor="end">클릭률 {(CLICK * 100).toFixed(1)}%</text>
            <rect className={s === 0 ? 'svg-berg' : 'svg-tip'} x={X0} y={y + BAR_DY} width={w} height={BAR_H} rx="4" />
            <line x1={refX} y1={y + BAR_DY - 3} x2={refX} y2={y + BAR_DY + BAR_H + 3} stroke="var(--strong)" strokeWidth="1.5" strokeDasharray="3 2" />
            <text className={s === 0 ? 't-strong' : 't-warm'} x={X0 + w + 8} y={y + BAR_DY + 16}>{obs.toFixed(1)}%</text>
          </g>
        );
      })}
      <line x1={X0} y1={LEG - 5} x2={X0 + 22} y2={LEG - 5} stroke="var(--strong)" strokeWidth="1.5" strokeDasharray="3 2" />
      <text className="t-sub" x={X0 + 30} y={LEG}>실제 열람률 20%(가정)</text>
    </svg>
  );
}
