/** WCAG 상대 휘도·대비 공식으로 직접 계산한다. 표시되는 비율은 계산값이다. */
function lum(hex: string) {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
const ratio = (a: string, b: string) => {
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

const PAIRS = [
  { fg: '#767676', bg: '#FFFFFF' },
  { fg: '#999999', bg: '#FFFFFF' },
  { fg: '#8E9BA8', bg: '#0E1318' },
  { fg: '#4E5D6B', bg: '#0E1318' },
];

export default function Contrast() {
  return (
    <svg viewBox="0 0 360 214" role="img" aria-label="글자색과 배경색 네 쌍의 대비 비율. 4.5 대 1 이상이면 일반 본문 기준(WCAG AA)을 통과한다.">
      {PAIRS.map((p, i) => {
        const x = 8 + (i % 2) * 176;
        const y = 6 + Math.floor(i / 2) * 104;
        const r = ratio(p.fg, p.bg);
        const pass = r >= 4.5;
        return (
          <g key={i}>
            <rect x={x} y={y} width="168" height="52" rx="6" fill={p.bg} stroke="var(--line)" />
            <text x={x + 14} y={y + 32} fontSize="17" style={{ fill: p.fg }}>글쓰기 버튼</text>
            <text className="t-sub" x={x} y={y + 72}>{p.fg} / {p.bg}</text>
            <text className={pass ? 't-good' : 't-bad'} x={x} y={y + 91}>{r.toFixed(2)} : 1 · {pass ? 'AA 통과' : 'AA 미달'}</text>
          </g>
        );
      })}
    </svg>
  );
}
