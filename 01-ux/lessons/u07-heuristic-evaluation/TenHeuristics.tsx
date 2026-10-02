type Group = { name: string; items: [number, string][] };

const GROUPS: Group[] = [
  { name: '상태와 언어', items: [[1, '상태의 가시성'], [2, '현실 세계와의 일치']] },
  { name: '조작과 실수', items: [[3, '사용자 통제와 자유'], [5, '오류 예방'], [9, '오류 인식·진단·복구']] },
  { name: '일관성', items: [[4, '일관성과 표준']] },
  { name: '기억과 속도', items: [[6, '회상보다 인식'], [7, '유연성과 효율성']] },
  { name: '덜어내기와 도움', items: [[8, '미적·미니멀 디자인'], [10, '도움말과 문서']] },
];

export default function TenHeuristics() {
  const w = 170;
  const h = 30;
  let y = 4;
  return (
    <svg viewBox="0 0 360 372" role="img" aria-label="Nielsen의 10가지 사용성 휴리스틱을 상태와 언어, 조작과 실수, 일관성, 기억과 속도, 덜어내기와 도움의 다섯 묶음으로 나눈 도식">
      {GROUPS.map((g) => {
        const top = y;
        const rows = Math.ceil(g.items.length / 2);
        y += 22 + rows * (h + 6) + 6;
        return (
          <g key={g.name}>
            <text className="t-accent" x="8" y={top + 14}>{g.name}</text>
            {g.items.map(([n, label], i) => {
              const x = 8 + (i % 2) * (w + 4);
              const yy = top + 22 + Math.floor(i / 2) * (h + 6);
              return (
                <g key={n}>
                  <rect className="svg-box" x={x} y={yy} width={w} height={h} rx="6" />
                  <text x={x + 9} y={yy + 20} fontSize="12.5"><tspan style={{ fill: 'var(--accent)', fontWeight: 700 }}>{n}</tspan><tspan dx="6">{label}</tspan></text>
                </g>
              );
            })}
          </g>
        );
      })}
    </svg>
  );
}
