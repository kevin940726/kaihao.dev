import React from 'react';
import { css } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import useThemeMode from '../hooks/useThemeMode';
import { CONTENT_TEXT } from '../constants';
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
  const themeMode = useThemeMode();
  const theme = useTheme();

  if (!themeMode) {
    return null;
  }

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
        checked={themeMode === 'dark'}
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
            border: 1px solid ${CONTENT_TEXT};
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
