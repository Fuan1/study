const ROWS = [
  { w: 'a university', sp: '철자는 u 로 시작', sound: '자음 소리 /j/', res: 'a 를 쓴다' },
  { w: 'an hour', sp: '철자는 h 로 시작', sound: '모음 소리 (h 묵음)', res: 'an 을 쓴다' },
  { w: 'an orange', sp: '철자는 o 로 시작', sound: '모음 소리', res: 'an 을 쓴다' },
  { w: 'a banana', sp: '철자는 b 로 시작', sound: '자음 소리 /b/', res: 'a 를 쓴다' },
];

const RH = 60;
const STEP = 68;

export default function ASound() {
  const VB_H = 8 + (ROWS.length - 1) * STEP + RH + 8;
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="a와 an은 철자가 아니라 첫 소리로 정한다. university는 자음 소리라 a, hour는 모음 소리라 an, orange는 an, banana는 a.">
      {ROWS.map((r, i) => {
        const y = 8 + i * STEP;
        return (
          <g key={r.w}>
            <rect className="svg-box" x="8" y={y} width="344" height={RH} rx="8" />
            <text className="t-strong" x="22" y={y + 26}>{r.w}</text>
            <text className="t-sub" x="22" y={y + 46}>{r.sp}</text>
            <text className="t-strong" x="190" y={y + 26}>{r.sound}</text>
            <text className="t-good" x="190" y={y + 46}>{r.res}</text>
          </g>
        );
      })}
    </svg>
  );
}
