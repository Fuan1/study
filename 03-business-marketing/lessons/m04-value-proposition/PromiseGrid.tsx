/** 형태 예시(가상 값). 광고의 약속이 랜딩에서 같은 낱말과 숫자로 이어지는지 항목별로 대조한다. */
type Row = { item: string; ad: string; lp: string };

const ROWS: Row[] = [
  { item: '무료 범위', ad: '첫 달 무료', lp: '14일 무료' },
  { item: '용어', ad: '정산표', lp: '정산표' },
  { item: '행동', ad: '무료 체험', lp: '상담 신청' },
];

const H = 84;
const GAP = 12;
const TOP = 8;
const STROKE = 2;
const y = (i: number) => TOP + i * (H + GAP);
const VB_H = Math.ceil(y(ROWS.length - 1) + H + STROKE / 2 + 8);

export default function PromiseGrid() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="광고와 랜딩의 약속 대조 예시. 무료 범위와 행동은 서로 달라 불일치이고, 용어는 같아 일치다.">
      {ROWS.map((r, i) => {
        const same = r.ad === r.lp;
        const y0 = y(i);
        return (
          <g key={r.item}>
            <rect className={same ? 'svg-box-good' : 'svg-box-bad'} x="8" y={y0} width="344" height={H} rx="8" />
            <text className="t-strong" x="22" y={y0 + 28}>{r.item}</text>
            <text className={same ? 't-good' : 't-bad'} x="338" y={y0 + 28} textAnchor="end">{same ? '일치' : '불일치'}</text>
            <text className="t-sub" x="22" y={y0 + 50}>광고</text>
            <text x="68" y={y0 + 50} fontSize="13">{r.ad}</text>
            <text className="t-sub" x="22" y={y0 + 70}>랜딩</text>
            <text x="68" y={y0 + 70} fontSize="13">{r.lp}</text>
          </g>
        );
      })}
    </svg>
  );
}
