import { A, Callout, Figure, H2, H3, Overview, Ref, Rel, Related, Source, Sources, Table, Toc } from './blocks';

/** MDX 글에서 import 없이 쓰는 컴포넌트. 추가하면 여기에 등록한다. 마크다운 h2/h3/표/링크도 여기서 치환된다. */
export const components = {
  Overview, Toc, Callout, Figure, Ref, Sources, Source, Related, Rel,
  h2: H2, h3: H3, table: Table, a: A,
};
