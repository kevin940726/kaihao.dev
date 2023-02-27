/// <reference types="../@types/remark-codesandbox" />
import fs from 'fs/promises';
import fsSync from 'fs';
import path from 'path';
import { bundleMDX } from 'mdx-bundler';
import { getMDXExport } from 'mdx-bundler/client';
import remarkGFM from 'remark-gfm';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import remarkMdxImages from 'remark-mdx-images';
import remarkCodeSandbox from 'remark-codesandbox';
import rehypeHighlight from './rehypeHighlight';
import remarkMdxExcerpt from './remarkMdxExcerpt';
import esbuildImageLoaderPlugin from './esbuildImageLoaderPlugin';

const POSTS_DIRECTORY = path.resolve(process.cwd(), 'src/posts');

export interface PostItem {
  slug: string;
  excerpt: string;
  frontmatter: {
    title: string;
    date: string;
  };
}

export interface Post extends PostItem {
  code: string;
  image?: {
    src: string;
    width?: number;
    height?: number;
  };
}

export async function getPostSlugs(): Promise<string[]> {
  return await fs.readdir(POSTS_DIRECTORY);
}

export async function getPosts(): Promise<Post[]> {
  const slugs = await getPostSlugs();

  const posts = await Promise.all(slugs.map((slug) => getPost(slug)));

  return posts.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime()
  );
}

export async function getPostsList(): Promise<PostItem[]> {
  const posts = await getPosts();

  return posts.map((post) => ({
    slug: post.slug,
    excerpt: post.excerpt,
    frontmatter: post.frontmatter,
  }));
}

export async function getPost(slug: string): Promise<Post> {
  const postDirectory = path.join(POSTS_DIRECTORY, slug);

  const esbuildImageLoader = esbuildImageLoaderPlugin();
  const defaultMetaImagePath = path.join(postDirectory, 'meta-image.png');

  const { frontmatter, code } = await bundleMDX<{
    title: string;
    date: string;
  }>({
    file: path.join(postDirectory, 'index.mdx'),
    cwd: postDirectory,
    mdxOptions: (options) => {
      options.remarkPlugins = options.remarkPlugins ?? [];
      options.remarkPlugins.push(
        remarkGFM,
        remarkMdxFrontmatter,
        remarkMdxImages,
        remarkMdxExcerpt,
        [
          remarkCodeSandbox,
          {
            mode: 'meta',
            customTemplates: {
              'observe-selector': {
                extends: `file:${path.resolve(
                  process.cwd(),
                  'src/posts/One-fun-trick-to-observe-elements-in-realtime-without-MutationObserver/observe-selector'
                )}`,
                entry: 'src/index.js',
              },
            },
            autoDeploy: process.env.NODE_ENV === 'production',
          },
        ]
      );
      options.rehypePlugins = options.rehypePlugins ?? [];
      options.rehypePlugins.push(rehypeHighlight);
      return options;
    },
    esbuildOptions: (options) => {
      // Add the default meta image to entry points for esbuild to load the image
      if (fsSync.existsSync(defaultMetaImagePath)) {
        if (Array.isArray(options.entryPoints)) {
          (options.entryPoints as string[]).push(defaultMetaImagePath);
        }
      }

      // It won't actually write to the directory but it's needed for the file-loader
      options.outdir = path.resolve(process.cwd(), 'build');
      options.loader = {
        ...options.loader,
        '.png': 'file',
        '.jpeg': 'file',
        '.jpg': 'file',
        '.gif': 'file',
        '.webp': 'file',
        '.avif': 'file',
      };
      options.plugins = [esbuildImageLoader.plugin, ...(options.plugins ?? [])];
      return options;
    },
  });

  const mdxExports: {
    metaImage?: string;
    excerpt: string;
  } = getMDXExport(code);

  const imagePath = mdxExports.metaImage
    ? path.resolve(postDirectory, mdxExports.metaImage)
    : defaultMetaImagePath;
  const image = esbuildImageLoader.imagesMap.get(imagePath);

  const post: Post = {
    slug,
    excerpt: mdxExports.excerpt,
    frontmatter,
    code,
  };

  if (image) {
    post.image = image;
  }

  return post;
}
