const PHASES = [
  { name: '찾기', act: ['빈 방을', '확인한다'], v: 0.25, pain: '빈 방 안 보임', opp: ['빈 방을', '한눈에'] },
  { name: '예약', act: ['시간을', '고른다'], v: 0.55, pain: '', opp: [] },
  { name: '이동', act: ['방으로', '간다'], v: 0.1, pain: '이미 다른 팀', opp: ['사용 중 표시', '실시간 반영'] },
  { name: '사용', act: ['회의를', '한다'], v: 0.85, pain: '', opp: [] },
];
const COLW = 86.5;
const BW = 82;
const cx = (i: number) => 8 + i * COLW + BW / 2;
const TOP = 134;
const BOT = 226;
const cy = (v: number) => BOT - v * (BOT - TOP);

export default function JourneyMap() {
  const d = PHASES.map((p, i) => `${i === 0 ? 'M' : 'L'}${cx(i)} ${cy(p.v)}`).join(' ');
  return (
    <svg viewBox="0 0 360 318" role="img" aria-label="회의실 예약을 가정한 여정 지도. 찾기, 예약, 이동, 사용 네 단계의 행동과 감정 곡선. 감정이 가장 낮은 두 지점이 개선 기회가 된다.">
      {PHASES.map((p, i) => (
        <g key={p.name}>
          <rect className="svg-box-key" x={8 + i * COLW} y="8" width={BW} height="32" rx="6" />
          <text className="t-strong" x={cx(i)} y="29" textAnchor="middle">{p.name}</text>
          {p.act.map((t, k) => (
            <text key={t} x={cx(i)} y={76 + k * 17} textAnchor="middle" fontSize="13">{t}</text>
          ))}
        </g>
      ))}
      <text className="t-sub" x="8" y="58">행동</text>
      <text className="t-sub" x="8" y="122">감정(가정한 값)</text>
      <line x1="8" y1={(TOP + BOT) / 2} x2="352" y2={(TOP + BOT) / 2} stroke="var(--line)" strokeDasharray="4 3" />
      <path d={d} fill="none" stroke="var(--accent)" strokeWidth="2.5" />
      {PHASES.map((p, i) => (
        <g key={p.name}>
          <circle cx={cx(i)} cy={cy(p.v)} r="5" fill={p.pain ? 'var(--bad)' : 'var(--accent)'} />
          {p.pain && <text className="t-bad" x={cx(i)} y={cy(p.v) + 21} textAnchor="middle">{p.pain}</text>}
        </g>
      ))}
      <text className="t-sub" x="8" y="258">기회</text>
      {PHASES.map((p, i) => (
        <g key={p.name}>
          <rect className={p.opp.length ? 'svg-box-key' : 'svg-box'} x={8 + i * COLW} y="266" width={BW} height="44" rx="6" />
          {p.opp.length ? (
            p.opp.map((t, k) => <text key={t} className="t-accent" x={cx(i)} y={285 + k * 16} textAnchor="middle">{t}</text>)
          ) : (
            <text className="t-sub" x={cx(i)} y="293" textAnchor="middle">유지</text>
          )}
        </g>
      ))}
    </svg>
  );
}
