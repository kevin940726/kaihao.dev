import React, { Fragment } from 'react';
import { graphql } from 'gatsby';
import { MDXProvider } from '@mdx-js/tag';
import MDXRenderer from 'gatsby-mdx/mdx-renderer';
import { css } from '@emotion/core';
import Layout from './Layout';
import SEO from '../components/seo';
import { H1, H2, H3, H4, H5, H6 } from '../components/Headings';
import Paragraph from '../components/Paragraph';
import InlineCode from '../components/InlineCode';
import Live from '../components/Live';
import Highlight from '../components/Highlight';

const PostLayout = ({ data: { mdx } }) => (
  <Layout
    css={css`
      line-height: 1.8;
      width: 760px;
      padding: 20px 40px;
      margin-bottom: 4em;
    `}
  >
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
        pre: Fragment,
        code: ({ children, live }) =>
          live ? <Live>{children}</Live> : <Highlight>{children}</Highlight>,
      }}
    >
      <SEO title={mdx.frontmatter.title} />

      <MDXRenderer>{mdx.code.body}</MDXRenderer>
    </MDXProvider>
  </Layout>
);

export const pageQuery = graphql`
  query BlogPostQuery($id: String) {
    mdx(id: { eq: $id }) {
      id
      frontmatter {
        title
      }
      code {
        body
      }
    }
  }
`;

export default PostLayout;
