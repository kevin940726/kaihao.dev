import React, { useContext } from 'react';
import { css, ThemeContext } from '@emotion/core';
import SVG from './SVG';
import sun from '../images/sun.svg';
import moon from '../images/moon.svg';

const Icon = ({ src, alt, ...props }) => (
  <SVG
    src={src}
    aria-label={alt}
    css={theme => css`
      width: 18px;
      height: 18px;
      color: ${theme.colors.contentBackground};

      svg {
        width: 18px;
        height: 18px;
      }
    `}
    {...props}
  />
);

const ToggleDarkMode = () => {
  const theme = useContext(ThemeContext);

  return (
    <>
      <input
        type="checkbox"
        id="dark-mode"
        name="dark-mode"
        css={css`
          position: absolute;
          top: -9999px;
          left: -9999px;

          &:checked + label:after {
            transform: translateX(100%);
          }

          &.focus-visible:focus + label:after {
            outline: -webkit-focus-ring-color auto 5px;
          }
        `}
        checked={theme.themeName === 'dark'}
        onChange={theme.toggleDarkMode}
      />
      <label
        htmlFor="dark-mode"
        css={theme => css`
          display: flex;
          position: relative;
          align-items: center;
          justify-content: space-between;
          height: 30px;
          width: 60px;
          border-radius: 40px;
          box-shadow: 0px 1px 2px 2px rgba(0, 0, 0, 0.1);
          background-color: ${theme.colors.reverseBackground};
          transition: background-color 0.2s ease-out;
          user-select: none;

          &:after {
            content: '';
            display: inline-block;
            position: absolute;
            top: 0;
            left: 0;
            height: 30px;
            width: 30px;
            border-radius: 50%;
            box-shadow: 0px 1px 2px 2px rgba(0, 0, 0, 0.1);
            background-color: #ffffff;
            transition: transform 0.2s ease-out, background-color 0.2s ease-out;
          }
        `}
      >
        <Icon
          src={sun}
          alt="light-theme"
          css={css`
            margin-left: 8px;
          `}
        />
        <Icon
          src={moon}
          alt="dark-theme"
          css={css`
            margin-right: 8px;
          `}
        />
      </label>
    </>
  );
};

export default ToggleDarkMode;
