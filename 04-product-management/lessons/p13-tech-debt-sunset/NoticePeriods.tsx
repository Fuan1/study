/**
 * 출처 값(개월): Google Cloud Platform Terms of Service 1.4(e) 12개월 전 통지(pre-GA 제외).
 * Kubernetes Deprecation Policy: 기능·동작 폐기 후 1년 이상(Rule 7), 사용자용 CLI GA 12개월 또는 2릴리스 중 긴 쪽(Rule 5a),
 * 베타 API 폐기 후 9개월 또는 3릴리스 중 긴 쪽(Rule 4a), 알파 API는 공지 없이 제거 가능.
 * 각 제품의 자기 약속이며 업계 표준이 아니다.
 */
type Row = { title: string; months: number; text: string; src: 'gcp' | 'k8s' };

const ROWS: Row[] = [
  { title: 'Google Cloud 약관 · 중단 통지', months: 12, text: '12개월 전에 통지', src: 'gcp' },
  { title: 'Kubernetes · 기능·동작 폐기', months: 12, text: '공지 뒤 1년 이상 동작', src: 'k8s' },
  { title: 'Kubernetes · 사용자용 CLI (GA)', months: 12, text: '12개월 또는 2릴리스 중 긴 쪽', src: 'k8s' },
  { title: 'Kubernetes · 베타 API 폐기 후', months: 9, text: '9개월 또는 3릴리스 중 긴 쪽', src: 'k8s' },
  { title: 'Kubernetes · 알파 API', months: 0, text: '0 · 공지 없이 제거 가능', src: 'k8s' },
];

const BX = 8;
const SCALE = 100 / 12;
const BH = 22;
const PITCH = 62;
const top = (i: number) => 8 + i * PITCH;
const VB_H = top(ROWS.length - 1) + 22 + BH + 12;

export default function NoticePeriods() {
  return (
    <svg
      viewBox={`0 0 360 ${VB_H}`}
      role="img"
      aria-label="공개된 폐기 정책이 약속하는 최소 기간. Google Cloud 약관은 12개월 전 통지, Kubernetes는 기능과 동작 폐기 후 1년 이상, 사용자용 CLI 12개월 또는 2릴리스, 베타 API 9개월 또는 3릴리스, 알파 API는 공지 없이 제거할 수 있다."
    >
      {ROWS.map((r, i) => (
        <g key={r.title}>
          <text className="t-sub" x={BX} y={top(i) + 14}>{r.title}</text>
          {r.months > 0 ? (
            <rect fill={r.src === 'gcp' ? 'var(--accent)' : 'var(--muted)'} x={BX} y={top(i) + 22} width={r.months * SCALE} height={BH} rx="4" />
          ) : (
            <line x1={BX} y1={top(i) + 22} x2={BX} y2={top(i) + 22 + BH} stroke="var(--bad)" strokeWidth="3" />
          )}
          <text className={r.months === 0 ? 't-bad' : 't-strong'} x={BX + r.months * SCALE + 10} y={top(i) + 38}>{r.text}</text>
        </g>
      ))}
    </svg>
  );
}
