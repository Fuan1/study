/** 차별점 후보 4개의 3질문 점수(0~2)를 같은 값으로 합계와 판정까지 계산해 그린다. 점수는 가상. */
type Cand = { name: string; s: [number, number, number] };

const CANDS: Cand[] = [
  { name: '예약금 자동 청구', s: [2, 2, 1] },
  { name: 'DM에서 바로 예약 접수', s: [2, 1, 1] },
  { name: '월 29,000원 정액', s: [2, 2, 0] },
  { name: '화면이 깔끔함', s: [1, 0, 0] },
];
const LABELS = ['알아챔', '증거', '방어'];
const CLS = ['svg-box-bad', 'svg-box', 'svg-berg']; // 점수 0, 1, 2

const CW = 104; // 칩 폭
const CH = 36; // 칩 높이
const CGAP = 12;
const ROW = 66; // 한 후보 묶음 높이(이름 줄 + 칩)
const RGAP = 24; // 후보 묶음 사이
const Y0 = 8;
const STROKE = 2;
const rowY = (i: number) => Y0 + i * (ROW + RGAP);
const VB_H = Math.ceil(rowY(CANDS.length - 1) + ROW + STROKE / 2 + 8);

export default function ScoreBars() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label={CANDS.map((c) => `${c.name}: 알아챔 ${c.s[0]}, 증거 ${c.s[1]}, 방어 ${c.s[2]}, 합계 ${c.s[0] + c.s[1] + c.s[2]}, ${Math.min(...c.s) >= 1 ? '통과' : '탈락'}`).join('. ') + '. 합계가 같아도 0점이 하나라도 있으면 탈락이다.'}>
      {CANDS.map((c, i) => {
        const sum = c.s[0] + c.s[1] + c.s[2];
        const ok = Math.min(...c.s) >= 1;
        return (
          <g key={c.name}>
            <text className="t-strong" x="12" y={rowY(i) + 16}>{c.name}</text>
            <text className={ok ? 't-good' : 't-bad'} x="348" y={rowY(i) + 16} textAnchor="end">{`합 ${sum} · ${ok ? '통과' : '탈락'}`}</text>
            {c.s.map((v, j) => (
              <g key={LABELS[j]}>
                <rect className={CLS[v]} x={12 + j * (CW + CGAP)} y={rowY(i) + ROW - CH} width={CW} height={CH} rx="8" />
                <text className="t-sub" x={12 + j * (CW + CGAP) + CW / 2} y={rowY(i) + ROW - CH / 2 + 4.5} textAnchor="middle">{`${LABELS[j]} ${v}`}</text>
              </g>
            ))}
          </g>
        );
      })}
    </svg>
  );
}
