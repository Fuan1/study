// PRD 한 장의 구조. 번호는 쓰는 순서이고, 항목과 순서는 이 글의 정리(관행)이다. 수치는 없다.
const ROWS: [string, string, string][] = [
  ['1', '배경·문제', '누가 무엇 때문에 막히나'],
  ['2', '대상 사용자', '누구의 어떤 상황인가'],
  ['3', '목표·지표', '지표 하나와 기준값'],
  ['4', '범위·비범위', '하는 것과 안 하는 것'],
  ['5', '요구사항', '스토리와 인수 기준'],
  ['6', '제약', '일정, 기술, 법규'],
  ['7', '열린 질문', '처음부터 적고 닫는다'],
];

const TOP = 8;
const HEAD = 40;
const ROW = 42;
const KEY_ROW = 4; // 요구사항 행
const BOTTOM = TOP + HEAD + ROWS.length * ROW;
// 카드 아랫변 + 선 두께 절반 + 아래 여백 8
const VB_H = BOTTOM + 1 + 8;

export default function PrdSheet() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="요구사항 문서 한 장의 구조. 배경과 문제, 대상 사용자, 목표와 지표, 범위와 비범위, 요구사항, 제약, 열린 질문 순서로 쓴다. 요구사항은 다섯 번째이고 열린 질문은 처음부터 적는다.">
      <rect className="svg-box" x="8" y={TOP} width="344" height={HEAD + ROWS.length * ROW} rx="8" />
      <text className="t-strong" x="22" y={TOP + 26}>PRD 한 장</text>
      <text className="t-sub" x="338" y={TOP + 26} textAnchor="end">번호는 쓰는 순서</text>
      {ROWS.map(([n, k, v], i) => {
        const top = TOP + HEAD + i * ROW;
        return (
          <g key={k}>
            {i === KEY_ROW && <rect className="svg-berg" x="9" y={top + 1} width="342" height={ROW - 1} />}
            <line x1="8" y1={top} x2="352" y2={top} stroke="var(--line)" />
            <circle className="svg-box" cx="32" cy={top + ROW / 2} r="12" />
            <text className="t-sub" x="32" y={top + ROW / 2 + 4.5} textAnchor="middle">{n}</text>
            <text className="t-strong" x="56" y={top + 26}>{k}</text>
            <text className={i === ROWS.length - 1 ? 't-accent' : undefined} x="160" y={top + 26} fontSize="13">{v}</text>
          </g>
        );
      })}
    </svg>
  );
}
