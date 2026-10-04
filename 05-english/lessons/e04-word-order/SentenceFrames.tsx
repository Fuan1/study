/**
 * 기본 문장틀 네 개. 형태 예시(이 글이 만든 문장). 동사와 be 상자만 강조한다.
 */
type Part = { t: string; verb?: boolean };
type Frame = { name: string; parts: Part[]; gloss: string };

const FRAMES: Frame[] = [
  { name: '틀 1 · 주어 + 동사', parts: [{ t: 'She' }, { t: 'arrived', verb: true }], gloss: '그녀는 도착했다.' },
  { name: '틀 2 · 주어 + 동사 + 목적어', parts: [{ t: 'I' }, { t: 'like', verb: true }, { t: 'music' }], gloss: '나는 음악을 좋아한다.' },
  { name: '틀 3 · 주어 + be + 형용사·명사·장소', parts: [{ t: 'She' }, { t: 'is', verb: true }, { t: 'tired' }], gloss: '그녀는 피곤하다.' },
  { name: '틀 4 · 틀 2 + 장소 + 시간', parts: [{ t: 'We' }, { t: 'met', verb: true }, { t: 'Ana' }, { t: 'at school' }, { t: 'today' }], gloss: '우리는 오늘 학교에서 아나를 만났다.' },
];

const bw = (t: string) => Math.max(48, t.length * 8 + 24);
const BH = 40;
const GAP = 6;
const PITCH = 104;
const y0 = (i: number) => 20 + i * PITCH;
const VB_H = y0(3) + 12 + BH + 22 + 12;

export default function SentenceFrames() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="기본 문장틀 네 개. 주어와 동사, 주어와 동사와 목적어, 주어와 be와 형용사, 그리고 목적어 뒤에 장소와 시간을 붙인 틀.">
      {FRAMES.map((f, i) => {
        let x = 8;
        return (
          <g key={f.name}>
            <text className="t-strong" x="8" y={y0(i)}>{f.name}</text>
            {f.parts.map((p) => {
              const w = bw(p.t);
              const cx = x;
              x += w + GAP;
              return (
                <g key={p.t}>
                  <rect className={p.verb ? 'svg-berg' : 'svg-box'} x={cx} y={y0(i) + 12} width={w} height={BH} rx="6" />
                  <text className="t-strong" x={cx + w / 2} y={y0(i) + 12 + 25} textAnchor="middle">{p.t}</text>
                </g>
              );
            })}
            <text className="t-sub" x="8" y={y0(i) + 12 + BH + 22}>{f.gloss}</text>
          </g>
        );
      })}
    </svg>
  );
}
