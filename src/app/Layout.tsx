import type { ReactNode } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { mobile } from './media';
import GlobalStyles from './GlobalStyles';
import Nav from './Nav';
import Footer from './Footer';

interface ContainerProps {
  isContent?: boolean;
}

interface LayoutProps {
  children: ReactNode;
  isContent?: boolean;
}

const Container = styled.div<ContainerProps>(
  (props) => css`
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

const Layout = ({ children, isContent, ...props }: LayoutProps) => (
  <Container isContent={isContent} {...props}>
    <GlobalStyles />
    <Nav />
    {children}
    <Footer />
  </Container>
);

Layout.Main = Main;

export default Layout;
