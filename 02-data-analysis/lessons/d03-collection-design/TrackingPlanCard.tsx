/** 수집 계획서(이벤트 명세표) 한 줄의 모양. 필드 구성은 Segment 트래킹 플랜의 항목(이름, 속성, 자료형, 필수 여부)을 따랐고, 값은 모두 가상 예시다. */
type Row = { label: string; lines: string[] };

const ROWS: Row[] = [
  { label: '질문', lines: ['첫 주에 주문까지 가는가'] },
  { label: '이벤트', lines: ['Order Completed'] },
  { label: '발생 시점', lines: ['결제 승인이 서버에', '기록된 직후'] },
  { label: '속성', lines: ['order_id · 문자열 · 필수', 'value · 숫자 · 원 · 필수', 'currency · KRW · 필수'] },
  { label: '기록 위치', lines: ['서버 한 곳만'] },
  { label: '담당 · 버전', lines: ['결제팀 · v3'] },
];

const LINE = 20; // 같은 묶음의 줄 간격
const PAD_TOP = 26; // 첫 줄 baseline
const PAD_BOTTOM = 14; // 마지막 줄 baseline 아래
const LABEL_X = 22;
const VALUE_X = 112;

export default function TrackingPlanCard() {
  const heights = ROWS.map((r) => PAD_TOP + (r.lines.length - 1) * LINE + PAD_BOTTOM);
  const tops = heights.map((_, i) => 8 + heights.slice(0, i).reduce((a, b) => a + b, 0));
  const total = heights.reduce((a, b) => a + b, 0);
  const H = 8 + total + 8; // 카드 아랫변(8+total) + 아래 여백 8
  return (
    <svg viewBox={`0 0 360 ${H}`} role="img" aria-label="이벤트 명세표 한 줄의 모양. 질문, 이벤트 이름, 발생 시점, 속성(이름, 자료형, 단위, 필수 여부), 기록 위치, 담당과 버전을 한 장에 적는다.">
      <rect className="svg-box" x="8" y="8" width="344" height={total} rx="8" />
      {ROWS.map((r, i) => (
        <g key={r.label}>
          {i > 0 && <line x1="8" y1={tops[i]} x2="352" y2={tops[i]} stroke="var(--line)" />}
          <text className="t-sub" x={LABEL_X} y={tops[i] + PAD_TOP}>{r.label}</text>
          {r.lines.map((t, j) => (
            <text key={t} x={VALUE_X} y={tops[i] + PAD_TOP + j * LINE} fontSize="13" fontWeight={i === 1 ? 700 : 400}>{t}</text>
          ))}
        </g>
      ))}
    </svg>
  );
}
