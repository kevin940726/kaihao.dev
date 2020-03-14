import styled from '@emotion/styled';
import { css } from '@emotion/core';

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  border-top-left-radius: 4px;
  border-bottom-right-radius: 4px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  right: 0;
  height: 30px;
`;

const ActionItem = styled.button(
  props => css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border: none;
    padding: 3px 5px;
    background-color: transparent;
    color: ${props.theme.colors.subText};
    font-size: 13px;
    opacity: 0.8;
    transition: opacity 0.15s ease-out;

    &:hover {
      opacity: 1;
    }
  `
);

Actions.Item = ActionItem;

export default Actions;
