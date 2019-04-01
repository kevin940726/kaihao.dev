import React from 'react';
import { css } from '@emotion/core';
import Layout from '../layouts/Layout';
import SEO from '../components/seo';
import PostList from '../components/PostList';

const PostsPage = () => (
  <Layout>
    <SEO title="Posts" />

    <PostList
      shouldShowFullList
      css={css`
        width: 760px;
        max-width: 100%;
        margin: 0 auto;
        padding: 40px 20px;
      `}
    />
  </Layout>
);

export default PostsPage;
