# Study

분야별 학습 정리 레포. 학습 글은 React + Vite 뷰어로 읽는다.

| 폴더 | 분야 |
|---|---|
| 01-ux | UX / UI 리서치·디자인 |
| 02-data-analysis | 데이터 분석 (SQL, 통계, 시각화) |
| 03-business-marketing | 비즈니스·마케팅 |

각 분야 폴더 구성: `course.json`(글 목록), `lessons/`(글 MDX), `notes/`(정리 노트), `resources/`(자료·링크), `practice/`(실습·예제). 노트 양식은 `_templates/note.md`, 글 양식은 `_templates/lesson.mdx`.

## 실행

```sh
npm install
npm run dev        # 개발 서버
npm run build      # 타입 검사 + dist/ 빌드
npm run preview    # 빌드 결과 미리보기
```

## 뷰어

나무위키처럼 읽는 압축 정리 아티클 뷰어. 어두운 배경 고정, 모바일 우선이다.

- 글 안에 자동 목차, 번호 매긴 제목, 그림·표·출처 각주가 있다. 하단 이전/다음 바와 좌측(모바일은 서랍) 글 목록으로 이동한다.
- 해시 라우팅 + 상대 경로 빌드라 `dist/`를 GitHub Pages 같은 정적 호스팅에 그대로 올릴 수 있다.
- 분야 추가는 폴더 + `course.json`, 글 추가는 `lessons/<id>-slug/index.mdx` 파일만 만들면 자동 인식된다.

세부 규칙은 `CLAUDE.md` 참고.
