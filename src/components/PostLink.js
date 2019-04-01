import styled from '@emotion/styled';
import { MAIN_TEXT, SUB_TEXT } from '../constants';

const PostLink = styled.a`
  border-bottom: 1px dashed ${MAIN_TEXT};
  color: ${SUB_TEXT};

  &:hover {
    border-bottom-style: solid;
    text-decoration: none;
  }
`

export default PostLink;
