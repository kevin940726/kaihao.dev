import React from 'react';
import styled from '@emotion/styled';
import SVG from './SVG';
import clipboardIcon from '../images/clipboard-text.svg';
import useCopyToClipboard from '../hooks/useCopyToClipboard';

const CopyButton = ({ code, ...props }) => {
  const handleClick = useCopyToClipboard(code);

  return (
    <button onClick={handleClick} aria-label="Copy" title="Copy" {...props}>
      <SVG src={clipboardIcon} height="24" width="24" />
      Copy
    </button>
  );
};

export default styled(CopyButton)`
  position: absolute;
  top: 0;
  right: 20px;
  transform: translateY(-100%);
  opacity: 0;
  font-size: 0;
  cursor: pointer;
  border: none;
  padding: 3px 5px;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  background-color: rgba(255, 255, 255, 0.8);
  transition: transform 0.15s ease-out, opacity 0.15s ease-out,
    background-color 0.15s ease-out;

  svg path {
    fill: #28232d;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 1);
  }
`;
