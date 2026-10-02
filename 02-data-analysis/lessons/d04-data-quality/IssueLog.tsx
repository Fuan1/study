type Row = { k: string; v: string };

const ISSUE: Row[] = [
  { k: '발견', v: '결제일 칸이 비어 있다' },
  { k: '범위', v: '3월 둘째 주에 몰려 있다' },
  { k: '원인', v: '수집 오류로 추정, 확인 중' },
  { k: '영향', v: '그 주 매출이 낮게 나온다' },
  { k: '상태', v: '원천 담당자에게 문의함' },
];
const DECISION: Row[] = [
  { k: '결정', v: '비운 채 두고 따로 표시한다' },
  { k: '이유', v: '한 주에 몰려 무작위가 아니다' },
  { k: '확인', v: '넣고 뺀 결과를 둘 다 본다' },
  { k: '책임', v: '담당자와 날짜를 적는다' },
];

// 여백 기준: 카드 안 글자 12px 이상, 행 간격 28, 카드 사이 16.
const PITCH = 28;
const HEAD = 64; // 첫 행 baseline
const cardH = (n: number) => HEAD + (n - 1) * PITCH + 16;
const Y2 = 8 + cardH(ISSUE.length) + 16;
const VH = Y2 + cardH(DECISION.length) + 1 + 8;

function Card({ y, title, rows, cls }: { y: number; title: string; rows: Row[]; cls: string }) {
  return (
    <g>
      <rect className={cls} x="8" y={y} width="344" height={cardH(rows.length)} rx="10" />
      <text className="t-strong" x="22" y={y + 28}>{title}</text>
      <line x1="8" y1={y + 40} x2="352" y2={y + 40} stroke="var(--line)" />
      {rows.map((r, i) => (
        <g key={r.k}>
          <text className="t-sub" x="22" y={y + HEAD + i * PITCH}>{r.k}</text>
          <text x="70" y={y + HEAD + i * PITCH} fontSize="13.5">{r.v}</text>
        </g>
      ))}
    </g>
  );
}

export default function IssueLog() {
  return (
    <svg viewBox={`0 0 360 ${VH}`} role="img" aria-label="이슈 로그 한 건과 처리 결정 기록 한 건의 모양. 이슈 로그는 발견, 범위, 원인, 영향, 상태를 적고, 결정 기록은 결정, 이유, 확인, 책임을 적는다.">
      <Card y={8} title="이슈 로그 한 건" rows={ISSUE} cls="svg-box" />
      <Card y={Y2} title="처리 결정 기록 한 건" rows={DECISION} cls="svg-box-key" />
    </svg>
  );
}
