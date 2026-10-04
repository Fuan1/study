type Part = { t: string; hl?: boolean };
type Row = { label: string; parts: Part[] };

const ROWS: Row[] = [
  { label: '현재 (he)', parts: [{ t: 'He' }, { t: 'works', hl: true }] },
  { label: '현재진행', parts: [{ t: 'I' }, { t: 'am', hl: true }, { t: 'working', hl: true }] },
  { label: '과거', parts: [{ t: 'I' }, { t: 'worked', hl: true }] },
  { label: '미래', parts: [{ t: 'I' }, { t: 'will', hl: true }, { t: 'work' }] },
  { label: '미래', parts: [{ t: 'I' }, { t: 'am going to', hl: true }, { t: 'work' }] },
  { label: '현재완료', parts: [{ t: 'I' }, { t: 'have', hl: true }, { t: 'worked', hl: true }] },
];

const X0 = 108;
const BH = 36;
const PITCH = 52;
const GAP = 8;
const bw = (t: string) => Math.max(36, Math.round(t.length * 8.4) + 24);

export default function Frames() {
  const VB_H = 8 + (ROWS.length - 1) * PITCH + BH + 8;
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="시제별 문장틀. 현재는 he 뒤에 works, 현재진행은 am working, 과거는 worked, 미래는 will work 또는 am going to work, 현재완료는 have worked 로 동사 자리만 바뀐다.">
      {ROWS.map((r, i) => {
        const y = 8 + i * PITCH;
        let x = X0;
        return (
          <g key={i}>
            <text className="t-strong" x="8" y={y + 23}>{r.label}</text>
            {r.parts.map((p) => {
              const w = bw(p.t);
              const cx = x + w / 2;
              const node = (
                <g key={p.t}>
                  <rect className={p.hl ? 'svg-berg' : 'svg-box'} x={x} y={y} width={w} height={BH} rx="6" />
                  <text className="t-strong" x={cx} y={y + 23} textAnchor="middle">{p.t}</text>
                </g>
              );
              x += w + GAP;
              return node;
            })}
          </g>
        );
      })}
    </svg>
  );
}
