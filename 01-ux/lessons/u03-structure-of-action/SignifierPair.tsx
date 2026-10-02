import type { ReactNode } from 'react';

function Card({ x, title, children, note, ok }: { x: number; title: string; children: ReactNode; note: string; ok: boolean }) {
  return (
    <g>
      <text className={ok ? 't-good' : 't-bad'} x={x + 82} y="20" textAnchor="middle">{title}</text>
      <rect className="svg-box" x={x} y="34" width="164" height="96" rx="10" />
      {children}
      <text className={ok ? 't-good' : 't-bad'} x={x + 82} y="156" textAnchor="middle">{note}</text>
    </g>
  );
}

export default function SignifierPair() {
  return (
    <svg viewBox="0 0 360 214" role="img" aria-label="탭하면 동작하는 항목 두 개. 나쁜 예는 일반 글자처럼만 보여 탭할 수 있다는 신호가 없고, 고친 예는 테두리와 화살표가 있어 탭할 수 있다는 신호가 있다. 둘 다 실제로는 탭하면 동작한다.">
      <Card x={8} title="나쁜 예" note="탭되는데 신호가 없다" ok={false}>
        <text x="24" y="86" fontSize="15" style={{ fill: 'var(--ink)' }}>비밀번호 변경</text>
      </Card>
      <Card x={188} title="고친 예" note="테두리와 화살표가 있다" ok>
        <rect className="svg-box-key" x="202" y="64" width="136" height="40" rx="8" />
        <text x="214" y="89" fontSize="15" style={{ fill: 'var(--ink)' }}>비밀번호 변경</text>
        <path d="M322 77 L329 84 L322 91" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </Card>
      <text className="t-sub" x="180" y="190" textAnchor="middle">두 항목 모두 탭하면 같은 동작을 한다. 가정한 예시.</text>
    </svg>
  );
}
