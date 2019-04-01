import React from 'react';
import { css } from '@emotion/core';
import { Link } from 'gatsby';
import SVG from './SVG';
import backArrow from '../images/back-arrow.svg';
import FlatButton from './FlatButton';

const BackTo = ({ to, children, ...props }) => (
  <FlatButton
    as={Link}
    to={to}
    css={css`
      font-size: 1rem;
      margin: 1em 0;
    `}
    {...props}
  >
    <SVG
      src={backArrow}
      css={css`
        &,
        svg {
          display: inline-flex;
          height: 1rem;
          width: 1rem;

          path {
            fill: currentColor;
          }
        }
      `}
    />
    {children}
  </FlatButton>
);

export default BackTo;
