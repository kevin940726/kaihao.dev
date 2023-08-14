import Main from '@/components/Main';
import Hero from '@/components/Hero';
import PostList from '@/components/PostList';
import { getPosts } from '@/internals/posts';

export default async function IndexPage() {
  const posts = await getPosts();

  return (
    <>
      <Hero />

      <Main>
        <PostList posts={posts} className="mx-auto mb-36" />
      </Main>
    </>
  );
}
