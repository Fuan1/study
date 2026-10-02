export type Unit = { id: string; title: string; summary?: string };
export type Stage = { title: string; units: Unit[] };
/** <분야폴더>/course.json 의 모양 */
export type CourseMeta = { title: string; description?: string; stages: Stage[] };

export type FlatUnit = Unit & {
  stage: string;
  /** import.meta.glob 키. 단원 MDX 가 있으면 문자열, 없으면 null(준비 중) */
  lessonKey: string | null;
};
export type Course = {
  /** URL 에 쓰는 이름. 폴더명에서 숫자 접두사를 뗀 것 (01-ux → ux) */
  slug: string;
  folder: string;
  title: string;
  description?: string;
  stages: Stage[];
  units: FlatUnit[];
};
