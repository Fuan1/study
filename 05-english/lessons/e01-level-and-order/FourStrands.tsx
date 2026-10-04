/**
 * 출처: Nation, Yamamoto(2012)의 네 칸 구분과 "각 칸에 대략 같은 시간" 원칙.
 * 칸마다 4분의 1은 균등 배분 원칙에서 계산한다(1 / 4).
 */
type Strand = { title: string; sub: string; message: boolean };

const STRANDS: Strand[] = [
  { title: '받아들이기', sub: '듣기·읽기. 대부분 아는 쉬운 자료', message: true },
  { title: '내보내기', sub: '말하기·쓰기. 하고 싶은 말이 먼저', message: true },
  { title: '언어 학습', sub: '소리·단어·문법을 일부러 공부', message: false },
  { title: '유창성', sub: '아는 것을 빠르게. 새 내용은 적게', message: true },
];

const H = 66;
const GAP = 16;
const SHARE = Math.round(100 / STRANDS.length);

export default function FourStrands() {
  const vbH = 8 + STRANDS.length * H + (STRANDS.length - 1) * GAP + 8;
  return (
    <svg viewBox={`0 0 360 ${vbH}`} role="img" aria-label="시간을 네 칸으로 나눈다. 받아들이기, 내보내기, 언어 학습, 유창성에 각각 대략 4분의 1씩 쓴다.">
      {STRANDS.map((s, i) => {
        const y = 8 + i * (H + GAP);
        return (
          <g key={s.title}>
            <rect className={s.message ? 'svg-berg' : 'svg-box'} x="8" y={y} width="344" height={H} rx="8" />
            <text className="t-strong" x="22" y={y + 29}>{s.title}</text>
            <text className="t-sub" x="22" y={y + 50}>{s.sub}</text>
            <text className="t-strong" x="338" y={y + 29} textAnchor="end">{SHARE}%</text>
          </g>
        );
      })}
    </svg>
  );
}
