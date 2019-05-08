import React, { Fragment } from 'react';
import { graphql } from 'gatsby';
import { MDXProvider } from '@mdx-js/tag';
import MDXRenderer from 'gatsby-mdx/mdx-renderer';
import { Global, css } from '@emotion/core';
import { mobile } from '../utils/media';
import useFont from '../hooks/useFont';
import Layout from './Layout';
import SEO from '../components/SEO';
import { H1, H2, H3, H4, H5, H6 } from '../components/Headers';
import Paragraph from '../components/Paragraph';
import InlineCode from '../components/InlineCode';
import BlockQuote from '../components/BlockQuote';
import Highlight from '../components/Highlight';
import PostLink from '../components/PostLink';
import BackTo from '../components/BackTo';
import EditOnGithub from '../components/EditOnGithub';

const PostLayout = ({ data: { mdx } }) => {
  const fontCSS = useFont('Fira Code', 'Menlo', 'Courier', 'monospace');

  return (
    <Layout
      css={css`
        line-height: 1.8;
        width: 760px;
        margin: 2rem auto 4em;

        pre,
        code {
          ${fontCSS}
        }

        ${mobile(css`
          padding: 0 20px;
        `)}
      `}
    >
      <Global
        styles={css`
          @import url(https://cdn.jsdelivr.net/gh/tonsky/FiraCode@1.206/distr/fira_code.css);
        `}
      />

      <MDXProvider
        components={{
          // Map HTML element tag to React component
          h1: H1,
          h2: H2,
          h3: H3,
          h4: H4,
          h5: H5,
          h6: H6,
          p: Paragraph,
          inlineCode: InlineCode,
          a: PostLink,
          blockquote: BlockQuote,
          pre: Fragment,
          code: ({ children, ...props }) => (
            <Highlight {...props}>{children}</Highlight>
          ),
        }}
      >
        <SEO
          title={mdx.frontmatter.title}
          description={mdx.excerpt}
          image={mdx.fields.image.fixed}
        />

        <H1>
          {mdx.frontmatter.title}
          <time
            dateTime={mdx.frontmatter.date}
            title={mdx.frontmatter.date}
            css={css`
              display: block;
              font-size: 12px;
              color: #aaaaaa;
              text-align: right;
            `}
          >
            {mdx.frontmatter.date}
          </time>
        </H1>

        <MDXRenderer>{mdx.code.body}</MDXRenderer>

        <EditOnGithub postFileName={mdx.fields.fileName} />
      </MDXProvider>

      <BackTo
        to="/posts"
        css={css`
          margin-top: 4em;
          align-self: center;
        `}
      >
        Back to posts list
      </BackTo>
    </Layout>
  );
};

export const pageQuery = graphql`
  query BlogPostQuery($id: String) {
    mdx(id: { eq: $id }) {
      id
      excerpt
      fields {
        fileName
        image {
          fixed(width: 1200) {
            src
            width
            height
          }
        }
      }
      frontmatter {
        title
        date
      }
      code {
        body
      }
    }
  }
`;

export default PostLayout;
