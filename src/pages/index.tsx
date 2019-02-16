import React from 'react';
import { css } from '@emotion/core';
import Layout from '../layouts/Layout';
import SEO from '../components/seo';
import PostList from '../components/PostList';

const Greeting = () => (
  <section
    css={css`
      margin-bottom: 40px;
    `}
  >
    <h1
      css={css`
        font-size: 45px;
      `}
    >
      Hello There.
    </h1>
    <h2
      css={css`
        font-size: 20px;
        font-weight: normal;
      `}
    >
      I'm Kai Hao, a front-end web developer in Taiwan.
    </h2>
    <p
      css={css`
        font-size: 20px;
      `}
    >
      I love to build beautiful, accessible, scalable web applications and
      create helpful tools to solve problems.
    </p>
  </section>
);

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />

    <Greeting />

    <PostList />
  </Layout>
);

export default IndexPage;
