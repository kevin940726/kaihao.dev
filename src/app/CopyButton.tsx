import { forwardRef } from 'react';
import type { Ref } from 'react';
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
      className="absolute top-0 right-[20px] -translate-y-full active:translate-y-0 focus:translate-y-0 opacity-0 active:opacity-100 focus:opacity-100 text-[0] cursor-pointer border-none px-1.5 py-1 rounded-bl rounded-br bg-backgroundWhite bg-opacity-80 hover:bg-opacity-100 transition group-hover:translate-y-0 group-hover:opacity-100"
      {...props}
      ref={ref}
    >
      <ClipboardIcon className="fill-contentBlack" height="24" width="24" />
      Copy
    </button>
  );
});

export default CopyButton;
