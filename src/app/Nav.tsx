import Link from 'next/link';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { rgba } from 'polished';
import Image from 'next/legacy/image';
import siteMetadata from '@/siteMetadata.json';
import { BACKGROUND_BLACK } from './colors';
import { mobile } from './media';
import logo from './logo.png';
import ToggleDarkMode from './ToggleDarkMode';

const NAV_HEIGHT = 50; // px
const MAX_NAV_WIDTH = 760; // px

const NavContainer = styled.nav(
  (props) => css`
    display: flex;
    box-sizing: border-box;
    align-items: center;
    height: ${NAV_HEIGHT}px;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    box-shadow: 0 2px 1px ${rgba(BACKGROUND_BLACK, 0.1)};
    border-bottom: 1px solid ${props.theme.colors.border};
    background-color: ${props.theme.colors.contentBackground};
    padding: 10px 20px;
    z-index: 100;

    ${mobile(css`
      padding: 10px;
    `)}
  `
);

const Title = styled.h3(
  (props) => css`
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

const Nav = () => {
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
            <Link href="/">
              <span
                css={css`
                  display: inline-flex;
                  margin-right: 10px;
                `}
              >
                <Image src={logo} alt="logo" width={40} height={40} />
              </span>
              {siteMetadata.title}
            </Link>
          </Title>

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
