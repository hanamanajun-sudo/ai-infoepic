import { getCollection, type CollectionEntry } from 'astro:content';

export async function getAllPosts(): Promise<CollectionEntry<'posts'>[]> {
  const posts = await getCollection('posts');
  return posts.sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());
}

export async function getCategories(): Promise<string[]> {
  const posts = await getAllPosts();
  const set = new Set<string>();
  for (const p of posts) {
    if (p.data.category) set.add(p.data.category);
  }
  return Array.from(set);
}

export function postHref(slug: string): string {
  return `/entry/${slug}/`;
}
