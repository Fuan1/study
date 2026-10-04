/**
 * 출처: Council of Europe, CEFR(2001) Table 2 자기평가표의 A1, A2, B1 칸을 줄여 옮겼다.
 * 말하기는 상호작용(Spoken Interaction)을 기준으로 줄였다.
 */
type Skill = { name: string; rows: { lv: 'A1' | 'A2' | 'B1'; text: string }[] };

const SKILLS: Skill[] = [
  {
    name: '듣기',
    rows: [
      { lv: 'A1', text: '천천히 말하면 익숙한 낱말·짧은 구' },
      { lv: 'A2', text: '짧고 분명한 안내의 요점' },
      { lv: 'B1', text: '익숙한 주제의 표준 속도 말의 요점' },
    ],
  },
  {
    name: '읽기',
    rows: [
      { lv: 'A1', text: '이름·낱말·안내문의 아주 쉬운 문장' },
      { lv: 'A2', text: '아주 짧은 글, 메뉴·시간표의 정보' },
      { lv: 'B1', text: '일상 어휘 중심 글, 감정·바람 묘사' },
    ],
  },
  {
    name: '말하기',
    rows: [
      { lv: 'A1', text: '상대가 도와주면 간단히 묻고 답하기' },
      { lv: 'A2', text: '아주 짧은 주고받기, 이어 가긴 어렵다' },
      { lv: 'B1', text: '익숙한 주제는 준비 없이 대화 시작' },
    ],
  },
  {
    name: '쓰기',
    rows: [
      { lv: 'A1', text: '엽서 한 장, 서식에 인적 사항 적기' },
      { lv: 'A2', text: '짧은 메모·메시지, 간단한 감사 편지' },
      { lv: 'B1', text: '익숙한 주제로 이어진 글' },
    ],
  },
];

const BOX_H = 126;
const GAP = 24;
const TOP = 8;

export default function LevelLadder() {
  const vbH = TOP + SKILLS.length * BOX_H + (SKILLS.length - 1) * GAP + 8;
  return (
    <svg viewBox={`0 0 360 ${vbH}`} role="img" aria-label="네 영역의 A1, A2, B1 can-do 사다리. 영역마다 A1에서 A2, B1로 갈수록 되는 일이 길고 스스로 하는 일로 바뀐다.">
      {SKILLS.map((s, i) => {
        const y = TOP + i * (BOX_H + GAP);
        return (
          <g key={s.name}>
            <rect className="svg-box" x="8" y={y} width="344" height={BOX_H} rx="8" />
            <text className="t-strong" x="22" y={y + 28}>{s.name}</text>
            {s.rows.map((r, j) => {
              const by = y + 54 + j * 28;
              return (
                <g key={r.lv}>
                  <text className={r.lv === 'B1' ? 't-warm' : 't-accent'} x="22" y={by}>{r.lv}</text>
                  <text className="t-sub" x="58" y={by}>{r.text}</text>
                </g>
              );
            })}
          </g>
        );
      })}
    </svg>
  );
}
