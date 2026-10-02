/** 사용자 두 명으로 열린 퍼널과 닫힌 퍼널의 차이를 그린다. 가정한 예시. */
const STEPS = ['방문', '장바구니', '결제'];
const COLX = [172, 242, 312];
// 사용자별로 지나간 단계(true). A는 첫 단계부터, B는 저장한 장바구니로 바로 들어온다.
const USERS = [
  { name: 'A  방문부터', enters: 0 },
  { name: 'B  장바구니부터', enters: 1 },
];
const PANEL = 156;

function Panel({ title, closed, y0 }: { title: string; closed: boolean; y0: number }) {
  // 단계별 사용자 수: 닫힌 퍼널은 첫 단계로 들어온 사람만 센다.
  const counts = STEPS.map((_, s) => USERS.filter((u) => u.enters <= s && (!closed || u.enters === 0)).length);
  return (
    <g>
      <text className="t-strong" x="8" y={y0 + 20}>{title}</text>
      {STEPS.map((s, i) => (
        <text key={s} className="t-sub" x={COLX[i]} y={y0 + 46} textAnchor="middle">{s}</text>
      ))}
      {USERS.map((u, ui) => {
        const cy = y0 + 68 + ui * 30;
        return (
          <g key={u.name}>
            <text className="t-sub" x="8" y={cy + 4}>{u.name}</text>
            {STEPS.map((s, si) => {
              const reached = u.enters <= si;
              const counted = reached && (!closed || u.enters === 0);
              if (!reached) return <text key={s} className="t-sub" x={COLX[si]} y={cy + 4} textAnchor="middle">-</text>;
              return counted
                ? <circle key={s} cx={COLX[si]} cy={cy} r="9" fill="var(--accent)" />
                : <circle key={s} cx={COLX[si]} cy={cy} r="9" className="svg-box-bad" />;
            })}
          </g>
        );
      })}
      <text className="t-strong" x="8" y={y0 + 132}>단계별 사용자 수</text>
      {counts.map((c, i) => (
        <text key={i} className={closed ? 't-strong' : 't-accent'} x={COLX[i]} y={y0 + 132} textAnchor="middle">{c}명</text>
      ))}
    </g>
  );
}

export default function OpenClosed() {
  const h = PANEL + 132 + 3 + 10; // 둘째 패널 마지막 글자 baseline + 내림 + 아래 여백
  return (
    <svg viewBox={`0 0 360 ${h}`} role="img" aria-label="사용자 A는 방문부터 시작하고 사용자 B는 저장해 둔 장바구니로 바로 들어온다. 닫힌 퍼널은 첫 단계로 들어온 A만 세어 단계별 1명, 1명, 1명이다. 열린 퍼널은 B도 들어온 단계부터 세어 1명, 2명, 2명이다.">
      <Panel title="닫힌 퍼널: 첫 단계로 들어온 사람만" closed y0={0} />
      <line x1="8" y1={PANEL - 8} x2="352" y2={PANEL - 8} stroke="var(--line)" />
      <Panel title="열린 퍼널: 어느 단계로 들어와도" closed={false} y0={PANEL} />
    </svg>
  );
}
