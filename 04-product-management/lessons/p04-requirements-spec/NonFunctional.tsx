// 비기능 요구를 공개 기준의 이름·버전·값으로 쓴 모양.
// 성능 값: web.dev Core Web Vitals 권장값. 접근성: WCAG 2.2 1.4.3(AA) 대비 4.5:1. 보안: OWASP ASVS 5.0.0 번호 형식 예시.
// 개인정보는 값을 확인하지 못해 비워 둔다.
const ROWS: [string, string, string][] = [
  ['성능', '기준: Core Web Vitals (web.dev)', 'LCP 2.5초, INP 200ms, CLS 0.1 이하'],
  ['접근성', '기준: WCAG 2.2 성공 기준 (W3C)', '버전과 레벨을 쓴다. 대비 4.5:1 이상(AA)'],
  ['보안', '기준: OWASP ASVS 5.0.0', '번호로 가리킨다. 예: v5.0.0-1.2.5'],
  ['개인정보', '기준: 법령과 사내 정책', '값: 확인 필요 (별도 점검)'],
];

const TOP = 8;
const ROW = 84;
const BOTTOM = TOP + ROWS.length * ROW;
// 카드 아랫변 + 선 두께 절반 + 아래 여백 8
const VB_H = BOTTOM + 1 + 8;

export default function NonFunctional() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="비기능 요구를 공개 기준으로 쓰는 모양. 성능은 Core Web Vitals 값, 접근성은 WCAG 2.2 버전과 레벨, 보안은 OWASP ASVS 번호, 개인정보는 법령 확인 필요.">
      <rect className="svg-box" x="8" y={TOP} width="344" height={ROWS.length * ROW} rx="8" />
      {ROWS.map(([k, src, v], i) => {
        const top = TOP + i * ROW;
        return (
          <g key={k}>
            {i > 0 && <line x1="8" y1={top} x2="352" y2={top} stroke="var(--line)" />}
            <text className="t-strong" x="22" y={top + 28}>{k}</text>
            <text className="t-sub" x="22" y={top + 48}>{src}</text>
            <text className={i === ROWS.length - 1 ? 't-accent' : undefined} x="22" y={top + 68} fontSize="13">{v}</text>
          </g>
        );
      })}
    </svg>
  );
}
