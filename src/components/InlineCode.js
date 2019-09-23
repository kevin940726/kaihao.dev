import styled from '@emotion/styled';
import { css } from '@emotion/core';

const InlineCode = styled.code(
  props => css`
    background-color: ${props.theme.colors.inlineCodeBackground};
    padding: 3px 5px;
    font-size: 0.85em;
  `
);

export default InlineCode;
