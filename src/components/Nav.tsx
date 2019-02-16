import React from 'react';
import { Link, graphql, StaticQuery } from 'gatsby';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

const NAV_HEIGHT = 50; // px
const MAX_NAV_WIDTH = 1024; // px

const NavContainer = styled.nav`
  display: flex;
  align-items: center;
  height: ${NAV_HEIGHT}px;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  box-shadow: 0 2px 1px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  padding: 10px 20px;
  z-index: 100;
`;

const Title = styled.h3`
  font-size: 20px;
  font-weight: 500;
  color: #28232d;
  margin: 0;

  > a {
    color: inherit;
    text-decoration: none;
  }
`;

const Nav = ({ data }) => {
  return (
    <>
      <NavContainer>
        <div
          css={css`
            width: ${MAX_NAV_WIDTH}px;
            max-width: 100%;
            margin: 0 auto;
          `}
        >
          <Title>
            <Link to="/">{data.site.siteMetadata.title}</Link>
          </Title>
        </div>
      </NavContainer>

      <div
        css={css`
          height: ${NAV_HEIGHT}px;
        `}
      />
    </>
  );
};

export default () => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => <Nav data={data} />}
  />
);
