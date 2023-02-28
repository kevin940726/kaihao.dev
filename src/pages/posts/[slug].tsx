import { useMemo } from 'react';
import type { GetStaticPaths, GetStaticProps } from 'next';
import { Fira_Code } from 'next/font/google';
import { css } from '@emotion/react';
import { getMDXComponent } from 'mdx-bundler/client';
import Layout from '@/app/Layout';
import { mobile } from '@/app/media';
import { getPostSlugs, getPost } from '@/internals/posts';
import type { Post } from '@/internals/posts';
import SEO from '@/app/SEO';
import { H1, H2, H3, H4, H5, H6 } from '@/app/Headers';
import EditOnGitHub from '@/app/EditOnGitHub';
import PostLink from '@/app/PostLink';
import Paragraph from '@/app/Paragraph';
import InlineCode from '@/app/InlineCode';
import BlockQuote from '@/app/BlockQuote';
import { Ul, Ol, Li } from '@/app/Lists';
import Highlight from '@/app/Highlight';
import PostImage from '@/app/PostImage';

const firaCode = Fira_Code({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  weight: ['300', '400', '500', '700'],
});

export const getStaticPaths: GetStaticPaths = async () => {
  const postSlugs = await getPostSlugs();

  return {
    paths: postSlugs.map((slug) => ({
      params: { slug },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params!.slug! as string;
  const post = await getPost(slug);

  return {
    props: post,
  };
};

export default function PostPage({
  frontmatter,
  code,
  excerpt,
  image,
  slug,
}: Post) {
  const MDXComponent = useMemo(() => getMDXComponent(code), [code]);

  return (
    <Layout isContent>
      <Layout.Main
        css={css`
          line-height: 1.8;
          margin: 2rem auto 4em;
          word-break: break-word;

          pre,
          code {
            font-family: ${firaCode.style.fontFamily}, 'Menlo', 'Courier',
              'monospace';
          }

          ${mobile(css`
            padding: 0 20px;
          `)}
        `}
      >
        <SEO title={frontmatter.title} description={excerpt} image={image} />

        <H1>
          {frontmatter.title}
          <time
            dateTime={frontmatter.date}
            title={frontmatter.date}
            css={css`
              display: block;
              font-size: 12px;
              color: #aaaaaa;
              text-align: right;
            `}
          >
            {frontmatter.date}
          </time>
        </H1>

        <MDXComponent
          components={{
            // Map HTML element tag to React component
            h1: H1,
            h2: H2,
            h3: H3,
            h4: H4,
            h5: H5,
            h6: H6,
            p: Paragraph,
            code: InlineCode,
            a: PostLink,
            blockquote: BlockQuote,
            pre: Highlight,
            ul: Ul,
            ol: Ol,
            li: Li,
            img: PostImage,
          }}
        />

        <EditOnGitHub slug={slug} />
      </Layout.Main>
    </Layout>
  );
}
