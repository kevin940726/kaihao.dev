import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { mobile } from '../utils/media';
import GlobalStyles from '../components/GlobalStyles';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

const Container = styled.div(
  props => css`
    display: flex;
    flex-direction: column;
    min-height: 100%;
    background-color: ${props.isContent
      ? props.theme.colors.contentBackground
      : props.theme.colors.background};

    > * {
      min-height: 0;
      flex-shrink: 0;
    }

    ${mobile(css`
      background-color: ${props.theme.colors.contentBackground};
    `)}
  `
);

const Main = styled.main`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  max-width: 100%;
  width: 760px;
  margin: 0 auto;
`;

const Layout = ({ children, isContent, ...props }) => (
  <Container isContent={isContent}>
    <GlobalStyles />
    <Nav />
    {children}
    <Footer />
  </Container>
);

Layout.Main = Main;

export default Layout;
