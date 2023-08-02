import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import PostList from '@/components/PostList';
import { getPosts } from '@/internals/posts';

export default async function IndexPage() {
  const posts = await getPosts();

  return (
    <>
      <Hero />

      <Layout.Main>
        <PostList posts={posts} className="mx-auto mb-36" />
      </Layout.Main>
    </>
  );
}
