/** 값은 Johnson과 Goldstein (2003, Science)의 국가별 효과적 동의율(장기 기증 등록 기준)이다. 막대 길이는 값에서 계산한다. */
type Row = { name: string; v: number; optOut: boolean };

const ROWS: Row[] = [
  { name: '덴마크', v: 4.25, optOut: false },
  { name: '독일', v: 12, optOut: false },
  { name: '영국', v: 17.17, optOut: false },
  { name: '네덜란드', v: 27.5, optOut: false },
  { name: '스웨덴', v: 85.9, optOut: true },
  { name: '벨기에', v: 98, optOut: true },
  { name: '폴란드', v: 99.5, optOut: true },
  { name: '포르투갈', v: 99.64, optOut: true },
  { name: '프랑스', v: 99.91, optOut: true },
  { name: '헝가리', v: 99.97, optOut: true },
  { name: '오스트리아', v: 99.98, optOut: true },
];

export default function DefaultEffect() {
  const x0 = 78;
  const bw = 214;
  const dy = 24;
  const top = 40;
  return (
    <svg viewBox="0 0 360 322" role="img" aria-label="유럽 11개 나라의 효과적 장기 기증 동의율. 기본값이 비기증인 나라(덴마크, 독일, 영국, 네덜란드)는 4퍼센트에서 28퍼센트, 기본값이 기증인 나라는 86퍼센트에서 99.98퍼센트다.">
      <rect x="8" y="6" width="12" height="12" rx="2" style={{ fill: 'var(--warm-soft)', stroke: 'var(--warm)' }} />
      <text className="t-sub" x="26" y="17">기본값: 기증하지 않음(옵트인)</text>
      {ROWS.map((r, i) => {
        const y = top + 8 + i * dy;
        const w = (r.v / 100) * bw;
        return (
          <g key={r.name}>
            <text className="t-sub" x="8" y={y + 15}>{r.name}</text>
            <rect x={x0} y={y} width={bw} height="18" rx="3" className="svg-box" />
            <rect x={x0} y={y} width={w} height="18" rx="3" style={r.optOut ? { fill: 'var(--accent-soft)', stroke: 'var(--accent)', strokeWidth: 1.2 } : { fill: 'var(--warm-soft)', stroke: 'var(--warm)', strokeWidth: 1.2 }} />
            <text className={r.optOut ? 't-accent' : 't-warm'} x={x0 + bw + 8} y={y + 15} style={{ fontSize: 12.5, fontWeight: 700 }}>{r.v}%</text>
          </g>
        );
      })}
      <rect x="8" y="26" width="12" height="12" rx="2" style={{ fill: 'var(--accent-soft)', stroke: 'var(--accent)' }} />
      <text className="t-sub" x="26" y="37">기본값: 기증함(옵트아웃)</text>
    </svg>
  );
}
