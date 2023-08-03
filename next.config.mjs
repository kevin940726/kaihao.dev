import path from 'path';
import createMDX from '@next/mdx';
import remarkGFM from 'remark-gfm';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import remarkMdxImages from 'remark-mdx-images';
import remarkCodeSandbox from 'remark-codesandbox';
import remarkMdxExcerpt from './src/internals/remarkMdxExcerpt.js';
import rehypeCodeBlockMeta from './src/internals/rehypeCodeBlockMeta.js';

const withMDX = createMDX({
  options: {
    remarkPlugins: [
      remarkGFM,
      remarkFrontmatter,
      [remarkMdxFrontmatter, { name: 'frontmatter' }],
      remarkMdxExcerpt,
      remarkMdxImages,
      [
        remarkCodeSandbox,
        {
          mode: 'meta',
          customTemplates: {
            'observe-selector': {
              extends: `file:${path.resolve(
                process.cwd(),
                'src/posts/One-fun-trick-to-observe-elements-in-realtime-without-MutationObserver/observe-selector',
              )}`,
              entry: 'src/index.js',
            },
          },
          autoDeploy: process.env.NODE_ENV === 'production',
        },
      ],
    ],
    rehypePlugins: [rehypeCodeBlockMeta],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  redirects() {
    return [
      {
        source: '/posts',
        destination: '/',
        permanent: false,
      },
      {
        source: '/blog/:slug*',
        destination: '/posts/:slug*',
        permanent: false,
      },
      {
        source: '/BeanfunLogin',
        destination: 'https://kevin940726.github.io/BeanfunLogin',
        permanent: true,
      },
      {
        source: '/minesweeper',
        destination: 'https://kevin940726.github.io/minesweeper',
        permanent: true,
      },
    ];
  },
};

export default withMDX(nextConfig);
