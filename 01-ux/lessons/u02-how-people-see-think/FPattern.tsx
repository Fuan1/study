/** 핵심을 둘 위치를 보이는 도식. 실제 시선 데이터가 아니라 NN/g가 설명한 F자 모양을 단순화해 그린 것이다. */
export default function FPattern() {
  const x0 = 24;
  const w = 312;
  const rows = 9;
  const y0 = 20;
  const dy = 20;
  // 글줄: 길이를 조금씩 달리한 회색 막대
  const lens = [1, 0.96, 0.9, 1, 0.7, 0.95, 0.85, 0.92, 0.6];
  const accent = { fill: 'var(--accent)', opacity: 0.35 } as const;
  return (
    <svg viewBox="0 0 360 262" role="img" aria-label="글줄을 나타낸 회색 막대 위에 F자 모양의 영역이 겹쳐 있다. 첫 줄 전체, 조금 아래의 짧은 한 줄, 그리고 왼쪽 가장자리를 따라 내려가는 세로 띠가 시선이 많이 가는 곳이다.">
      <rect className="svg-box" x="8" y="6" width="344" height={rows * dy + 16} rx="8" />
      {lens.map((l, i) => (
        <rect key={i} x={x0} y={y0 + i * dy} width={w * l} height="9" rx="3" style={{ fill: 'var(--line)' }} />
      ))}
      <rect x={x0 - 6} y={y0 - 6} width={w + 12} height="22" rx="5" style={accent} />
      <rect x={x0 - 6} y={y0 + 4 * dy - 6} width={w * 0.62} height="22" rx="5" style={accent} />
      <rect x={x0 - 6} y={y0 - 6} width="54" height={rows * dy - 4} rx="5" style={accent} />
      <text className="t-accent" x={x0 + 2} y={y0 + rows * dy + 32} >핵심은 첫 줄 · 줄 앞 단어 · 왼쪽 가장자리에</text>
      <text className="t-sub" x={x0 + 2} y={y0 + rows * dy + 50}>서식 없는 긴 글 기준의 거친 경향</text>
    </svg>
  );
}
