import type { ComponentPropsWithRef } from 'react';
import { css, useTheme } from '@emotion/react';
import useThemeMode from './useThemeMode';
import { CONTENT_TEXT } from './colors';

const Sun = (props: ComponentPropsWithRef<'svg'>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-sun"
    {...props}
  >
    <circle cx="12" cy="12" r="5"></circle>
    <line x1="12" y1="1" x2="12" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="23"></line>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
    <line x1="1" y1="12" x2="3" y2="12"></line>
    <line x1="21" y1="12" x2="23" y2="12"></line>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
  </svg>
);

const Moon = (props: ComponentPropsWithRef<'svg'>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-moon"
    {...props}
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>
);

const Icon = ({
  as: As,
  alt,
  ...props
}: {
  as: typeof Sun | typeof Moon;
  alt: string;
  className?: string;
}) => (
  <As
    aria-label={alt}
    css={(theme) => css`
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
        css={(theme) => css`
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
          as={Sun}
          alt="light-theme"
          css={css`
            margin-left: 8px;
          `}
        />
        <Icon
          as={Moon}
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
