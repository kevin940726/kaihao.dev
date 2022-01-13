import type { ComponentProps } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Link from 'next/link';
import type { PostItem } from '@/internals/posts';
import { mobile } from './media';

interface PostListProps extends ComponentProps<'section'> {
  posts: PostItem[];
}

const PostListItem = styled.li(
  (props) => css`
    border-radius: 4px;
    margin-bottom: 20px;
    padding: 20px;
    background-color: ${props.theme.colors.contentBackground};
  `
);

const PostItemHeader = styled.h3(
  (props) => css`
    display: block;
    font-size: 24px;
    color: ${props.theme.colors.subText};
    margin: 0;
    font-weight: normal;
  `
);

const PostList = ({ posts, ...props }: PostListProps) => {
  return (
    <section {...props}>
      <h3
        css={(theme) => css`
          font-size: 24px;
          font-weight: normal;
          color: ${theme.colors.contentText};
          margin: 10px 0 25px;

          ${mobile(css`
            margin-left: 20px;
          `)}
        `}
      >
        Latest Posts
      </h3>
      <ul
        css={css`
          list-style: none;
          padding: 0;
        `}
      >
        {posts.map((post) => (
          <PostListItem key={post.slug}>
            <Link href={`/posts/${post.slug}`} passHref>
              <a
                css={(theme) => css`
                  display: block;
                  color: ${theme.colors.contentText};
                  text-decoration: none;

                  &:hover {
                    text-decoration: none;

                    > [data-post-item-header] {
                      text-decoration: underline;
                    }
                  }
                `}
              >
                <PostItemHeader data-post-item-header>
                  {post.frontmatter.title}
                </PostItemHeader>

                <time
                  dateTime={post.frontmatter.date}
                  title={post.frontmatter.date}
                  css={css`
                    color: #aaaaaa;
                    font-size: 12px;
                  `}
                >
                  {post.frontmatter.date}
                </time>
                <p
                  css={css`
                    margin: 10px 0 0;
                  `}
                >
                  {post.excerpt}
                </p>
              </a>
            </Link>
          </PostListItem>
        ))}
      </ul>
    </section>
  );
};

export default PostList;
