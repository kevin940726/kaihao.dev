import React from 'react';
import styled from '@emotion/styled';
import { Global, css } from '@emotion/core';
import 'modern-normalize';
import FontFaceObserver from 'fontfaceobserver';
import { SUB_TEXT, CONTENT_TEXT } from '../constants';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

const font = new FontFaceObserver('Open Sans');

font
  .load()
  .then(() => {
    if (typeof document !== 'undefined') {
      document.body.classList.add('font-loaded');
    }
  })
  .catch(err => {
    if (typeof document !== 'undefined') {
      // For whatever reason it failed, we still want the font to be appended.
      document.body.classList.add('font-loaded');
    }
  });

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  > * {
    min-height: 0;
    flex-shrink: 0;
  }
`;

const Main = styled.main`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  max-width: 100%;
`;

const Layout = ({ children, ...props }) => (
  <Container>
    <Global
      styles={css`
        html,
        body {
          height: 100%;
          color: ${CONTENT_TEXT};
          font-family: 'sans-serif';
        }

        body.font-loaded {
          font-family: 'Open Sans', 'sans-serif';
        }

        a {
          color: ${SUB_TEXT};
          text-decoration: none;

          &:hover {
            text-decoration: underline;
          }
        }

        #___gatsby {
          height: 100%;

          & > div[role='group'] {
            height: 100%;
          }
        }
      `}
    />
    <Nav />
    <Main {...props}>{children}</Main>
    <Footer />
  </Container>
);

export default Layout;
