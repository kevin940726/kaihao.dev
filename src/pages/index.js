import React from 'react';
import { css } from '@emotion/core';
import Layout from '../layouts/Layout';
import SEO from '../components/SEO';
import Hero from '../components/Hero';
import PostList from '../components/PostList';

const IndexPage = () => (
  <Layout>
    <SEO />

    <Hero />

    <PostList
      css={css`
        width: 760px;
        max-width: 100%;
        margin: -40px auto 150px;
        background-color: #ffffff;
        border-radius: 4px;
        padding: 20px;
        box-shadow: 0 2px 2px 1px rgba(0, 0, 0, 0.25);
      `}
    />
  </Layout>
);

export default IndexPage;
