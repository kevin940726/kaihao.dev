import 'modern-normalize';
import { Global, css } from '@emotion/react';
import 'focus-visible';
import themeVariables, { lightTheme, darkTheme } from './theme';

const GlobalStyles = () => (
  <Global
    styles={(theme) =>
      css`
        html,
        body {
          height: 100%;
          color: ${theme.colors.contentText};
          background-color: ${theme.colors.contentBackground};
          font-family: 'Open Sans', 'sans-serif';
        }

        #__next {
          height: 100%;
        }

        a {
          color: ${theme.colors.subText};
          text-decoration: none;

          &:hover {
            text-decoration: underline;
          }
        }

        #___gatsby {
          height: 100%;

          & > div[role='group'] {
            height: 100%;
            min-height: 100%;
          }
        }

        body {
          ${Object.entries(themeVariables.colors)
            .map(
              ([key, variableName]) =>
                `${variableName}: ${
                  lightTheme.colors[key as keyof typeof lightTheme.colors]
                };`
            )
            .join('\n')}
        }

        body[data-theme-mode='dark'] {
          ${Object.entries(themeVariables.colors)
            .map(
              ([key, variableName]) =>
                `${variableName}: ${
                  darkTheme.colors[key as keyof typeof darkTheme.colors]
                };`
            )
            .join('\n')}
        }
      `
    }
  />
);

export default GlobalStyles;
