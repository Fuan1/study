/** 가정한 화면이다. 특정 서비스의 실제 화면이 아니다. */
// 여백 기준: 패널 안 12px 이상, 버튼 높이 42, 패널 아래 설명은 24px 이상 띄운다.
const PW = 164; // 패널 폭
const PY = 40; // 패널 y
const PH = 224; // 패널 높이

function Panel({ x, bad }: { x: number; bad: boolean }) {
  return (
    <g transform={`translate(${x} ${PY})`}>
      <rect className={bad ? 'svg-box-bad' : 'svg-box-good'} x="0" y="0" width={PW} height={PH} rx="8" />
      <text x="12" y="28" fontSize="12.5">무료 체험 할까요?</text>
      <rect className="svg-box-key" x="12" y="44" width={PW - 24} height="42" rx="6" />
      <text className="t-strong" x={PW / 2} y="70" textAnchor="middle">무료 체험 시작</text>
      {bad ? (
        <text className="t-sub" x="12" y="124">아니요, 혜택이 싫어요</text>
      ) : (
        <>
          <rect className="svg-box-key" x="12" y="98" width={PW - 24} height="42" rx="6" />
          <text className="t-strong" x={PW / 2} y="124" textAnchor="middle">다음에</text>
        </>
      )}
      <rect className="svg-box" x="12" y="160" width="16" height="16" rx="3" />
      {bad && <polyline points="15,168 19,173 26,163" fill="none" stroke="var(--strong)" strokeWidth="2" />}
      <text x="38" y="173" fontSize="12.5">부가 상품 추가</text>
      <text className="t-sub" x="12" y="206">{bad ? '해지: 고객센터 전화' : '해지: 설정에서 바로'}</text>
    </g>
  );
}

export default function DarkPatternScreens() {
  const bad = ['거절 문구가 흐리다', '미리 체크돼 있다', '해지는 전화만 된다'];
  const good = ['거절도 같은 크기', '체크는 직접 선택', '해지는 설정에서'];
  const noteY = PY + PH + 36; // 패널 아래 24px 이상 띄운 첫 줄 baseline
  return (
    <svg viewBox="0 0 360 360" role="img" aria-label="나쁜 예는 거절 문구가 흐리고 부가 상품이 미리 체크되어 있고 해지는 전화로만 가능하다. 고친 예는 거절 버튼이 같은 크기이고 체크는 직접 하며 해지는 설정에서 바로 된다.">
      <text className="t-bad" x="8" y="20">나쁜 예</text>
      <text className="t-good" x="188" y="20">고친 예</text>
      <Panel x={8} bad />
      <Panel x={188} bad={false} />
      {bad.map((t, i) => (
        <text key={t} className="t-bad" x="8" y={noteY + i * 20}>{t}</text>
      ))}
      {good.map((t, i) => (
        <text key={t} className="t-good" x="188" y={noteY + i * 20}>{t}</text>
      ))}
    </svg>
  );
}
