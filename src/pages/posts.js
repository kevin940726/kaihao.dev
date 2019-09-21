import React from 'react';
import { css } from '@emotion/core';
import Layout from '../layouts/Layout';
import SEO from '../components/SEO';
import PostList from '../components/PostList';

const PostsPage = () => (
  <Layout>
    <SEO title="Posts" />

    <Layout.Main>
      <PostList
        shouldShowFullList
        css={css`
          padding: 40px 0;
        `}
      />
    </Layout.Main>
  </Layout>
);

export default PostsPage;
