import type { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { css } from '@emotion/react';
import { rgba } from 'polished';
import GlobalStyles from '@/app/GlobalStyles';
import Nav from '@/app/Nav';
import { BACKGROUND_BLACK } from '@/app/colors';

export const getStaticProps: GetStaticProps = () => {
  if (process.env.NODE_ENV === 'development') {
    return { props: {} };
  }

  return { notFound: true };
};

const PostMetaLayout = () => {
  const { title } = useRouter().query;

  return (
    <div
      css={css`
        display: flex;
        position: relative;
        flex-direction: column;
        width: 1200px;
        height: 626px;
        background: linear-gradient(
          105.18deg,
          rgba(242, 153, 74, 0.97) 0%,
          rgba(242, 153, 74, 0.76) 78.72%
        );

        nav {
          position: absolute;
          height: 80px;
          box-shadow: 0 6px 3px ${rgba(BACKGROUND_BLACK, 0.1)};

          /* The relative nav below the fixed one */
          & + div {
            height: 80px;
          }

          > div {
            width: 1150px;
          }

          h3 {
            font-size: 38px;

            /* The next/image wrapper */
            a > span {
              height: 64px !important;
              width: 64px !important;
              margin-right: 16px !important;
            }
          }

          ul {
            display: none;
          }

          input[type='checkbox'] + label {
            display: none;
          }
        }
      `}
    >
      <GlobalStyles />
      <Nav />

      <h1
        css={css`
          display: flex;
          flex-grow: 1;
          align-items: center;
          font-size: 72px;
          color: #ffffff;
          text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
          margin: 0.5em 1em 1em;
          text-align: left;
        `}
      >
        {title}
      </h1>
    </div>
  );
};

export default PostMetaLayout;
