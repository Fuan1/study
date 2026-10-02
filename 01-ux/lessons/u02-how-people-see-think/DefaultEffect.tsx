/** 값은 Johnson과 Goldstein (2003, Science)의 국가별 효과적 동의율(장기 기증 등록 기준)이다. 막대 길이는 값에서 계산한다. */
type Row = { name: string; v: number; optOut: boolean };

const ROWS: Row[] = [
  { name: '덴마크', v: 4.25, optOut: false },
  { name: '독일', v: 12, optOut: false },
  { name: '스웨덴', v: 85.9, optOut: true },
  { name: '오스트리아', v: 99.98, optOut: true },
];

export default function DefaultEffect() {
  const x0 = 82;
  const bw = 210;
  const bh = 22;
  const dy = 36;
  const top = 68;
  return (
    <svg viewBox="0 0 360 208" role="img" aria-label="유럽 4개 나라의 효과적 장기 기증 동의율. 기본값이 비기증인 덴마크는 4.25퍼센트, 독일은 12퍼센트이고, 기본값이 기증인 스웨덴은 85.9퍼센트, 오스트리아는 99.98퍼센트다.">
      <rect x="8" y="8" width="12" height="12" rx="2" style={{ fill: 'var(--warm-soft)', stroke: 'var(--warm)' }} />
      <text className="t-sub" x="26" y="18.5">기본값: 기증하지 않음(옵트인)</text>
      {ROWS.map((r, i) => {
        const y = top + i * dy;
        const w = (r.v / 100) * bw;
        return (
          <g key={r.name}>
            <text className="t-sub" x="8" y={y + 15.5}>{r.name}</text>
            <rect x={x0} y={y} width={bw} height={bh} rx="3" className="svg-box" />
            <rect x={x0} y={y} width={w} height={bh} rx="3" style={r.optOut ? { fill: 'var(--accent-soft)', stroke: 'var(--accent)', strokeWidth: 1.2 } : { fill: 'var(--warm-soft)', stroke: 'var(--warm)', strokeWidth: 1.2 }} />
            <text className={r.optOut ? 't-accent' : 't-warm'} x={x0 + bw + 8} y={y + 15.5} style={{ fontSize: 12.5, fontWeight: 700 }}>{r.v}%</text>
          </g>
        );
      })}
      <rect x="8" y="32" width="12" height="12" rx="2" style={{ fill: 'var(--accent-soft)', stroke: 'var(--accent)' }} />
      <text className="t-sub" x="26" y="42.5">기본값: 기증함(옵트아웃)</text>
    </svg>
  );
}
