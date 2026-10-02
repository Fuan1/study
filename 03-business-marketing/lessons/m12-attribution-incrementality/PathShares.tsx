/** 같은 구매 경로(가정)를 5가지 규칙으로 나눈 채널별 몫. 숫자는 코드로 계산한다(python 계산과 같은 값). */
const TOUCHES = [
  { name: 'SNS 광고', sub: '구매 12일 전', day: 12 },
  { name: '일반 검색', sub: '구매 9일 전', day: 9 },
  { name: '이메일', sub: '구매 3일 전', day: 3 },
  { name: '브랜드 검색', sub: '구매 당일', day: 0 },
];
const N = TOUCHES.length;
const HALF_LIFE = 7; // 시간 감쇠 반감기(가정, 일)

const last = TOUCHES.map((_, i) => (i === N - 1 ? 1 : 0));
const first = TOUCHES.map((_, i) => (i === 0 ? 1 : 0));
const linear = TOUCHES.map(() => 1 / N);
const position = TOUCHES.map((_, i) => (i === 0 || i === N - 1 ? 0.4 : 0.2 / (N - 2)));
const rawW = TOUCHES.map((t) => 0.5 ** (t.day / HALF_LIFE));
const decay = rawW.map((w) => w / rawW.reduce((a, b) => a + b, 0));

const MODELS = [
  { head: ['마지막', '클릭'], v: last },
  { head: ['첫', '클릭'], v: first },
  { head: ['선형', ''], v: linear },
  { head: ['위치', '기반'], v: position },
  { head: ['시간', '감쇠'], v: decay },
];

// 배치: 행 이름 칸 x=8~96, 셀 5개(폭 46, 간격 3)
const CW = 46;
const CH = 48;
const GAP = 3;
const RGAP = 6;
const X0 = 106;
const TOP = 56; // 첫 셀 y (머리글 두 줄 아래)
const cellX = (j: number) => X0 + j * (CW + GAP);
const rowY = (i: number) => TOP + i * (CH + RGAP);
const STROKE = 1.5;
const VB_H = Math.ceil(rowY(N - 1) + CH + STROKE / 2 + 12);

export default function PathShares() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="같은 구매 경로 하나를 모델별로 나눈 채널 몫(퍼센트). 마지막 클릭은 브랜드 검색 100, 첫 클릭은 SNS 광고 100, 선형은 각 25, 위치 기반은 SNS 광고 40, 일반 검색 10, 이메일 10, 브랜드 검색 40, 시간 감쇠는 SNS 광고 12, 일반 검색 17, 이메일 30, 브랜드 검색 41.">
      {MODELS.map((m, j) => (
        <g key={m.head.join('')}>
          <text className="t-sub" x={cellX(j) + CW / 2} y="20" textAnchor="middle">{m.head[0]}</text>
          <text className="t-sub" x={cellX(j) + CW / 2} y="40" textAnchor="middle">{m.head[1]}</text>
        </g>
      ))}
      {TOUCHES.map((t, i) => (
        <g key={t.name}>
          <text className="t-strong" x="8" y={rowY(i) + 21}>{t.name}</text>
          <text className="t-sub" x="8" y={rowY(i) + 41}>{t.sub}</text>
          {MODELS.map((m, j) => {
            const v = m.v[i];
            return (
              <g key={m.head.join('')}>
                <rect className="svg-box" x={cellX(j)} y={rowY(i)} width={CW} height={CH} rx="6" />
                <rect x={cellX(j)} y={rowY(i)} width={CW} height={CH} rx="6" fill="var(--warm)" fillOpacity={(0.38 * v).toFixed(3)} stroke="none" />
                <text className="t-strong" x={cellX(j) + CW / 2} y={rowY(i) + CH / 2 + 5} textAnchor="middle">{Math.round(v * 100)}</text>
              </g>
            );
          })}
        </g>
      ))}
    </svg>
  );
}
