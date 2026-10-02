/**
 * 유료 광고 채널별 CAC(가상). 검색 광고 3,600,000원 / 신규 40명, SNS 광고 2,400,000원 / 신규 60명.
 * 검색 예산을 1,200,000원 늘렸더니 신규가 10명 늘었다고 가정한다(증분 CAC).
 */
type Row = { label: string; cac: number; kind: 'plain' | 'avg' | 'warn' };
const SEARCH = 3_600_000 / 40;
const SNS = 2_400_000 / 60;
const AVG = (3_600_000 + 2_400_000) / (40 + 60);
const MARGINAL = 1_200_000 / 10;
const ROWS: Row[] = [
  { label: 'SNS 광고', cac: SNS, kind: 'plain' },
  { label: '유료 평균 (합쳐서 계산)', cac: AVG, kind: 'avg' },
  { label: '검색 광고', cac: SEARCH, kind: 'plain' },
  { label: '검색 예산 늘린 몫 (증분)', cac: MARGINAL, kind: 'warn' },
];

const X0 = 8;
const SCALE = 150 / 120_000;
const PITCH = 64;
const BAR_DY = 28;
const BAR_H = 22;
const TOP = 8;
const rowY = (i: number) => TOP + i * PITCH;
const VB_H = rowY(ROWS.length - 1) + BAR_DY + BAR_H + 12;
const fmt = (n: number) => Math.round(n).toLocaleString('en-US');

export default function ChannelCac() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label={`채널별 CAC. ${ROWS.map((r) => `${r.label} ${fmt(r.cac)}원`).join(', ')}. 평균 하나가 채널 차이와 증액분의 비용을 가린다.`}>
      {ROWS.map((r, i) => {
        const y = rowY(i);
        const w = r.cac * SCALE;
        const cls = r.kind === 'warn' ? 'svg-tip' : r.kind === 'avg' ? 'svg-berg' : 'svg-box';
        return (
          <g key={r.label}>
            <text className="t-strong" x={X0} y={y + 14}>{r.label}</text>
            <rect className={cls} x={X0} y={y + BAR_DY} width={w} height={BAR_H} rx="4" />
            <text className={r.kind === 'warn' ? 't-warm' : 't-sub'} x={X0 + w + 8} y={y + BAR_DY + 16}>{fmt(r.cac)}원</text>
          </g>
        );
      })}
    </svg>
  );
}
