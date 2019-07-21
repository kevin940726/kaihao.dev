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

    <PostList
      css={theme => css`
        width: 760px;
        max-width: 100%;
        margin: -40px auto 150px;
        background-color: ${theme.colors.background};
        border-radius: 4px;
        padding: 20px;
        box-shadow: 0 2px 2px 1px rgba(0, 0, 0, 0.25);

        ${mobile(css`
          margin-top: 0;
          border-radius: 0;
          box-shadow: none;
        `)}
      `}
    />
  </Layout>
);

export default IndexPage;
