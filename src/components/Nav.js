import React from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { mobile } from '../utils/media';
import logo from '../images/logo.png';
import ToggleDarkMode from './ToggleDarkMode';

const NAV_HEIGHT = 50; // px
const MAX_NAV_WIDTH = 760; // px

const NavContainer = styled.nav(
  props => css`
    display: flex;
    box-sizing: border-box;
    align-items: center;
    height: ${NAV_HEIGHT}px;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    box-shadow: 0 2px 1px rgba(0, 0, 0, 0.1);
    background-color: ${props.theme.colors.background};
    padding: 10px 20px;
    z-index: 100;

    ${mobile(css`
      padding: 10px;
    `)}
  `
);

const Title = styled.h3(
  props => css`
    display: flex;
    align-items: center;
    font-size: 20px;
    font-weight: 500;
    color: ${props.theme.colors.subText};
    margin: 0;

    > a {
      display: flex;
      align-items: center;
      color: inherit;
      text-decoration: none;
      transition: opacity 0.15s ease-out;

      &:hover {
        text-decoration: none;
        opacity: 0.8;
      }
    }
  `
);

const LinkItem = styled(Link)(
  props => css`
    display: inline-block;
    color: ${props.theme.colors.contentText};
    font-size: 18px;
    margin: 0 10px;
    text-decoration: none;
    transition: opacity 0.15s ease-out;

    &:hover {
      opacity: 0.8;
    }
  `
);

const Nav = () => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <>
      <NavContainer>
        <div
          css={css`
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: ${MAX_NAV_WIDTH}px;
            max-width: 100%;
            margin: 0 auto;
          `}
        >
          <Title>
            <Link to="/">
              <img
                src={logo}
                alt="logo"
                css={css`
                  width: 40px;
                  height: 40px;
                  margin-right: 10px;
                `}
              />
              {data.site.siteMetadata.title}
            </Link>
          </Title>

          {/* <ul
            css={css`
              list-style: none;
            `}
          >
            <li>
              <LinkItem to="/posts">Blog</LinkItem>
            </li>
          </ul> */}
          <ToggleDarkMode />
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

export default Nav;
