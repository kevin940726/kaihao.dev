import type { GetStaticProps } from 'next';
import { css } from '@emotion/react';
import Layout from '@/app/Layout';
import { mobile } from '@/app/media';
import SEO from '@/app/SEO';
import Hero from '@/app/Hero';
import { getPostsList } from '@/internals/posts';
import type { PostItem } from '@/internals/posts';
import PostList from '@/app/PostList';

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getPostsList();
  return { props: { posts } };
};

const IndexPage = ({ posts }: { posts: PostItem[] }) => (
  <Layout>
    <SEO />

    <Hero />

    <Layout.Main>
      <PostList
        posts={posts}
        css={css`
          margin: -40px auto 150px;

          ${mobile(css`
            margin-top: 0;
          `)}
        `}
      />
    </Layout.Main>
  </Layout>
);

export default IndexPage;
