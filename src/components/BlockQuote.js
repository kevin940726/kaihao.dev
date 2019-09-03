import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { rgba } from 'polished';
import { mobile } from '../utils/media';

const BlockQuote = styled.blockquote(
  props => css`
    position: relative;
    margin: 1rem 0 2rem;
    padding: 1rem 2rem;
    background-color: ${rgba(props.theme.colors.mainText, 0.1)};

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

    p {
      &:first-of-type {
        margin-top: 0;
      }
      &:last-of-type {
        margin-bottom: 0;
      }
    }
  `
);

export default BlockQuote;
