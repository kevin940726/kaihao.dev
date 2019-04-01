import styled from '@emotion/styled';
import { rgba } from 'polished';
import { SUB_TEXT } from '../constants';

const InlineCode = styled.code`
  font-family: 'Fira Code';
  background-color: ${rgba(SUB_TEXT, 0.1)};
  padding: 3px 5px;
  font-size: 0.85em;
`;

export default InlineCode;
