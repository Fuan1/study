/** 비교표의 같은 값으로 그린 포지션 맵. x = 월 200건 기준 월 비용, y = 고객 기준 5개 중 충족 개수. 모두 가상(가정). */
type P = { id: string; label: string; cost: number; met: boolean[]; sure: boolean; dx: number; dy: number; anchor: 'start' | 'middle' };

const N = 200; // 월 예약 건수(가정)
const costA = 19000 + 300 * N;
const costB = N <= 100 ? 9900 : 24900;

// met 순서: 예약금 선결제, 자동 리마인드, DM 바로 접수, 10분 안에 시작, 데이터 내보내기
const PTS: P[] = [
  { id: 'me', label: '우리', cost: 29000, met: [true, true, true, true, false], sure: true, dx: 12, dy: 5, anchor: 'start' },
  { id: 'a', label: 'A', cost: costA, met: [true, true, false, false, true], sure: false, dx: 12, dy: 5, anchor: 'start' },
  { id: 'b', label: 'B', cost: costB, met: [false, false, true, true, false], sure: false, dx: 12, dy: 5, anchor: 'start' },
  { id: 'dm', label: 'DM·수기', cost: 0, met: [false, false, true, true, false], sure: true, dx: -4, dy: -14, anchor: 'start' },
  { id: 'no', label: '안 함', cost: 0, met: [false, false, false, false, false], sure: true, dx: 12, dy: 5, anchor: 'start' },
];

const X0 = 56;
const X1 = 336;
const XMIN = -5000;
const XMAX = 90000;
const YMIN = -0.5;
const YMAX = 5;
const PY0 = 200; // y 값 YMIN 의 위치
const PYT = 40; // y 값 YMAX 의 위치
const xOf = (v: number) => X0 + ((v - XMIN) / (XMAX - XMIN)) * (X1 - X0);
const yOf = (v: number) => PY0 - ((v - YMIN) / (YMAX - YMIN)) * (PY0 - PYT);
const XT = [0, 30000, 60000, 90000];
const YT = [0, 1, 2, 3, 4, 5];
const LEG = PY0 + 84; // 범례 baseline
const VB_H = LEG + 12;
const fmt = (n: number) => n.toLocaleString('en-US');

export default function PositionMap() {
  const sc = (p: P) => p.met.filter(Boolean).length;
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label={`포지션 맵. ${PTS.map((p) => `${p.label}은 월 ${fmt(p.cost)}원, 충족 ${sc(p)}개${p.sure ? '' : ', 추정 포함'}`).join('. ')}.`}>
      <text className="t-sub" x="12" y="18">고객 기준 충족 수 (5개 중)</text>
      <line x1={X0} y1={PYT - 8} x2={X0} y2={PY0} stroke="var(--line)" strokeWidth="1.5" />
      <line x1={X0} y1={PY0} x2={X1} y2={PY0} stroke="var(--line)" strokeWidth="1.5" />
      {YT.map((v) => (
        <g key={v}>
          <line x1={X0 - 4} y1={yOf(v)} x2={X0} y2={yOf(v)} stroke="var(--line)" strokeWidth="1.5" />
          <text className="t-sub" x={X0 - 8} y={yOf(v) + 4} textAnchor="end">{v}</text>
        </g>
      ))}
      {XT.map((v) => (
        <text key={v} className="t-sub" x={xOf(v)} y={PY0 + 22} textAnchor="middle">{v === 0 ? '0' : `${v / 10000}만`}</text>
      ))}
      <text className="t-sub" x="348" y={PY0 + 46} textAnchor="end">월 비용 (월 200건 기준, 원)</text>
      {PTS.map((p) => (
        <g key={p.id}>
          <circle cx={xOf(p.cost)} cy={yOf(sc(p))} r="6" fill={p.sure ? (p.id === 'me' ? 'var(--warm)' : 'var(--accent)') : 'var(--bg)'} stroke={p.id === 'me' ? 'var(--warm)' : 'var(--accent)'} strokeWidth="2" strokeDasharray={p.sure ? undefined : '3 2'} />
          <text className={p.id === 'me' ? 't-warm' : 't-strong'} x={xOf(p.cost) + p.dx} y={yOf(sc(p)) + p.dy} textAnchor={p.anchor}>{p.label}</text>
        </g>
      ))}
      <circle cx="18" cy={LEG - 4} r="5" fill="var(--accent)" stroke="var(--accent)" strokeWidth="2" />
      <text className="t-sub" x="30" y={LEG}>확인한 값만</text>
      <circle cx="148" cy={LEG - 4} r="5" fill="var(--bg)" stroke="var(--accent)" strokeWidth="2" strokeDasharray="3 2" />
      <text className="t-sub" x="160" y={LEG}>추정이 섞임</text>
    </svg>
  );
}
