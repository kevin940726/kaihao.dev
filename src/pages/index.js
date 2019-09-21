import React from 'react';
import { css } from '@emotion/core';
import Layout from '../layouts/Layout';
import { mobile } from '../utils/media';
import SEO from '../components/SEO';
import Hero from '../components/Hero';
import PostList from '../components/PostList';

const IndexPage = () => (
  <Layout>
    <SEO />

    <Hero />

    <Layout.Main>
      <PostList
        css={theme => css`
          margin: -40px auto 150px;

          ${mobile(css`
            margin-top: 0;
          `)}
        `}
      />
    </Layout.Main>
  </Layout>
);

export default IndexPage;
