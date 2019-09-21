import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { useStaticQuery, Link, graphql } from 'gatsby';
import { mobile } from '../utils/media';

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

const PostItem = styled.li(
  props => css`
    border-radius: 4px;
    margin-bottom: 20px;
    padding: 20px;
    background-color: ${props.theme.colors.contentBackground};
  `
);

const PostItemHeader = styled.h3(
  props => css`
    display: block;
    font-size: 24px;
    color: ${props.theme.colors.subText};
    margin: 0;
    font-weight: normal;
  `
);

const PostList = ({ shouldShowFullList, ...props }) => {
  const data = useStaticQuery(postListQuery);
  const { edges: posts } = data.allMdx;

  return (
    <section {...props}>
      <h3
        css={theme => css`
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
        {posts.map(({ node: post }) => (
          <PostItem key={post.id}>
            <Link
              to={post.fields.slug}
              css={theme => css`
                display: block;
                color: ${theme.colors.contentText};
                text-decoration: none;

                &:hover {
                  text-decoration: none;

                  > ${PostItemHeader} {
                    text-decoration: underline;
                  }
                }
              `}
            >
              <PostItemHeader>{post.frontmatter.title}</PostItemHeader>

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
            </Link>
          </PostItem>
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
