/**
 * 출처: Hong, Kim, Chung (2010) Table 2. 한국 초등 학습자(99명) 영어 발화에서 관찰된 모음 끼움 예.
 * 원래 음절 수와 끼운 뒤의 음절 수를 블록으로 센다. ins 가 true 인 블록이 끼워 넣은 모음 음절이다.
 */
type Word = { w: string; target: number; learner: { ins: boolean }[] };

const WORDS: Word[] = [
  { w: 'change', target: 1, learner: [{ ins: false }, { ins: true }] },
  { w: 'large', target: 1, learner: [{ ins: false }, { ins: true }] },
  { w: 'bring', target: 1, learner: [{ ins: true }, { ins: false }] },
  { w: 'since', target: 1, learner: [{ ins: false }, { ins: true }] },
  { w: 'brother', target: 2, learner: [{ ins: true }, { ins: false }, { ins: false }] },
  { w: 'around', target: 2, learner: [{ ins: false }, { ins: false }, { ins: true }] },
];

const COL1 = 100;
const COL2 = 228;
const BW = 30;
const BG = 6;
const BH = 28;
const TOP = 40;
const PITCH = 40;

export default function SyllableInflation() {
  const VB_H = TOP + (WORDS.length - 1) * PITCH + BH + 1 + 10;
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="한국 학습자의 영어 발화에서 모음이 끼어 음절 수가 늘어난 예. change, large, bring, since는 한 음절에서 두 음절로, brother와 around는 두 음절에서 세 음절로.">
      <text className="t-sub" x={COL1} y="20">원래 음절</text>
      <text className="t-sub" x={COL2} y="20">끼운 뒤</text>
      {WORDS.map((w, i) => {
        const y = TOP + i * PITCH;
        return (
          <g key={w.w}>
            <text className="t-strong" x="8" y={y + 19}>{w.w}</text>
            {Array.from({ length: w.target }, (_, k) => (
              <rect key={k} className="svg-box" x={COL1 + k * (BW + BG)} y={y} width={BW} height={BH} rx="4" />
            ))}
            {w.learner.map((b, k) => (
              <rect key={k} className={b.ins ? 'svg-tip' : 'svg-box'} x={COL2 + k * (BW + BG)} y={y} width={BW} height={BH} rx="4" />
            ))}
          </g>
        );
      })}
    </svg>
  );
}
