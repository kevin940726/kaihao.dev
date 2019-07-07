import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { rgba } from 'polished';

const InlineCode = styled.code(
  props => css`
    background-color: ${rgba(props.theme.colors.subText, 0.1)};
    padding: 3px 5px;
    font-size: 0.85em;
  `
);

export default InlineCode;
