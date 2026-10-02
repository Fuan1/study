/** 자체 생성한 가상 데이터 3벌(각 200개). 모두 평균 50.0, 표준편차 10.0 으로 맞췄다. 구간 폭 5, 20에서 110까지 18칸. */
const SETS = [
  { name: 'A 종 모양', med: 50.2, c: [1, 3, 8, 22, 27, 37, 42, 27, 18, 9, 6, 0, 0, 0, 0, 0, 0, 0] },
  { name: 'B 봉우리 둘', med: 50.0, c: [0, 0, 7, 36, 42, 15, 12, 51, 29, 7, 1, 0, 0, 0, 0, 0, 0, 0] },
  { name: 'C 오른쪽 꼬리', med: 45.9, c: [0, 0, 0, 0, 75, 59, 26, 17, 9, 3, 4, 3, 1, 1, 1, 0, 0, 1] },
];
const LO = 20;
const BIN = 5;
const X0 = 16;
const W = 328;
const NB = SETS[0].c.length;
const STEP = W / NB;
const BAR_H = 64; // 공통 눈금(가장 큰 값 75)
const MAX = Math.max(...SETS.flatMap((s) => s.c));
const xOf = (v: number) => X0 + ((v - LO) / BIN) * STEP;
const TITLE0 = 58; // 첫 패널 제목 baseline
const PITCH = 122; // 제목 baseline 끼리 간격: 제목 20 + 막대 64 + 패널 사이 38
const lastBase = TITLE0 + (SETS.length - 1) * PITCH + 20 + BAR_H; // 386
const H = lastBase + 18 + 6 + 12; // 눈금 글자 baseline + 아래 6 + 여백 12

export default function SameStats() {
  return (
    <svg viewBox={`0 0 360 ${H}`} role="img" aria-label="평균 50.0과 표준편차 10.0이 같은 세 데이터. 종 모양, 봉우리가 둘, 오른쪽으로 긴 꼬리 모양으로 분포가 서로 다르다. 중앙값은 각각 50.2, 50.0, 45.9다.">
      <text className="t-strong" x={X0} y="18">셋 모두 평균 50.0 · 표준편차 10.0</text>
      {SETS.map((s, k) => {
        const ty = TITLE0 + k * PITCH;
        const top = ty + 20;
        const base = top + BAR_H;
        return (
          <g key={s.name}>
            <text className="t-strong" x={X0} y={ty}>{s.name}</text>
            <text className="t-sub" x={X0 + W} y={ty} textAnchor="end">중앙값 {s.med.toFixed(1)}</text>
            {s.c.map((c, i) => {
              const h = (c / MAX) * BAR_H;
              return h > 0 ? <rect key={i} className="svg-berg" x={X0 + i * STEP + 1} y={base - h} width={STEP - 2} height={h} /> : null;
            })}
            <line x1={X0} y1={base} x2={X0 + W} y2={base} stroke="var(--line)" strokeWidth="1.5" />
            <line x1={xOf(50)} y1={top - 4} x2={xOf(50)} y2={base} stroke="var(--warm)" strokeWidth="2" strokeDasharray="5 3" />
          </g>
        );
      })}
      {[20, 50, 80, 110].map((v) => (
        <text key={v} className="t-sub" x={xOf(v)} y={lastBase + 18} textAnchor={v === 20 ? 'start' : v === 110 ? 'end' : 'middle'}>{v}</text>
      ))}
    </svg>
  );
}
