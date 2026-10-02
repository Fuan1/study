type Q = { x: number; y: number; head: string; q: string[]; methods: string[]; key?: boolean };

const QUADS: Q[] = [
  { x: 8, y: 36, head: '정성 · 태도', q: ['왜 그렇게', '생각하나'], methods: ['인터뷰', '포커스 그룹'] },
  { x: 184, y: 36, head: '정성 · 행동', q: ['왜 막히나,', '어떻게 고치나'], methods: ['사용성 테스트', '현장 연구', '일기 연구'], key: true },
  { x: 8, y: 196, head: '정량 · 태도', q: ['그렇게 생각하는', '사람이 얼마나 되나'], methods: ['설문', '트리 테스트'] },
  { x: 184, y: 196, head: '정량 · 행동', q: ['실제로 얼마나,', '무엇을 하나'], methods: ['분석 로그', 'A/B 테스트'] },
];

export default function MethodMap() {
  const w = 168;
  const h = 150;
  return (
    <svg viewBox="0 0 360 372" role="img" aria-label="리서치 방법을 말하는 것과 하는 것, 정성과 정량의 두 축으로 나눈 네 칸. 정성 칸은 왜와 어떻게 고치나를, 정량 칸은 얼마나를 답한다.">
      <text className="t-sub" x="92" y="22" textAnchor="middle">사람들이 말하는 것</text>
      <text className="t-sub" x="268" y="22" textAnchor="middle">사람들이 하는 것</text>
      {QUADS.map((c) => (
        <g key={c.head}>
          <rect className={c.key ? 'svg-box-key' : 'svg-box'} x={c.x} y={c.y} width={w} height={h} rx="8" />
          <text className="t-accent" x={c.x + 12} y={c.y + 24}>{c.head}</text>
          {c.q.map((t, i) => (
            <text key={t} className="t-strong" x={c.x + 12} y={c.y + 48 + i * 18}>{t}</text>
          ))}
          {c.methods.map((t, i) => (
            <text key={t} className="t-sub" x={c.x + 12} y={c.y + 98 + i * 18}>{t}</text>
          ))}
        </g>
      ))}
      <text className="t-sub" x="180" y="362" textAnchor="middle">카드 소팅 같은 방법은 정성과 정량 양쪽으로 쓴다</text>
    </svg>
  );
}
