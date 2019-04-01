import React from 'react';
import styled from '@emotion/styled';
import { Global, css } from '@emotion/core';
import 'modern-normalize';
import { SUB_TEXT, CONTENT_TEXT } from '../constants';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

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
`;

const Layout = ({ children, ...props }) => (
  <Container>
    <Global
      styles={css`
        @import url('https://fonts.googleapis.com/css?family=Open+Sans');

        html,
        body {
          height: 100%;
          font-family: 'Open Sans', sans-serif;
          color: ${CONTENT_TEXT};
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
