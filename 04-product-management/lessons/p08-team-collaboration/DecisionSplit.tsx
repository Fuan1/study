type Group = { title: string; items: string[]; key?: boolean };

const GROUPS: Group[] = [
  { title: '제품 담당자가 정한다', items: ['제품 목표와 항목의 내용', '항목의 순서', '스프린트 가치 제안', '스프린트 취소'] },
  { title: '개발팀이 정한다', items: ['항목의 크기', '스프린트 계획', '구현 방법 (전적 재량)', '완료 정의 준수'] },
  { title: '함께 정한다', items: ['스프린트 목표', '범위 협상 (목표는 유지)', '완료 정의 작성', '계획 중 항목 다듬기'], key: true },
];

// 여백 기준: 상자 안 14px, 제목 아래 항목 간격 21px, 상자 사이 24px.
const H = 134;
const GAP = 24;
const y = (i: number) => 8 + i * (H + GAP);
// 마지막 상자 아랫변 + 선 두께 절반 + 아래 여백 8
const VB_H = y(GROUPS.length - 1) + H + 1 + 8;

export default function DecisionSplit() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="결정 경계. 제품 담당자는 제품 목표와 항목 내용, 순서, 스프린트 가치 제안, 스프린트 취소를 정한다. 개발팀은 항목 크기, 스프린트 계획, 구현 방법, 완료 정의 준수를 정한다. 스프린트 목표, 범위 협상, 완료 정의 작성, 계획 중 항목 다듬기는 함께 정한다.">
      {GROUPS.map((g, i) => (
        <g key={g.title}>
          <rect className={g.key ? 'svg-box-key' : 'svg-box'} x="8" y={y(i)} width="344" height={H} rx="8" />
          <text className="t-strong" x="22" y={y(i) + 29}>{g.title}</text>
          {g.items.map((it, j) => (
            <text key={it} className="t-sub" x="22" y={y(i) + 55 + j * 21}>{it}</text>
          ))}
        </g>
      ))}
    </svg>
  );
}
