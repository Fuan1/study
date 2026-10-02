type Plane = { name: string; fixes: string; how: string; num: boolean; cls: string };

const PLANES: Plane[] = [
  { name: '표면', fixes: '색, 글꼴, 아이콘', how: '수치로 확인', num: true, cls: 'pl-ui' },
  { name: '골격', fixes: '배치, 내비게이션, 버튼 간격', how: '수치로 확인', num: true, cls: 'pl-ui' },
  { name: '구조', fixes: '분류, 순서, 단계 수', how: '관찰로 확인', num: false, cls: 'pl-ux' },
  { name: '범위', fixes: '넣을 기능, 뺄 기능', how: '관찰로 확인', num: false, cls: 'pl-ux' },
  { name: '전략', fixes: '누구에게 왜 필요한가', how: '관찰로 확인', num: false, cls: 'pl-ux' },
];

export default function PlanesStack() {
  const h = 54;
  const gap = 8;
  return (
    <svg viewBox="0 0 360 306" role="img" aria-label="위에서 아래로 표면, 골격, 구조, 범위, 전략 순서로 쌓인 5개 층. 표면과 골격은 기준 수치로 확인하고, 구조와 범위와 전략은 사용자 관찰로 확인한다.">
      {PLANES.map((p, i) => {
        const y = 4 + i * (h + gap);
        return (
          <g key={p.name}>
            <rect className={p.cls} x="8" y={y} width="344" height={h} rx="8" />
            <text className="t-strong" x="22" y={y + 23}>{p.name}</text>
            <text className={p.num ? 't-warm' : 't-accent'} x="338" y={y + 23} textAnchor="end">{p.how}</text>
            <text className="t-sub" x="22" y={y + 44}>{p.fixes}</text>
          </g>
        );
      })}
    </svg>
  );
}
