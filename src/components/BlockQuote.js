import styled from '@emotion/styled';
import { rgba } from 'polished';
import { SUB_TEXT, MAIN_TEXT } from '../constants';

const BlockQuote = styled.blockquote`
  position: relative;
  margin: 1rem 0 2rem;
  padding: 1rem 0 1rem 2.5rem;
  background-color: ${rgba(MAIN_TEXT, 0.1)};

  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 3px;
    background-color: ${SUB_TEXT};
  }

  p {
    &:first-of-type {
      margin-top: 0;
    }
    &:last-of-type {
      margin-bottom: 0;
    }
  }
`;

export default BlockQuote;
