import React from 'react';
import { css } from '@emotion/core';
import { mobile } from '../utils/media';
import Layout from '../layouts/Layout';
import SEO from '../components/SEO';
import BackTo from '../components/BackTo';

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <Layout.Main
      css={css`
        padding: 80px 0;

        ${mobile(
          css`
            padding: 80px 20px;
          `
        )}
      `}
    >
      <h1>Oops..., nothing here.</h1>
      <p>
        <BackTo
          to="/"
          css={css`
            padding: 0;
          `}
        >
          Back to home page
        </BackTo>
      </p>
    </Layout.Main>
  </Layout>
);

export default NotFoundPage;
