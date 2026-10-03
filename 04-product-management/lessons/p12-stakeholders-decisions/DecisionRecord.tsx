// 형태 예시(가상 값): 결정 기록 한 장. 제목, 상태, 맥락, 결정, 결과는 Nygard(2011) ADR 항목, 대안과 근거는 MADR 템플릿 개념에 대응한다. 재검토 시점은 이 글이 더한 항목이다.
const ROWS: { k: string; v: string; note?: string }[] = [
  { k: '제목', v: '알림 개편은 다음 분기로' },
  { k: '상태', v: '승인됨 (제품 리드)' },
  { k: '맥락', v: '문의는 늘고 인력은 부족' },
  { k: '결정', v: '이번엔 문구만 고친다' },
  { k: '대안', v: '전면 개편, 문구만, 유지' },
  { k: '근거', v: '빨리 끝나고 되돌리기 쉽다' },
  { k: '알려진 위험', v: '근본 원인이 남을 수 있다' },
  { k: '재검토 시점', v: '다음 분기 계획 때', note: '이 글이 더한 항목' },
];

const TOP = 8;
const HEAD = 44;
const ROW1 = 38;
const ROW2 = 62;
const heights = ROWS.map((r) => (r.note ? ROW2 : ROW1));
const tops: number[] = [];
let acc = TOP + HEAD;
heights.forEach((h) => { tops.push(acc); acc += h; });
const BOTTOM = acc;
// 카드 아랫변 + 선 두께 절반 + 아래 여백 8
const VB_H = BOTTOM + 1 + 8;
const VAL_X = 122;

export default function DecisionRecord() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="결정 기록 한 장의 모양. 제목, 상태, 맥락, 결정, 대안, 근거, 알려진 위험, 재검토 시점을 한 줄씩 적는다.">
      <rect className="svg-box" x="8" y={TOP} width="344" height={BOTTOM - TOP} rx="8" />
      <text className="t-strong" x="22" y={TOP + 28}>결정 기록</text>
      <text className="t-sub" x="338" y={TOP + 28} textAnchor="end">가상</text>
      {ROWS.map((r, i) => (
        <g key={r.k}>
          <line x1="8" y1={tops[i]} x2="352" y2={tops[i]} stroke="var(--line)" />
          <text className="t-sub" x="22" y={tops[i] + 24}>{r.k}</text>
          <text x={VAL_X} y={tops[i] + 24} fontSize="13">{r.v}</text>
          {r.note && <text className="t-accent" x={VAL_X} y={tops[i] + 46}>{r.note}</text>}
        </g>
      ))}
    </svg>
  );
}
