/** 일정이 밀릴 때 따지는 순서. 출처마다 일부를 뒷받침하지만 순서 자체는 이 글의 정리(관행)다. */
type Step = { q: string; cond: string; out: string; next: string };

const STEPS: Step[] = [
  { q: '목표가 아직 필요한가', cond: '약속한 결과를 여전히 원하나', out: '아니오이면 중단하고 다시 계획', next: '필요하다면' },
  { q: '범위를 줄일 수 있나', cond: '필수가 아닌 일이 남았나', out: '예이면 선택 범위부터 뺀다', next: '못 줄이면' },
  { q: '시간을 늘려도 되나', cond: '남은 일이 필수이고 미지수가 없나', out: '예이면 날짜를 늦춘다', next: '못 늘리면' },
  { q: '사람을 늘려도 되나', cond: '일이 나뉘고 새 사람이 바로 쓸 수 있나', out: '예이면 추가하되 마지막 수단', next: '' },
];

// 여백 기준: 상자 안 14px, 세 줄 상자 높이 87, 상자 사이 34px.
const H = 87;
const GAP = 34;
const y = (i: number) => 8 + i * (H + GAP);
// 마지막 상자 아랫변 + 선 두께 절반 + 아래 여백 8
const VB_H = y(STEPS.length - 1) + H + 1 + 8;

export default function SlipFlow() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="일정이 밀릴 때의 판단 순서. 목표가 필요한지, 범위를 줄일 수 있는지, 시간을 늘려도 되는지, 사람을 늘려도 되는지 순서로 본다.">
      <defs>
        <marker id="slip-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker>
      </defs>
      {STEPS.map((s, i) => (
        <g key={s.q}>
          <rect className={i === 1 ? 'svg-box-key' : 'svg-box'} x="8" y={y(i)} width="344" height={H} rx="8" />
          <text className="t-strong" x="22" y={y(i) + 29}>{i + 1}. {s.q}</text>
          <text className="t-sub" x="22" y={y(i) + 50}>{s.cond}</text>
          <text className="t-accent" x="22" y={y(i) + 71}>{s.out}</text>
          {s.next && (
            <g>
              <line className="svg-flow" x1="40" y1={y(i) + H + 5} x2="40" y2={y(i) + H + GAP - 5} markerEnd="url(#slip-arr)" />
              <text className="t-sub" x="54" y={y(i) + H + GAP / 2 + 5}>{s.next}</text>
            </g>
          )}
        </g>
      ))}
    </svg>
  );
}
