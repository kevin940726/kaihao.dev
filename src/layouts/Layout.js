import React from 'react';
import styled from '@emotion/styled';
import GlobalStyles from '../components/GlobalStyles';
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
  max-width: 100%;
`;

const Layout = ({ children, ...props }) => (
  <Container>
    <GlobalStyles />
    <Nav />
    <Main {...props}>{children}</Main>
    <Footer />
  </Container>
);

export default Layout;
