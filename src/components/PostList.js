import React from 'react';
import { css } from '@emotion/core';
import { useStaticQuery, Link, graphql } from 'gatsby';
import { MAIN_TEXT, SUB_TEXT } from '../constants';

const postListQuery = graphql`
  query PostList {
    allMdx(sort: { fields: [frontmatter___date], order: DESC }, limit: 1000) {
      edges {
        node {
          id
          excerpt
          frontmatter {
            title
            date
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;

const PostList = ({ shouldShowFullList, ...props }) => {
  const data = useStaticQuery(postListQuery);
  const { edges: posts } = data.allMdx;

  return (
    <section {...props}>
      <h3
        css={css`
          font-size: 24px;
          font-weight: bold;
          color: ${MAIN_TEXT};
          margin: 10px 0 25px;
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
        {posts.map(({ node: post }) => (
          <li
            key={post.id}
            css={css`
              margin-bottom: 40px;
            `}
          >
            <Link
              to={post.fields.slug}
              css={css`
                display: block;
                font-size: 24px;
                color: ${SUB_TEXT};
                text-decoration: none;

                &:hover {
                  text-decoration: underline;
                }
              `}
            >
              {post.frontmatter.title}
            </Link>
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
          </li>
        ))}
      </ul>

      {!shouldShowFullList && (
        <Link
          to="/posts"
          css={css`
            display: inline-block;
            position: relative;
            left: 50%;
            transform: translateX(-50%);
            padding: 10px 20px;
            margin: 10px 0;
            font-size: 18px;
            text-decoration: none;
            transition: background-color 0.15s ease-out;

            &:hover {
              background-color: #eeeeee;
            }
          `}
        >
          See all posts
        </Link>
      )}
    </section>
  );
};

export default PostList;
