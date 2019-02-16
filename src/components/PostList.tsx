import React from 'react';
import { css } from '@emotion/core';
import { StaticQuery, Link, graphql } from 'gatsby';

const PostList = ({ data }) => {
  const { edges: posts } = data.allMdx;

  return (
    <section>
      <h3
        css={css`
          font-size: 26px;
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
              margin-bottom: 20px;
            `}
          >
            <Link to={post.fields.slug}>
              <h2>{post.frontmatter.title}</h2>
            </Link>
            <p>{post.excerpt}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

const postListQuery = graphql`
  query PostList {
    allMdx {
      edges {
        node {
          id
          excerpt
          frontmatter {
            title
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;

export default () => (
  <StaticQuery
    query={postListQuery}
    render={data => <PostList data={data} />}
  />
);
