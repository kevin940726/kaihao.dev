import type { ComponentPropsWithoutRef } from 'react';

const BlockQuote = (props: ComponentPropsWithoutRef<'blockquote'>) => (
  <blockquote
    className="relative mt-4 mb-8 p-4 md:px-8 bg-blockquoteBackground before:absolute before:left-0 before:top-0 before:h-full before:w-[3px] before:bg-subText [&>*:first-child]:mt-0 [&>*:last-child]:mb-0"
    {...props}
  />
);

export default BlockQuote;
