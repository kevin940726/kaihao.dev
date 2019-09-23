import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { mobile } from '../utils/media';

const BlockQuote = styled.blockquote(
  props => css`
    position: relative;
    margin: 1rem 0 2rem;
    padding: 1rem 2rem;
    background-color: ${props.theme.colors.blockQuoteBackground};

    &:before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 3px;
      background-color: ${props.theme.colors.subText};
    }

    ${mobile(css`
      padding: 1rem;
    `)}

    /**
     * This line will throw the below error in development mode, since we're not using SSR, we can safely ignore it.
     * 'The pseudo class ":first-child" is potentially unsafe when doing server-side rendering. Try changing it to ":first-of-type".'
     */
    > :first-child {
      margin-top: 0;
    }
    > :last-child {
      margin-bottom: 0;
    }
  `
);

export default BlockQuote;
