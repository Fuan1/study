/**
 * 같은 달, 같은 사업(가상)에서 CAC 정의만 바꾼 값. 비용: 광고비 6,000,000 + 대행 수수료 600,000
 * + 마케팅 인건비 배분 3,000,000 + 도구 400,000. 신규 전체 160명 중 유료 유입 100명.
 * LTV 280,000원(월 ARPU 20,000 x 공헌이익률 70% / 월 이탈률 5%)은 본문 계산과 같다.
 */
const AD = 6_000_000;
const ALL_COST = AD + 600_000 + 3_000_000 + 400_000;
const PAID = 100;
const ALL_NEW = 160;
const LTV = (20_000 * 0.7) / 0.05;

type Row = { label: string; cac: number; mine?: boolean };
const ROWS: Row[] = [
  { label: '광고비만 ÷ 전체 신규', cac: AD / ALL_NEW },
  { label: '광고비만 ÷ 유료 신규', cac: AD / PAID },
  { label: '전부 포함 ÷ 전체 신규 (이 글)', cac: ALL_COST / ALL_NEW, mine: true },
  { label: '전부 포함 ÷ 유료 신규', cac: ALL_COST / PAID },
];

const X0 = 8;
const BAR_MAX = 150; // 100,000원의 폭
const SCALE = BAR_MAX / 100_000;
const PITCH = 64;
const BAR_DY = 28; // 라벨 baseline 14 아래로 막대를 띄운다
const BAR_H = 22;
const TOP = 8;
const rowY = (i: number) => TOP + i * PITCH;
const lastBottom = rowY(ROWS.length - 1) + BAR_DY + BAR_H;
const VB_H = lastBottom + 12; // 막대 아랫변 + 아래 여백

const fmt = (n: number) => Math.round(n).toLocaleString('en-US');

export default function CacDefinitions() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label={`같은 사업에서 CAC 정의에 따라 ${ROWS.map((r) => `${r.label} ${fmt(r.cac)}원, LTV 대 CAC ${(LTV / r.cac).toFixed(1)}`).join(', ')}.`}>
      {ROWS.map((r, i) => {
        const y = rowY(i);
        const w = r.cac * SCALE;
        return (
          <g key={r.label}>
            <text className="t-strong" x={X0} y={y + 14}>{r.label}</text>
            <rect className={r.mine ? 'svg-berg' : 'svg-box'} x={X0} y={y + BAR_DY} width={w} height={BAR_H} rx="4" />
            <text className={r.mine ? 't-accent' : 't-sub'} x={X0 + w + 8} y={y + BAR_DY + 16}>{fmt(r.cac)}원 → {(LTV / r.cac).toFixed(1)} : 1</text>
          </g>
        );
      })}
    </svg>
  );
}
