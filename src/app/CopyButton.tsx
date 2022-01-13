import { forwardRef } from 'react';
import type { Ref } from 'react';
import styled from '@emotion/styled';
import ClipboardIcon from './ClipboardIcon';
import useCopyToClipboard from './useCopyToClipboard';

const CopyButton = forwardRef(function InnerCopyButton(
  { getCode, ...props }: { getCode: () => string },
  ref: Ref<HTMLButtonElement>
) {
  const handleClick = useCopyToClipboard(getCode);

  return (
    <button
      data-copy-button=""
      onClick={handleClick}
      aria-label="Copy"
      title="Copy"
      {...props}
      ref={ref}
    >
      <ClipboardIcon height="24" width="24" />
      Copy
    </button>
  );
});

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

  &:active,
  &:focus {
    opacity: 1;
    transform: translateY(0);
  }
`;
