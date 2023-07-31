import type { GetStaticProps } from 'next';
import Layout from '@/app/Layout';
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
      <PostList posts={posts} className="md:-mt-10 mx-auto mb-36" />
    </Layout.Main>
  </Layout>
);

export default IndexPage;
