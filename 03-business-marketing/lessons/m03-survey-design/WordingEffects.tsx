/** Pew Research Center "Writing Survey Questions" 에 실린 값. 문구와 질문 순서만 바꿔도 비율이 달라진다. */
type Bar = { label: string; v: number };
type Group = { title: string; a: Bar; b: Bar };

const GROUPS: Group[] = [
  { title: '문구: 찬성 %', a: { label: '생을 끝낼 수단을 제공', v: 51 }, b: { label: '자살을 돕도록 허용', v: 44 } },
  { title: '순서: 법적 결합 찬성 %', a: { label: '결혼 질문 뒤에 물음', v: 45 }, b: { label: '단독으로 물음', v: 37 } },
  { title: '순서: 국가 상황 불만족 %', a: { label: '앞 질문 뒤에 물음', v: 88 }, b: { label: '단독으로 물음', v: 78 } },
];

const X0 = 16;
const W = 328; // 100% 의 폭
const BAR_H = 12;
const GROUP_H = 106; // 둘째 막대 아랫변 = 그룹 위 + 106
const PITCH = GROUP_H + 28;
const TOP = 8;
const VB_H = TOP + (GROUPS.length - 1) * PITCH + GROUP_H + 1 + 8;

export default function WordingEffects() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="문구와 질문 순서 효과. 같은 내용을 다른 낱말로 물으면 찬성이 51퍼센트와 44퍼센트로 갈렸다. 결혼 질문 뒤에 물으면 법적 결합 찬성이 45퍼센트, 단독으로 물으면 37퍼센트였다. 앞 질문 뒤에 물으면 국가 상황 불만족이 88퍼센트, 단독으로 물으면 78퍼센트였다.">
      {GROUPS.map((g, i) => {
        const gy = TOP + i * PITCH;
        return (
          <g key={g.title}>
            <text className="t-strong" x={X0} y={gy + 14}>{g.title}</text>
            {[g.a, g.b].map((b, k) => {
              const ty = gy + 42 + k * 44;
              return (
                <g key={b.label}>
                  <text className="t-sub" x={X0} y={ty}>{b.label}</text>
                  <text className="t-strong" x={X0 + W} y={ty} textAnchor="end">{b.v}%</text>
                  <rect x={X0} y={ty + 8} width={W} height={BAR_H} rx="3" fill="var(--line)" />
                  <rect x={X0} y={ty + 8} width={(W * b.v) / 100} height={BAR_H} rx="3" fill={k === 0 ? 'var(--accent)' : 'var(--muted)'} />
                </g>
              );
            })}
          </g>
        );
      })}
    </svg>
  );
}
