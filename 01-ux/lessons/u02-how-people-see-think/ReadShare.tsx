/** 수치는 NN/g가 정리한 Weinreich 외(2008) 분석이다. 칸 수는 비율에서 계산한다(100칸 = 페이지 글 전체). */
const READ = 20; // 현실적으로 읽는 비율(%)
const MAX = 28; // 시간상 이론적 최대(%)

export default function ReadShare() {
  const cols = 20;
  const cell = 11;
  const gap = 6; // 작은 칸 사이 간격 6px
  const x0 = 8;
  const y0 = 46;
  const total = 100;
  return (
    <svg viewBox="0 0 360 228" role="img" aria-label="593단어 분량의 평균 페이지에서 방문자는 글의 약 20퍼센트를 읽는다. 방문 시간을 모두 읽기에 쓴다고 해도 최대 약 28퍼센트다. 100칸 중 20칸이 진하게, 8칸이 연하게 칠해져 있다.">
      <text className="t-strong" x="8" y="22">평균 593단어 페이지 · 글 전체를 100칸으로</text>
      {Array.from({ length: total }, (_, i) => {
        const cx = x0 + (i % cols) * (cell + gap);
        const cy = y0 + Math.floor(i / cols) * (cell + gap);
        const style =
          i < READ ? { fill: 'var(--accent)', stroke: 'var(--accent)' }
          : i < MAX ? { fill: 'var(--accent-soft)', stroke: 'var(--accent)' }
          : { fill: 'var(--bg)', stroke: 'var(--line)' };
        return <rect key={i} x={cx} y={cy} width={cell} height={cell} rx="2" style={{ ...style, strokeWidth: 1 }} />;
      })}
      <rect x="8" y="149" width="12" height="12" rx="2" style={{ fill: 'var(--accent)' }} />
      <text className="t-sub" x="28" y="159.5">현실적으로 읽는 양 약 {READ}%</text>
      <rect x="8" y="177" width="12" height="12" rx="2" style={{ fill: 'var(--accent-soft)', stroke: 'var(--accent)' }} />
      <text className="t-sub" x="28" y="187.5">시간을 전부 읽기에 써도 최대 약 {MAX}%</text>
      <rect x="8" y="205" width="12" height="12" rx="2" className="svg-box" />
      <text className="t-sub" x="28" y="215.5">나머지는 읽지 않는다</text>
    </svg>
  );
}
