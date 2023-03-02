import { css } from '@emotion/react';
import { mobile } from '@/app/media';
import Layout from '@/app/Layout';
import SEO from '@/app/SEO';
import BackTo from '@/app/BackTo';

const NotFoundPage = () => (
  <Layout>
    <SEO
      title="404: Not found"
      image={{ src: '/api/og', width: 1200, height: 626 }}
    />
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
          href="/"
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
