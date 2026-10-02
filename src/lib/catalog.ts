import { lazy, type ComponentType, type LazyExoticComponent } from 'react';
import type { Course, CourseMeta } from './types';

// 분야 폴더(NN-이름) 규칙: course.json 이 있으면 과정, lessons/<단원id>-slug/index.mdx 가 있으면 제작된 단원.
const metas = import.meta.glob<CourseMeta>('/[0-9][0-9]-*/course.json', { eager: true, import: 'default' });
const loaders = import.meta.glob<{ default: ComponentType }>('/[0-9][0-9]-*/lessons/*/index.mdx');
const lessonKeys = Object.keys(loaders);

export const courses: Course[] = Object.entries(metas)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, meta]) => {
    const folder = path.split('/')[1];
    const stages = meta.stages ?? [];
    return {
      slug: folder.replace(/^\d+-/, ''),
      folder,
      title: meta.title,
      description: meta.description,
      stages,
      units: stages.flatMap((s) =>
        s.units.map((u) => ({
          ...u,
          stage: s.title,
          lessonKey: lessonKeys.find((k) => k.startsWith(`/${folder}/lessons/${u.id}-`)) ?? null,
        })),
      ),
    };
  });

export const getCourse = (slug: string | undefined) => courses.find((c) => c.slug === slug);

const lazyCache = new Map<string, LazyExoticComponent<ComponentType>>();
export function getLessonComponent(key: string) {
  let c = lazyCache.get(key);
  if (!c) {
    c = lazy(loaders[key]);
    lazyCache.set(key, c);
  }
  return c;
}
