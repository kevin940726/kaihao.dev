import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import GlobalStyles from '../components/GlobalStyles';
import ThemeProvider from '../components/ThemeProvider';
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

const Main = styled.main(
  props => css`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    max-width: 100%;
    background-color: ${props.theme.colors.background};
  `
);

const Layout = ({ children, ...props }) => (
  <ThemeProvider>
    <Container>
      <GlobalStyles />
      <Nav />
      <Main {...props}>{children}</Main>
      <Footer />
    </Container>
  </ThemeProvider>
);

export default Layout;
