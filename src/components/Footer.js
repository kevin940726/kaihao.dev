import React from 'react';
import { css } from '@emotion/core';

const Footer = () => (
  <footer
    css={css`
      display: flex;
      justify-content: center;
      align-items: center;
      height: 30px;
      font-size: 12px;
      color: '#999999';
      text-align: center;
    `}
  >
    © {new Date().getFullYear()}, Built with my laptop
  </footer>
);

export default Footer;
