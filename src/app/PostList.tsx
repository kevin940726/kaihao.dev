import type { ComponentProps } from 'react';
import Link from 'next/link';
import type { PostItem } from '@/internals/posts';

interface PostListProps extends ComponentProps<'section'> {
  posts: PostItem[];
}

const PostList = ({ posts, ...props }: PostListProps) => {
  return (
    <section {...props}>
      <h3 className="text-2xl text-contentText mt-2.5 mb-6 ml-5 md:ml-0">
        Latest Posts
      </h3>
      <ul>
        {posts.map((post) => (
          <li className="rounded mb-5 p-5 bg-contentBackground" key={post.slug}>
            <Link
              href={`/posts/${post.slug}`}
              className="group block text-contentText no-underline hover:no-underline"
            >
              <h3
                className="block text-2xl text-subText group-hover:underline"
                data-post-item-header
              >
                {post.frontmatter.title}
              </h3>

              <time
                dateTime={post.frontmatter.date}
                title={post.frontmatter.date}
                className="text-[#aaaaaa] text-xs"
              >
                {post.frontmatter.date}
              </time>
              <p className="mt-2.5">{post.excerpt}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default PostList;
