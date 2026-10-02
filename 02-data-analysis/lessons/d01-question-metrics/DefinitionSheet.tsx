// 지표 정의서의 모양. 지표는 HEART 논문의 Gmail 참여 지표를 따랐고 정의서 칸을 채운 방식은 이 글의 예시다.
type Row = { k: string; v: string[] };

const ROWS: Row[] = [
  { k: '이름', v: ['주 5일 이상 방문 비율'] },
  { k: '정의(말로)', v: ['활성 사용자 중 지난 7일에', '5일 이상 방문한 사용자의 비율'] },
  { k: '분자·분모', v: ['분자 5일 이상 방문한 사용자 수', '분모 지난 7일 활성 사용자 수'] },
  { k: '분석 단위', v: ['사용자 (세션이 아님)'] },
  { k: '기간', v: ['지난 7일'] },
  { k: '포함·제외', v: ['제외: 봇 같은 자동화된 접속'] },
  { k: '데이터 출처', v: ['사용자별 방문 기록(로그)'] },
  { k: '소유자', v: ['담당자 이름 한 명'] },
];

const X0 = 8;
const W = 344;
const VX = 112; // 값 글자 시작 x
const H1 = 40;
const H2 = 66;
const rowH = (r: Row) => (r.v.length > 1 ? H2 : H1);
const tops: number[] = [];
let acc = 8;
for (const r of ROWS) { tops.push(acc); acc += rowH(r); }
const BOTTOM = acc;
const VB_H = BOTTOM + 12;

export default function DefinitionSheet() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="지표 정의서의 모양. 이름, 정의, 분자와 분모, 분석 단위, 기간, 포함과 제외, 데이터 출처, 소유자 여덟 칸을 채운 예시.">
      <rect className="svg-box" x={X0} y="8" width={W} height={BOTTOM - 8} rx="8" />
      {ROWS.map((r, i) => {
        const t = tops[i];
        const h = rowH(r);
        const base = h === H1 ? t + 25 : t + 27;
        return (
          <g key={r.k}>
            {i > 0 && <line x1={X0} y1={t} x2={X0 + W} y2={t} stroke="var(--line)" />}
            <text className="t-sub" x="22" y={base}>{r.k}</text>
            {r.v.map((line, j) => (
              <text key={line} x={VX} y={base + j * 22} fontSize="13" fill="var(--strong)">{line}</text>
            ))}
          </g>
        );
      })}
    </svg>
  );
}
