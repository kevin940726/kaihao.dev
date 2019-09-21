import styled from '@emotion/styled';
import { css } from '@emotion/core';

const FlatButton = styled.a(
  props => css`
    display: inline-flex;
    align-items: center;
    padding: 10px 20px;
    margin: 10px 0;
    text-decoration: none;
    transition: background-color 0.15s ease-out;

    &:hover {
      background-color: ${props.theme.colors.background};
    }
  `
);

export default FlatButton;
