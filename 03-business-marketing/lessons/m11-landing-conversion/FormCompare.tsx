/** 폼 필드 나쁜 예 / 고친 예. 형태 예시(가상 값). NN/g(placeholder, 오류 위치)와 WCAG 3.3.1, 3.3.2 의 규칙을 그림으로 옮긴 것. */
const X = 8;
const W = 344;
const FIELD_H = 44;
const STROKE = 1.5;
const TOP = 8;

// 나쁜 예: 맨 위 요약만 있고, 라벨 없이 안내문이 필드 안에 있다.
const BAD_TAG = TOP + 14;
const BANNER_Y = BAD_TAG + 12;
const BANNER_H = 44;
const BAD_FIELD_Y = BANNER_Y + BANNER_H + 24;
const BAD_NOTE = BAD_FIELD_Y + FIELD_H + 22;

// 고친 예: 라벨은 필드 위, 오류는 필드 바로 아래.
const GOOD_TAG = BAD_NOTE + 36;
const LABEL_Y = GOOD_TAG + 12 + 14;
const GOOD_FIELD_Y = LABEL_Y + 14; // 글자 아랫면(baseline + 약 3)과 상자 사이 8px 이상
const ERR_Y = GOOD_FIELD_Y + FIELD_H + 22;
const VB_H = Math.ceil(ERR_Y + 8 + STROKE / 2);

export default function FormCompare() {
  return (
    <svg viewBox={`0 0 360 ${VB_H}`} role="img" aria-label="폼 필드 비교. 나쁜 예는 맨 위에 입력을 확인하라는 요약만 있고 필드 안 안내문이 입력하면 사라진다. 고친 예는 라벨이 필드 위에 계속 보이고 오류 원인이 필드 바로 아래에 있다.">
      <text className="t-bad" x={X} y={BAD_TAG}>나쁜 예: 안내가 필드 밖에 있거나 사라진다</text>
      <rect className="svg-box" x={X} y={BANNER_Y} width={W} height={BANNER_H} rx="8" />
      <text className="t-sub" x={X + 14} y={BANNER_Y + BANNER_H / 2 + 5}>맨 위 요약: 입력을 확인하세요</text>
      <rect className="svg-box" x={X} y={BAD_FIELD_Y} width={W} height={FIELD_H} rx="8" />
      <text className="t-sub" x={X + 14} y={BAD_FIELD_Y + FIELD_H / 2 + 5}>이메일을 입력하세요</text>
      <text className="t-sub" x={X} y={BAD_NOTE}>라벨 역할을 안내문이 하고, 입력하면 사라진다</text>

      <text className="t-good" x={X} y={GOOD_TAG}>고친 예: 라벨은 위에 남고 오류는 필드 옆</text>
      <text className="t-strong" x={X} y={LABEL_Y}>이메일</text>
      <rect className="svg-box" x={X} y={GOOD_FIELD_Y} width={W} height={FIELD_H} rx="8" />
      <text x={X + 14} y={GOOD_FIELD_Y + FIELD_H / 2 + 5} fontSize="13">name.example.com</text>
      <text className="t-bad" x={X} y={ERR_Y}>@가 빠졌습니다. 예: name@example.com</text>
    </svg>
  );
}
