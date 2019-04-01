import styled from '@emotion/styled';

const FlatButton = styled.a`
  display: inline-flex;
  align-items: center;
  padding: 10px 20px;
  margin: 10px 0;
  text-decoration: none;
  transition: background-color 0.15s ease-out;

  &:hover {
    background-color: #eeeeee;
  }
`;

export default FlatButton;
