import React from 'react';
import styled from '@emotion/styled';
import { Global, css } from '@emotion/core';
import 'modern-normalize';
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
  width: 560px;
  max-width: 100%;
  margin: 0 auto;
  padding: 20px;
  flex-grow: 1;
`;

const Layout = ({ children, ...props }) => (
  <Container>
    <Global
      styles={css`
        html,
        body {
          height: 100%;
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
