import fs from 'fs/promises';
import path from 'path';
import { cache } from 'react';
import type { ComponentType } from 'react';

const POSTS_DIRECTORY = path.resolve(process.cwd(), 'src/posts');

export interface Post {
  slug: string;
  excerpt: string;
  frontmatter: {
    title: string;
    date: string;
  };
  Component: ComponentType<{}>;
}

export const getPostSlugs = cache(async (): Promise<string[]> => {
  return await fs.readdir(POSTS_DIRECTORY);
});

export const getPosts = cache(async (): Promise<Post[]> => {
  const slugs = await getPostSlugs();

  const posts = await Promise.all(slugs.map((slug) => getPost(slug)));

  return posts.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime()
  );
});

export const getPost = cache(async (slug: string): Promise<Post> => {
  const PostModule = await import(`../posts/${slug}/index.mdx`);

  return {
    slug,
    excerpt: PostModule.excerpt,
    frontmatter: PostModule.frontmatter,
    Component: PostModule.default,
  };
});
