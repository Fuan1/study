/**
 * 부사가 들어가는 자리. 형태 예시(이 글이 만든 문장). 부사 상자는 pl-ui, 동사와 be 는 svg-berg.
 */
type Kind = 'verb' | 'adv' | 'plain';
type Part = { t: string; k: Kind };
type Row = { name: string; parts: Part[] };

const ROWS: Row[] = [
  { name: '일반동사 문장: 빈도부사는 동사 앞', parts: [{ t: 'I', k: 'plain' }, { t: 'always', k: 'adv' }, { t: 'eat', k: 'verb' }, { t: 'rice', k: 'plain' }] },
  { name: 'be 문장: 빈도부사는 be 뒤', parts: [{ t: 'She', k: 'plain' }, { t: 'is', k: 'verb' }, { t: 'always', k: 'adv' }, { t: 'late', k: 'plain' }] },
  { name: '목적어가 있으면 부사는 목적어 뒤', parts: [{ t: 'I', k: 'plain' }, { t: 'like', k: 'verb' }, { t: 'music', k: 'plain' }, { t: 'very much', k: 'adv' }] },
  { name: '끝자리 순서: 방법, 장소, 시간', parts: [{ t: 'I', k: 'plain' }, { t: 'study', k: 'verb' }, { t: 'hard', k: 'adv' }, { t: 'at home', k: 'adv' }, { t: 'today', k: 'adv' }] },
];

const CLS: Record<Kind, string> = { verb: 'svg-berg', adv: 'pl-ui', plain: 'svg-box' };
const bw = (t: string) => Math.max(48, t.length * 8 + 24);
const BH = 40;
const GAP = 6;
const PITCH = 88;
const y0 = (i: number) => 20 + i * PITCH;
const VB_H = y0(3) + 12 + BH + 8 + 4;

export default function AdverbSlots() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="부사의 자리. 빈도부사는 일반동사 앞이고 be 뒤다. 목적어가 있으면 방법 부사는 목적어 뒤이고, 끝자리에서는 방법, 장소, 시간 순서가 기본이다.">
      {ROWS.map((r, i) => {
        let x = 8;
        return (
          <g key={r.name}>
            <text className="t-strong" x="8" y={y0(i)}>{r.name}</text>
            {r.parts.map((p) => {
              const w = bw(p.t);
              const cx = x;
              x += w + GAP;
              return (
                <g key={p.t}>
                  <rect className={CLS[p.k]} x={cx} y={y0(i) + 12} width={w} height={BH} rx="6" />
                  <text className="t-strong" x={cx + w / 2} y={y0(i) + 12 + 25} textAnchor="middle">{p.t}</text>
                </g>
              );
            })}
          </g>
        );
      })}
    </svg>
  );
}
